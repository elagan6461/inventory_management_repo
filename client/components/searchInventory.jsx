import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const SearchInventory = (props) => {
    const [item, setItem] = useState('')
    const [title, setTitle] = useState('')
    const { inventory, setInventory } = props;
    
    const deleteItem = (id) => {
        axios.delete('http://localhost:8000/api/deleteItem/' + id)
            .then(res => {
                console.log(`delete successful`);
                setInventory(inventory.filter(item => id!=item._id));
            })
            .catch(err => console.log('searchInventory deleteItem err: ', err))
    }

    const searchForItem = (e) =>{
        e.preventDefault();
        console.log('searchforitem title: ', title, typeof(title));
        axios.get('http://localhost:8000/api/findOneByTitle', title)
            .then(res => {setItem(res.data);
                            setTitle('item name');
                            console.log('searchfor item res.data = ', res.data);
                            console.log('searchforitem res = ', res);
                        })
            .catch(err => {console.log('searchInventory searchForItem err: ', err);})
    }

    return (
        <>
        <h1>Find an Item</h1>
        <nav>
            <Link to='/home' className='look_like_a_button'>Home</Link>
            <Link to='/inventoryList' className='look_like_a_button'>Inventory List</Link>
            {/* <!--disabled link needs CSS to be visually obvious that it is disabled -- **FIX BEFORE SUBMIT** --> */}
            <Link to='/searchInventory' disabled className='disabled_button'>Search</Link>
            <Link to='/addItem' className='look_like_a_button'>Add Item</Link>
        </nav>

        <form onSubmit={searchForItem}>
            <label htmlFor="title">Search for </label>
            <input type="text" name="title" value={title} onChange={e=>setTitle(e.target.value)}/>
            <button className='look_like_a_button'>Search</button>
        </form>

        <div>
            {item!='' ?  
                <div>
                    <div>
                        <p>{item.title}</p>
                        <p>Description: {item.description}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                    <div>
                        <Link to={`/updateItem/${item._id}`}>Edit</Link>
                        <button onClick={(e) => deleteItem(item._id)}>Delete</button>
                    </div>
                </div>
                : null}
        </div>
        </>
    )
}
export default SearchInventory;