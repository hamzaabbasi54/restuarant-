import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        // Check login state whenever this component is loaded
        const updateLoginStatus = () => setIsLogin(!!localStorage.getItem("token"));

        // Run once when Navbar first mounts
        updateLoginStatus();

        // Listen for changes in localStorage (login/logout from other tabs)
        window.addEventListener("storage", updateLoginStatus);

        // Cleanup when Navbar is unmounted
        return () => window.removeEventListener("storage", updateLoginStatus);
    }, []);


    const checkLogin = () => {
        if (isLogin) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsLogin(false);
            alert("Logged out successfully");
        } else {
            setIsOpen(true);
        }
    };
        return (
        <>
            <header>
                <h2>food blog</h2>
                <ul>
                    <li><NavLink to='/'>home</NavLink></li>
                    <li onClick={() => isLogin ? navigate('/myrecipe') : setIsOpen(true)}>my recipe</li>
                    <li onClick={() => isLogin ? navigate('/favrecipe') : setIsOpen(true)}>favourites</li>
                    <li onClick={checkLogin}><p className="login">{isLogin ? 'logout' : 'login'} </p></li>
                </ul>

            </header>
            {isOpen && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} setIsLogin={setIsLogin} /></Modal>}
        </>
    );
};

export default Navbar;
