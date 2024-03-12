import React, {useState} from 'react';
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

const Register = (props) => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})

    const submitHandler = (e) => {
        console.log('Submitted');
        e.preventDefault()
        const newUser = {firstName, lastName, email, password, confirmPassword}
        axios.post('http://localhost:8000/api/registerUser', newUser, {withCredentials:true})
            .then((res) => {
                console.log(res);
                navigate('/home')
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.error.errors)
            })
    }
    return(
        <div>
            <h1>Inventory Management System</h1>
            <form onSubmit={submitHandler} className='form'>
                <h2>Create an account:</h2>
                <div id='registerInput'>
                    <div className='form_field'>
                        <label>First Name: </label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        {errors.firstName?
                        <p className='errorMessages'>{errors.firstName.message}</p>
                        :null}
                    </div>
                    <div className='form_field'>
                        <label>Last Name: </label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        {errors.lastName?
                        <p className='errorMessages'>{errors.lastName.message}</p>
                        :null}
                    </div>
                    <div className='form_field'>
                        <label>Email: </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
                        {errors.email?
                        <p className='errorMessages'>{errors.email.message}</p>
                        :null}
                    </div>
                    <div className='form_field'>
                        <label>Password: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errors.password?
                        <p className='errorMessages'>{errors.password.message}</p>
                        :null}
                    </div>
                    <div className='form_field'>
                        <label>Confirm Password: </label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        {errors.confirmPassword?
                        <p className='errorMessages'>{errors.confirmPassword.message}</p>
                        :null}
                    </div>
                </div>
                <button className='look_like_a_button'>Register</button>
                <Link to={'/login'} className='look_like_a_button'>Have an account? Login here</Link>
            </form>
        </div>
    )
}

export default Register;