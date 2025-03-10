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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">WELCOME TO THE RATE TRACKER PROSHOP</h1>
        <p className="text-lg mt-2">Shop branded apparel and items for the Rate Tracker team | Free standard shipping on all orders over $50</p>
      </header>

      <div className="flex max-w-7xl mx-auto my-8">
        <nav className="w-64 bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-800">Explore ProShop</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="#"
                onClick={() => handleCategoryChange("all")}
                className="block py-2 px-4 text-gray-700 hover:bg-blue-600 hover:text-white rounded"
              >
                All Products
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleCategoryChange("men")}
                className="block py-2 px-4 text-gray-700 hover:bg-blue-600 hover:text-white rounded"
              >
                Men's Apparel
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleCategoryChange("women")}
                className="block py-2 px-4 text-gray-700 hover:bg-blue-600 hover:text-white rounded"
              >
                Women's Apparel
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleCategoryChange("bags")}
                className="block py-2 px-4 text-gray-700 hover:bg-blue-600 hover:text-white rounded"
              >
                Bags
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleCategoryChange("hats")}
                className="block py-2 px-4 text-gray-700 hover:bg-blue-600 hover:text-white rounded"
              >
                Hats
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleCategoryChange("cups")}
                className="block py-2 px-4 text-gray-700 hover:bg-blue-600 hover:text-white rounded"
              >
                Cups
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleCategoryChange("blankets")}
                className="block py-2 px-4 text-gray-700 hover:bg-blue-600 hover:text-white rounded"
              >
                Blankets
              </a>
            </li>
          </ul>
        </nav>

        <section className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {selectedCategory === "all" ? "All Products" : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4 text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <button
                  onClick={() => handleOrder(item)}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 focus:outline-none"
                >
                  Order
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};


export default Tab8MainPage
