import React from 'react';
import { Link } from 'react-router-dom';

const UsersInfo = ({ users }) => (
  <div>
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          {/* empty table header so blogs created is positioned correctly */}
          <th scope="col" />
          <th scope="col">blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UsersInfo;
