// src/ten/interest.jsx
import React, { useState } from 'react';
import './interest.css';

const InterestCalculator = () => {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [time, setTime] = useState('');
    const [interest, setInterest] = useState(null);

    const calculateInterest = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5004/api/calculate-interest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ principal: parseFloat(principal), rate: parseFloat(rate), time: parseFloat(time) }),
        });

        const data = await response.json();
        setInterest(data.interest);
    };

    return (
        <div className="interest-calculator-container">
            <h1>Savings Interest Calculator</h1>
            <form onSubmit={calculateInterest}>
                <div>
                    <input
                        type="number"
                        placeholder="Principal Amount ($)"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Rate of Interest (%)"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Investment Period (Years)"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Calculate Interest</button>
            </form>
            {interest !== null && (
                <h2>Interest Earned: ${interest.toFixed(2)}</h2>
            )}
        </div>
    );
};

export default InterestCalculator;
