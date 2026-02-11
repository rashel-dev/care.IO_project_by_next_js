import React from 'react';

const Products: React.FC = () => {
    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold mb-6">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Product placeholders */}
                <div className="card bg-base-100 shadow-xl border border-gray-800">
                    <div className="card-body">
                        <h2 className="card-title text-cyan-500">Service A</h2>
                        <p>High quality healthcare service for your needs.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary btn-sm">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
