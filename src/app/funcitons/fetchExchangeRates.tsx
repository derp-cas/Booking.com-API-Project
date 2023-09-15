import axios from "axios";
import { useEffect } from "react";

const fetchData = async (url: string, apikey: string | undefined) => {
    const options = {
        method: "GET",
        url: url,
        params: {
            base_currency: "USD",
            languagecode: "en-us",
        },
        headers: {
            "X-RapidAPI-Key": apikey,
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

export default fetchData;
