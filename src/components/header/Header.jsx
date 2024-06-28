import React from 'react';
import {NavBar} from './NavBar';
import { Carrito } from './Carrito';
import { Link } from 'react-router-dom';
import OrderFilter from './OrderFilter';


export const Header = () => {
    return (
        <header className='header'>
            <Link to="/" ><img className="header-logo" src="../../src/assets/spirit-full-3.png" alt="" /></Link>
            <NavBar />
            <OrderFilter/>
            <Carrito/>
        </header>
    )
}
