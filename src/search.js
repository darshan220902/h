import React, { useState } from 'react';
import './search.css'; // Ensure this path is correct based on your file structure

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [likedItems, setLikedItems] = useState({});

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (searchQuery) query.append('query', searchQuery);
    if (selectedColor) query.append('color', selectedColor);
    if (selectedPriceRange) query.append('price', selectedPriceRange);

    fetch(`http://127.0.0.1:5000/api/clothing?${query.toString()}`)
      .then(response => response.json())
      .then(data => setFilteredItems(data))
      .catch(error => console.error('Error fetching clothing items:', error));
  };

  const handleLikeToggle = (productId) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [productId]: !prevLikedItems[productId]
    }));
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      
      <div className="filter-container">
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="filter-select"
        >
          <option value="">All Colors</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Orange">Orange</option>
          <option value="Purple">Purple</option>
          <option value="Yellow">Yellow</option>
          <option value="Gray">Gray</option>
          
          {/* Add more colors as needed */}
        </select>

        <select
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Prices</option>
          <option value="0-250">0 - 250</option>
          <option value="251-500">251 - 500</option>
          <option value="501-750">501 - 750</option>
          <option value="751-1000">751 - 1000</option>
          {/* Add more price ranges as needed */}
        </select>
        
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      <div className="clothing-list">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.ProductID} className="clothing-item">
              <div className="heart-button-container">
                <button onClick={() => handleLikeToggle(item.ProductID)}>
                  {likedItems[item.ProductID] ? '❤️' : '🤍'}
                </button>
              </div>
              <h2>{item.Type}</h2>
              <p>Color: {item.Color}</p>
              <p>Price: ${item.Price}</p>
              <div className="button-container">
                <button>Add to Cart</button>
                <button>Buy Now</button>
              </div>
            </div>
            
          ))
        ) : (
          <div className="no-results">No items found</div>
        )}
      </div>
    </div>
  );
};

export default Search;
