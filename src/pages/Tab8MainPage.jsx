import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const Tab8MainPage = () => {

  const [ products , setProducts ] = useState([]);

  useEffect(()=>{
    axiosInstance.get('/product')
    .then( response =>{
      setProducts(response.data);
    })
    .catch( error =>{
      console.log("Error gettinng Products",error)
    })
  },[])

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white py-7 max-w-[1440px] w-[95%] mx-auto">
      <div className="mb-5">
        <div className="gap-x-7 rounded-tl-[200px] px-[140px] rounded-br-[200px] rounded-bl-[20px] rounded-tr-[20px] text-white w-full py-12 bg-gradient-to-r from-[#4686BC] to-[#002F5F] shadow-xl shadow-black/20 flex justify-center items-center rounded-[20px] gap-y-[10px]" >
          <div className="pr-3 border-0 border-r-1 border-r-white">
            <img src="flyerProfileLogo.png" className="w-[330px]" alt="Logo" />
          </div>
          <div>
            <h2 className="text-[32px] font-bold uppercase">Welcome to GetPie ProShop</h2>
            <p className="text-xl font-medium">Shop branded apparel and items for the Rate Tracker team | Free standard shipping on all orders over $50</p>
          </div>
        </div>
      </div>

      <div className="flex mt-8">
        {/* Left Sidebar */}
        <div className="w-[20%] py-4 bg-[#F0F0F0] rounded-[10px]">
          <h3 className="text-xl font-medium text-center">Explore ProShop</h3>
          <ul className="mt-5">
            <li className="cursor-pointer bg-white border-0 border-l-[5px] border-l-[#4686BC] py-2 px-4 text-xl font-medium">All Products</li>
            <li className="cursor-pointer hover:text-blue-500 py-2 px-4 text-xl font-medium">Men's Apparel</li>
            <li className="cursor-pointer hover:text-blue-500 py-2 px-4 text-xl font-medium">Women's Apparel</li>
            <li className="cursor-pointer hover:text-blue-500 py-2 px-4 text-xl font-medium">Bags</li>
            <li className="cursor-pointer hover:text-blue-500 py-2 px-4 text-xl font-medium">Hats</li>
            <li className="cursor-pointer hover:text-blue-500 py-2 px-4 text-xl font-medium">Cups</li>
            <li className="cursor-pointer hover:text-blue-500 py-2 px-4 text-xl font-medium">Blankets</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-[80%] px-5">
          <h2 className="text-2xl font-semibold mb-3 text-center text-[#222]">All Products</h2>
          <div className="grid grid-cols-3 gap-4">
            { products && products.length > 0 &&
              products.map((product)=>(
                <ProductCard key={product.id} name={product.productName} price={product.price} image={product.productImage} navigationLink={product.productLink} />
              ))
            }
          </div>
        </div>
      </div>


    </div>
  );
};

const ProductCard = ({ name , price , image , navigationLink }) => {
  return (
    <div className="bg-white cursor-pointer border-[1px] border-[#C6C6C6] rounded-[10px] shadow-md overflow-hidden p-2.5 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-blue-900/30">
      <div className="h-48 bg-gray-200 rounded-[9px] overflow-hidden">
        <img src={image} alt="Product Image" className="w-full h-full object-contain" />
      </div>
      <div className="pt-4 pb-2 px-1">
        <h3 className="text-xl font-medium mb-1">{name}</h3>
        <p className="text-base mb-4">${price}</p>
        <button className="w-full py-2 bg-gradient-to-r from-[#4686BC] to-[#002F5F] text-white font-medium rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-cyan-700/15">
          Order
        </button>
      </div>
    </div>
  );
};

export default Tab8MainPage
