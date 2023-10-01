import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { log } from "console";
import React from "react";

interface currencyProps {
    base_currency: string;
    base_currency_date: string;
    exchange_rates: [
        {
            exchange_rate_buy: string;
            currency: string;
        },
        {
            currency: string;
            exchange_rate_buy: string;
        }
    ];
}

const useFetch = (base_currency: string = "USD") => {
    return useQuery({
        queryFn: async () => {
            console.log("useFetch fired");

            const options = {
                method: "GET",
                url: "https://apidojo-booking-v1.p.rapidapi.com/currency/get-exchange-rates",
                params: {
                    base_currency: base_currency,
                    languagecode: "en-us",
                },
                headers: {
                    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
                    "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
                },
            };

            const { data } = await axios.request(options);
            return data as currencyProps;
        },
    });
};

export default useFetch;
