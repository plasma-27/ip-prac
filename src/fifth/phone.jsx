// src/fifth/phone.jsx
import React, { useEffect, useState } from 'react';
import './phone.css';

const PhoneDirectory = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: '', phone: '' });

    // Fetch contacts from the backend
    useEffect(() => {
        fetch('http://localhost:5001/api/contacts')
            .then((response) => response.json())
            .then((data) => setContacts(data))
            .catch((error) => console.error('Error fetching contacts:', error));
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add new contact to the backend
        fetch('http://localhost:5001/api/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContact),
        })
            .then((response) => response.json())
            .then((data) => {
                setContacts([...contacts, data]); // Add the new contact to the state
                setNewContact({ name: '', phone: '' }); // Reset form
            })
            .catch((error) => console.error('Error adding contact:', error));
    };

    return (
        <div className="phone-directory-container">
            <h1>Personal Phone Directory</h1>

            <form onSubmit={handleSubmit} className="contact-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newContact.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={newContact.phone}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Contact</button>
            </form>

            <h2>Contacts List</h2>
            <ul className="contacts-list">
                {contacts.map((contact, index) => (
                    <li key={index}>
                        {contact.name} - {contact.phone}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PhoneDirectory;
