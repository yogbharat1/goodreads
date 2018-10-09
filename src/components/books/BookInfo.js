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
        <div className="col-sm-6 col-md-4 col-lg-4 mt-4 mb-4">
                <div className="card card-inverse card-info">
                    <img 
                        className="card-img-top"
                        alt={bookDetails.best_book.title}
                        src={bookDetails.best_book.image_url} 
                        style={{
                            width: "100%",
                            height: "5em",
                            ObjectFit: "cover"
                        }}/>
                    <div className="card-block">
                        <h5 className="card-title mt-3">{bookDetails.best_book.author.name}</h5>
                        
                        <div className="card-text">
                            {titleTruncate}
                        </div>
                    </div>
                    <div className="card-footer">
                        <Rating 
                        initialRating={bookDetails.average_rating}
                        readonly                        
                        /> <small>{bookDetails.average_rating}</small>
                        <a href={`https://www.goodreads.com/book/show/${
                    bookDetails.best_book.id
                }`} className="btn btn-info float-right btn-sm">More Info >></a>
                    </div>
                </div>
            </div>
      );
}

BookInfo.propTypes = {
    prop: PropTypes.object
};

export default BookInfo;