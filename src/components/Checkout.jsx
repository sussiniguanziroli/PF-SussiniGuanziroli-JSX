import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useForm } from 'react-hook-form';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const Checkout = () => {
    const { carrito, calcularTotal, vaciarCarrito } = useContext(CartContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [orderId, setOrderId] = useState("");
    const [clientId, setClientId] = useState("");
    const [orderDetail, setOrderDetail] = useState([]);
    const [orderTotal, setOrderTotal] = useState();


    const killCart = () => {
        setTimeout(() => {
            Toastify({
                text: "Pedido enviado exitosamente",
                duration: 1500,
                position: "left",
                style: {
                    background: '#333', // Fondo del toast
                    color: '#fff', // Color del texto
                    padding: '16px', // Espaciado interno
                    borderRadius: '8px', // Borde redondeado
                }
            }).showToast();
            vaciarCarrito();
        }, 1000);
    };

    const enviarOrden = async (data) => {
        // Verificar si el carrito está vacío
        if (carrito.length === 0) {
            Toastify({
                text: "El carrito está vacío. No puedes enviar un pedido sin productos.",
                duration: 2000,
                position: "left",
                style: {
                    background: '#e74c3c', // Fondo rojo
                    color: '#fff', // Texto blanco
                    padding: '16px', // Espaciado interno
                    borderRadius: '8px', // Borde redondeado
                }
            }).showToast();
            return; // Detener la ejecución de la función
        }

        try {
            const orden = {
                cliente: data,
                productos: carrito,
                total: calcularTotal(),
                fecha: new Date().toISOString() // Añadir fecha de la compra
            };

            const orderRef = collection(db, "orders");
            const docRef = await addDoc(orderRef, orden);

            setOrderId(docRef.id);
            setClientId(data.nombre);

            setOrderDetail(carrito);
            setOrderTotal(calcularTotal());


            killCart(); // Vaciar el carrito y mostrar el mensaje de éxito
        } catch (error) {
            console.error("Error al enviar la orden: ", error);
            Toastify({
                text: "Error al procesar tu pedido. Por favor, inténtalo de nuevo.",
                duration: 2000,
                position: "left",
                style: {
                    background: '#e74c3c', // Fondo rojo
                    color: '#fff', // Texto blanco
                    padding: '16px', // Espaciado interno
                    borderRadius: '8px', // Borde redondeado
                }
            }).showToast();
        }
    };

    if (orderId) {
        return (
            <div className='checkout-info'>
                <section className='checkout-info-section'>
                    <h2>Muchas gracias, {clientId} por tu compra!</h2>
                    <h3>Tu código de seguimiento e identificación es: {orderId}</h3>
                </section>
                <article className='order-detail-article'>
                    <h3>Detalle de compra: {orderDetail.length}</h3>
                    <main className='main-detail'>
                        {orderDetail.map((item) => <div key={item.id} className='order-detail'>
                            <img src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <p>${item.price}</p>
                            <p>{item.quantity}</p>
                            <strong>${(item.price * item.quantity).toFixed(2)}</strong>

                        </div>)}
                        
                    </main>
                    <h2>Total: ${orderTotal.toFixed(2)}</h2>
                    
                </article>
            </div>
        );
    }

    return (
        <div className='checkout-div'>
            <section className='checkout-div-section'>
                <h2>Ingrese sus datos:</h2>
                <form onSubmit={handleSubmit(enviarOrden)}>
                    <div className='form-group'>
                        <input
                            type="text"
                            placeholder='Nombre y Apellido'
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                        />
                        {errors.nombre && <p className='error-message'>{errors.nombre.message}</p>}
                    </div>
                    <div className='form-group'>
                        <input
                            type="email"
                            placeholder='E-mail'
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "El formato de email no es válido"
                                }
                            })}
                        />
                        {errors.email && <p className='error-message'>{errors.email.message}</p>}
                    </div>
                    <button className='nav-link' type='submit'>Enviar Pedido</button>
                </form>
            </section>
        </div>
    );
};

export default Checkout;
