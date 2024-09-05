import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import CustomerProfile from './components/CustomerProfile';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
            <li>
              <Link to="/add-customer">Add Customer</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Welcome to Customer Management</h1>} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/add-customer" element={<CustomerForm />} />
          <Route path="/customer/:id" element={<CustomerProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
