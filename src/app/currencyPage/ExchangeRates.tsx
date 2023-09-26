import React from "react";

interface IExchangeRates {
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
