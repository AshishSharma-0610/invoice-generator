import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import Invoice from './components/Invoice';
import './App.css';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleFormSubmit = (data) => {
    setInvoiceData(data);
  };

  return (
    <div className="App">
      <h1>Invoice Generator</h1>
      {!invoiceData ? (
        <InvoiceForm onSubmit={handleFormSubmit} />
      ) : (
        <Invoice data={invoiceData} />
      )}
    </div>
  );
}

export default App;