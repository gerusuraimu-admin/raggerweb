import React, { useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import './UploadModal.css';

const storage = getStorage();

const UploadModal = ({ isActive, onClose, onUpload, uid }) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (files.length === 0 || !uid) return;
        setUploading(true);

        try {
            // Upload each file sequentially
            for (const file of files) {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const filePath = `documents/${uid}/${timestamp}_${file.name}`;
                const fileRef = ref(storage, filePath);
                await uploadBytes(fileRef, file);
            }

            onUpload();
            setFiles([]);
            onClose();
        } catch (error) {
            console.error("アップロード失敗:", error);
        }
        setUploading(false);
    };

    if (!isActive) return null;

    return (
        <div className="modal is-active upload-modal">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">ファイルアップロード</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <div className="file-area">
                        <label className="file-label">
                            <input 
                                className="file-input" 
                                type="file" 
                                multiple 
                                onChange={(e) => setFiles(Array.from(e.target.files))} 
                            />
                            <span className="file-cta">
                                <span className="file-icon">
                                    📁
                                </span>
                                <span className="file-label">
                                    複数ファイルを選択...
                                </span>
                            </span>
                        </label>
                    </div>
                    {files.length > 0 && (
                        <div className="selected-files">
                            <p className="selected-files-count">{files.length}ファイルが選択されました</p>
                            {files.map((file, index) => (
                                <div key={index} className="selected-file">
                                    <span className="file-icon">📄</span>
                                    <span className="selected-file-name">{file.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                <footer className="modal-card-foot">
                    <button 
                        className={`button is-success ${uploading ? 'is-loading' : ''}`} 
                        onClick={handleUpload} 
                        disabled={uploading}
                    >
                        アップロード
                    </button>
                    <button className="button" onClick={onClose}>キャンセル</button>
                </footer>
            </div>
        </div>
    );
};

export default UploadModal;
