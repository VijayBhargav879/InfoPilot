# Deployment Guide

This project consists of a **React Frontend** and a **Rasa Backend**.

## 1. Deploy Frontend (Vercel)

The frontend is ready for Vercel deployment.

1.  **Push your code to GitHub**.
2.  **Log in to Vercel** and click **"Add New Project"**.
3.  **Import your repository**.
4.  **Configure Project**:
    -   **Root Directory**: Edit and select `frontend`.
    -   **Framework Preset**: Select "Create React App" (should be auto-detected).
    -   **Environment Variables**:
        -   Name: `REACT_APP_API_URL`
        -   Value: `https://your-backend-url.com/webhooks/rest/webhook` (You will get this URL after deploying the backend).
5.  **Deploy**.

## 2. Deploy Backend (Container Hosting)

The backend runs Rasa Pro and a Python Action Server. Since these are Docker containers, you need a service that supports Docker (e.g., Render, AWS ECS, Google Cloud Run, DigitalOcean App Platform). **Vercel does NOT support this backend directly.**

### Option A: Render (Easiest)
1.  Create a `render.yaml` or deploy manually.
2.  You will need to deploy **two services**:
    -   **Rasa Service**: Docker deploy of `renewable-bot` directory (using `rasa run`).
    -   **Action Server**: Docker deploy of `renewable-bot` directory (using `Dockerfile`, command `start --actions actions`).
3.  **Environment Variables**:
    -   `OPENAI_API_KEY`: Your OpenAI key.
    -   `RASA_PRO_LICENSE`: Your Rasa Pro license.

### Option B: AWS / Google Cloud
1.  Build the images locally:
    ```bash
    docker build -t my-rasa-image ./renewable-bot
    ```
2.  Push to ECR (AWS) or GCR (Google).
3.  Deploy using ECS or Cloud Run.

## 3. Local Development (Docker Compose)
To run everything locally:
```bash
docker-compose up --build
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Rasa API: [http://localhost:5005](http://localhost:5005)
