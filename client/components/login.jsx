import React, {useState} from 'react';
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

const Login = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        const loginUser = {email, password}
        axios.post('http://localhost:8000/api/loginUser', loginUser, {withCredentials:true})
            .then((res) => {
                console.log(res);
                navigate('/home')
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.message)
            })
    }
    return(
        <div>
            <h1>Inventory Management System</h1>
            <form onSubmit={submitHandler} className='form'>
                <h2>Login</h2>
                {
                    errors.length > 0?
                    <p className='errorMessages'>{errors}</p>:
                    null
                }
                <div className='form_field'>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form_field'>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='look_like_a_button'>Login</button>
                <Link to={'/'} className='look_like_a_button'>Dont have an account? Sign up here</Link>
            </form>
        </div>
    )
}

export default Login;