import React, { useState } from "react";
import { useRegisterMutation } from "../../app/apiSlice";
import s from "./Register.module.scss";

export let Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rPassword, setRPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    let [register] = useRegisterMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (password !== rPassword) {
            setError('Пароли не совпадают');
            setIsLoading(false);
            return;
        }

        try {
            await register({ username, password, email }).unwrap();
            alert('Регистрация успешна!');
        } catch (err) {
            setError('Ошибка регистрации. Попробуйте еще раз.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form className={s.form} onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input 
                        className={s.input} 
                        type="text" 
                        name="username" 
                        placeholder="username" 
                        required 
                        value={username} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} 
                    />
                </label>
                <label>
                    Email:
                    <input 
                        className={s.input} 
                        type="email" 
                        name="email"  
                        placeholder="email"  
                        required 
                        value={email} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                    />
                </label>
                <label>
                    Password:
                    <input 
                        className={s.input} 
                        type="password" 
                        name="password"  
                        placeholder="password"  
                        required 
                        value={password} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                    />
                </label>
                <label>
                    Retype Password:
                    <input 
                        className={s.input} 
                        type="password" 
                        name="retypePassword"  
                        placeholder="retypePassword"  
                        required 
                        value={rPassword} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRPassword(e.target.value)} 
                    />
                </label>
                {error && <div className={s.error}>{error}</div>}
                <input 
                    className={s.input} 
                    type="submit" 
                    name="Submit" 
                    disabled={isLoading} 
                />
                {isLoading && <div>Загрузка...</div>}
            </form>
        </div>
    );
};
