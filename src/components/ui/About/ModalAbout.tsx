import React, { useState } from 'react';


export const ModalAbout = ( { toggleModal }) => {

    return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={toggleModal} 
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="w-full h-48 bg-gray-200">
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">Coming soon</h2>
              <p className="text-gray-600 mt-2 leading-relaxed text-left">
                Today's Action: Today Only
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}