import React, { useEffect, useState } from 'react'
import { ItemList } from './ItemList'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase/config"



export const ItemListContainer = () => {

    let { categoryId } = useParams();
    let [productos, setProducts] = useState([]);

    let [titulo, setTitulo] = useState();


    useEffect(() => {




        const getProducts = collection(db, "products");
        const q = categoryId ? query(getProducts, where("category.id", "==", categoryId)) : getProducts;

        const categoriesRef = collection(db, "categories");
        const categoriesQ = categoryId ? query(categoriesRef, where("adress", "==", categoryId)) : categoriesRef;

        getDocs(q)
            .then((res) => {
                setProducts(
                    res.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id }
                    })
                )
            })

        getDocs(categoriesQ)
            .then((res) => {
                categoryId ? setTitulo(res.docs[0].data().name) : setTitulo("Todas las bebidas");
            })




    }, [categoryId])



    // encierro cada nombre de productos en una etiqueta p,
    // de esta manera contruyo todo el html

    return (
        <main className='main-container'>
            <div className='item-list-container'>
                <h1>{titulo}</h1>
                <ItemList productos={productos} />

            </div>
        </main>

    )
}
