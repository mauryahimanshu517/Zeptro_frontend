import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import Brand from './Brand'
import PriceRange from './PriceRange'

function FilterSection({search,setSearch,handleBrandChange,handleCategoryChange,resetAll,category,setCategory,brand,setBrand,priceRange,setPriceRange}) {
  const { data, fetchAllProduct } = useContext(DataContext)

  useEffect(() => {
    fetchAllProduct()
  }, [])


  return (
    <div className="bg-grey-100 mt-10 p-4 rounded-md h-max md:block hidden">
      <input type="text" value={search} placeholder="Search..." onChange={(e)=>setSearch(e.target.value)} className="bg-white p-2  rounded-md border-grey-400 border-2" />
      <h1 className="text-3xl mt-6 text-black-500 font-bold">Category</h1>
      <div >
        {
          
          data ? ["All",...new Set(data.map(item => item.category))]
          .map((categorys, index) => {
            return (
              <div key={index} className="gap-2 flex mt-3">
             
                <input type="checkbox" onChange={handleCategoryChange} checked={category===categorys}  id={index} name={category} value={categorys}></input>
                <p className="text-[20px]">{categorys.toUpperCase()}</p>
              </div>
            )

          }):""
        }
        
      </div>
      
        <Brand brand={brand} setBrand={setBrand} handleBrandChange={handleBrandChange}  />
        <PriceRange priceRange={priceRange} setPriceRange={setPriceRange} setCategory={setCategory} resetAll={resetAll} />
    </div>
  )
}

export default FilterSection