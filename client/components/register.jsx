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
                    </div>
                    <div className='form_field'>
                        <label>Last Name: </label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className='form_field'>
                        <label>Email: </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='form_field'>
                        <label>Password: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='form_field'>
                        <label>Confirm Password: </label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                </div>
                <button className='look_like_a_button'>Register</button>
                <Link to={'/login'} className='look_like_a_button'>Have an account? Login here</Link>
            </form>
        </div>
    )
}

export default Register;