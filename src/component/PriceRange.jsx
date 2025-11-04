
function PriceRange({priceRange,setPriceRange,resetAll}) {
  return (
    <div>
        <h1 className="text-3xl mt-4 font-bold">Price Range</h1>
        <p className="text-2xl mt-4 ">Price Range:${priceRange[0]}-${priceRange[1]}</p>
        <input type="range" className="w-full mt-4"  value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0],Number(e.target.value)])}/>
        <button onClick={resetAll} className="bg-red-500 w-[150px] p-2 rounded-md text-white text-2xl mt-8" >Reset Filter</button>
    </div>
  )
}

export default PriceRange