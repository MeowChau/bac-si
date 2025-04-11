import React from 'react';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = ({ onLogout, setShowDropdown }) => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        setShowDropdown(false); // Đóng dropdown trước khi điều hướng
        navigate(path);
    };

    return (
        <div
            className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // Ngăn dropdown đóng khi nhấn vào bên trong
        >
            <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleNavigate('/profile')} // Điều hướng đến trang cá nhân
            >
                Trang cá nhân
            </p>
            <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleNavigate('/my-appointments')} // Điều hướng đến lịch hẹn
            >
                Lịch hẹn của tôi
            </p>
            <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                    setShowDropdown(false); // Đóng dropdown
                    onLogout(); // Gọi hàm đăng xuất
                }}
            >
                Đăng xuất
            </p>
        </div>
    );
};

export default DropdownMenu;