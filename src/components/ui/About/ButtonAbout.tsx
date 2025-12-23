import React, { useState } from 'react';
import { ModalAbout } from './ModalAbout';

const ButtonAbout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button className=" bg-[#F5AFAF] hover:bg-[#F9DFDF] text-[#7D7373] font-bold py-2 px-4 rounded transition duration-150;"
        onClick={toggleModal}
      >
        About & How to Use
      </button>

      {isOpen && (
        <ModalAbout toggleModal={toggleModal}/>)}

    </>
  );
};

export default ButtonAbout;