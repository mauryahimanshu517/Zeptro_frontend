import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import FilterSection from '../component/FilterSection'
import Loading from "../assets/Loading.webm"
import ProductCard from '../component/ProductCard'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import MobileFilter from '../component/Mobilefilter'

function Product() {
  const { data, fetchAllProduct } = useContext(DataContext)
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 200])
  const itemsPerPage = 12;
  const [openFilter, setOpenFilter] = useState(false)


  useEffect(() => {
    fetchAllProduct()
  }, [])

  const handleBrandChange = (e) => {
    setBrand(e.target.value)
    console.log(e.target.value)
  }

  const resetAll = () => {
    setCategory("All")
    setBrand("All")
    setPriceRange([0, 200])
  }

  const handleCategoryChange = (e) => {
    setCurrentPage(1)

    if (e.target.value === category) {

      setCategory("All")
    }
    else {

      setCategory(e.target.value);
    }


  }


  const filterData = data?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category) &&
    (brand === "All" || item.brand === brand) &&
    item.price >= priceRange[0] && item.price <= priceRange[1]

  );


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = data ? Math.ceil(filterData.length / itemsPerPage) : "";



  return (
    <>
      <MobileFilter openFilter={openFilter} setOpenFilter={setOpenFilter} handleCategoryChange={handleCategoryChange}
        resetAll={resetAll}
        handleBrandChange={handleBrandChange}
        search={search}
        setSearch={setSearch}
        brand={brand}
        setBrand={setBrand}
        category={category}
        setCategory={setCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange} />
        
      <div className="max-w-6xl mx-auto px-4 mb-10 md:mt-10">
        {
          data?.length > 0 ? (
            <div className="flex gap-8">
              <FilterSection
                handleCategoryChange={handleCategoryChange}
                resetAll={resetAll}
                handleBrandChange={handleBrandChange}
                search={search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                category={category}
                setCategory={setCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
              <div className="grid md:grid-cols-4 grid-cols-2 mt-10 h-auto gap-4">
                {filterData.length > 0 ? (
                  currentItems.map((product, index) => (
                    <ProductCard key={index} product={product} />

                  ))
                ) : (
                  <div className="flex justify-center  items-center h-screen">
                    <DotLottieReact
                      src="https://lottie.host/86108da4-187a-456c-b681-0c25849123dd/aEvtF2tJOb.lottie"
                      loop
                      autoplay
                    />
                  </div>


                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px]">
              <video muted autoPlay loop>
                <source src={Loading} type="video/webm"></source>
              </video>
            </div>
          )
        }
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>


      </div>
    </>
  )
}

export default Product
