import React, {useState} from "react";
import {doc, setDoc} from "firebase/firestore";
import {auth, db} from "../firebase";
import Navbar from "../components/Navbar";
import './CommonStyle.css'

const TokenManager = () => {
    const [slackToken, setSlackToken] = useState("");
    const [appToken, setAppToken] = useState("");
    const [discordToken, setDiscordToken] = useState("");
    const user = auth.currentUser;

    const saveSlack = async () => {
        if (!user) return alert("未ログインです");
        await setDoc(doc(db, "tokens_slack", user.uid), {
            email: user.email,
            slackToken,
            appToken,
            updatedAt: new Date()
        }, {merge: true});
        setSlackToken("");
        setAppToken("");
        alert("Slackトークンを保存しました");
    };

    const saveDiscord = async () => {
        if (!user) return alert("未ログインです");
        await setDoc(doc(db, "tokens_discord", user.uid), {
            email: user.email,
            discordToken,
            updatedAt: new Date()
        }, {merge: true});
        setDiscordToken("");
        alert("Discordトークンを保存しました");
    };

    return (
        <div className="base">
            <Navbar/>
            <div className="container">
                <h1 className="title">Bot / Token管理</h1>

                <div className="box">
                    <h2 className="subtitle">Slack</h2>
                    <div className="field">
                        <label className="label">Slack Bot Token</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="xoxb-..."
                            value={slackToken}
                            onChange={(e) => setSlackToken(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className="label">Slack App Token</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="xapp-..."
                            value={appToken}
                            onChange={(e) => setAppToken(e.target.value)}
                        />
                    </div>
                    <button className="button is-primary" onClick={saveSlack}>
                        保存（Slack）
                    </button>
                </div>

                <div className="box">
                    <h2 className="subtitle">Discord</h2>
                    <div className="field">
                        <label className="label">Discord Bot Token</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="discord-..."
                            value={discordToken}
                            onChange={(e) => setDiscordToken(e.target.value)}
                        />
                    </div>
                    <button className="button is-link" onClick={saveDiscord}>
                        保存（Discord）
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TokenManager;
