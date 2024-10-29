import React, { useEffect, useState } from 'react';
// import './CustomDropdown.scss'; // Import your SCSS file here

const CustomDropdown = () => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(""); // State to hold the selected item

  useEffect(() => {
    // Fetch items from the Fake Store API
    const fetchItems = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setItems(data.slice(0, 5)); // Get the first 5 items
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems();
  }, []);

  // Function to handle item selection
  const handleSelect = (item) => {
    setSelectedItem(item.title); // Set the selected item's title to the input field
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="dropdown">
      <input
        type="text"
        className="dropdown-input"
        value={selectedItem}
        readOnly
        placeholder="Select an item"
      />
      <button
        className="dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        ▼
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {items.map(item => (
            <li
              key={item.id}
              className="dropdown-item"
              onClick={() => handleSelect(item)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
