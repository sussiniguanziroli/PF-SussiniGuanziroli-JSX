import React, { useContext, useEffect, useRef, useState } from 'react'
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';



export const Carrito = () => {

    const { carrito, calcularTotal, vaciarCarrito, removeFromCart, updateQuantity } = useContext(CartContext);

    const [carritoClass, setCarritoClass] = useState("carritoDiv hidden");
    const [isCarritoClicked, setIsCarritoClicked] = useState(false);

    const carritoRef = useRef(null);
    const buttonRef = useRef(null);

    const handleVaciar = () => {
        vaciarCarrito();
    }



    const updateCarrito = () => {

        if (!isCarritoClicked) {
            setCarritoClass("carritoDiv visible")
        } else {
            setCarritoClass("carritoDiv hidden")
        }
        setIsCarritoClicked(!isCarritoClicked)
    }


    const closeCarrito = () => {
        setCarritoClass("carritoDiv hidden")
        setIsCarritoClicked(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                carritoRef.current && !carritoRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                closeCarrito();
            }
        };

        // Añadir el evento de clic al documento
        document.addEventListener("mousedown", handleClickOutside);

        // Eliminar el evento cuando el componente se desmonta
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCarritoClicked]); // Solo se vuelve a aplicar el efecto cuando cambia `isCarritoClicked`





    return (
        <>
            <div className="cart">
                <button ref={buttonRef} className='nav-link nav-button clicked' onClick={updateCarrito}>🛒</button>
                <small>{carrito.length}</small>
            </div>

            <div ref={carritoRef} className={carritoClass}>
                <div>
                    <button className='close' onClick={closeCarrito}>❌</button>
                    <h3>Carrito</h3>
                </div>
                <article className='cart-contents'>
                    {carrito.map((item) => <div key={item.id} className='cart-contents-child'>
                        <img src={item.image} alt={item.name} />
                        <Link className='link-id' to={`/item/${item.id}`}><p>{item.name}</p></Link>
                        <p>${item.price}</p>
                        <div className='quantity-controls'>
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                            <p>{item.quantity}</p>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                        <button onClick={() => removeFromCart(item.id)}>🗑️</button>
                    </div>)}
                </article>
                <section className='cart-controls'>
                    {
                        carrito.length > 0 ?
                            <>
                                <strong>Total: ${(calcularTotal()).toFixed(2)}</strong>
                                <Link to="/checkout" onClick={closeCarrito} className='btn-comprar nav-link'>Comprar</Link>
                                <button className='btn-vaciar nav-link' onClick={handleVaciar}>Vaciar Carrito</button>
                            </>
                            : <h2>Carrito Vacío</h2>
                    }



                </section>
            </div>
        </>
    )
}
