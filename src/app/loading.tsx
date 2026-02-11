import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
            <span className="loading loading-spinner loading-lg text-cyan-500"></span>
        </div>
    );
};

export default Loading;
