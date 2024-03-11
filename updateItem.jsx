import React, {useState} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

const UpdateItem = (props) => {
    const {inventory, setInventory} = props;
    const {id} = useParams();
    const {title, setTitle} = useState('');
    const {description, setDescription} = useState('');
    const {quantity, setQuantity} = useState(0);
    
    const updateItem = (e) =>{
        e.preventDefault();

        useEffect(() => {
            axios.get('http://localhost:8000/api/getOneItem/' + id)
                .then(res => {setTitle(res.data.title);
                            setDescription(res.data.description);
                            setQuantity(res.data.quantity);
                })
                .catch(err => console.log('updateItem getOneItem err: ', err))
        },[])
    
        const updateItem = (e) => {
            e.preventDefault();
    
            const updatedItem = {
                title,
                description,
                quantity
            }
    
            axios.put('http://localhost:8000/api/updateItem/' + id, updatedItem)
                .then(res => {
                        setTitle('');
                        setDescription('');
                        setQuantity(0);})
                .catch(err => {console.log('updateItem updateItem err: ', err)})
        }
    }
            
    const deleteItem = (id) => {
        axios.delete('http://localhost:8000/api/deleteItem/' + id)
            .then(res => {
                console.log(`${title} was deleted`);
                setInventory(inventory.filter(item => id!=item._id));
            })
            .catch(err => console.log('inventoryList deleteItem err: ', err))
    }

    return(
        <>
        <h1>Update An Item</h1>
        <nav>
            <Link to={'/home'}className='look_like_a_button'>Home</Link>
            <Link to={'/inventoryList'}className='look_like_a_button'>Inventory List</Link>
            <Link to={'/searchInventory'}className='look_like_a_button'>Search</Link>
            {/* disabled link needs CSS to be visually obvious that it is disabled -- **FIX BEFORE SUBMIT** */}
            <Link to={'/addItem'} disabled className='disabled_button'>Add Item</Link>
        </nav>

        <section className='form'>
            <div className='form_field'>
                <label for="title">Item Name: </label>
                <input type='text'
                        onChange = "(e) => setTitle(e.target.value)"
                        value = {title}/>
            </div>
            <div className='form_field'>
                <label for="description">Description: </label>
                <input type='textarea'
                        cols="20"
                        rows="50"
                        onChange = "(e) => setDescription(e.target.value)"
                        value = {description}/>
            </div> 
            <div className='form_field'>              
                <label for="quantity">Quantity: </label>
                <input type='number'
                        min="0"
                        step="1"
                        onChange = "(e) => setQuantity(e.target.value)"
                        value = {quantity}/>
            </div> 
            <button onClick="(e) => updateItem" className='look_like_a_button'>Update Item</button>
            <button onClick={(e) => deleteItem(item._id)} className='look_like_a_button'>Delete</button>
        </section>
        </>
    )
}
export default UpdateItem;