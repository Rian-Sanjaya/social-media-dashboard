import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import Api from '../../api/Api';

const Users = () => {
  const [users, setUsers] = useState([]);

  /* eslint-disable */
  useEffect(() => {
    Api.fetchUsers()
      .then((resp) => {
        setUsers(resp);
      })
      .catch((err) => {
        console.error("error: ", err);
      });
  }, []);
  /* eslint-enable */

  return (
    <div>
      <div>Users</div>
      <Table hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Website</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Company</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {
              users.map((user, i) => {
                return (
                  <tr key={user.id}>
                    <th scope="row">{`${i+1}`}</th>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.website}</td>
                    <td>{`${user.address.street}, ${user.address.city} ${user.address.zipcode}`}</td>
                    <td>{user.phone}</td>
                    <td>{user.company.name}</td>
                    <td>
                      <a href="$">view</a>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
      </Table>
    </div>
  );
};

export default Users;