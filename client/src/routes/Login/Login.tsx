import { useState } from "react";
import { useLoginMutation } from "../../app/apiSlice";
import s from "./Login.module.scss";

export let Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  let [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let response = await login({ password, email }).unwrap();
      localStorage.setItem('token', response.token);
      alert('Вход выполнен');
    } catch (err) {
      setError('Ошибка входа. Проверьте свои учетные данные.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <label>
          Email:
          <input 
            className={s.input} 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </label>
        <label>
          Пароль:
          <input 
            className={s.input} 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </label>
        {error && <div className={s.error}>{error}</div>}
        <input 
          className={s.input} 
          type="submit" 
          disabled={isLoading} 
        />
        {isLoading && <div>Загрузка...</div>}
      </form>
    </div>
  );
};
