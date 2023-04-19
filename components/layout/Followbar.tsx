import React from 'react';

const Followbar = () => {
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="font-semibold text-white text-xl">
          Who to follow
        </h2>
        <div className="flex flex-col gap-6 mt-4"></div>
      </div>
    </div>
  );
};

export default Followbar;
