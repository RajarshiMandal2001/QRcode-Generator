import React from "react";
import { Link } from "react-router-dom";
import "../utils/introStyle.css";

const Introduction=()=>{
    return (
        <div>
            <div className="intro-container">
                {/* content will be filled in css */}
                <div className="intro-logo">
                    <div  alt="intrologo" className="intro-logo-img"></div>
                </div>
                <div className="intro-heading"></div>
                <div className="intro-intro"></div>
                <div>
                    <Link to="/fillform">
                        <button className="intro-button">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Introduction;