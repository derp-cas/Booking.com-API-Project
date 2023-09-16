import axios from "axios";
import { useEffect } from "react";

const fetchExchangeRates = async (url: string) => {
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

export default fetchExchangeRates;
