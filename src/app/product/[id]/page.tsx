import React from 'react';

interface Params {
  id: string;
}

const ProductDetails = async ({ params }: { params: Promise<Params> }) => {
    const { id } = await params;
    
    return (
        <div className="container mx-auto p-8">
            <div className="max-w-4xl mx-auto bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-gray-800">
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-cyan-500 mb-4">Product Details</h1>
                    <div className="badge badge-outline mb-6">ID: {id}</div>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Detailed information for product {id} will be displayed here. 
                        This is a server-rendered page optimized for SEO and performance.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <button className="btn bg-cyan-500 hover:bg-cyan-600 text-white border-none px-8">Book Appointment</button>
                        <button className="btn btn-outline">Back to Products</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
