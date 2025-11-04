import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext("");

export const CartProvider = ({ children }) => {
    const [productItems, getProductItems] = useState([])
    console.log("productItems", productItems)

    const [catogoriesData, setcatogoriesData] = useState("null")
    const [payment, setPayment] = useState("0")

    const deleteProduct = (id) => {
        console.log(id)
        console.log(productItems)
        getProductItems(productItems.filter(item => item.id !== id))

    };

    useEffect(() => {
        const total = productItems.reduce(
            (sum, item) => sum + item.price * (item.quantity || 1),
            0
        );
        setPayment(total);
    }, [productItems]);




    const IncDec = (id, quantity, action) => {
        // Create the updated array
        const updatedItems = productItems
            .map((item) => {
                if (item.id === id) {
                    if (action === "increment") {
                        return { ...item, quantity: quantity + 1 };
                    } else if (action === "decrement") {
                        return { ...item, quantity: quantity - 1 };
                    }
                }
                return item;
            })
            .filter((item) => item.quantity > 0);

        // Update state
        getProductItems(updatedItems);

        // ✅ Calculate total based on the updated array
        const totals = updatedItems.reduce(
            (sum, item) => sum + item.price * (item.quantity || 1),
            0
        );

        setPayment(totals);
    };


    const addToCart = (product) => {
        console.log("product", product)
        const findItem = productItems.some((item) => item.id === product.id);
        console.log(findItem)

        if (findItem) {
            const updateCart = productItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
            getProductItems(updateCart)
            console.log(updateCart)
        }
        else {
            getProductItems([...productItems, { ...product, quantity: 1 }])
            toast.success("product is added to cart")
            console.log("hello from else")
        }
    }

    return (
        <>

            <CartContext.Provider value={{ productItems, payment, getProductItems, addToCart, deleteProduct, IncDec, setcatogoriesData, catogoriesData }}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export const useCart = () => useContext(CartContext)