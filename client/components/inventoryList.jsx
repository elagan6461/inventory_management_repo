import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InventoryList = (props) => {
    const { inventory, setInventory } = props;
    const [ currentDisplayList, setCurrentDisplayList] = useState(inventory);

    useEffect(() => {
        axios.get("http://localhost:8000/api/allItems")
            .then((res) => {
                setInventory(res.data);
            })
            .catch((err) => {
                console.log('get all inventory error: ', err);
            })
    }, [])

    const getLowInventory = (e) => {
        axios.get('http://localhost:8000/api/getLowInventory')
            .then(res => {setCurrentDisplayList(res.data)})
            .catch(err => console.log('inventoryList getLowInventory err: ', err))
    }

    const getFullInventory = e => {
        setCurrentDisplayList(inventory)
    }

    const deleteItem = (id) => {
        axios.delete('http://localhost:8000/api/deleteItem/' + id)
            .then(res => {
                console.log(`delete successful`);
                setInventory(inventory.filter(item => id != item._id));
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
                {/* <Link to='/searchInventory' className='look_like_a_button'>Search</Link> */}
                <Link to='/addItem' className='look_like_a_button'>Add Item</Link>
            </nav>
            <div id='displayChoices'>
                <button className='look_like_a_button' onClick={e => getFullInventory()}>All</button>
                <button className='look_like_a_button' onClick={e => getLowInventory()}>Low Stock Only</button>
            </div>
            
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
                    {currentDisplayList.map((item) => {
                        return (
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <Link to={`/updateItem/${item._id}`} className='look_like_a_button'>Edit</Link>
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