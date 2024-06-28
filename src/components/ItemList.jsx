import React from 'react'
import { Item } from './Item'

export const ItemList = ({ productos }) => {
    return (
        <div className='items-container'>
            {
                productos.length > 0 ?
                    productos.map(producto => {
                        return <Item key={producto.id} producto={producto} />
                    })
                    : <div className='gif-carga'></div>
            }
        </div>
    )
}
