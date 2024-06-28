import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import {doc, getDoc } from "firebase/firestore";
import {db} from "../firebase/config"


const ItemDetailContainer = () => {

    let { itemId } = useParams();
    let [product, setProduct] = useState(undefined);

    useEffect(() => {

        const documentRef = doc(db, "products", itemId);
        getDoc(documentRef)
            .then(res => {
                setProduct({...res.data(), id: res.id});
            });

    }, [itemId])


  return (
    <div className='item-detail-loading'>{product ? 
        <ItemDetail product={product}/>
        : <div className='gif-carga-item'></div> }</div>
  )
}

export default ItemDetailContainer