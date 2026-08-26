import pandas as pd


def load_data():
    roads = pd.read_csv("data/roads.csv")
    incidents = pd.read_csv("data/incidents.csv")
    shipments = pd.read_csv("data/shipments.csv")
    vehicles = pd.read_csv("data/vehicles.csv")

    return roads, incidents, shipments, vehicles


def calculate_road_risk(road):
    condition_scores = {
        "good": 20,
        "moderate": 50,
        "poor": 75,
        "critical": 100
    }

    status_scores = {
        "open": 10,
        "restricted": 60,
        "blocked": 100
    }

    condition_score = condition_scores.get(
        str(road["road_condition"]).lower(), 50
    )

    slope_score = min(float(road["slope"]) / 15 * 100, 100)
    soil_score = float(road["soil_risk"]) * 100
    landslide_score = min(float(road["historical_landslides"]) / 10 * 100, 100)
    rainfall_score = min(float(road["rainfall"]) / 300 * 100, 100)
    flood_score = float(road["flood_risk"]) * 100
    status_score = status_scores.get(
        str(road["status"]).lower(), 50
    )

    risk_score = (
        condition_score * 0.20 +
        slope_score * 0.15 +
        soil_score * 0.15 +
        landslide_score * 0.15 +
        rainfall_score * 0.10 +
        flood_score * 0.15 +
        status_score * 0.10
    )

    return round(min(risk_score, 100), 2)


def calculate_incident_risk(incidents):
    severity_scores = {
        "low": 20,
        "medium": 50,
        "high": 75,
        "critical": 100
    }

    incidents["incident_score"] = incidents["severity"].str.lower().map(
        severity_scores
    ).fillna(50).astype(float)

    incidents.loc[incidents["verified"] == True, "incident_score"] *= 1.1

    incidents["incident_score"] = incidents["incident_score"].clip(upper=100)

    return incidents


def risk_level(score):
    if score <= 30:
        return "LOW"
    elif score <= 60:
        return "MEDIUM"
    elif score <= 80:
        return "HIGH"
    else:
        return "CRITICAL"


if __name__ == "__main__":
    roads, incidents, shipments, vehicles = load_data()

    roads["road_risk_score"] = roads.apply(calculate_road_risk, axis=1)

    incidents = calculate_incident_risk(incidents)

    incident_by_road = (
        incidents.groupby("road_id")["incident_score"]
        .max()
        .reset_index()
    )

    roads = roads.merge(
        incident_by_road,
        on="road_id",
        how="left"
    )

    roads["incident_score"] = roads["incident_score"].fillna(0)

    roads["final_risk_score"] = (
        roads["road_risk_score"] * 0.75 +
        roads["incident_score"] * 0.25
    ).round(2)

    roads["risk_level"] = roads["final_risk_score"].apply(risk_level)

    print("\nFINAL ROAD RISK ANALYSIS")
    print("=" * 60)

    print(
        roads[
            [
                "road_id",
                "road_risk_score",
                "incident_score",
                "final_risk_score",
                "risk_level",
                "status"
            ]
        ].to_string(index=False)
    )