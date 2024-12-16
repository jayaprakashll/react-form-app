import React, { useState } from "react";
import './App.css';
import axios from "axios";

const App = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        employee_id: "",
        email: "",
        phone: "",
        department: "HR",
        date_of_joining: "",
        role: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/api/employees", formData);
            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || "Submission failed");
        }
    };

    const handleReset = () => {
        setFormData({
            first_name: "",
            last_name: "",
            employee_id: "",
            email: "",
            phone: "",
            department: "HR",
            date_of_joining: "",
            role: "",
        });
        setMessage("");
    };

    return (
        <div>
            <h1>Employee Management System</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="employee_id"
                    placeholder="Employee ID"
                    value={formData.employee_id}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <select name="department" value={formData.department} onChange={handleChange} required>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                </select>
                <input
                    type="date"
                    name="date_of_joining"
                    value={formData.date_of_joining}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleReset}>
                    Reset
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default App;