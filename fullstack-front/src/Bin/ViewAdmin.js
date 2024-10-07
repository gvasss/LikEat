import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewAdmin() {

    const [admin, setAdmin] = useState( {
      id: "",
      username: "",
      name: "",
      surname: "",
      password: "",
      email: "",
      role: "",
    });

    const {id} = useParams();

    useEffect(() => {
      loadAdmin()
    }, []);
 
    const loadAdmin = async () => {
      const result = await axios.get (`http://localhost:8080/admin/${id}`)
      setAdmin(result.data)
    };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
          <h2 className="text-center m-4">View Admin</h2>

          <div className='card'>
            <div className='card-header'>
                Details of admin id : {admin.id}
                <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                        <b>id: </b>
                        {admin.id}
                    </li>
                    <li className='list-group-item'>
                        <b>Username: </b>
                        {admin.username}
                    </li>
                    <li className='list-group-item'>
                        <b>name: </b>
                        {admin.name}
                    </li>
                    <li className='list-group-item'>
                        <b>surname: </b>
                        {admin.surname}
                    </li>
                    <li className='list-group-item'>
                        <b>password: </b>
                        {admin.password}
                    </li>
                    <li className='list-group-item'>
                        <b>email: </b>
                        {admin.email}
                    </li>
                    <li className='list-group-item'>
                        <b>role: </b>
                        {admin.role}
                    </li>
                </ul>
            </div>
          </div>
          <Link className='btn btn-dark my-2' to={"/adminadmin"}>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
