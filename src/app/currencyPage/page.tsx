"use client";

import Link from "next/link";
import React, { useEffect, useState, Suspense } from "react";
import { useGlobalContext } from "../context/store";
import Loading from "../loading";

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
    const { fetchData } = useGlobalContext();
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
    const { base_currency, base_currency_date, exchange_rates } = data;

    useEffect(() => {
        const fetchDataAndSetData = async () => {
            try {
                const fetchedData = await fetchData(
                    "https://apidojo-booking-v1.p.rapidapi.com/currency/get-exchange-rates"
                );
                setData(fetchedData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDataAndSetData();
    }, []);

    return (
        <main>
            <h1>CurrencyPage</h1>
            <Suspense fallback={<Loading />}>
                <h2>Current Base Currency: {base_currency}</h2>
                <h3>last updated: {base_currency_date}</h3>
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
            </Suspense>
            <button>
                <Link href="/">Back Home</Link>
            </button>
        </main>
    );
};

export default CurrencyPage;
