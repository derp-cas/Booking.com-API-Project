import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainPage = () => {
    return (
        <StyledMainPage>
            <h1 className="main-title">
                Welcome To{" "}
                <span className="main-title__booking">Booking.com</span>{" "}
                MultiTool
            </h1>
            <section className="section">
                <h2 className="section-title">
                    Chose one of the following options
                </h2>
                <div className="button-container">
                    <Link to="/currencyPage" className="button__link">
                        Currency Page
                    </Link>
                </div>
            </section>
        </StyledMainPage>
    );
};

export const StyledMainPage = styled.main`
    text-align: center;

    .main-title {
        margin-top: 20vh;
        font-family: "YourFont", sans-serif;
    }

    .main-title__booking {
        color: #0077b6;
    }

    .section {
        text-align: center;
        margin-top: 20px;
        background-color: #0077b6;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        margin: 0 auto;
    }

    .section-title {
        font-family: "YourFont", sans-serif;
        font-weight: bold;
        color: #333;
    }

    .button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    .button {
        padding: 10px 20px;
        margin: 10px 0;
        background-color: #f0f0f0;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .button:hover {
        background-color: #2da3e2;
        color: white;
    }
`;

export default MainPage;
