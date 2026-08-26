from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.data_routes import router as data_router

app = FastAPI(
    title="Emergency Response API",
    version="1.0.0",
    description="Backend API for emergency logistics and road risk analysis.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "emergency-response-backend",
    }


app.include_router(data_router)