"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

const CurrencyPage = () => {
    const [data, setData] = useState<currencyProps>({
        base_currency: "",
        base_currency_date: "",
        exchange_rates: [
            {
                exchange_rate_buy: "",
                currency: "",
            },
            {
                currency: "",
                exchange_rate_buy: "",
            },
        ],
    });

    const fetchData = async () => {
        const options = {
            method: "GET",
            url: "https://apidojo-booking-v1.p.rapidapi.com/currency/get-exchange-rates",
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
            if (response.data) {
                setData(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const { base_currency, base_currency_date, exchange_rates } = data;

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main>
            <h1>CurrencyPage</h1>
            <h2>Current Base Currency: {data.base_currency}</h2>
            <h3>last updated: {data.base_currency_date}</h3>
            {exchange_rates.map((rate, index) => {
                const { exchange_rate_buy, currency } = rate;

                return (
                    <div key={index}>
                        <p>
                            buy for {exchange_rate_buy} {currency}
                        </p>
                    </div>
                );
            })}
            <button>
                <Link href="/">Back Home</Link>
            </button>
        </main>
    );
};

export default CurrencyPage;
