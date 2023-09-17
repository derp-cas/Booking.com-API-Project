"use client";
import Link from "next/link";
import React, { useEffect, useState, Suspense } from "react";
import { useGlobalContext } from "../context/store";
import Loading from "../loading";
import { styled } from "styled-components";

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
    const [baseCurrency, setBaseCurrency] = useState("");
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

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBaseCurrency(e.target.value);
    };

    useEffect(() => {
        const fetchDataAndSetData = async () => {
            try {
                const fetchedData = await fetchData(
                    "https://apidojo-booking-v1.p.rapidapi.com/currency/get-exchange-rates",
                    baseCurrency
                );
                setData(fetchedData);
                setBaseCurrency(data.base_currency);
                // console.log(data);
                // console.log(baseCurrency);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDataAndSetData();
    }, [baseCurrency]);

    return (
        <StyledCurrencyPage>
            <h1 className="currency-page__title">CurrencyPage</h1>
            <div className="currency-page__content">
                <Suspense fallback={<Loading />}>
                    <h2 className="currency-page__base-currency">
                        Current Base Currency: {base_currency}
                    </h2>
                    <form className="currency-page__base-currency__form">
                        <label htmlFor="currency" className="form__label">
                            Change base Currency:
                        </label>
                        <select
                            name="currency"
                            id="currency"
                            className="form__select"
                            value={baseCurrency}
                            onChange={(e) => handleCurrencyChange(e)}
                        >
                            {exchange_rates.map((rate, index) => {
                                const { currency } = rate;

                                return (
                                    <option value={currency} key={index}>
                                        {currency}
                                    </option>
                                );
                            })}
                        </select>
                    </form>
                    <h3 className="currency-page__base-currency-date">
                        Last Updated: {base_currency_date}
                    </h3>
                    <div className="currency-page__exchange-rates">
                        {exchange_rates.map((rate, index) => {
                            const { exchange_rate_buy, currency } = rate;

                            return (
                                <div
                                    key={index}
                                    className="currency-page__exchange-rate"
                                >
                                    <p className="currency-page__rate">
                                        Buy for {exchange_rate_buy} {currency}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </Suspense>
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
