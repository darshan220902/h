// home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home-container">
      <div className="header_top_bar_container">
        <div className="mobile_header_sidebars_div">
          <a href="#mobile_sidebar" onClick={() => fetchHtml('mobile_sidebar')}>
            <img src="https://i.ibb.co/Pw5S8P0/sidebar.png" alt="Sidebar" className="mobile_header_sidebar_img" />
          </a>
        </div>
        <a href="/store" className="buy-button">
          <img src="https://i.ibb.co/HHJtHqW/Vintage-Clothes-Garage-Sale-Flyer-41.png" alt="Vintage Clothes Flyer" width="55" height="30" />
        </a>
      </div>
      <div className="popup_space_div"></div>
      <div className="popup_loading_space_div">
        <span className="fa fa-spinner fa-spin spin_speed_0_3"></span>
      </div>
      <div className="mobile_header_container">
        <div className="mobile_header_fixed">
          <div className="mobile_header_logo_div">
            <a href="">
              <img src="https://i.ibb.co/y8HpSD2/Pink-Feminim-Retro-Y2-K-Fashion-Logo-211.png" alt="Logo" className="mobile_header_logo_img" />
            </a>
          </div>
          <div className="mobile_header_search_div">
            <a href="copoun" onClick={() => fetchHtml('copoun')}>
              <img src="https://cdn4.iconfinder.com/data/icons/shopping-commerce-sticker-icons-part-1/202/Coupon-128.png" alt="Offers" className="mobile_header_search_img" />
            </a>
          </div>
          <div className="mobile_header_search_div">
            <a href="search" onClick={() => fetchHtml('search')}>
              <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-128.png" alt="Search" className="mobile_header_search_img" />
            </a>
          </div>
          <div className="mobile_header_search_div">
            <a href="#" onClick={handleIconClick}>
              <img src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-128.png" alt="User" className="mobile_header_search_img" />
            </a>
          </div>
          <div className="mobile_header_search_div">
            <a href="">
              <img src="https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/bag-128.png" alt="Cart" className="mobile_header_search_img" />
            </a>
          </div>
        </div>
      </div>
      <div className="header_marginer"></div>
      <div className="bg_light_grey">
        <link rel="stylesheet" href="https://kwabey.com/shared/css/slider/swiper.min.css" />
        <style>
          {`
            .swiper-container {
              width: 100%;
              height: auto;
            }
            .swiper-pagination-bullet {
              background: #000;
              opacity: 0.7;
            }
            .swiper-pagination-bullet-active {
              background: #ffffff;
            }
            .swiper-slide {
              text-align: center;
              font-size: 18px;
              height: auto !important;
              background: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Welcome</h2>
            <button onClick={() => navigate('/register')}>Register</button>
            <button onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Define the fetchHtml function
const fetchHtml = (id) => {
  // Implement the fetch logic based on your requirements
  console.log(`Fetch HTML for: ${id}`);
};

export default HomePage;
