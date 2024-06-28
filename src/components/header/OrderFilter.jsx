import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const OrderFilter = () => {
    const [orderId, setOrderId] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setOrderId(e.target.value);
    };

    const fetchOrderDetails = async () => {
        if (!orderId.trim()) {
            Toastify({
                text: "Por favor, ingresa un ID de pedido válido.",
                duration: 2000,
                position: "left",
                style: {
                    background: '#e74c3c',
                    color: '#fff',
                    padding: '16px',
                    borderRadius: '8px',
                }
            }).showToast();
            return;
        }

        try {
            const orderRef = doc(db, "orders", orderId);
            const orderDoc = await getDoc(orderRef);

            if (orderDoc.exists()) {
                navigate('/order', { state: { order: orderDoc.data() } });
            } else {
                Toastify({
                    text: "No se encontró una orden con ese ID.",
                    duration: 2000,
                    position: "left",
                    style: {
                        background: '#e74c3c',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: '8px',
                    }
                }).showToast();
            }
        } catch (error) {
            Toastify({
                text: "Error al buscar la orden. Por favor, intenta de nuevo.",
                duration: 2000,
                position: "left",
                style: {
                    background: '#e74c3c',
                    color: '#fff',
                    padding: '16px',
                    borderRadius: '8px',
                }
            }).showToast();
            console.error("Error fetching order: ", error);
        }
    };

    return (
        <div className="order-filter-container">
            <button className='nav-link' onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible ? '❌' : 'Buscar ID Pedido'}
            </button>

            {isFormVisible && (
                <div className="order-filter-form">
                    <input
                        type="text"
                        placeholder="Ingrese el ID de la compra"
                        value={orderId}
                        onChange={handleInputChange}
                    />
                    <button className='nav-link' onClick={fetchOrderDetails}>Buscar</button>
                </div>
            )}
        </div>
    );
};

export default OrderFilter;
