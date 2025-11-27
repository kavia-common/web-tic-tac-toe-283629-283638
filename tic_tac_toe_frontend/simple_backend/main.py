from fastapi import FastAPI

# PUBLIC_INTERFACE
def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title="Simple Backend",
        description="Minimal FastAPI backend to accompany the Tic Tac Toe frontend.",
        version="0.1.0",
        openapi_tags=[
            {"name": "Health", "description": "Health and service readiness checks"},
            {"name": "Root", "description": "Root endpoint for basic status"},
        ],
    )

    @app.get("/", tags=["Root"], summary="Service status", description="Returns a basic service status payload.")
    def root():
        """Root endpoint returning service status."""
        return {"status": "ok"}

    @app.get(
        "/health",
        tags=["Health"],
        summary="Health check",
        description="Returns health status for readiness/liveness probes.",
    )
    def health():
        """Health endpoint for liveness/readiness checks."""
        return {"health": "ok"}

    return app


# Expose the ASGI app instance for uvicorn
app = create_app()
