import React from "react";
import BookInfo from "./BookInfo";
import PropTypes from "prop-types";

const SearchResult = props => {
    const {books_item} = props;
    return (
        <div className="row">
          {books_item.map(item => (
            <BookInfo key={item.id} bookDetails={item} />
          ))}
        </div>
      );    
};

SearchResult.propTypes = {
    books_item: PropTypes.array
};

export default SearchResult;