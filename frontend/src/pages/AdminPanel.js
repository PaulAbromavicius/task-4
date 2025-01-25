import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';
import { Button, Table, Form, InputGroup, FormControl } from 'react-bootstrap';
import { Lock, Copy, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        alert('Failed to fetch users. Please try again.');
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleBlockUsers = async () => {
    try {
      const response = await api.post('/users/block', { userIds: selectedUsers });
      if (response.data && response.data.success) {
        const updatedUsers = users.map((user) =>
          selectedUsers.includes(user.id)
            ? { ...user, status: 'blocked' }
            : user
        );
        setUsers(updatedUsers);
        setSelectedUsers([]);
        alert('Selected users have been blocked.');
      } else {
        throw new Error(response.data?.message || 'Blocking failed.');
      }
    } catch (err) {
      console.error('Error blocking users:', err);
      alert('Failed to block users. Please try again.');
    }
  };

  const handleCopyUsers = () => {
    if (selectedUsers.length !== 1) {
      alert('Please select a single user to copy details.');
      return;
    }
    const user = users.find((u) => u.id === selectedUsers[0]);
    navigator.clipboard.writeText(JSON.stringify(user, null, 2));
    alert('User details copied to clipboard.');
  };

  const handleDeleteUsers = async () => {
    try {
      const response = await api.post('/users/delete', { userIds: selectedUsers });
      if (response.data && response.data.success) {
        const remainingUsers = users.filter((user) => !selectedUsers.includes(user.id));
        setUsers(remainingUsers);
        setSelectedUsers([]);
        alert('Selected users have been deleted.');
      } else {
        throw new Error(response.data?.message || 'Deleting failed.');
      }
    } catch (err) {
      console.error('Error deleting users:', err);
      alert('Failed to delete users. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            disabled={selectedUsers.length === 0}
            onClick={handleBlockUsers}
          >
            <Lock className="me-2" size={16} />
            Block
          </Button>
          <Button
            variant="outline-secondary"
            disabled={selectedUsers.length !== 1}
            onClick={handleCopyUsers}
          >
            <Copy className="me-2" size={16} />
            Copy
          </Button>
          <Button
            variant="outline-danger"
            disabled={selectedUsers.length === 0}
            onClick={handleDeleteUsers}
          >
            <Trash2 className="me-2" size={16} />
            Delete
          </Button>
        </div>
        <InputGroup style={{ width: '300px' }}>
          <FormControl
            placeholder="Filter users"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </InputGroup>
      </div>

      <div className="border rounded-lg">
        <Table hover responsive className="table-light border-0 bg-white">
          <thead>
            <tr>
              <th className="w-12">
                <Form.Check
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-center">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-bottom">
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleSelect(user.id)}
                  />
                </td>
                <td>
                  <div className={user.status === 'blocked' ? 'text-decoration-line-through' : ''}>
                    {user.name}
                  </div>
                </td>
                <td>{user.email}</td>
                <td className="text-center" title={user.last_login ? new Date(user.last_login).toLocaleString() : ''}>
                  {user.last_login ? 
                    formatDistanceToNow(new Date(user.last_login), { addSuffix: true }) :
                    'N/A'
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPanel;
