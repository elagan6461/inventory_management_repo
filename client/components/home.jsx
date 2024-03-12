import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Home = (props) => {
    const navigate = useNavigate()
    const logout = () => {
        axios.post('http://localhost:8000/api/logoutUser', {}, {withCredentials:true})
            .then(navigate('/'))
            .catch((err) => {
                console.log(err)
            })
    }
    
    return (
        <>
        <h1>Inventory Tracker</h1>
        <nav>
            <Link to={'/inventoryList'} className='look_like_a_button'>Inventory List</Link>
            <Link to={'/searchInventory'}className='look_like_a_button'>Search Inventory</Link>
            <Link to={'/addItem'}className='look_like_a_button'>Add Item</Link>
            <button onClick={logout} className='look_like_a_button'>Logout</button>
        </nav>
        
        </>
    );
}
export default Home;
