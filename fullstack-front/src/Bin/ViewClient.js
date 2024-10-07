import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewClient() {

    const [client, setClient] = useState( {
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
      loadClient()
    }, []);
 
    const loadClient = async () => {
      const result = await axios.get (`http://localhost:8080/client/${id}`)
      setClient(result.data)
    };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
          <h2 className="text-center m-4">View Client</h2>

          <div className='card'>
            <div className='card-header'>
                Details of client id : {client.id}
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                        <b>id: </b>
                        {client.id}
                    </li>
                    <li className='list-group-item'>
                        <b>Username: </b>
                        {client.username}
                    </li>
                    <li className='list-group-item'>
                        <b>name: </b>
                        {client.name}
                    </li>
                    <li className='list-group-item'>
                        <b>surname: </b>
                        {client.surname}
                    </li>
                    <li className='list-group-item'>
                        <b>password: </b>
                        {client.password}
                    </li>
                    <li className='list-group-item'>
                        <b>email: </b>
                        {client.email}
                    </li>
                    <li className='list-group-item'>
                        <b>role: </b>
                        {client.role}
                    </li>
                </ul>
            </div>
          </div>
          <Link className='btn btn-dark my-2' to={"/adminclient"}>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
