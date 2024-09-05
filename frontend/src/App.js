import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
const App = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <div>
      {view === 'list' ? (
        <CustomerList setView={setView} setSelectedCustomer={setSelectedCustomer} />
      ) : (
        <CustomerForm
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          setView={setView}
        />
      )}
    </div>
  );
};

export default App;
