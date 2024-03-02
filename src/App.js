import React, { useState } from 'react';
import './App.css';

const VatHistory = ({ history, onClearHistory }) => {
  return (
    <div className="history">
      <h2>Calculation History</h2>
      <button onClick={onClearHistory} className="clear-button">
        Clear History
      </button>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.amount} + {item.vatRate}% = {item.result.totalAmount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [amount, setAmount] = useState('');
  const [vatRate, setVatRate] = useState(20);
  const [result, setResult] = useState({
    vatRemoveAmount: 0,
    vatAddAmount: 0,
    totalAmount: 0,
  });
  const [history, setHistory] = useState([]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleVatRateChange = (e) => {
    setVatRate(e.target.value);
  };

  const calculateVat = () => {
    const parsedAmount = parseFloat(amount);
    const parsedVatRate = parseFloat(vatRate);

    if (!isNaN(parsedAmount) && !isNaN(parsedVatRate)) {
      const calculatedVat = (parsedAmount * parsedVatRate) / 100;
      const vatRemoveAmount = parsedAmount - calculatedVat;
      const totalAmount = parsedAmount + calculatedVat;

      setResult({
        vatRemoveAmount: vatRemoveAmount,
        vatAddAmount: calculatedVat,
        totalAmount: totalAmount,
      });

      setHistory([
        ...history,
        {
          amount: parsedAmount,
          vatRate: parsedVatRate,
          result: {
            vatRemoveAmount: vatRemoveAmount,
            vatAddAmount: calculatedVat,
            totalAmount: totalAmount,
          },
        },
      ]);
    } else {
      setResult({
        vatRemoveAmount: 0,
        vatAddAmount: 0,
        totalAmount: 0,
      });
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="App">
      <h1>VAT Calculator</h1>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div>
        <label htmlFor="vatRate">VAT Rate (%):</label>
        <input
          type="number"
          id="vatRate"
          value={vatRate}
          onChange={handleVatRateChange}
        />
      </div>
      <button onClick={calculateVat}>Calculate</button>
      <div className="result">
        <h2>Result:</h2>
        <p>VAT Remove Amount: {result.vatRemoveAmount.toFixed(2)}</p>
        <p>VAT Add Amount: {result.vatAddAmount.toFixed(2)}</p>
        <p>Total Amount: {result.totalAmount.toFixed(2)}</p>
      </div>
      <VatHistory history={history} onClearHistory={clearHistory} />
    </div>
  );
}

export default App;