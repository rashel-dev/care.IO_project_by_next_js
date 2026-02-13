import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-4">
            <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-600">404</h1>
            <h2 className="text-2xl mt-4 font-semibold">Page Not Found</h2>
            <p className="text-gray-400 mt-2 text-center max-w-md">
                Oops! The page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <Link href="/" className="mt-8 btn bg-cyan-500 hover:bg-cyan-600 text-white border-none px-8">
                Go Back Home
            </Link>
            
        </div>
    );
};

export default NotFound;
