import React from "react";
import Rating from "react-rating";
import PropTypes from "prop-types";

const BookInfo = (props) => {
    const { bookDetails } = props;
    const bookTitle =  bookDetails.best_book.title;
    let titleTruncate = bookDetails.best_book.title.split(" ").slice(0, 4).join(" ");
    
    if (bookTitle.length > titleTruncate.length) {
        titleTruncate += "...";
    }

    return (
        <div className="col-sm-6 col-md-4 col-lg-4 mt-2 mb-2">
            <div className="card flex-md-row mb-2 shadow-sm h-md-150">
            <div className="card-body d-flex flex-column align-items-start">
               <strong className="d-inline-block mb-2 text-primary">{titleTruncate}</strong>
               <h6 className="mb-0">
                  <a className="text-dark" href="#">{bookDetails.best_book.author.name}</a>
               </h6>
               <div className="mb-1 text-muted small">Publication Year: {bookDetails.original_publication_year}</div>
               <div>
                <span className="mt-2 d-block small">Average Rating: <mark>{bookDetails.average_rating}</mark></span>
               <Rating initialRating={bookDetails.average_rating} readonly />
               </div>
               <a className="btn btn-outline-primary btn-sm" role="button" href={`https://www.goodreads.com/book/show/${bookDetails.best_book.id}`}>Continue reading</a>
            </div>
            <img className="card-img-right flex-auto d-none d-lg-block" alt={bookDetails.best_book.author.name} src={bookDetails.best_book.image_url}  style={{width: "150px", height: "200px"}}/>
         </div>                
        </div>
      );
}

BookInfo.propTypes = {
    prop: PropTypes.object
};

export default BookInfo;