import React from "react";
import { styled } from "styled-components";

const Loading = () => {
    return (
        <StyledLoader>
            <div className="spinner">
                <div className="spinner-inner"></div>
            </div>
        </StyledLoader>
    );
};

export const StyledLoader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .spinner {
        border: 6px solid #f3f3f3;
        border-top: 6px solid #3498db;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 2s linear infinite;
    }

    .spinner-inner {
        width: 80%;
        height: 80%;
        border-radius: 50%;
        border: 4px solid transparent;
        border-top: 4px solid #3498db;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default Loading;