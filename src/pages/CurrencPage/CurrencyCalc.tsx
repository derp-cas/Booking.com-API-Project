import { log } from "console";
import React, { useEffect, useState } from "react";
import Loading from "../../assets/Loading";
import useFetch from "../../hooks/use-fetch";

const CurrencyCalc = () => {
    const [firstCurrency, setFirstCurrency] = useState("USD");
    const [secondCurrency, setSecondCurrency] = useState("EUR");
    const [result, setResult] = useState("");
    const { data, isLoading, refetch } = useFetch(firstCurrency);
    const { base_currency, exchange_rates } = data || {};
    const [amount, setAmount] = useState("");

    let exchangeRatesWithBaseCurrency: Array<{
        exchange_rate_buy: string;
        currency: string | undefined;
    }> = [];

    if (exchange_rates) {
        // Create a copy of exchange rates and add the base currency to it
        exchangeRatesWithBaseCurrency = [
            {
                currency: base_currency,
                exchange_rate_buy: "1.0",
            },
            ...exchange_rates,
        ];
    }
    //move to onchange
    useEffect(() => {
        // Check if firstCurrency is not empty to prevent unnecessary fetch
        firstCurrency && refetch();
    }, [firstCurrency]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Find the exchange rate for the selected secondCurrency
        const selectedRate = exchangeRatesWithBaseCurrency.find(
            (rate) => rate.currency === secondCurrency
        );

        if (selectedRate) {
            // Calculate the exchanged amount
            const exchangedAmount = (
                parseFloat(amount) * parseFloat(selectedRate.exchange_rate_buy)
            ).toFixed(2);

            setResult(exchangedAmount);
            // Display the result or perform further actions
            console.log(
                `Exchanged Amount: ${exchangedAmount} ${secondCurrency}`
            );
        } else {
            console.error(`Exchange rate for ${secondCurrency} not found.`);
        }
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
                        min="1.00"
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
            {!!result && (
                <h1>
                    {amount} {firstCurrency} = {result} {secondCurrency}
                </h1>
            )}
        </>
    );
};

export default CurrencyCalc;
