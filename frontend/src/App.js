import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('pdf', file);
    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    setUploading(false);
  };

  const handleAsk = async () => {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div className="App">
      <h1>PDF Q&A App</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>{uploading ? 'Uploading...' : 'Upload PDF'}</button>
      <div>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask a question about the PDF..."
        />
        <button onClick={handleAsk}>Ask</button>
      </div>
      {answer && <div className="answer"><strong>Answer:</strong> {answer}</div>}
    </div>
  );
}

export default App;
