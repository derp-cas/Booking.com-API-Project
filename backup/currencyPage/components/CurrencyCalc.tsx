import Loading from "@/app/assets/loading";
import useFetch from "@/app/hooks/use-fetch";
import { log } from "console";
import React, { useEffect, useState } from "react";

const CurrencyCalc = () => {
    const [firstCurrency, setFirstCurrency] = useState("USD");
    const [secondCurrency, setSecondCurrency] = useState("EUR");
    const { data, isLoading } = useFetch(firstCurrency);
    const { base_currency, exchange_rates } = data || {};
    const [amount, setAmount] = useState("");

    useEffect(() => {
        console.log(amount + " " + firstCurrency + " " + secondCurrency);
        console.log(base_currency);
    }, [firstCurrency]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <h1>Current Base Currency : {base_currency}</h1>
            {exchange_rates ? (
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
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    ></input>
                    <label htmlFor="currency" className="form__label">
                        From:
                    </label>

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

                    <label htmlFor="currency" className="form__label">
                        To:
                    </label>

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

                    <button className="submit__button" type="submit">
                        Calculate
                    </button>
                </form>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default CurrencyCalc;
