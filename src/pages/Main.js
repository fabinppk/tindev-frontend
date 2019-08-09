import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import api from '../services/api';
import domain from '../utils/settings';
import './Main.css';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';

const Main = ({ match }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [matchDev, setMatchDev] = useState(false);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            });
            setUsers(response.data);
            setLoading(false);
        }
        loadUsers();
    }, [match.params.id]);

    useEffect(() => {
        const socket = io(domain, {
            query: { user: match.params.id }
        });
        socket.on('match', devMatch => {
            setMatchDev(devMatch);
        });
    }, [match.params.id]);

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        });

        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        });

        setUsers(users.filter(user => user._id !== id));
    }

    async function handleClean() {
        await api.get('/clean');
        window.location.reload();
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
            {loading ? (
                <div className="empty">Carregando ...</div>
            ) : users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleDislike(user._id);
                                    }}
                                >
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleLike(user._id);
                                    }}
                                >
                                    <img src={like} alt="Like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty">Acabou :(</div>
            )}
            <button className="cleanAll" type="button" onClick={() => handleClean()}>
                <strong>Reset Likes/Dislikes</strong>
            </button>

            {matchDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="Its a match" />
                    <img className="avatar" src={matchDev.avatar} alt="name" />
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button onClick={() => setMatchDev(false)} type="button">
                        Fechar
                    </button>
                </div>
            )}
        </div>
    );
};

export default Main;
