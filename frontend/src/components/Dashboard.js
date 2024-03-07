import React, { useState, useEffect } from "react";
import { deleteUser, getUsers, updateUser } from "../firebase";
import { useAuth } from "../context/AuthContext.js";
function Dashboard() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  const handleUpdateUser = async (user, newData) => {
    await updateUser(user.userUid, newData);
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.userUid === user.userUid ? { ...u, ...newData } : u))
    );
  };

  const handleDeleteUser = async (user) => {
    await deleteUser(user.userUid);
    setUsers((prevUsers) => prevUsers.filter((u) => u.userUid !== user.userUid));
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome, {currentUser.emailId}!</p>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Provider</th>
            <th>Created</th>
            <th>Signed In</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userUid}>
              <td>{user.emailId}</td>
              <td>{user.provider}</td>
              <td>{user.created}</td>
              <td>{user.signedIn}</td>
              <td>
                <button
                  onClick={() =>
                    handleUpdateUser(user, { displayName: "New Name" })
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;