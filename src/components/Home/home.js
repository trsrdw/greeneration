import React from "react";
import './home.scss';
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home-wrapper">
            <div className="section section-one">
                <div className="main-cover">
                    <h1>Empowering <br />Sustainable Living</h1>
                    <h5>We empower individuals and businesses to make sustainable choices and create a better future for our planet.</h5>
                </div>
                <div className="main-button">
                    <Link className="button-primary" as={Link} to="/wastelist">Manage Waste</Link>
                </div>
            </div>

            <div className="more-content">
                test
            </div>
        </div>
    )
}