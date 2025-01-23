import React, { useState } from 'react';
import { createUser } from  'apiService';

const UserForm = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [role, setRole] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { id: '', name, dob, role, skill_level: skillLevel };
            const result = await createUser(userData);
            setResponse(result); // Store the server's response
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error('Error creating user:', err);
            setError('Failed to create user. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Date of Birth Field */}
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>

                {/* Role Field */}
                <div>
                    <label>Role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Select role</option>
                        <option value="player">Player</option>
                        <option value="coach">Coach</option>
                        <option value="court_manager">Court Manager</option>
                    </select>
                </div>

                {/* Skill Level Field */}
                <div>
                    <label>Skill Level (1-5):</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value)}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>

            {/* Confirmation or Error Message */}
            {response && (
                <div style={{ marginTop: '20px', color: 'green' }}>
                    <h3>User Created Successfully!</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            {error && (
                <div style={{ marginTop: '20px', color: 'red' }}>
                    <h3>{error}</h3>
                </div>
            )}
        </div>
    );
};

export default UserForm;

