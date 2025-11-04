import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import Catgories from './Catgories';



function Carousel() {

    const { data, fetchAllProduct } = useContext(DataContext)
    useEffect(() => {
        fetchAllProduct()
    }, [])

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div onClick={onClick} className={`${className} md:mx-30 mx-20`} style={{ zIndex: 3 }}>
                <AiOutlineArrowLeft className='arrows' style={{ ...style, display: "block", borderRadius: "50px", background: "#f53347", color: "white", padding: "2px", left: "50px" }} />

            </div>
        )
    }

    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div onClick={onClick} className={`arrow ${className} md:mx-30 mx-20`} style={{ zIndex: 3 }}>
                <AiOutlineArrowRight className='arrows' style={{ ...style, display: "block", borderRadius: "50px", background: "#f53347", color: "white", postion: "absolute", padding: "2px", right: "50px" }} />

            </div>
        )
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true, // keep this true to use custom arrows
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <>
            <Slider {...settings} >
                {
                    data?.sort(() => Math.random() - 0.5)?.slice(0, 7).map((item, index) => {
                        return <div key={index} className='bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10'>
                            <div className="flex flex-col-reverse md:flex-row gap-20 justify-center items-center md:h-[700px] h-[750px] px-4 py-10 bg-gradient-to-b from-gray-900 via-purple-900 to-black">

                                {/* Text Section */}
                                <div className="space-y-6 text-center md:text-left my-5 md:my-40">
                                    <h3 className="text-pink-400 font-semibold text-sm">
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, laudantium!
                                    </h3>
                                    <h1 className="text-3xl md:text-4xl font-bold uppercase md:w-[500px] text-white">
                                        {item.title}
                                    </h1>
                                    <p className="md:w-[500px] text-gray-300 px-2 md:px-0">
                                        {item.description}
                                    </p>
                                    <button className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-5 py-2 rounded-md cursor-pointer hover:scale-105 transition-all">
                                        Shop Now
                                    </button>
                                </div>

                                {/* Image Section */}
                                <div className="flex justify-center md:justify-end">
                                    <img
                                        src={item.images}
                                        alt={item.title}
                                        className="rounded-full w-[300px] md:w-[500px] hover:scale-105 transition-all shadow-2xl shadow-purple-500 my-5 md:my-10"
                                    />
                                </div>
                            </div>

                        </div>
                    })
                }

            </Slider>
            <Catgories />

        </>
    )
}

export default Carousel