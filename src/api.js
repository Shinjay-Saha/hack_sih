const API_BASE_URL = "http://127.0.0.1:8000";

export async function getHealth() {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error("Backend health check failed");
  }

  return response.json();
}

export async function getSummary() {
  const response = await fetch(`${API_BASE_URL}/api/summary`);

  if (!response.ok) {
    throw new Error("Failed to fetch summary");
  }

  return response.json();
}

export async function getDataset(datasetName) {
  const response = await fetch(`${API_BASE_URL}/api/data/${datasetName}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${datasetName}`);
  }

  return response.json();
}

export async function getPrediction(roadId) {
  const response = await fetch(
    `${API_BASE_URL}/api/prediction/${roadId}`
  );

  if (!response.ok) {
    throw new Error(`Prediction failed for ${roadId}`);
  }

  return response.json();
}