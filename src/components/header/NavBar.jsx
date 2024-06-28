import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
//import categories from '../../data/categories.json';
import { db } from "../../firebase/config"
import { collection, getDocs } from "firebase/firestore"


export const NavBar = () => {


    let [categories, setCategories] = useState([]);

    useEffect(() => {
       
        const getCategories = collection(db, "categories");
        
        
        getDocs(getCategories)
            .then((res) => {
                setCategories(
                   
                    res.docs.map((doc) => {
                        return { ...doc.data(), id: categories.adress}
                    })
                    
                )
            })

    }, [])

    return (
        <nav className='nav'>
            <ul className='nav-menu'>
                <li>
                    <NavLink to="/" activeclassname="active" className='nav-link' >Productos</NavLink>
                </li>
                {
                    categories.map((category) => {
                        return (
                            <li key={category.adress}>
                                <NavLink to={`/category/${category.adress}`} activeclassname="active" className='nav-link'>{category.name}</NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

