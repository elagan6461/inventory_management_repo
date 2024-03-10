import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const SearchInventory = (props) => {
    const {item, setItem} = useState()
    const {title, setTitle} = useState('item name')    
    const { inventory, setInventory } = props;
    
    const deleteItem = (id) => {
        axios.delete('http://localhost:8000/api/deleteItem/' + id)
            .then(res => {
                console.log(`${title} was deleted`);
                setInventory(inventory.filter(item => id!=item._id));
            })
            .catch(err => console.log('searchInventory deleteItem err: ', err))
    }

    const searchForItem = (e) =>{
        axios.post('http://localhost:8000/api/findOneItem'+ title)
            .then(res => {setItem(res.data);
                            setTitle('item name');
                        })
            .catch(err => {console.log('searchInventory searchForItem err: ', err);})
    }

    return (
        <>
        <h3>Find an Item</h3>
        <nav>
            <Link to='/home'>Home</Link>
            <Link to='/inventoryList'>Inventory List</Link>
            {/* <!--disabled link needs CSS to be visually obvious that it is disabled -- **FIX BEFORE SUBMIT** --> */}
            <Link to='/searchInventory' disabled>Search</Link>
            <Link to='/addItem'>Add Item</Link>
        </nav>

        <form onSubmit={searchForItem}>
            <label for="title">Search for </label>
            <input type="text" name="title" value={title}/>
            <button>Search</button>
        </form>

        <div>
            <p>{item.title}</p>
            <p>Description: {item.description}</p>
            <p>Quantity: {item.quantity}</p>
            
            <Link to={`/updateItem/${item._id}`}>Edit</Link>
            <button onClick={(e) => deleteItem(item._id)}>Delete</button>
        </div>
        </>
    )
}
export default SearchInventory;