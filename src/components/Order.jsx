import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderDetails = () => {
    const location = useLocation();
    const order = location.state?.order;

    if (!order) {
        return <p>No hay detalles de la orden disponibles.</p>;
    }

    const { cliente, productos, total, fecha } = order;

    return (
        <div className="order-details">
            <section className='order-details-section'>
                <article className='order-details-ar'>
                <h2 className='order-item'>Detalles de la Orden</h2>
                <p className='order-item'><strong>Nombre del Cliente:</strong> {cliente.nombre}</p>
                <p className='order-item'><strong>Email del Cliente:</strong> {cliente.email}</p>
                <p className='order-item'><strong>Fecha de la Compra:</strong> {new Date(fecha).toLocaleString()}</p>
                <p className='order-item'><strong>Total:</strong> ${total.toFixed(2)}</p>
                </article>
                <article className='order-detail-ul'>
                <h3>Productos Comprados:</h3>
                <ul className='order-ul'>
                    {productos.map((producto, index) => (
                        <li className='order-li' key={index}>
                            <p className='order-last'><strong>Nombre:</strong> {producto.name}</p>
                            <p className='order-last'><strong>Cantidad:</strong> {producto.quantity}</p>
                            <p className='order-last'><strong>Precio:</strong> ${producto.price.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
                </article>
                
            </section>
        </div>
    );
};

export default OrderDetails;
