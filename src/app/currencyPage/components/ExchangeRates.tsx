import React from "react";
import { IExchangeRates } from "../types";

const ExchangeRates: React.FC<IExchangeRates> = ({ exchange_rates }) => {
    return (
        <div className="currency-page__exchange-rates">
            {exchange_rates.map((rate, index) => {
                const { exchange_rate_buy, currency } = rate;

                return (
                    <div key={index} className="currency-page__exchange-rate">
                        <p className="currency-page__rate">
                            Buy for {exchange_rate_buy} {currency}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default ExchangeRates;
