from pathlib import Path

import pandas as pd


# Project root = hack_sih/
PROJECT_ROOT = Path(__file__).resolve().parents[3]
DATA_DIR = PROJECT_ROOT / "data"


def load_csv(filename: str) -> pd.DataFrame:
    """Load a CSV file from the project's data directory."""
    file_path = DATA_DIR / filename

    if not file_path.exists():
        raise FileNotFoundError(f"Data file not found: {file_path}")

    return pd.read_csv(file_path)


def load_all_data() -> dict[str, pd.DataFrame]:
    """Load all core datasets used by the backend."""
    return {
        "incidents": load_csv("incidents.csv"),
        "roads": load_csv("roads.csv"),
        "shipments": load_csv("shipments.csv"),
        "vehicles": load_csv("vehicles.csv"),
    }