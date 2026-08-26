from fastapi import FastAPI

from app.routes.data_routes import router as data_router

app = FastAPI(
    title="Emergency Response API",
    version="1.0.0",
    description="Backend API for emergency logistics and road risk analysis.",
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "emergency-response-backend",
    }


app.include_router(data_router)