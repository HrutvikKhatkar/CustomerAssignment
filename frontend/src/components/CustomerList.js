import React, { useState, useEffect } from 'react';
import './CustomerList.css'; // Import your CSS file

const CustomerList = ({ setView, setSelectedCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    city: '',
    state: '',
    zip: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams(filters).toString();
        const response = await fetch(`http://localhost:5000/customers/?${query}`);
        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        } else {
          setError('Error fetching customers');
        }
      } catch (error) {
        setError('Network Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({ name: '', city: '', state: '', zip: '' });
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer); // Pass selected customer data
    setView('form'); // Switch to form view
  };

  const handleDelete = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        const response = await fetch(`http://localhost:5000/customers/${customerId}/`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setCustomers(customers.filter((customer) => customer.id !== customerId));
        } else {
          setError('Error deleting customer');
        }
      } catch (error) {
        setError('Network Error: ' + error.message);
      }
    }
  };

  return (
    <div className="list-container">
      <button className="add-button" onClick={() => setView('form')}>Add New Customer</button>

      <h2>Filter Customers</h2>
      <div className="filter-group">
        <label htmlFor="filterName">Name:</label>
        <input
          type="text"
          id="filterName"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="filterCity">City:</label>
        <input
          type="text"
          id="filterCity"
          name="city"
          value={filters.city}
          onChange={handleFilterChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="filterState">State:</label>
        <input
          type="text"
          id="filterState"
          name="state"
          value={filters.state}
          onChange={handleFilterChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="filterZip">ZIP Code:</label>
        <input
          type="text"
          id="filterZip"
          name="zip"
          value={filters.zip}
          onChange={handleFilterChange}
        />
      </div>
      <button className="clear-filters-button" onClick={clearFilters}>Clear Filters</button>

      <h2>Customer List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="customer-cards">
          {customers.length === 0 ? (
            <p>No customers found</p>
          ) : (
            customers.map((customer) => (
              <div className="customer-card" key={customer.id}>
                <h3>{customer.firstName} {customer.lastName}</h3>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <h4>Addresses:</h4>
                <ul>
                  {(customer.addresses || []).map((address, index) => (
                    <li key={index}>
                      {address.street}, {address.city}, {address.state} - {address.zip} {address.isPrimary ? '(Primary)' : ''}
                    </li>
                  ))}
                </ul>
                <div className="card-buttons">
                  <button className="edit-button" onClick={() => handleEdit(customer)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(customer.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
