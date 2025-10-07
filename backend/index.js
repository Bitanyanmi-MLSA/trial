import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { BlobServiceClient } from '@azure/storage-blob';
import pdfParse from 'pdf-parse';
import fs from 'fs';
import axios from 'axios';

dotenv.config();

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(express.json());

// Azure Blob Storage setup
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_BLOB_CONTAINER || 'pdfs';
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

let lastPdfText = '';

app.post('/api/upload', upload.single('pdf'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send('No file uploaded');
    // Upload to Azure Blob
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();
    const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);
    await blockBlobClient.uploadFile(file.path);
    // Extract text
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer);
    lastPdfText = pdfData.text;
    fs.unlinkSync(file.path);
    res.send({ message: 'PDF uploaded and processed' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;
  if (!lastPdfText) return res.status(400).send({ error: 'No PDF uploaded yet' });
  try {
    // Use Azure OpenAI or Cognitive Search here. For now, just echo a dummy answer.
    // Example with Azure OpenAI (pseudo):
    // const response = await axios.post('https://YOUR_AZURE_OPENAI_ENDPOINT', { prompt: `Answer this: ${question}\n${lastPdfText}` }, { headers: { 'api-key': process.env.AZURE_OPENAI_KEY } });
    // const answer = response.data.choices[0].text;
    const answer = `Pretend answer to: "${question}" (integration needed)`;
    res.send({ answer });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
