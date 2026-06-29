import React, { useState } from 'react';
import './Upload.css';

interface UploadProps {
  onImageSubmit?: (base64String: string) => void;
}

export default function UploadPage({ onImageSubmit }: UploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };
  
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setImagePreview(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    setImagePreview(null);
  };
  
  const handleSubmit = () => {
    if (!imagePreview) return;
    
    // Futura integração com o n8n poderá ser implementada aqui
    console.log("Enviando imagem (para n8n futuramente)...", imagePreview.substring(0, 50) + "...");
    
    if (onImageSubmit) {
      onImageSubmit(imagePreview);
    }
  };
  
  return (
    <div className="upload-page">
      <div className="upload-card">
        <h1 className="upload-title">Análise de Documentos</h1>
        <p className="upload-subtitle">Faça o upload da sua imagem para processamento</p>
        
        {!imagePreview ? (
          <div 
            className={`drop-zone ${isDragging ? 'active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="drop-zone-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <p>Arraste e solte sua imagem aqui ou</p>
            <p style={{ color: '#8b5cf6', fontWeight: 600, marginTop: '0.5rem' }}>Clique para procurar</p>
            <input 
              type="file" 
              className="file-input" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="preview-container">
            <button className="remove-btn" onClick={handleRemove} title="Remover imagem">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img src={imagePreview} alt="Preview" className="image-preview" />
          </div>
        )}
        
        <button 
          className="submit-btn" 
          disabled={!imagePreview}
          onClick={handleSubmit}
        >
          Avançar / Enviar
        </button>
      </div>
    </div>
  );
}
