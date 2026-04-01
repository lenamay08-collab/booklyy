import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../services/api';
import './Pages.css';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        if (tokenParam) {
            setToken(tokenParam);
        } else {
            setError('Некорректная ссылка восстановления');
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }
        if (newPassword.length < 6) {
            setError('Пароль должен содержать минимум 6 символов');
            return;
        }

        try {
            const response = await resetPassword(token, newPassword);
            setSuccess(response.data.message);
            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка сброса пароля');
        }
    };

    return (
        <div className="page-container">
            <div className="reset-password-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <h1>Сброс пароля</h1>
                {error && <div className="error-message" style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}
                {success && <div className="success-message" style={{ color: 'green', marginBottom: '16px' }}>{success}</div>}
                {!success && token && (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="Новый пароль"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #ddd' }}
                        />
                        <input
                            type="password"
                            placeholder="Подтвердите пароль"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #ddd' }}
                        />
                        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#7F8C6D', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                            Установить новый пароль
                        </button>
                    </form>
                )}
                {!token && !error && <p>Загрузка...</p>}
            </div>
        </div>
    );
};

export default ResetPassword;