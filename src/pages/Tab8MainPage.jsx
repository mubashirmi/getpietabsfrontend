import React, { useState } from "react";

const Tab8MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const allProducts = [
    { id: 1, name: "1/4 Zip Men's Long Sleeve", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxA4l0tzEUFlgpoNO-xHbaUj83y8C2qHXXXA&s", category: "men" },
    { id: 2, name: "Short Sleeve Polo", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxA4l0tzEUFlgpoNO-xHbaUj83y8C2qHXXXA&s", category: "men" },
    { id: 3, name: "Long Sleeve T-shirt", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxA4l0tzEUFlgpoNO-xHbaUj83y8C2qHXXXA&s", category: "men" },
    { id: 4, name: "Dress", image: "https://www.shutterstock.com/image-vector/female-dresses-mockup-collection-dress-260nw-1868679853.jpg", category: "women" },
    { id: 5, name: "Skirt", image: "https://www.shutterstock.com/image-vector/female-dresses-mockup-collection-dress-260nw-1868679853.jpg", category: "women" },
    { id: 6, name: "Backpack", image: "https://via.placeholder.com/200x200?text=Backpack", category: "bags" },
    { id: 7, name: "Messenger Bag", image: "https://via.placeholder.com/200x200?text=Messenger+Bag", category: "bags" },
    { id: 8, name: "Beanie", image: "https://via.placeholder.com/200x200?text=Beanie", category: "hats" },
    { id: 9, name: "Cap", image: "https://via.placeholder.com/200x200?text=Cap", category: "hats" },
    { id: 10, name: "Coffee Mug", image: "https://via.placeholder.com/200x200?text=Coffee+Mug", category: "cups" },
    { id: 11, name: "Travel Mug", image: "https://via.placeholder.com/200x200?text=Travel+Mug", category: "cups" },
    { id: 12, name: "Blanket", image: "https://via.placeholder.com/200x200?text=Blanket", category: "blankets" },
    { id: 13, name: "Throw Blanket", image: "https://via.placeholder.com/200x200?text=Throw+Blanket", category: "blankets" },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === "all"
    ? allProducts
    : allProducts.filter((product) => product.category === selectedCategory);

  const handleOrder = (item) => {
    alert(`Ordering: ${item.name}`);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white py-7 max-w-[1440px] w-[95%] mx-auto">
      <div className="mb-5 text-white flex-col py-12 bg-gradient-to-r from-[#4686BC] to-[#62956A] shadow-lg shadow-black/15 flex justify-center items-center rounded-[20px] gap-y-[10px]" >
        <h2 className="text-[32px] font-bold">Pie Back Calculator</h2>
        <p className="text-xl font-medium">Shop branded apparel and items for the Rate Tracker team | Free standard shipping on all orders over $50</p>
      </div>

      <div className="flex mt-8
      
      
      
      ">
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
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>


</div>
  );
};

const ProductCard = () => {
  return (
    <div className="bg-white border-[1px] border-[#C6C6C6] rounded-[10px] shadow-md overflow-hidden p-2.5 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-blue-900/30">
      <div className="h-48 bg-gray-200 rounded-[9px]"></div>
      <div className="pt-4 pb-2 px-1">
        <h3 className="text-xl font-medium mb-1">Men's Long Sleeve</h3>
        <p className="text-base mb-4">$20</p>
        <button className="w-full py-2 bg-gradient-to-r from-[#4686BC] to-[#62956A] text-white font-medium rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-cyan-700/15">
          Order
        </button>
      </div>
    </div>
  );
};

export default Tab8MainPage
