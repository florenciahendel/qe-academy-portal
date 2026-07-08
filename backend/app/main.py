from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="QE Academy Portal API",
    version="0.1.0",
    description="Backend API for QE Academy Portal",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "QE Academy Portal API"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }