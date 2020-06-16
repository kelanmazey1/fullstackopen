import React from 'react';

const UserInfo = ({ user }) => (
  <div>
    {
        user
          ? (
            <div>
              <h2>{user.name}</h2>
              <h3>added blogs</h3>
              <ul>
                {
                  user.blogs.map((blog) => (
                    <li key={blog.id}>
                      {blog.title}
                    </li>
                  ))
                }
              </ul>
            </div>
          )
          : (
            <div>
              Can&apos;t find user...
            </div>
          )
      }
  </div>
);

export default UserInfo;
