import React, {useEffect, useRef, useState} from 'react';
import logo from './images/logo.svg';
import './Header.css';
import PrimaryButton from '../../common/PrimaryButton/PrimaryButton'
import SecondaryButton from "../../common/SecondaryButton/SecondaryButton";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../../services/UserService";
import {useDispatch, useSelector} from "react-redux";
import {logout, RootState} from "../../../store";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.authReducer);
    const containerRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const line1Ref = useRef<HTMLDivElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const line3Ref = useRef<HTMLDivElement>(null);
    const headerDivRef = useRef<HTMLDivElement>(null);
    let clicked = false;

    const burgerExpand = () => {
        const container = containerRef.current;
        if (container) {
            if (container.children.length === 0) {
                hamburgerToCross();
                clicked = true;
            } else {
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
                crossToHamburger();
                clicked = false;
            }
        }
    };

    const hamburgerToCross = () => {
        const container = containerRef.current;
        const nav = navRef.current;
        const line1 = line1Ref.current;
        const line2 = line2Ref.current;
        const line3 = line3Ref.current;
        const hamburger = hamburgerRef.current;

        if (container && nav && line1 && line2 && line3 && hamburger) {
            nav.style.display = "flex";
            container.appendChild(nav);
            container.style.display = "block";
            nav.style.flexDirection = "column";
            nav.style.alignItems = "end";
            container.style.padding = "0 15%";
            line2.style.width = "0";
            line1.style.transform = "rotate(45deg)";
            line3.style.transform = "rotate(-45deg)";
            line1.style.position = "absolute";
            line3.style.position = "absolute";
            line1.style.top = "24px";
            line3.style.bottom = "24px";
            hamburger.style.position = "relative";
        }
    };

    const crossToHamburger = () => {
        const line1 = line1Ref.current;
        const line2 = line2Ref.current;
        const line3 = line3Ref.current;

        if (line1 && line2 && line3) {
            line3.style.position = "static";
            line1.style.position = "static";
            line2.style.transition = "0.5s";
            line1.style.transform = "rotate(0)";
            line3.style.transform = "rotate(0)";
            line2.style.width = "30px";
        }
    };

    const checkScreenWidth = () => {
        const header = headerDivRef.current;
        const nav = navRef.current;
        const width = window.innerWidth;

        if (header && nav) {
            if (width > 1100) {
                header.appendChild(nav);
                nav.style.display = "flex";
                nav.style.flexDirection = "row";
                nav.style.alignItems = "center";
                clicked = false;
                crossToHamburger();
            } else if (width <= 1100 && !clicked) {
                nav.style.display = "none";
            }
        }
    };

    useEffect(() => {
        window.addEventListener("resize", checkScreenWidth);
        checkScreenWidth();
        return () => {
            window.removeEventListener("resize", checkScreenWidth);
        };
    }, [checkScreenWidth]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        navigate('register');
    }

    return (
        <header>
            <div id="header" ref={headerDivRef}>
                <img src={logo} alt="logo" />
                <nav ref={navRef}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/catalog">Destinations</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                    </ul>
                    {!auth.isAuth && <div className="signButtons">
                        <PrimaryButton link={"/login"} name={"Login"}/>
                        <SecondaryButton link={"/register"} name={"Register"}/>
                    </div>}
                    {auth.isAuth &&
                        <button className={"logout"} onClick={handleLogout}>Logout</button>
                    }
                </nav>
                <div className="hamburger" ref={hamburgerRef} onClick={burgerExpand}>
                    <div id="line1" ref={line1Ref}></div>
                    <div id="line2" ref={line2Ref}></div>
                    <div id="line3" ref={line3Ref}></div>
                </div>
            </div>
            <div id="container" ref={containerRef}></div>
        </header>
    );
};

export default Header;