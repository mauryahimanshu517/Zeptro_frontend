import React, { useContext, useEffect } from 'react'
import { useCart } from '../context/CartContext';
import { DataContext } from '../context/DataContext';

function CatogoriesPage() {
  let { catogoriesData, addToCart } = useCart();
  const { data, fetchAllProduct } = useContext(DataContext);

  useEffect(() => {
    fetchAllProduct();
  }, []);

  if (catogoriesData === "null") {
    catogoriesData = false
  }

  return (
    <div className=" p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        {catogoriesData
          ? catogoriesData.charAt(0).toUpperCase() + catogoriesData.slice(1)
          : "Select the Catogries..."}
      </h1>



      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.filter(item => item.category === catogoriesData).map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
          >
            <div className=" flex items-center justify-center overflow-hidden rounded-xl bg-gray-100">
              <img
                src={item.images}
                alt={item.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col flex-grow justify-between mt-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 mt-2 text-xl font-bold">
                  ${item.price}
                </p>
              </div>

              <button
                className="mt-4 bg-red-500 text-white font-semibold py-2 rounded-xl hover:bg-red-700 transition-colors"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatogoriesPage;
