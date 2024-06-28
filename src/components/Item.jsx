import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

export const Item = ({ producto }) => {

    const { addToCart } = useContext(CartContext);

    return (
        <div className='producto'>
            <img src={producto.image} alt={producto.image} />
            <h2>{producto.name}</h2>
            <h3>${producto.price}</h3>
            <p>{producto.description}</p>
            <strong>{producto.category.name}</strong>
            <div>
                <Link to={`/item/${producto.id}`} className='nav-link item-button'>Ver más</Link>
                <button className='nav-link' onClick={() => addToCart(producto)}>Agregar al carrito</button>
            </div>

        </div>
    )
}

