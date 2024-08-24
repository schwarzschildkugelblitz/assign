import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:8000/api/users/');
        const data = await response.json();
        setUsers(data);
    };

    const addUser = async (user) => {
        const response = await fetch('http://localhost:8000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            fetchUsers();
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User Management</h1>
            <UserForm addUser={addUser} />
            <UserList users={users} />
        </div>
    );
};

export default App;
