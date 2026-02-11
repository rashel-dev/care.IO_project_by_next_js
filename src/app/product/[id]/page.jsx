import React from 'react';

const ProductDetails = async ({params}) => {
   const data = await params;
   console.log(data);
    return (
        <div>
            This is product details of 
        </div>
    );
};

export default ProductDetails;