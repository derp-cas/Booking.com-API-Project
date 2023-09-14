"use client";

import React, { PropsWithChildren, useContext, useEffect } from "react";
import axios from "axios";

interface AppContextProps {}

const defValue: AppContextProps = {};

const AppContext = React.createContext<AppContextProps>(defValue);

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const fetchData = async () => {
        const options = {
            method: "GET",
            url: "https://apidojo-booking-v1.p.rapidapi.com/currency/get-exchange-rates",
            params: {
                base_currency: "USD",
                languagecode: "en-us",
            },
            headers: {
                "X-RapidAPI-Key": process.env.API_KEY,
                "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
