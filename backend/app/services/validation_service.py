import pandas as pd


REQUIRED_COLUMNS = {
    "incidents": [],
    "roads": [],
    "shipments": [],
    "vehicles": [],
}


def validate_dataframe(name: str, df: pd.DataFrame) -> dict:
    """Validate a loaded dataset and return validation details."""

    if df.empty:
        return {
            "dataset": name,
            "valid": False,
            "errors": ["Dataset is empty"],
            "rows": 0,
            "columns": 0,
        }

    errors = []

    # Check required columns
    missing_columns = [
        column
        for column in REQUIRED_COLUMNS.get(name, [])
        if column not in df.columns
    ]

    if missing_columns:
        errors.append(f"Missing columns: {missing_columns}")

    # Check duplicate rows
    duplicate_count = int(df.duplicated().sum())

    # Check missing values
    missing_values = int(df.isna().sum().sum())

    return {
        "dataset": name,
        "valid": len(errors) == 0,
        "errors": errors,
        "rows": int(len(df)),
        "columns": int(len(df.columns)),
        "duplicate_rows": duplicate_count,
        "missing_values": missing_values,
    }


def validate_all_data(data: dict[str, pd.DataFrame]) -> dict:
    """Validate all loaded datasets."""
    return {
        name: validate_dataframe(name, df)
        for name, df in data.items()
    }