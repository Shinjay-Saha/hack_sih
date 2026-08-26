from fastapi import APIRouter, HTTPException

from app.services.data_service import load_all_data
from app.services.validation_service import validate_all_data
from app.services.prediction_service import predict_road_risk

router = APIRouter(prefix="/api", tags=["Data & Prediction"])


@router.get("/summary")
def get_summary():
    """
    Return dataset sizes and validation status.
    """
    try:
        data = load_all_data()
        validation = validate_all_data(data)

        datasets = {}

        for name, dataframe in data.items():
            datasets[name] = {
                "rows": int(dataframe.shape[0]),
                "columns": int(dataframe.shape[1]),
                "validation": validation.get(name, {}),
            }

        return {
            "status": "success",
            "datasets": datasets,
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to generate data summary: {exc}",
        )


@router.get("/data/{dataset_name}")
def get_dataset(dataset_name: str):
    """
    Return records from one of the available datasets.
    """
    try:
        data = load_all_data()

        if dataset_name not in data:
            raise HTTPException(
                status_code=404,
                detail=(
                    f"Unknown dataset '{dataset_name}'. "
                    f"Available: {list(data.keys())}"
                ),
            )

        dataframe = data[dataset_name]

        records = dataframe.where(dataframe.notna(), None).to_dict(
            orient="records"
        )

        return {
            "status": "success",
            "dataset": dataset_name,
            "count": len(records),
            "records": records,
        }

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to load dataset: {exc}",
        )


@router.get("/prediction/{road_id}")
def get_prediction(road_id: str):
    """
    Predict road risk for a given road.
    """
    try:
        return {
            "status": "success",
            "prediction": predict_road_risk(road_id),
        }

    except ValueError as exc:
        raise HTTPException(
            status_code=404,
            detail=str(exc),
        )

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {exc}",
        )