import React, { useEffect, useState } from 'react';

const UserProfile = () => {
    /**
     * @typedef {Object} User
     * @property {string} name
     * @property {string} email
     * @property {string} [phone]
     * @property {string} [address]
     * @property {string} [dob]
     * @property {string} [gender]
     */

    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa

    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
        setUser(loggedInUser);
    }, []);

    const handleInputChange = (e) => {
        if (user) {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const handleSave = () => {
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user)); // Lưu thông tin vào localStorage
            setIsEditing(false); // Thoát chế độ chỉnh sửa
            alert('Thông tin đã được cập nhật!');
        }
    };

    if (!user) {
        return <p>Không có thông tin người dùng.</p>;
    }

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Thông tin cá nhân</h2>
            <div className="space-y-2">
                <div>
                    <label className="block font-medium">Tên:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    ) : (
                        <p>{user.name}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Email:</label>
                    <p>{user.email}</p> {/* Email không chỉnh sửa */}
                </div>
                <div>
                    <label className="block font-medium">Số điện thoại:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="phone"
                            value={user.phone || ''}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    ) : (
                        <p>{user.phone || 'Chưa cập nhật'}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Địa chỉ:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="address"
                            value={user.address || ''}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    ) : (
                        <p>{user.address || 'Chưa cập nhật'}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Ngày tháng năm sinh:</label>
                    {isEditing ? (
                        <input
                            type="date"
                            name="dob"
                            value={user.dob || ''}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    ) : (
                        <p>{user.dob || 'Chưa cập nhật'}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Giới tính:</label>
                    {isEditing ? (
                        <select
                            name="gender"
                            value={user.gender || ''}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded w-full p-2"
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    ) : (
                        <p>{user.gender || 'Chưa cập nhật'}</p>
                    )}
                </div>
            </div>
            {isEditing ? (
                <div className="flex gap-4">
                    <button
                        onClick={handleSave}
                        className="bg-primary text-white px-4 py-2 rounded"
                    >
                        Lưu
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                    >
                        Hủy
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary text-white px-4 py-2 rounded"
                >
                    Chỉnh sửa
                </button>
            )}
        </div>
    );
};

export default UserProfile;