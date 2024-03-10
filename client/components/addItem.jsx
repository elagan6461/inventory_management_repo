import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const AddItem = (props) => {
    const {inventory, setInventory} = props;
    const {title, setTitle} = useState('');
    const {description, setDescription} = useState('');
    const {quantity, setQuantity} = useState(0);
    
    const createNewItem = (e) =>{
        e.preventDefault();

        const newItem = {
            title,
            description,
            quantity
        }

        axios.post('http://localhost:8000/api/createItem', newItem)
            .then(res => {setInventory([...inventory, res.data]);
                        setTitle('');
                        setDescription('');
                        setQuantity();
                    })
            .catch(err => {console.log('newstore createstore err: ', err)})
    }

    return(
        <>
        <h3>Add An Item</h3>
        <nav>
            <Link to={'/home'}>Home</Link>
            <Link to={'/inventoryList'}>Inventory List</Link>
            <Link to={'/searchInventory'}>Search</Link>
            {/* disabled link needs CSS to be visually obvious that it is disabled -- **FIX BEFORE SUBMIT** */}
            <Link to={'/addItem'} disabled>Add Item</Link>
        </nav>

        <form onSubmit={createNewItem}>
            <label for="title">Item Name: </label>
            <input type='text'
                    onChange = "(e) => setTitle(e.target.value)"
                    value = {title}/>

            <label for="description">Description: </label>
            <input type='textarea'
                    cols="20"
                    rows="50"
                    onChange = "(e) => setDescription(e.target.value)"
                    value = {description}/>
                            
            <label for="quantity">Quantity: </label>
            <input type='number'
                    min="0"
                    step="1"
                    onChange = "(e) => setQuantity(e.target.value)"
                    value = {quantity}/>

            <button>Add to Inventory</button>
        </form>
        </>
    )
}
export default AddItem;