import React, { Component } from 'react';
import SearchResult from './SearchResult';
import PropTypes from "prop-types";
import Spinner from '../layout/Spinner';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY || "oi7pCcEqNJg6LxF6yWQa5A";

class Search extends Component {
  state = {
    searchText: "",
    searchResults:[],
    getdata: false,
    onerror: ""
  }

  onTxtChange = e => {
    this.setState({searchText: e.target.value});
  }

  onBtnClick = (e) => {
    e.preventDefault();
    const reqUri = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${this.state.searchText}`;
    
    axios.get(reqUri).then(res => {
      this.parseXMLResponse(res.data);
    })
    .catch(err => {
      this.setState({
        onerror: err.toString(),
        getdata: false
      })
    });

    this.setState({getdata: true});
  }

  // parse string xml received from goodreads api
  parseXMLResponse = response => {
    const parser = new DOMParser();
    const XMLResponse = parser.parseFromString(response, "application/xml");
    const parseError = XMLResponse.getElementsByTagName("parsererror");

    if (parseError.length) {
      this.setState({
        error: "There is an error to get result.",
        getdata: false
      });
    } else {
      const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
      const searchResults = XMLresults.map(result => this.XMLToJson(result));
      this.setState({ searchResults:searchResults, getdata: false });
    }
  };

  // Function to convert simple XML document into JSON.
  // Loops through each child and saves it as key, value pair
  // if there are sub-children, call the same function recursively on its children.
  XMLToJson = XML => {
    const allNodes = new Array(...XML.children);
    const jsonResult = {};
    allNodes.forEach(node => {
      if (node.children.length) {
        jsonResult[node.nodeName] = this.XMLToJson(node);
      } else {
        jsonResult[node.nodeName] = node.innerHTML;
      }
    });
    return jsonResult;
  };
  
  render() {
    return (
      <React.Fragment>
            <div className="card card-body mb-4 p-2">
              <h1 className="display-6 text-center">
                <i className="fas fa-book-open" /> Search Book
              </h1>
              <p className="lead text-center">What are you reading?</p>
              <form>
                <div className="form-group row">
                    <div className="col-sm-9 mb-2"><input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search Books"
                        name="searchText"
                        onChange={this.onTxtChange}
                        value={this.state.searchText}
                      />
                    </div>
                    <div className="col-sm-3 mb-2">
                      <button
                        className="btn btn-primary--modified btn-lg btn-block "
                        onClick={this.onBtnClick}
                      >
                        Search
                      </button>
                    </div>                  
                </div>                
              </form>
            </div>
            
            {this.state.getdata ? (
              <Spinner />
            ) : (
            (this.state.error && (
              <p className="text-danger">{this.state.onerror}</p>
            )) || <SearchResult books_item={this.state.searchResults} />
          )}
        </React.Fragment>
    );
}}
      
SearchResult.propTypes = {
  searchResults: PropTypes.array
};  


export default Search;
