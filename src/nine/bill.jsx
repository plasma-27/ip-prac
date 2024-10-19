// src/nine/bill.jsx
import React, { useState } from 'react';
import './bill.css';

const BillCalculator = () => {
    const [items, setItems] = useState([{ name: '', quantity: 1 }]);
    const [totalCost, setTotalCost] = useState(0);

    // Sample item prices
    const itemPrices = {
        apple: 1.0,
        banana: 0.5,
        orange: 0.75,
        milk: 1.5,
        bread: 2.0,
    };

    const handleItemChange = (index, event) => {
        const { name, value } = event.target;
        const newItems = [...items];
        newItems[index][name] = value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { name: '', quantity: 1 }]);
    };

    const calculateTotal = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5003/api/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items }),
        });
        const data = await response.json();
        setTotalCost(data.totalCost);
    };

    return (
        <div className="bill-calculator-container">
            <h1>Bill Calculator</h1>
            <form onSubmit={calculateTotal}>
                {items.map((item, index) => (
                    <div key={index} className="item-input">
                        <input
                            type="text"
                            name="name"
                            placeholder="Item Name"
                            value={item.name}
                            onChange={(event) => handleItemChange(index, event)}
                            required
                        />
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={(event) => handleItemChange(index, event)}
                            min="1"
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addItem}>Add Item</button>
                <button type="submit">Calculate Total</button>
            </form>
            <h2>Total Cost: ${totalCost.toFixed(2)}</h2>

            <h3>Available Items with Prices:</h3>
            <ul className="item-list">
                {Object.entries(itemPrices).map(([itemName, price]) => (
                    <li key={itemName}>
                        {itemName.charAt(0).toUpperCase() + itemName.slice(1)}: ${price.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BillCalculator;
