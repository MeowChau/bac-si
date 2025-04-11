import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HealthDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="py-1"
      >
        Bệnh & Góc sức khỏe
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 bg-white shadow-md rounded-md mt-2 w-40">
          <ul className="flex flex-col">
            <li
              onClick={() => {
                navigate('/diseases');
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Bệnh
            </li>
            <li
              onClick={() => {
                navigate('/health-tips');
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Góc sức khỏe
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HealthDropdown;