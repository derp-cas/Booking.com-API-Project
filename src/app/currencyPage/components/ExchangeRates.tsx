import React from "react";
import { IExchangeRates } from "../types";

const ExchangeRates: React.FC<IExchangeRates> = ({ exchange_rates }) => {
    return (
        <div className="currency-page__exchange-rates">
            {exchange_rates
                ? exchange_rates.map((rate, index) => {
                      const { exchange_rate_buy, currency } = rate;
                      const buyRate = parseFloat(exchange_rate_buy);

                      return (
                          <div
                              key={index}
                              className="currency-page__exchange-rate"
                          >
                              <p className="currency-page__rate">
                                  Buy for {buyRate.toFixed(2)} {currency}
                              </p>
                          </div>
                      );
                  })
                : "Sorry, the currency is not available. Please try to reload the page"}
        </div>
    );
};

export default ExchangeRates;
