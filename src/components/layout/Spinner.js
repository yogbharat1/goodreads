import React from "react";
import loader from './preloader.gif';
const Spinner = () => {
    return (
        <div>
            <img 
                src={loader} 
                alt="Loading....." 
                style={{ width: '200px', margin: ' 40px auto', display: 'block' }} 
            />
        </div>
    );
};
export default Spinner;