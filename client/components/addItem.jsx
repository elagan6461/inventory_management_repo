import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const AddItem = (props) => {
    const navigate = useNavigate()
    const {inventory, setInventory} = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [errors, setErrors] = useState({})
    
    const createNewItem = (e) =>{
        e.preventDefault();

        const newItem = {
            title,
            description,
            quantity
        }

        console.log('newItem = ', newItem)

        axios.post('http://localhost:8000/api/createItem', newItem)
            .then(res => {setInventory([...inventory, res.data]);
                        setTitle('');
                        setDescription('');
                        setQuantity(0);
                        navigate('/inventoryList')
                    })
            .catch(err => {console.log('additem createnewitem err: ', err)
                    setErrors(err.response.data.errors)
        })
    }
    const logout = () => {
        axios.post('http://localhost:8000/api/logoutUser', {}, {withCredentials:true})
            .then(navigate('/'))
            .catch((err) => {
                console.log(err)
            })
    }

    return(
        <>
        <h1>Add An Item</h1>
        <nav>
            <Link to={'/home'}className='look_like_a_button'>Home</Link>
            <Link to={'/inventoryList'}className='look_like_a_button'>Inventory List</Link>
            <Link to={'/searchInventory'}className='look_like_a_button'>Search</Link>
            <Link to={'/addItem'} disabled className='disabled_button'>Add Item</Link>
            <button onClick={logout} className='look_like_a_button'>Logout</button>
        </nav>

        <form onSubmit={createNewItem} className='form'>
            <div className='form_field'>
                <label htmlFor="title">Item Name: </label>
                <input type='text'
                        onChange = {(e) => setTitle(e.target.value)}
                        value = {title}/>
                {
                    errors.title?
                    <p className='errorMessages'>{errors.title.message}</p>:
                    null
                }
            </div>
            <div className='form_field'>
                <label htmlFor="description">Description: </label>
                <input type='textarea'
                        cols="20"
                        rows="50"
                        onChange = {(e) => setDescription(e.target.value)}
                        value = {description}/>
                {
                    errors.description?
                    <p className='errorMessages'>{errors.description.message}</p>:
                    null
                }
            </div>
            <div className='form_field'>                
                <label htmlFor="quantity">Quantity: </label>
                <input type='number'
                        min="0"
                        step="1"
                        onChange = {(e) => setQuantity(e.target.value)}
                        value = {quantity}/>
                {
                    errors.quantity?
                    <p className='errorMessages'>{errors.quantity.message}</p>:
                    null
                }
            </div>
            <button className='look_like_a_button'>Add to Inventory</button>
        </form>
        </>
    )
}
export default AddItem;
