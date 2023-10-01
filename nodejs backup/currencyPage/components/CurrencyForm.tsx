"use client";
import React, { useState } from "react";
import { IExchangeRates } from "../types";

const CurrencyForm: React.FC<IExchangeRates> = ({ exchange_rates }) => {
    const [baseCurrency, setBaseCurrency] = useState("");

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBaseCurrency(e.target.value);
    };

    return (
        <form className="currency-page__base-currency__form">
            <label htmlFor="currency" className="form__label">
                Change base Currency:
            </label>
            {exchange_rates ? (
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
            ) : (
                "Sorry, there was an error loading the exchange rates"
            )}
        </form>
    );
};

export default CurrencyForm;
