"use client";
import Link from "next/link";
import React, { useState, Suspense } from "react";
import Loading from "../assets/loading";
import { styled } from "styled-components";
import useFetch from "../hooks/use-fetch";
import ExchangeRates from "./components/ExchangeRates";
import CurrencyForm from "./components/CurrencyForm";

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
    const [baseCurrency, setBaseCurrency] = useState("");
    const { data, isLoading } = useFetch();
    const [dataState, setData] = useState<currencyProps>({
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
    const { base_currency, base_currency_date, exchange_rates } = data || {};

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBaseCurrency(e.target.value);
    };

    return (
        <StyledCurrencyPage>
            <h1 className="currency-page__title">CurrencyPage</h1>
            <div className="currency-page__content">
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <h2 className="currency-page__base-currency">
                            Current Base Currency: {base_currency}
                        </h2>
                        <CurrencyForm exchange_rates={exchange_rates} />
                        <h3 className="currency-page__base-currency-date">
                            Last Updated: {base_currency_date}
                        </h3>
                        {exchange_rates ? (
                            <ExchangeRates exchange_rates={exchange_rates} />
                        ) : (
                            "Sorry, there was an error loading the exchange rates"
                        )}
                    </>
                )}
                <button className="currency-page__back-button">
                    <Link href="/" className="currency-page__back-link">
                        Back Home
                    </Link>
                </button>
            </div>
        </StyledCurrencyPage>
    );
};

export const StyledCurrencyPage = styled.main`
    text-align: center;
    background-color: #f0f0f0;
    padding: 20px;

    .currency-page__title {
        margin-top: 5vh;
        font-family: "YourFont", sans-serif;
    }

    .currency-page__content {
        margin: 20px auto;
        max-width: 800px;
    }

    .currency-page__base-currency {
        font-weight: bold;
        color: #333;
    }

    .currency-page__base-currency-date {
        color: #333;
    }

    .currency-page__exchange-rates {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }

    .currency-page__exchange-rate {
        background-color: #0077b6;
        border-radius: 8px;
        padding: 10px;
    }

    .currency-page__rate {
        color: white;
    }

    .currency-page__back-button {
        margin-top: 20px;
        background-color: #f0f0f0;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .currency-page__back-button:hover {
        background-color: #0077b6;
        color: white;
    }

    .currency-page__back-link {
        text-decoration: none;
        color: #333;
    }
`;

export default CurrencyPage;
