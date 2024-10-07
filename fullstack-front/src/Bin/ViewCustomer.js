import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewCustomer() {

    const [customer, setCustomer] = useState( {
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
      loadCustomer()
    }, []);
 
    const loadCustomer = async () => {
      const result = await axios.get (`http://localhost:8080/customer/${id}`)
      setCustomer(result.data)
    };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
          <h2 className="text-center m-4">View Customer</h2>

          <div className='card'>
            <div className='card-header'>
                Details of customer id : {customer.id}
                <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                        <b>id: </b>
                        {customer.id}
                    </li>
                    <li className='list-group-item'>
                        <b>Username: </b>
                        {customer.username}
                    </li>
                    <li className='list-group-item'>
                        <b>name: </b>
                        {customer.name}
                    </li>
                    <li className='list-group-item'>
                        <b>surname: </b>
                        {customer.surname}
                    </li>
                    <li className='list-group-item'>
                        <b>password: </b>
                        {customer.password}
                    </li>
                    <li className='list-group-item'>
                        <b>email: </b>
                        {customer.email}
                    </li>
                    <li className='list-group-item'>
                        <b>role: </b>
                        {customer.role}
                    </li>
                </ul>
            </div>
          </div>
          <Link className='btn btn-dark my-2' to={"/admincustomer"}>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
