import React, { useEffect, useState } from 'react'
import ExchangeRate from './ExchangeRate'
import axios from 'axios'

const CurrencyConverter = () => {

    const currencies = ['USDT', 'BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
    const [chosenPrimaryCurrency, setchosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setchosenSecondaryCurrency] = useState('USDT')
    const [amount, setAmount] = useState(1)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [result, setResult] = useState(0)

    // console.log(exchangeRate)



    const convert = () => {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: { from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency },
            headers: {
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
            }
        };

        axios.request(options).then((response) => {
            console.log(response.data)
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
        }).catch((error) => {
            console.error(error);
        });
    }


    return (
        <div className='currency-converter'>
            <h2>Currency Converter</h2>
            <div className='input-box'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label className='currency-label'>Primary Currency :</label>
                                <input
                                    type="number"
                                    name='currency-amount-1'
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                />
                            </td>
                            <td>
                                <select
                                    name="currency-option-1"
                                    value={chosenPrimaryCurrency}
                                    className="currency-options"
                                    onChange={e => setchosenPrimaryCurrency(e.target.value)}
                                >
                                    {currencies.map((currency, index) => {
                                        return (
                                            <option key={index}>{currency}</option>)
                                    })}

                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className='currency-label'>Secondary Currency :</label>
                                <input
                                    type="number"
                                    name='currency-amount-2'
                                    value={result}
                                    disabled
                                />
                            </td>
                            <td>
                                <select
                                    name="currency-option-2"
                                    value={chosenSecondaryCurrency}
                                    className="currency-options"
                                    onChange={e => setchosenSecondaryCurrency(e.target.value)}
                                >
                                    {currencies.map((currency, index) => {
                                        return (
                                            <option key={index}>{currency}</option>)
                                    })}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button id='convert-button' onClick={convert}>Convert</button>
            </div>

            <ExchangeRate
                exchangeRate={exchangeRate}
                chosenPrimaryCurrency={chosenPrimaryCurrency}
                chosenSecondaryCurrency={chosenSecondaryCurrency}
            />
        </div>
    )
}

export default CurrencyConverter