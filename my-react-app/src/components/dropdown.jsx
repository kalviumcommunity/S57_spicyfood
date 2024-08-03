import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDropdown({ selectedUserId, setSelectedUserId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
}

export default UserDropdown;
