// VatHistory.js
import React from 'react';

const VatHistory = ({ history }) => {
  return (
    <div className="history">
      <h2>Calculation History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.amount} + {item.vatRate}% = {item.result.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VatHistory;
