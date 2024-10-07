import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditCustomer() {

    let navigate = useNavigate();

    const {id} = useParams();

    const [customer, setCustomer] = useState({
        username: "",
        name: "",
        surname: "",
        password: "",
        email: "",
        role: "",
    });

    const{ username, name, surname, password, email, role} = customer;

    const onInputChange = (e) => {
      setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    useEffect(()=>{
        loadCustomer()
    }, []);

    const onSubmit = async (e) => {
      e.preventDefault();
      await axios.put(`http://localhost:8080/customer/${id}`, customer);
      navigate("/admincustomer");
    };

    const loadCustomer = async () => {
        const result = await axios.get(`http://localhost:8080/customer/${id}`);
        setCustomer(result.data);
    };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
          <h2 className="text-center m-4">Edit customer</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
              Username
              </label>
              <input
                type={'text'}
                className='form-control'
                placeholder='Enter your username'
                name='username'
                value={username}
                onChange={(e)=>onInputChange(e)}
              />  
            </div>
            <div className='mb-3'>
              <label htmlFor='Name' className='form-label'>
              Name
              </label>
              <input
                type={'text'}
                className='form-control'
                placeholder='Enter your name'
                name='name'
                value={name}
                onChange={(e)=>onInputChange(e)}
              />  
            </div>
            <div className="mb-3">
              <label htmlFor="Surname" className="form-label">
              Surname
              </label>
              <input
                type={'text'}
                className='form-control'
                placeholder='Enter your surname'
                name='surname'
                value={surname}
                onChange={(e)=>onInputChange(e)}
              />  
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
              Password
              </label>
              <input
                type={'password'}
                className='form-control'
                placeholder='Enter your password'
                name='password'
                value={password}
                onChange={(e)=>onInputChange(e)}
              />  
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
              Email
              </label>
              <input
                type={'text'}
                className='form-control'
                placeholder='Enter your email'
                name='email'
                value={email}
                onChange={(e)=>onInputChange(e)}
              />  
            </div>
            <div className="mb-3">
              <label htmlFor="Role" className="form-label">
              Role
              </label>
              <input
                type={'text'}
                className='form-control'
                placeholder='Enter your role'
                name='role'
                value={role}
                onChange={(e)=>onInputChange(e)}
              />  
            </div>
            <button type='submit' className='btn btn-dark'>
              Submit
            </button>
            <Link className='btn btn-danger mx-2' to="/admincustomer">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
