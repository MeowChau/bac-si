import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [state, setState] = useState('Đăng kí'); // Trạng thái đăng ký hoặc đăng nhập
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(''); // Lưu lỗi nếu có
    const navigate = useNavigate();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (state === 'Đăng kí') {
            // Lấy danh sách người dùng từ localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Kiểm tra xem email đã tồn tại chưa
            const userExists = users.some((user) => user.email === email);
            if (userExists) {
                setError('Email đã được sử dụng!');
                return;
            }

            // Thêm người dùng mới vào danh sách
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users)); // Lưu vào localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(newUser)); // Lưu trạng thái đăng nhập
            alert('Đăng ký thành công!');
            navigate('/'); // Chuyển hướng đến trang chủ
        } else {
            // Đăng nhập
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find((user) => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user)); // Lưu trạng thái đăng nhập
                alert(`Chào mừng, ${user.name}!`);
                navigate('/'); // Chuyển hướng đến trang chủ
            } else {
                setError('Email hoặc mật khẩu không đúng!');
            }
        }
    };

    return (
        <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
                <p className="text-2xl font-semibold">{state === 'Đăng kí' ? 'Tạo tài khoản' : 'Đăng nhập'}</p>
                <p>Vui lòng {state === 'Đăng kí' ? 'đăng kí' : 'đăng nhập'} để đặt lịch</p>
                {error && <p className="text-red-500">{error}</p>}
                {state === 'Đăng kí' && (
                    <div className="w-full">
                        <p>Tên</p>
                        <input
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                )}
                <div className="w-full">
                    <p>Email</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div className="w-full">
                    <p>Mật khẩu</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>
                <button className="bg-primary text-white w-full py-2 rounded-md text-base">
                    {state === 'Đăng kí' ? 'Tạo tài khoản' : 'Đăng nhập'}
                </button>
                {state === 'Đăng kí' ? (
                    <p>
                        Đã có tài khoản?{' '}
                        <span
                            onClick={() => {
                                setState('Đăng nhập');
                                setError('');
                            }}
                            className="text-primary underline cursor-pointer"
                        >
                            Đăng nhập tại đây
                        </span>
                    </p>
                ) : (
                    <p>
                        Tạo tài khoản mới?{' '}
                        <span
                            onClick={() => {
                                setState('Đăng kí');
                                setError('');
                            }}
                            className="text-primary underline cursor-pointer"
                        >
                            Ấn vào đây
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;