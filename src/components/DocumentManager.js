import React, {useState, useEffect, useCallback} from 'react';
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

    const fetchFiles = useCallback(async () => {
        if (!uid) return;
        setLoading(true);
        const userFolderRef = ref(storage, `documents/${uid}`);
        try {
            const res = await listAll(userFolderRef);
            const fileData = await Promise.all(res.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                return { name: itemRef.name, url, ref: itemRef };
            }));
            setFiles(fileData);
        } catch (error) {
            console.error("ファイル取得エラー:", error);
        }
        setLoading(false);
    }, [uid]);

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
    }, [fetchFiles]);

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
                    <div className="table-container">
                        <table className="table is-fullwidth is-striped is-hoverable">
                            <thead>
                                <tr>
                                    <th>ファイル名</th>
                                    <th style={{ width: '100px', textAlign: 'center' }}>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((file, index) => (
                                    <tr key={index}>
                                        <td style={{ verticalAlign: 'middle', wordBreak: 'break-all' }}>
                                            <a href={file.url} target="_blank" rel="noreferrer">{file.name}</a>
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button
                                                className="button is-small is-danger"
                                                onClick={() => handleDelete(file.ref)}
                                            >
                                                削除
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
