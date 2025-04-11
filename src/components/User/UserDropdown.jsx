import React, { useState } from 'react';
import DropdownMenu from '../DropdownMenu';

const UserDropdown = ({ onLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="relative">
            <img
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-8 h-8 rounded-full cursor-pointer"
                src="https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg" // Thay bằng đường dẫn icon của bạn
                alt="Profile"
            />
            {showDropdown && (
                <DropdownMenu
                    onLogout={onLogout}
                    setShowDropdown={setShowDropdown} // Truyền hàm để đóng dropdown
                />
            )}
        </div>
    );
};

export default UserDropdown;