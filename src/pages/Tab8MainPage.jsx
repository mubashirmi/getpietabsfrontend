import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Loader from "../components/Loader";

const Tab8MainPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [ mainLoading, setMainLoading ] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/product")
      .then((response) => {
        setProducts(response.data);
        setMainLoading(false);
      })
      .catch((error) => {
        console.log("Error getting Products", error);
      });
  }, []);

  const categories = [
    { label: "All Products", value: "all" },
    { label: "Men's Apparel", value: "men" },
    { label: "Women's Apparel", value: "women" },
    { label: "Bags", value: "bag" },
    { label: "Hats", value: "hat" },
    { label: "Cups", value: "cup" },
    { label: "Blankets", value: "blanket" },
  ];

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    mainLoading ? <Loader /> :
    <div className="min-h-[calc(100vh-72px)] bg-white py-7 max-w-[1440px] w-[95%] mx-auto">
      <div className="mb-5">
        <div className="gap-x-7 rounded-tl-[200px] px-[140px] rounded-br-[200px] rounded-bl-[20px] rounded-tr-[20px] text-white w-full py-12 bg-gradient-to-r from-[#4686BC] to-[#002F5F] shadow-xl shadow-black/20 flex justify-center items-center rounded-[20px] gap-y-[10px]">
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
            {categories.map((category) => (
              <li
                key={category.value}
                className={`cursor-pointer py-2 px-4 text-xl font-medium ${
                  selectedCategory === category.value
                    ? "bg-white border-0 border-l-[5px] border-l-[#4686BC]"
                    : "hover:text-blue-500"
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-[80%] px-5">
          <h2 className="text-2xl font-semibold mb-3 text-center text-[#222]">
            {categories.find(cat => cat.value === selectedCategory)?.label || "All Products"}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts && filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.productName}
                  price={product.price}
                  image={product.productImage}
                  navigationLink={product.productLink}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ name, price, image, navigationLink }) => {
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

export default Tab8MainPage;