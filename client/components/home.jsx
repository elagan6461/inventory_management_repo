import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
    const {inventory, setInventory} = props;

    return (
        <>
        <h1>Inventory Tracker</h1>
        <nav>
            <Link to={'/inventoryList'} className='look_like_a_button'>Full Inventory List</Link>
            <Link to={'/searchInventory'}className='look_like_a_button'>Search Inventory</Link>
            <Link to={'/addItem'}className='look_like_a_button'>Add Item</Link>
        </nav>
        
        </>
    );
}
export default Home;