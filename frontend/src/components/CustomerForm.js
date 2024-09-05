import React, { useState, useEffect } from 'react';
import './CustomerForm.css'; // Import your CSS file

const CustomerForm = ({ selectedCustomer, setSelectedCustomer, setView }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    addresses: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCustomer) {
      setFormData({
        firstName: selectedCustomer.firstName,
        lastName: selectedCustomer.lastName,
        phone: selectedCustomer.phone,
        email: selectedCustomer.email,
        addresses: selectedCustomer.addresses || []
      });
    }
  }, [selectedCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const newAddresses = [...formData.addresses];
    newAddresses[index] = { ...newAddresses[index], [name]: value };
    setFormData({ ...formData, addresses: newAddresses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const method = selectedCustomer ? 'PUT' : 'POST';
      const url = selectedCustomer
        ? `http://localhost:5000/customers/${selectedCustomer.id}/`
        : `http://localhost:5000/customers/`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setView('list'); // Switch back to the customer list view
        setSelectedCustomer(null); // Clear the selected customer
      } else {
        setError('Error saving customer');
      }
    } catch (error) {
      setError('Network Error: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>{selectedCustomer ? 'Edit Customer' : 'Add New Customer'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <h3>Addresses</h3>
        {formData.addresses.map((address, index) => (
          <div key={index}>
            <h4>Address {index + 1}</h4>
            <div>
              <label htmlFor={`street-${index}`}>Street:</label>
              <input
                type="text"
                id={`street-${index}`}
                name="street"
                value={address.street || ''}
                onChange={(e) => handleAddressChange(index, e)}
              />
            </div>
            <div>
              <label htmlFor={`city-${index}`}>City:</label>
              <input
                type="text"
                id={`city-${index}`}
                name="city"
                value={address.city || ''}
                onChange={(e) => handleAddressChange(index, e)}
              />
            </div>
            <div>
              <label htmlFor={`state-${index}`}>State:</label>
              <input
                type="text"
                id={`state-${index}`}
                name="state"
                value={address.state || ''}
                onChange={(e) => handleAddressChange(index, e)}
              />
            </div>
            <div>
              <label htmlFor={`zip-${index}`}>ZIP Code:</label>
              <input
                type="text"
                id={`zip-${index}`}
                name="zip"
                value={address.zip || ''}
                onChange={(e) => handleAddressChange(index, e)}
              />
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="isPrimary"
                  checked={address.isPrimary || false}
                  onChange={(e) => handleAddressChange(index, e)}
                />
                Primary Address
              </label>
            </div>
          </div>
        ))}

        <button type="submit">{selectedCustomer ? 'Update Customer' : 'Add Customer'}</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default CustomerForm;
