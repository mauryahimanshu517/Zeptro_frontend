import React, { useContext } from 'react'
import { FaFilter } from 'react-icons/fa6'
import { DataContext } from '../context/DataContext'



const MobileFilter = ({ openFilter, setOpenFilter, search, setSearch, handleBrandChange, handleCategoryChange, resetAll, category, setCategory, brand, setBrand, priceRange, setPriceRange }) => {
    const { data, fetchAllProduct } = useContext(DataContext)
    console.log("data", data)


    const toggleFilter = () => {
        setOpenFilter(!openFilter)
        fetchAllProduct()
    }
    console.log("hello")
    console.log(openFilter)
    return (
        
        <>
       
            <div className='bg-gray-100 flex justify-between items-center md:hidden px-4 p-2 mt-20'>
                <h1 className='font-semibold text-xl'>Filters</h1>
                <FaFilter onClick={toggleFilter} className='text-gray-800' />
            </div>
            {
                openFilter ? <div className='bg-gray-100 p-2 md:hidden'>
                    <input type="text"
                        placeholder='Search..'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='bg-white p-2 rounded-md border-gray-400 border-2 w-full'
                    />
                    {/* category only data */}
                    <h1 className='mt-5 font-semibold text-xl'>Category</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3'>
                        {
                            data ? ["All", ...new Set(data.map(item => item.category))]
                                .map((categorys, index) => {
                                    return (
                                        <div key={index} className="gap-2 flex mt-3">

                                            <input type="checkbox" onChange={handleCategoryChange} checked={category === categorys} id={index} name={category} value={categorys}></input>
                                            <p className="text-[20px]">{categorys.toUpperCase()}</p>
                                        </div>
                                    )

                                }) : ""
                        }
                    </div>
                    {/* brand only data */}
                    <h1 className='mt-5 font-semibold text-xl mb-3'>Brand</h1>
                    <select
                        className='bg-white w-auto p-2 border-gray-200 border-2 rounded-md '
                        value={brand}
                        onChange={handleBrandChange}
                    >
                        {
                            data?.map((item, index) => {
                                return <option key={index} className="border" value={item}>{item.brand}</option>
                            })
                        }
                    </select>
                    {/* price range  */}
                    <h1 className='mt-5 font-semibold text-xl mb-3'>Price Range</h1>
                    <div className='flex flex-col gap-2'>
                        <p className="text-2xl mt-4 ">Price Range:${priceRange[0]}-${priceRange[1]}</p>
                        <input type="range" min="0" max="5000"  value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className='transition-all w-[200px]' />
                    </div>
                    <button className='bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer'
                        onClick={() => { setSearch(''); setCategory('All'); setBrand('All'); setPriceRange([0, 5000]); setOpenFilter(false) }}
                    >Reset Filters</button>
                </div> : null
            }
        </>
    )
}

export default MobileFilter