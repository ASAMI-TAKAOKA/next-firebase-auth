import React from 'react';

export type ModalProps = {
  open: boolean;
  clickOkToCloseTheModal: () => void;
};

const BabyFoodRegistrationModal = (props: ModalProps) => {
  return props.open ? (
    <>
      <div className="bg-white  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-48 p-5 flex flex-col items-start absolute z-20">
        <h1 className="text-xl font-bold mb-5">Title</h1>
        <p className="text-lg mb-5">Modal Message.</p>
        <div className="flex mt-auto w-full">
          <button
            className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-2 mx-auto"
            onClick={() => props.clickOkToCloseTheModal()}
          >
            OK
          </button>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default BabyFoodRegistrationModal;
