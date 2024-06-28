import { useState } from 'react';
import Footer from './components/Footer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { ItemListContainer } from './components/ItemListContainer'
import NotFound from './components/NotFound';
import { Header } from "./components/header/Header"
import './css/main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Checkout from './components/Checkout';
import OrderDetails from './components/Order';


function App() {

    //encerrar todo lo que retonarmos con browser router
    // fuera de routes metemos todo lo que nunca cambia

    
    
    return (
        <CartProvider  >
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<ItemListContainer />} />
                <Route path='/category/:categoryId' element={<ItemListContainer />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/item/:itemId' element={<ItemDetailContainer/>} />
                <Route path='/checkout' element={<Checkout/>} />
                <Route path="/order" element={<OrderDetails />} />
            </Routes>
            <Footer />
        </BrowserRouter>
        </CartProvider>
    )
}

export default App
