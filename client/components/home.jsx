import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
    const {inventory, setInventory} = props;

    return (
        <>
        <h1>Inventory Tracker</h1>
        <Link to={'/inventoryList'}>Full Inventory List</Link>
        <Link to={'/searchInventory'}>Search Inventory</Link>
        <Link to={'/addItem'}>Add Item</Link>
        </>
    );
}
export default Home;