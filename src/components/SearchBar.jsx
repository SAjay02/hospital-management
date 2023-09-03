import {} from '@fortawesome/react-fontawesome'
import React from 'react'

import {MDBCol,MDBIcon}from "mdb-react-ui-kit"
const SearchBar = () => {
  return (
    <div className="position-absolute mt-2 mt-md-4" style={{marginLeft:"150px"}}>
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
      />
    </div>
  </MDBCol>
  </div>
  )
}

export default SearchBar