import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/DataContext'

function Brand({brand,setBrand,handleBrandChange}) {
  const { data, fetchAllProduct } = useContext(DataContext)

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div>
      <h1 className="text-3xl mt-6 font-bold">Brand</h1>
      <select className="border mt-4 border-gray-300 rounded-md p-2 w-70" value={brand} onChange={handleBrandChange}>
        <option value="" >Select Brand</option>
        {data
          ? [...new Set(data.map(item => item.brand))].map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))
          : ""}
      </select>
    </div>
  )
}

export default Brand
