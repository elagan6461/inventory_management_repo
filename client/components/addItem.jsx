import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AddItem = (props) => {
    const { inventory, setInventory } = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);

    const createNewItem = (e) => {
        e.preventDefault();

        const newItem = {
            title,
            description,
            quantity
        }

        console.log('newItem = ', newItem)

        axios.post('http://localhost:8000/api/createItem', newItem)
            .then(res => {
                setInventory([...inventory, res.data]);
                setTitle('');
                setDescription('');
                setQuantity(0);
            })
            .catch(err => { console.log('newstore createstore err: ', err) })
    }

    return (
        <>
            <h1>Add An Item</h1>
            <nav>
                <Link to={'/home'} className='look_like_a_button'>Home</Link>
                <Link to={'/inventoryList'} className='look_like_a_button'>Inventory List</Link>
                <Link to={'/searchInventory'} className='look_like_a_button'>Search</Link>
                {/* disabled link needs CSS to be visually obvious that it is disabled -- **FIX BEFORE SUBMIT** */}
                <Link to={'/addItem'} disabled className='disabled_button'>Add Item</Link>
            </nav>

            <form onSubmit={createNewItem}>
                <div>
                    <label htmlFor="title">Item Name: </label>
                    <input type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title} />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <input type='textarea'
                        cols="20"
                        rows="50"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description} />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity: </label>
                    <input type='number'
                    min="0"
                    step="1"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity} />
                </div>
                <button className='look_like_a_button'>Add to Inventory</button>
            </form>
        </>
    )
}
export default AddItem;