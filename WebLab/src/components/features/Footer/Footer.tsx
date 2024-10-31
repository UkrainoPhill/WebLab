import React from 'react';
import "./Footer.css";
import logo from './images/logo.svg';
import twitter from './images/Twitter.svg';
import facebook from './images/Facebook.svg'
import instagram from './images/Instagram.svg';
import linkedin from './images/LinkedIn.svg';
import youtube from './images/YouTube.svg';

const Footer = () => {
    return (
        <footer>
            <div className="footerHead">
                <img src={logo} alt="logo"/>
                <p>©2020 Thousand Sunny. All rights reserved</p>
            </div>
            <hr/>
            <div className="footerBot">
                <ul>
                    <li>
                        <a href="https://www.x.com">
                            <img src={twitter} alt="Twitter"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com">
                            <img src={facebook} alt="Facebook"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com">
                            <img src={instagram} alt="Instagram"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com">
                            <img src={linkedin} alt="LinkedIn"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com">
                            <img src={youtube} alt="YouTube"/>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;