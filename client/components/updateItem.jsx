import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate, useParams, Link} from 'react-router-dom'

const UpdateItem = (props) => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    
    useEffect(() => {
    axios.get('http://localhost:8000/api/findOneItem/'+ id)
        .then((res) => {
            setTitle(res.data.title)
            setDescription(res.data.description)
            setQuantity(res.data.quantity)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])
    
    const updateItem = (e) => {
        e.preventDefault();

        const updatedItem = {
            title,
            description,
            quantity
        }

        // console.log('update item updatedItem = ', updatedItem)

        axios.put('http://localhost:8000/api/updateItem/' + id, updatedItem)
            .then((res) => {
                    setTitle('');
                    setDescription('');
                    setQuantity(0);
                    console.log(res);
                    navigate('/home')
                })
            .catch((err) => {
                console.log('updateItem updateItem err: ', err)
            })
    }
    
            
    const deleteItem = () => {
        axios.delete('http://localhost:8000/api/deleteItem/' + id)
            .then(() => {
                navigate('/home');
            })
            .catch(console.log(err))
    }

    return(
        <>
        <h1>Update An Item</h1>
        <nav>
            <Link to='/home' className='look_like_a_button'>Home</Link>
            <Link to='/inventoryList' className='look_like_a_button'>Inventory List</Link>
            {/* <Link to='/searchInventory' className='look_like_a_button'>Search</Link> */}
            <Link to='/addItem' className='look_like_a_button'>Add Item</Link>
        </nav>

        <section id='updateArea'>
            <div id='updateInput'>
                <form onSubmit={updateItem}>
                    <div className='updateItem'>
                        <label htmlFor="title">Item Name: </label>
                        <input type='text'
                                onChange = {(e) => setTitle(e.target.value)}
                                value = {title}/>                    
                    </div>
                    <div className='updateItem'>
                        <label htmlFor="description">Description: </label>
                        <input type='textarea'
                            cols="20"
                            rows="50"
                            onChange = {(e) => setDescription(e.target.value)}
                            value = {description}/>
                    </div>
                    <div className='updateItem'>
                        <label htmlFor="quantity">Quantity: </label>
                        <input type='number'
                            min="0"
                            step="1"
                            onChange = {(e) => setQuantity(e.target.value)}
                            value = {quantity}/>
                    </div>
                    <div id='updateButtons'>
                        <button className='look_like_a_button'>Update Item</button>
                        <button className='look_like_a_button'  onClick={deleteItem}>Delete</button>
                    </div> 
                </form>   
            </div>
        </section>
        </>
    )
}
export default UpdateItem;
