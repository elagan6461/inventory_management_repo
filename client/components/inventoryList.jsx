import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InventoryList = (props) => {
    const { inventory, setInventory } = props;
    
    const deleteItem = (id) => {
        axios.delete('http://localhost:8000/api/deleteItem/' + id)
            .then(res => {
                console.log(`${title} was deleted`);
                setInventory(inventory.filter(item => id!=item._id));
            })
            .catch(err => console.log('inventoryList deleteItem err: ', err))
    }

    return (
        <>
            <h1>Current Inventory</h1>
            <nav>
                <Link to='/home' className='look_like_a_button'>Home</Link>
                {/* <!--disabled link needs CSS to be visually obvious that it is disabled -- **FIX BEFORE SUBMIT** --> */}
                <Link to='/inventoryList' disabled className='disabled_button'>Inventory List</Link>
                <Link to='/searchInventory' className='look_like_a_button'>Search</Link>
                <Link to='/addItem' className='look_like_a_button'>Add Item</Link>
            </nav>
            
            <table id='inventory_list'>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Stock</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => {
                        return (
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <Link to={`/updateItem/${item._id}`}className='look_like_a_button'>Edit</Link>
                                    <button onClick={(e) => deleteItem(item._id)} className='look_like_a_button'>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> 
        </>
    );
}
export default InventoryList;