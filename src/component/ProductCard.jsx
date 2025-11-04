import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { addToCart, productItems,totalSum} = useCart()

    const handleBuyNow = () => {
        addToCart(product)
        totalSum();
    };

    return (
        <>
            <div
                className="border relative border-gray-200 rounded-2xl 
            cursor-pointer hover:scale-105 hover:shadow-2xl
            transition-transform p-2 h-max"
            >
                <img
                    src={product.images}
                    alt={product.title}
                    className="bg-gray-100 aspect-square w-full object-cover rounded-xl"
                    onClick={() => navigate(`/product/${product.id}`)}
                />
                <h1 className="line-clamp-2 p-1 font-semibold">{product.title.split(" ").length > 2 ? product.title.split(" ").slice(0, 2).join(" ") + " " + "..." : product.title}</h1>
                <p className="my-1 text-lg text-gray-800 font-bold">
                    ${product.price}
                </p>
                <button onClick={handleBuyNow} className="bg-red-500 px-3 py-2 text-sm rounded-md text-white w-full cursor-pointer flex gap-12 item-center justify-center font-semibold">Add to cart</button>
            </div>

        </>


    )
}

export default ProductCard