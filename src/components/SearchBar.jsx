import React, { useState, useEffect } from "react";
import { MDBCol, MDBIcon } from "mdb-react-ui-kit";
import { Modal, Button } from "react-bootstrap";
import "./Searchbar.css";
import '../pages/BillingForm.css'
import {ProductDetailsModal} from './Current'
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa6";

const SearchBar = ({ setSelectedProduct }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [showModal, setShowModal] = useState(false);


  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  // const [selectedProduct, setSelectedProduct] =useState('');


  const handleModalClose = () => {
    setSelectedItemDetails(null);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/data?q=${searchQuery}`
        );
        const data = await response.json();
        console.log(data);
        setSuggestions(data || []); // Ensure suggestions is always an array
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (searchQuery.trim() !== "") {
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
    setSelectedItemDetails(suggestion);
    console.log(selectedItemDetails);
    setIsModalOpen(true);
  };

  // const ItemModal = ({ isModalOpen, selectedItemDetails, closeModal }) => {
  //   if (!isModalOpen || !selectedItemDetails) {
  //     return null;
  //   }

  //   // Render your modal content here based on selectedItemDetails

  //   return (
  //     <div className="modal">
  //       <div className="modal-content">
  //         {/* Render item details inside the modal */}
  //         <h2>{selectedItemDetails.name}</h2>
  //         {/* <p>{selectedItemDetails.description}</p> */}
  //         {/* Add other details as needed */}
  //         <button onClick={closeModal}>Close</button>
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <div
      className="position-absolute mt-0 mt-md-3"
      style={{ marginLeft: "150px" }}
    >
      <MDBCol md="12">
        <div className="input-group md-form form-sm form-1 pl-0 ">
          <div className="input-group-prepend">
            <span
              className="input-group-text purple lighten-3"
              id="basic-text1"
            >
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
        {filteredSuggestions.length > 0 && searchQuery.trim() !== "" && (
          <div className="dropdown mt-1" style={{ zIndex: "1001" }}>
            <ul className="dropdown-menu show">
              {filteredSuggestions.map((suggestion) => (
                <li key={suggestion.id}>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </MDBCol>
      {/* <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItemDetails?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Description : {selectedItemDetails?.description}</p>
          <p>Manufacture Date : {selectedItemDetails?.manufactureDate}</p>
          <p>Expiry Date : {selectedItemDetails?.expiryDate}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
      {isModalOpen &&
          // <ProductDetailsModal
          // show={true}
          // onHide={handleModalClose}
          // product={selectedItemDetails}
          <Modal show={true} onHide={handleModalClose}>
          <div className="modal-body" >
            <Modal.Header >
              <Modal.Title style={{ fontStyle: "italic" }}>
                {selectedItemDetails.name.toUpperCase()} Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <span>
                  DESCRIPTION <MdOutlineDescription size={30} />: &nbsp;
                </span>{" "}
                {selectedItemDetails.description}
              </p>
              <p>
                <span>
                  QUANTITY <MdOutlineProductionQuantityLimits size={30} /> : &nbsp;
                </span>
                {selectedItemDetails.quantity}
              </p>
              <p>
                <span>
                  EXPIRY DATE <BsCalendar2DateFill size={30} /> : &nbsp;
                </span>
                {selectedItemDetails.expiryDate}
              </p>
              <p>
                <span>
                  COST <GiMoneyStack size={30} /> : Rs.
                </span>
                {selectedItemDetails.cost}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="in-button billing-btn"
                variant="secondary"
                onClick={()=>setIsModalOpen(false)}
              >
                Close
              </button>
            </Modal.Footer>
          </div>
        </Modal>
        
      }
      
      

      {/* <ProductDetailsModal values = {selectedItemDetails}/> */}
      {/* <ItemModal
      isModalOpen={isModalOpen}
      selectedItemDetails={selectedItemDetails}
      closeModal={() => setIsModalOpen(false)}
    /> */}
    </div>
  );
};
export default SearchBar;
