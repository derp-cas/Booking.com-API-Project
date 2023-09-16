"use client";

import React, { PropsWithChildren, useContext, useEffect } from "react";
import axios from "axios";

interface AppContextProps {
    fetchData: (url: string) => Promise<any>;
}

const defValue: AppContextProps = {
    fetchData: () => Promise.resolve({}),
};

const AppContext = React.createContext<AppContextProps>(defValue);

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const fetchData = async (url: string) => {
        const options = {
            method: "GET",
            url: url,
            params: {
                base_currency: "USD",
                languagecode: "en-us",
            },
            headers: {
                "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
                "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    return (
        <AppContext.Provider value={{ fetchData }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
