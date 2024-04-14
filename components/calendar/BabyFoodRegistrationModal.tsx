import React from 'react';

export type ModalProps = {
  open: boolean;
  clickOkToCloseTheModal: () => void;
};

const BabyFoodRegistrationModal = ({ open, clickOkToCloseTheModal }: ModalProps) => {
  return open ? (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="rounded-md bg-white w-80 h-auto p-5 flex flex-col items-center">
        <h1 className="text-gray-700 text-xl font-bold mb-5">Title</h1>
        <p className="text-gray-700 text-lg mb-5">Modal Message.</p>
        <div className="flex justify-center w-full">
          <button
            className="bg-pink-400 hover:bg-pink-700 text-white px-8 py-2 rounded-md focus:outline-none focus:ring font-medium"
            onClick={clickOkToCloseTheModal}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default BabyFoodRegistrationModal;
