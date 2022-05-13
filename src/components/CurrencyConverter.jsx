import React, { useState } from 'react'
import ExchangeRate from './ExchangeRate'
import axios from 'axios'

const CurrencyConverter = () => {

    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
    const [chosenPrimaryCurrency, setchosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setchosenSecondaryCurrency] = useState('BTC')
    const [amount, setAmount] = useState(1)

    console.log(chosenPrimaryCurrency)

    const convert = () => {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: { from_currency: `BTC`, function: 'CURRENCY_EXCHANGE_RATE', to_currency: `USD` },
            headers: {
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
                'X-RapidAPI-Key': 'fca9dbc51amshc6a3431a63459bbp1c3456jsn5b8eb466aa22'
            }
        };

        axios.request(options).then((response) => {
            console.log(response.data);
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
                            <td>Primary Currency</td>
                            <td>
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
                            <td>Secondary Currency</td>
                            <td>
                                <input
                                    type="number"
                                    name='currency-amount-2'
                                    value={""}
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

            <ExchangeRate />
        </div>
    )
}

export default CurrencyConverter