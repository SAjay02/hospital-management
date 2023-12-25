import React, { useState, useEffect } from 'react';
import { MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const SearchBar = ({setSelectedProduct}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  // const [selectedProduct, setSelectedProduct] =useState('');
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/items?q=${searchQuery}`);
        const data = await response.json();
        // console.log(data)
        setSuggestions(data || []); // Ensure suggestions is always an array
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    if (searchQuery.trim() !== '') {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);
  
  const filteredSuggestions = suggestions.filter((suggestion) =>
  suggestion.name.toLowerCase().includes(searchQuery.toLowerCase())
);

// Inside the SearchBar component
const handleSuggestionClick = (suggestion) => {
  setSelectedProduct(suggestion);
};

  return (
    <div className="position-absolute mt-0 mt-md-3" style={{ marginLeft: '150px' }}>
      <MDBCol md="12">
        <div className="input-group md-form form-sm form-1 pl-0 ">
          <div className="input-group-prepend">
            <span className="input-group-text purple lighten-3" id="basic-text1">
              <MDBIcon className="text-white" icon="search" />
            </span>
          </div>
          <input
            className="form-control my-0 py-1"
            type="text"
            placeholder="Search Products"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredSuggestions.length > 0 && searchQuery.trim() !== '' && (
          <div className="dropdown mt-1" style={{ zIndex: '1001' }}>
            <ul className="dropdown-menu show">
              {filteredSuggestions.map((suggestion) => (
                <li key={suggestion.id}>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={()=>handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </MDBCol>
    </div>
  );
};
export default SearchBar;
