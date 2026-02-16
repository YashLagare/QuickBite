import { useEffect, useRef, useState } from 'react';
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { categories } from '../category';
import CategoryCard from './CategoryCard';
import FoodCard from './FoodCard';
import Nav from './NaV.JSX';

function UserDashboard() {
  const { currentCity, shopInMyCity, itemsInMyCity, searchItems } = useSelector(state => state.user);
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const navigate = useNavigate();
  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);
  const [updatedItemsList, setUpdatedItemsList] = useState([]);

  const handleFilterByCategory = (category) => {
    if (category == "All") {
      setUpdatedItemsList(itemsInMyCity);
    } else {
      const filteredList = itemsInMyCity?.filter(i => i.category === category);
      setUpdatedItemsList(filteredList);
    }
  };

  useEffect(() => {
    setUpdatedItemsList(itemsInMyCity);
  }, [itemsInMyCity]);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth);
    }
  };

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const cateElement = cateScrollRef.current;
    const shopElement = shopScrollRef.current;

    const handleCateScroll = () => {
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
    };

    const handleShopScroll = () => {
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
    };

    if (cateElement) {
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
      cateElement.addEventListener('scroll', handleCateScroll);
    }

    if (shopElement) {
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
      shopElement.addEventListener('scroll', handleShopScroll);
    }

    return () => {
      if (cateElement) {
        cateElement.removeEventListener('scroll', handleCateScroll);
      }
      if (shopElement) {
        shopElement.removeEventListener('scroll', handleShopScroll);
      }
    };
  }, [categories]);

  return (
    <div className='w-screen min-h-screen flex flex-col items-center bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6] overflow-y-auto'>
      <Nav />

      {/* Main Content Container */}
      <div className='w-full max-w-7xl flex flex-col gap-10 px-4 sm:px-6 lg:px-8 pt-8 pb-16'>
        
        {/* Search Results Section */}
        {searchItems && searchItems.length > 0 && (
          <section className='w-full'>
            <div className='bg-white/70 backdrop-blur-sm rounded-3xl shadow-md p-6 sm:p-8'>
              <div className='mb-6'>
                <h2 className='text-[#2d2d2d] text-3xl sm:text-4xl font-bold'>
                  Search Results
                </h2>
                <div className='h-1 w-20 bg-gradient-to-r from-[#ff6b4a] to-[#ff8f6b] rounded-full mt-3'></div>
              </div>
              
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {searchItems.map((item) => (
                  <FoodCard data={item} key={item._id} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty Search Results */}
        {searchItems && searchItems.length === 0 && (
          <section className='w-full'>
            <div className='bg-white/60 backdrop-blur-sm rounded-3xl shadow-md p-12 text-center'>
              <div className='text-6xl mb-4'>🔍</div>
              <h3 className='text-2xl font-semibold text-[#2d2d2d] mb-2'>
                No results found
              </h3>
              <p className='text-[#6b6b6b] text-lg'>
                Try searching for something else
              </p>
            </div>
          </section>
        )}

        {/* Best Shops Section */}
        <section className='w-full'>
          <div className='mb-6'>
            <h2 className='text-[#2d2d2d] text-3xl sm:text-4xl font-bold'>
              Best Shops in {currentCity}
            </h2>
            <div className='h-1 w-20 bg-gradient-to-r from-[#ff6b4a] to-[#ff8f6b] rounded-full mt-3'></div>
          </div>

          {/* Empty State for Restaurants */}
          {(!shopInMyCity || shopInMyCity.length === 0) ? (
            <div className='bg-white/60 backdrop-blur-sm rounded-3xl shadow-md p-12 text-center'>
              <div className='text-6xl mb-4'>🏪</div>
              <h3 className='text-2xl font-semibold text-[#2d2d2d] mb-2'>
                No restaurants available in {currentCity}
              </h3>
              <p className='text-[#6b6b6b] text-lg'>
                We're expanding fast. Check back soon!
              </p>
            </div>
          ) : (
            <div className='relative'>
              {/* Left Scroll Button */}
              {showLeftShopButton && (
                <button
                  className='absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm text-[#ff6b4a] p-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-[calc(50%+2px)] transition-all duration-300 ease-out opacity-90 hover:opacity-100'
                  onClick={() => scrollHandler(shopScrollRef, "left")}
                >
                  <FaCircleChevronLeft size={24} />
                </button>
              )}

              {/* Scrollable Container */}
              <div
                className='w-full flex overflow-x-auto gap-5 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide'
                ref={shopScrollRef}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {shopInMyCity?.map((shop, index) => (
                  <div key={index} className='snap-start'>
                    <CategoryCard
                      name={shop.name}
                      image={shop.image}
                      onClick={() => navigate(`/shop/${shop._id}`)}
                    />
                  </div>
                ))}
              </div>

              {/* Right Scroll Button */}
              {showRightShopButton && (
                <button
                  className='absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm text-[#ff6b4a] p-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-[calc(50%+2px)] transition-all duration-300 ease-out opacity-90 hover:opacity-100'
                  onClick={() => scrollHandler(shopScrollRef, "right")}
                >
                  <FaCircleChevronRight size={24} />
                </button>
              )}
            </div>
          )}
        </section>

        {/* Food Items Section */}
        <section className='w-full'>
          <div className='mb-6'>
            <h2 className='text-[#2d2d2d] text-3xl sm:text-4xl font-bold'>
              Suggested Food Items
            </h2>
            <div className='h-1 w-20 bg-gradient-to-r from-[#ff6b4a] to-[#ff8f6b] rounded-full mt-3'></div>
          </div>

          {/* Empty State for Food Items */}
          {(!updatedItemsList || updatedItemsList.length === 0) ? (
            <div className='bg-white/50 backdrop-blur-sm rounded-3xl shadow-md p-12 text-center'>
              <div className='text-6xl mb-4'>🍽️</div>
              <h3 className='text-2xl font-semibold text-[#2d2d2d] mb-2'>
                No food items available in your area
              </h3>
              <p className='text-[#6b6b6b] text-lg'>
                Once restaurants start adding menus, they'll appear here.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {updatedItemsList?.map((item, index) => (
                <FoodCard key={index} data={item} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Hide Scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default UserDashboard;