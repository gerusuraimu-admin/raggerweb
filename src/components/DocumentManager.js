import React, {useState, useEffect} from 'react';
import {getStorage, ref, listAll, getDownloadURL, deleteObject} from "firebase/storage";
import {auth} from '../firebase';
import UploadModal from './UploadModal';
import Navbar from './Navbar';
import './CommonStyle.css'

const storage = getStorage();

const DocumentManager = () => {
    const [files, setFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const uid = auth.currentUser?.uid;

    const fetchFiles = async () => {
        if (!uid) return;
        setLoading(true);
        const userFolderRef = ref(storage, `documents/${uid}`);
        try {
            const res = await listAll(userFolderRef);
            const fileData = await Promise.all(res.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                return {name: itemRef.name, url, ref: itemRef};
            }));
            setFiles(fileData);
        } catch (error) {
            console.error("ファイル取得エラー:", error);
        }
        setLoading(false);
    };

    const handleDelete = async (refToDelete) => {
        try {
            await deleteObject(refToDelete);
            await fetchFiles();
        } catch (error) {
            console.error("削除失敗:", error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [uid]);

    return (
        <div className="base">
            <Navbar/>
            <div className="container mt-5">
                <h2 className="title is-4">ファイル管理</h2>
                <button className="button is-primary mb-3" onClick={() => setShowModal(true)}>
                    ファイルをアップロード
                </button>
                {loading ? (
                    <p>読み込み中...</p>
                ) : (
                    <ul>
                        {files.map((file, index) => (
                            <li key={index} className="mb-2">
                                <a href={file.url} target="_blank" rel="noreferrer">{file.name}</a>
                                <button
                                    className="button is-small is-danger ml-2"
                                    onClick={() => handleDelete(file.ref)}
                                >
                                    削除
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <UploadModal
                    isActive={showModal}
                    onClose={() => setShowModal(false)}
                    onUpload={fetchFiles}
                    uid={uid}
                />
            </div>
        </div>
    );
};

export default DocumentManager;
