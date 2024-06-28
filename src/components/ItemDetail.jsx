import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../context/CartContext';

const ItemDetail = ({ product }) => {


    const {carrito, addToCart} = useContext(CartContext);
    



    return (
        <div className='detail'>
            <div className='back-button nav-link'>
                <NavLink to={`/category/${product.category.id}`} ><ion-icon size="large" name="arrow-back-outline"></ion-icon></NavLink>
            </div>
            <section className='detail-section'>
                <img src={product.image} alt={product.image} />
                <h1>{product.name}</h1>
                <strong>${product.price}</strong>
                <p>{product.description}</p>
                <button className='nav-link' onClick={() => addToCart(product)}>Agregar al carrito</button>
            </section>
        </div>
    )
}

export default ItemDetail