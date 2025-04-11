import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import UserDropdown from './User/UserDropdown'; // Import UserDropdown

const NavBar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null); // Trạng thái người dùng đăng nhập
    const [showDropdown, setShowDropdown] = useState(false); // Dropdown cho "Bệnh & Góc sức khỏe"
    const dropdownTimeout = useRef(null); // Ref để lưu timeout cho dropdown

    // Lấy thông tin người dùng từ localStorage khi component được render
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        setLoggedInUser(user);
    }, []);

    // Lắng nghe sự thay đổi của localStorage để cập nhật trạng thái
    useEffect(() => {
        const handleStorageChange = () => {
            const user = JSON.parse(localStorage.getItem('loggedInUser'));
            setLoggedInUser(user);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser'); // Xóa thông tin người dùng khỏi localStorage
        setLoggedInUser(null); // Cập nhật trạng thái
        navigate('/login'); // Chuyển hướng đến trang đăng nhập
    };

    const handleMouseEnter = () => {
        if (dropdownTimeout.current) {
            clearTimeout(dropdownTimeout.current); // Hủy timeout nếu có
        }
        setShowDropdown(true); // Hiển thị dropdown ngay lập tức
    };

    const handleMouseLeave = () => {
        dropdownTimeout.current = setTimeout(() => {
            setShowDropdown(false); // Đóng dropdown sau một khoảng thời gian
        }, 1000); // Thời gian chờ (1000ms)
    };

    const handleOptionClick = (path) => {
        navigate(path); // Điều hướng đến trang được chọn
        setShowDropdown(false); // Thu dropdown lại
    };

    return (
        <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
            <img onClick={() => navigate('/')} className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />
            <ul className="hidden md:flex items-start gap-5 font-medium">
                <NavLink to="/">
                    <li className="py-1">Trang chủ</li>
                </NavLink>
                <NavLink to="/doctors">
                    <li className="py-1">Tất cả bác sĩ</li>
                </NavLink>
                <NavLink to="/about">
                    <li className="py-1">Về chúng tôi</li>
                </NavLink>
                <NavLink to="/contact">
                    <li className="py-1">Liên hệ</li>
                </NavLink>
                {/* Dropdown cho "Bệnh & Góc sức khỏe" */}
                <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <button
                        className="py-1"
                        onClick={(e) => {
                            e.stopPropagation(); // Ngăn sự kiện đóng dropdown
                            setShowDropdown(!showDropdown);
                        }}
                    >
                        Bệnh & Góc sức khỏe
                    </button>
                    {showDropdown && (
                        <div
                            className="absolute top-full left-0 bg-white shadow-md rounded-md mt-2 w-40"
                            onClick={(e) => e.stopPropagation()} // Ngăn dropdown đóng khi nhấn vào bên trong
                        >
                            <ul className="flex flex-col">
                                <li
                                    onClick={() => handleOptionClick('/diseases')}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    Bệnh
                                </li>
                                <li
                                    onClick={() => handleOptionClick('/health-tips')}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    Góc sức khỏe
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </ul>
            <div className="flex items-center gap-4">
                {loggedInUser ? (
                    <UserDropdown onLogout={handleLogout} /> // Hiển thị dropdown khi đã đăng nhập
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
                    >
                        Tạo tài khoản
                    </button>
                )}
                <img
                    onClick={() => setShowMenu(true)}
                    className="w-6 md:hidden"
                    src={assets.menu_icon}
                    alt="Menu"
                />
                {/* ------mobile menu---- */}
                <div
                    className={`${
                        showMenu ? 'fixed w-full' : 'h-0 w-0'
                    } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
                >
                    <div className="flex items-center justify-between px-5 py-6">
                        <img className="w-36" src={assets.logo} alt="Logo" />
                        <img
                            className="w-7"
                            onClick={() => setShowMenu(false)}
                            src={assets.cross_icon}
                            alt="Close"
                        />
                    </div>
                    <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
                        <NavLink onClick={() => setShowMenu(false)} to="/">
                            <p className="px-4 py-2 rounded inline-block">Trang chủ</p>
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/doctors">
                            <p className="px-4 py-2 rounded inline-block">Tất cả bác sĩ</p>
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/about">
                            <p className="px-4 py-2 rounded inline-block">Về chúng tôi</p>
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/contact">
                            <p className="px-4 py-2 rounded inline-block">Liên hệ</p>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;