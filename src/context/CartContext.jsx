import { createContext, useState } from "react";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [carrito, setCarrito] = useState([]);
   

    const addToCart = (item, quantity) => { 
        quantity = 0;
        
        const quantityNumber = Number(quantity);
        
        const itemAdded = { ...item, quantity: quantityNumber + 1 };
        
        
    
        
        const newCart = [...carrito];
    
        
        const isItAdded = newCart.find((product) => product.id === itemAdded.id);
        if (isItAdded) {
            const currentQuantity = Number(isItAdded.quantity);
            
    
            // Si el producto ya está en el carrito, incrementar la cantidad en 1 y luego por la cantidad especificada
            const updatedProduct = { 
                ...isItAdded, 
                quantity: currentQuantity + quantityNumber + 1 // Incrementamos la cantidad actual + cantidad nueva + 1
            };
    
            
            const updatedCart = newCart.map(product => 
                product.id === updatedProduct.id ? updatedProduct : product
            );
            Toastify({

                text: "Producto Agregado",
                
                duration: 1500,
                position: "left",
                style: {
                    background: '#333', // Fondo del toast
                    color: '#fff', // Color del texto
                    padding: '16px', // Espaciado interno
                    borderRadius: '8px', // Borde redondeado
                }
                
            }).showToast();
    
            
            setCarrito(updatedCart);
        } else {
            // Añadir el nuevo producto al carrito
            Toastify({

                text: "Producto Agregado",
                
                duration: 1500,
                position: "left",
                style: {
                    background: '#333', // Fondo del toast
                    color: '#fff', // Color del texto
                    padding: '16px', // Espaciado interno
                    borderRadius: '8px', // Borde redondeado
                }
                
            }).showToast();
           
            newCart.push(itemAdded);
            setCarrito(newCart);
        }
       
    }
    
    
    

    const calcularTotal = () => {
        return carrito.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);
    }

    const vaciarCarrito = () => {
        Toastify({

            text: "Carrito vacio",
            
            duration: 1500,
            position: "left",
            style: {
                background: '#333', // Fondo del toast
                color: '#fff', // Color del texto
                padding: '16px', // Espaciado interno
                borderRadius: '8px', // Borde redondeado
            }
            
        }).showToast();
        setCarrito([]);
    }

    const removeFromCart = (itemId) => {
        // Filtrar el carrito para excluir el producto con el id especificado
        const updatedCart = carrito.filter((product) => product.id != itemId);
        Toastify({

            text: "Producto Eliminado",
            
            duration: 1500,
            position: "left",
            style: {
                background: '#333', // Fondo del toast
                color: '#fff', // Color del texto
                padding: '16px', // Espaciado interno
                borderRadius: '8px', // Borde redondeado
            }
            
        }).showToast();
    
        // Actualizar el estado del carrito con la nueva lista de productos
        setCarrito(updatedCart);
    }

    const updateQuantity = (itemId, newQuantity) => {
        // Si la nueva cantidad es 0, eliminar el producto del carrito
        if (newQuantity < 1) {
            removeFromCart(itemId);
        } else {
            setCarrito(prevCarrito =>
                prevCarrito.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    


    return (
        <CartContext.Provider value={ {carrito, addToCart, calcularTotal, vaciarCarrito, removeFromCart, updateQuantity} }>
            {children}
        </CartContext.Provider>
    )
}