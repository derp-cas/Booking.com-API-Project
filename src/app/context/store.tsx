"use client";

import React, { PropsWithChildren, useContext, useEffect } from "react";
import axios from "axios";

interface AppContextProps {}

const defValue: AppContextProps = {};

const AppContext = React.createContext<AppContextProps>(defValue);

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
