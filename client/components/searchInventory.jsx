import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const SearchInventory = (props) => {
    const [items, setItems] = useState('')
    const [keyword, setKeyword] = useState('')
    const { inventory, setInventory } = props;
    const [confirmMessage, setConfirmMessage] = useState('Search results will appear here');

    const deleteItem = (id) => {
        axios.delete('http://localhost:8000/api/deleteItem/' + id)
            .then(res => {
                console.log(`delete successful`);
                setInventory(inventory.filter(item => id!=item._id));
                setItems('');
                setConfirmMessage('delete successful');
            })
            .catch(err => console.log('searchInventory deleteItem err: ', err))
    }

    const searchForItems = (e) =>{
        e.preventDefault();
        console.log('searchforitem title: ', keyword, typeof(keyword));
        axios.get('http://localhost:8000/api/findByKeyword/'+ keyword)
            .then(res => {setItems(res.data);
                            setKeyword('');
                            console.log('searchfor item res.data = ', res.data);
                            setConfirmMessage('no items match your search'); //won't show unless there are no results
                        })
            .catch(err => {console.log('searchInventory searchForItem err: ', err);
                            setConfirmMessage('no items to display');})
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

        <form onSubmit={searchForItems}>
            <label htmlFor="keyword" className='greenWords'>Search by Item Name: </label>
            <input type="text" name="keyword" value={keyword} onChange={e=>setKeyword(e.target.value)}/>
            <button className='look_like_a_button'>Search</button>
        </form>

        <div>
            {items!=''?
                <table id='inventory_list'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => {
                            return(
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
                :<p className='yellowWords'>{confirmMessage}</p>}
        </div>

        {/* <div>
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
        </div> */}
        </>
    )
}
export default SearchInventory;