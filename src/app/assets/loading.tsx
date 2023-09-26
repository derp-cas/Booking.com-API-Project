import React from "react";
import "./loading.css";

const Loading = () => {
    return (
        <div className="loader">
            <div className="spinner">
                <div className="spinner-inner"></div>
            </div>
        </div>
    );
};

export default Loading;
