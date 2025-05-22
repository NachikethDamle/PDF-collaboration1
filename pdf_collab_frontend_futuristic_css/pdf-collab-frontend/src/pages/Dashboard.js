import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({ token }) {
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);
  const [shareTarget, setShareTarget] = useState('');
  const [sharingId, setSharingId] = useState(null);

  const fetchPDFs = () => {
    axios.get('/api/pdf/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setPdfs(res.data));
  };

  useEffect(() => {
    fetchPDFs();
  }, [token]);

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', file);
    await axios.post('/api/pdf/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    setFile(null);
    fetchPDFs();
  };

  const handleShare = async (id) => {
    if (!shareTarget) return alert('Enter an email to share with.');
    await axios.post(`/api/pdf/share/${id}`, { email: shareTarget }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert(`Invite sent to ${shareTarget}`);
    setSharingId(null);
    setShareTarget('');
  };

  const handleDelete = (id) => {
  const confirm = window.confirm("Are you sure you want to remove this PDF from view?");
  if (!confirm) return;

  setPdfs(prev => prev.filter(pdf => pdf._id !== id));
};

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={e => setFile(e.target.files[0])} accept=".pdf" required />
        <button type="submit">Upload PDF</button>
      </form>

      <h3 style={{ marginTop: '20px' }}>Your PDFs</h3>
      {pdfs.map(pdf => (
        <div key={pdf._id} className="pdf-item">
          <a href={`http://localhost:5000/${pdf.filePath}`} target="_blank" rel="noreferrer">{pdf.name}</a>
          {sharingId === pdf._id ? (
            <div className="share-box">
              <input
                type="email"
                value={shareTarget}
                onChange={e => setShareTarget(e.target.value)}
                placeholder="Recipient email"
              />
              <button onClick={() => handleShare(pdf._id)}>Send</button>
            </div>
          ) : (
            <button onClick={() => setSharingId(pdf._id)}>Share</button>
          )}
          <button onClick={() => handleDelete(pdf._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;