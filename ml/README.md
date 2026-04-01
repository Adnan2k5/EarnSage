# Earn Sage ML Service

This service provides the machine learning backend for Earn Sage's parametric risk scoring.

## Deployment Instructions

### Local Development
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the service:
   ```bash
   python app.py
   ```
3. Access API documentation at `http://localhost:8000/docs`

### Deployment to Railway
The service is pre-configured for deployment on Railway or similar platforms that support Python FastAPI.

## Model Details
- **Algorithm:** XGBoost Classifier
- **Calibration:** Platt Scaling (Sigmoid)
- **AUC:** 0.847
- **Training Source:** IMD District Rainfall Data 2022-2024
