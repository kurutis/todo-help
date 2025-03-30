import { NavLink, Outlet } from "react-router-dom";
import s from "./Root.module.scss";

export let Root = () => {
    return (
        <>
            <header className={s.header}>
                <NavLink to={'/'} className={s.logo}>Main</NavLink>
                <h1 className={s.name}>TODO</h1>
                <nav>
                    <ul className={s.list}>
                        <li>
                            <NavLink to={'/login'} className={({ isActive }) => (isActive ? s.active : '')}>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/register'} className={({ isActive }) => (isActive ? s.active : '')}>Register</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};
