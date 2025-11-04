import { createContext, useState } from "react";
import axios from "axios"

export const DataContext=createContext(null)

export const DataProvider= ({children}) =>{
    const[data,setData]=useState()

    const fetchAllProduct =async()=>{
        try{
            const res =await axios.get('https://dummyjson.com/products?limit=150')
            // console.log(res.data.products[0].images)
            const productData=res.data.products
            setData(productData)
        }
        catch(error){
            console.log(error)
        }
    }

    return <DataContext.Provider value={{data,setData,fetchAllProduct}}>
        {children}
    </DataContext.Provider>
}

