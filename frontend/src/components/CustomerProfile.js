import React, { useState, useEffect } from 'react';
import './CustomerProfile.css'; // Import your CSS file

const CustomerProfile = ({ customer, setView }) => {
  const [profileData, setProfileData] = useState(customer);

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await fetch(`/customers/${customer.id}/`);
      const data = await response.json();
      setProfileData(data);
    };
    fetchCustomer();
  }, [customer]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      await fetch(`/customers/${customer.id}/`, { method: 'DELETE' });
      setView('list');
    }
  };

  const handleUpdate = async () => {
    setView('form');
    // Optionally populate form with existing data for editing
  };

  return (
    <div className="profile-container">
      <h2>{profileData.firstName} {profileData.lastName}</h2>
      <p>Phone: {profileData.phone}</p>
      <p>Email: {profileData.email}</p>
      <h3>Addresses:</h3>
      <ul>
        {profileData.addresses.map((address, index) => (
          <li key={index}>
            {address.street}, {address.city}, {address.state} - {address.zip}
            {address.isPrimary && ' (Primary)'}
          </li>
        ))}
      </ul>
      <button onClick={handleUpdate}>Update Customer</button>
      <button onClick={handleDelete}>Delete Customer</button>
      <button onClick={() => setView('list')}>Back to List</button>
    </div>
  );
};

export default CustomerProfile;
