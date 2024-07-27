import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cloth.css'; // Import cloth.css for styling

const ClothingStore = () => {
  const [clothingItems, setClothingItems] = useState([]);
  const [likedItems, setLikedItems] = useState({}); // State to track liked items
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch clothing items from API
    fetch('http://127.0.0.1:5000/api/clothing')
      .then(response => response.json())
      .then(data => {
        setClothingItems(data);
      })
      .catch(error => console.error('Error fetching clothing items:', error));
  }, []);

  const handleLikeToggle = (productId) => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [productId]: !prevLikedItems[productId]
    }));

    // Add to wishlist API call
    fetch('http://127.0.0.1:5000/api/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ productId })
    }).catch(error => console.error('Error adding to wishlist:', error));
  };

  const handleAddToCart = (productId) => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    // Add to cart API call
    fetch('http://127.0.0.1:5000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ productId, quantity: 1 })
    }).catch(error => console.error('Error adding to cart:', error));
  };

  const handleBuyNow = (productId) => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    // Add to cart API call
    fetch('http://127.0.0.1:5000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ productId, quantity: 1 })
    }).then(() => {
      navigate('/checkout');
    }).catch(error => console.error('Error adding to cart:', error));
  };

  return (
    <div className="clothing-container">
      <h1>Clothing Store</h1>
      <div className="clothing-list">
        {clothingItems.map(item => (
          <div key={item.ProductID} className="clothing-item">
            <div className="heart-button-container">
              <button onClick={() => handleLikeToggle(item.ProductID)}>
                {likedItems[item.ProductID] ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="header-img" style={{ width: '100%' }}>
              <img src="https://kwabey.com/images/future-ahead-lilac-half-sleeve-t-shirt-for-men/540/1883.jpg" className="detailing_cat_image_1" style={{ width: '100%', height: 'auto' }} alt={item.Type} />
              <div className="category_showing" style={{ backgroundColor: 'rgba(255,255,255,0.8)', color: 'black', fontStyle: 'normal' }}>
                <span>100% Cotton</span>
              </div>
            </div>
            <h2>{item.Type}</h2>
            <p>Price: ${item.Price}</p>
            <div className="button-container">
              <button onClick={() => handleAddToCart(item.ProductID)}>Add to Cart</button>
              <button onClick={() => handleBuyNow(item.ProductID)}>Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothingStore;
