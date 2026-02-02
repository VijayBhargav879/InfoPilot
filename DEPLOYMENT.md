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

### Option A: Koyeb (recommended for Docker)
Koyeb has a "forever free" tier that works well for Docker containers.
1.  **Sign up** at Koyeb.com.
2.  **Create App**: Select "Docker" as the deployment method.
3.  **Image**: Use `docker.io/<your-username>/infopilot-backend` (you must push your image to Docker Hub first).
4.  **Ports**: Set port to `5005`.
5.  **Environment Variables**: Add `OPENAI_API_KEY` and `RASA_PRO_LICENSE`.

### Option B: Fly.io
Fly.io provides a free allowance (up to 3 small VMs).
1.  **Install `flyctl`**.
2.  Run `fly launch` in the `renewable-bot` directory.
3.  It will generate a `fly.toml`.
4.  Deploy with `fly deploy`.

### Option C: Railway
Railway offers a trial usage plan.
1.  **Connect GitHub**: Select your repo.
2.  **Add Service**: Select the `renewable-bot` folder.
3.  Railway usually auto-detects the Dockerfile.
4.  Set variables in the dashboard.

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
