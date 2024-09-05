import React, { useState, useEffect } from 'react';
import './CustomerProfile.css'; 
import { useParams } from 'react-router-dom';

const CustomerProfile = () => {
  const { id } = useParams(); // Extract the id from the URL
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:5000/customers/${id}`);
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchCustomer();
  }, [id]);

  if (!customer) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{customer.firstName} {customer.lastName}</h2>
      <p>Phone: {customer.phone}</p>
      <p>Email: {customer.email}</p>
      <ul>
        {customer.addresses.map((address, index) => (
          <li key={index}>
            {address.street}, {address.city}, {address.state} - {address.zip} {address.isPrimary ? '(Primary)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerProfile;

