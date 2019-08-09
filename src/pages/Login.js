import React, { useState } from 'react';
import api from '../services/api';
import './Login.css';

import logo from '../assets/logo.svg';

const Login = ({ history }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        await api
            .post('/devs', {
                username
            })
            .then(response => {
                const { _id } = response.data;

                history.push(`/dev/${_id}`);
            })
            .catch(() => {
                setError('Houston we have a problem');
            });
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                {error && <p className="error">{error}</p>}
                <input
                    placeholder="Digite seu usuário do github"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
