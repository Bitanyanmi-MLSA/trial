# PDF Q&A Web App

This app allows users to upload PDF files, stores them in Azure Blob Storage, extracts their text, and answers questions about the PDF content using Azure AI.

## Project Structure

- `frontend/` — React app (JavaScript, CSS)
- `backend/` — Node.js/Express API server

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- Azure account (for Blob Storage and OpenAI/Cognitive Search)

### 1. Backend Setup
1. Copy `.env.example` to `.env` in the `backend/` folder and fill in your Azure credentials.
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Start the backend:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the frontend:
   ```bash
   npm start
   ```

### 3. Azure Configuration
- Create an Azure Blob Storage account and container.
- (Optional) Set up Azure OpenAI or Cognitive Search for real Q&A.

### 4. Usage
- Upload a PDF via the web interface.
- Ask questions about the PDF content.

---

> The backend currently returns a dummy answer. Integrate Azure OpenAI or Cognitive Search for real answers.