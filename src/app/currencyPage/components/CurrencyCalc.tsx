import useFetch from "@/app/hooks/use-fetch";
import React, { useState } from "react";

const CurrencyCalc = () => {
    const { data, isLoading } = useFetch("EUR");
    const { base_currency, exchange_rates } = data || {};
    const [amount, setAmount] = useState("");
    const [firstCurrency, setFirstCurrency] = useState("");
    const [secondCurrency, setSecondCurrency] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(amount + " " + firstCurrency + " " + secondCurrency);
        const { data } = useFetch(firstCurrency);
    };

    return (
        <form
            className="currency-page__base-currency__form"
            onSubmit={handleSubmit}
        >
            <label htmlFor="currency" className="form__label">
                Amount:
            </label>
            <input
                className="form__input"
                name="amount"
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            ></input>
            <label htmlFor="currency" className="form__label">
                From:
            </label>
            {exchange_rates ? (
                <select
                    name="currency"
                    id="currency"
                    className="form__select"
                    value={firstCurrency}
                    onChange={(e) => setFirstCurrency(e.target.value)}
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
            <label htmlFor="currency" className="form__label">
                To:
            </label>
            {exchange_rates ? (
                <select
                    name="currency"
                    id="currency"
                    className="form__select"
                    value={secondCurrency}
                    onChange={(e) => setSecondCurrency(e.target.value)}
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
            <button className="submit__button" type="submit">
                Calculate
            </button>
        </form>
    );
};

export default CurrencyCalc;
