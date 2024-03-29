import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios'

import './App.css'

import Home from '/components/home.jsx'
import InventoryList from '/components/inventoryList'
import SearchInventory from '/components/searchInventory'
import UpdateItem from '/components/updateItem'
import AddItem from '/components/addItem'
import Register from '/components/register'
import Login from '/components/login'

function App() {
  const [inventory, setInventory] = useState()

  //get all inventory    
  useEffect(() => {
    axios.get("http://localhost:8000/api/allItems")
        .then((res) => {
            setInventory(res.data);
        })
        .catch((err) => {
            console.log('get all inventory error: ', err);
        })
  }, [])

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Register/>}/>
        <Route path='/login' default element={<Login/>}/>
        <Route path='/home' default element={<Home/>}/>
        <Route path='/inventoryList' element={<InventoryList inventory={inventory} setInventory={setInventory}/>}/>
        <Route path='/searchInventory' element={<SearchInventory inventory={inventory} setInventory={setInventory}/>}/>
        <Route path='/addItem' element={<AddItem inventory={inventory} setInventory={setInventory}/>}/>
        <Route path='/updateItem/:id' element={<UpdateItem inventory={inventory} setInventory={setInventory}/>}/>
      </Routes>
    </BrowserRouter>    
    </>
  )
}

export default App;
