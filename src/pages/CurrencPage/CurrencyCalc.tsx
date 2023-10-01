import { log } from "console";
import React, { useEffect, useState } from "react";

import Loading from "../../assets/Loading";
import useFetch from "../../hooks/use-fetch";

interface IExchangeRates {
    exchange_rates:
        | [
              {
                  exchange_rate_buy: string;
                  currency: string;
              },
              {
                  currency: string;
                  exchange_rate_buy: string;
              }
          ]
        | never;
}

const CurrencyCalc = () => {
    const [firstCurrency, setFirstCurrency] = useState("USD");
    const [secondCurrency, setSecondCurrency] = useState("EUR");
    const { data, isLoading, refetch } = useFetch(firstCurrency);
    const { base_currency, exchange_rates } = data || {};
    const [amount, setAmount] = useState("");

    let exchangeRatesWithBaseCurrency: IExchangeRates = [];

    if (exchange_rates) {
        // Create a copy of exchange rates and add the base currency to it
        exchangeRatesWithBaseCurrency = [
            {
                currency: base_currency,
                exchange_rate_buy: "1.0", // Set the rate to 1 for the base currency
            },
            ...exchange_rates,
        ];
    }

    useEffect(() => {
        // Check if firstCurrency is not empty to prevent unnecessary fetch
        firstCurrency && refetch();
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
                        value={base_currency}
                        onChange={(e) => setFirstCurrency(e.target.value)}
                    >
                        {exchangeRatesWithBaseCurrency.map((rate, index) => {
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
