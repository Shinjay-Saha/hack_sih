from typing import Any

from app.services.data_service import load_all_data


def _safe_float(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def predict_road_risk(road_id: str) -> dict:
    data = load_all_data()

    roads = data["roads"]
    incidents = data["incidents"]

    road_rows = roads[roads["road_id"].astype(str) == str(road_id)]

    if road_rows.empty:
        raise ValueError(f"Road not found: {road_id}")

    road = road_rows.iloc[0]

    # Incident information for this road
    incident_rows = incidents[
        incidents["road_id"].astype(str) == str(road_id)
    ]

    incident_count = len(incident_rows)

    # Generic feature extraction from the existing CSV.
    # This keeps the API independent of exact ML model availability.
    risk_values = []

    for column in roads.columns:
        column_lower = column.lower()

        if any(
            word in column_lower
            for word in ["risk", "severity", "hazard", "incident"]
        ):
            value = _safe_float(road[column])
            if value:
                risk_values.append(value)

    base_risk = sum(risk_values) / len(risk_values) if risk_values else 0.0

    # Incident contribution
    incident_score = min(incident_count * 20.0, 100.0)

    if risk_values:
        final_score = (base_risk * 0.7) + (incident_score * 0.3)
    else:
        final_score = incident_score

    final_score = round(max(0.0, min(final_score, 100.0)), 2)

    if final_score >= 70:
        risk_level = "HIGH"
    elif final_score >= 40:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "road_id": str(road_id),
        "predicted_risk_score": final_score,
        "risk_level": risk_level,
        "incident_count": incident_count,
        "model_status": "data_based_fallback",
    }