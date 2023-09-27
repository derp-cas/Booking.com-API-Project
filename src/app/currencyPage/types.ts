export interface IExchangeRates {
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
        | undefined;
}
