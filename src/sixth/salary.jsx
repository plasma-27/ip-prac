// src/sixth/salary.jsx
import React, { useState } from 'react';
import './salary.css';

const SalaryEstimator = () => {
    const [basicSalary, setBasicSalary] = useState('');
    const [netSalary, setNetSalary] = useState(null);
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validate input
        const salaryNumber = parseFloat(basicSalary);
        if (isNaN(salaryNumber) || salaryNumber < 0) {
            setError('Please enter a valid salary amount.');
            return;
        }

        // Calculate net salary by calling the backend API
        fetch('http://localhost:5001/api/salary/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ basicSalary: salaryNumber }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setNetSalary(data.netSalary); // Update net salary state
            })
            .catch((error) => {
                console.error('Error calculating salary:', error);
                setError('Failed to calculate salary. Please try again.');
            });
    };

    return (
        <div className="salary-estimator-container">
            <h1>Quick Salary Estimator</h1>

            <form onSubmit={handleSubmit} className="salary-form">
                <input
                    type="number"
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(e.target.value)}
                    placeholder="Enter your basic salary"
                    required
                />
                <button type="submit">Calculate Net Salary</button>
            </form>

            {error && <p className="error">{error}</p>}

            {netSalary !== null && (
                <div className="result">
                    <h2>Estimated Net Salary: ${netSalary.toFixed(2)}</h2>
                </div>
            )}
        </div>
    );
};

export default SalaryEstimator;
