import React, { useState } from 'react';

const Diseases = () => {
  const [selectedDisease, setSelectedDisease] = useState(null); // State để lưu bệnh được chọn
  const [selectedSubDisease, setSelectedSubDisease] = useState(null); // State để lưu bệnh con được chọn

  const diseases = [
    { 
      name: 'Ung thư', 
      icon: '🎗️',
      subDiseases: ['Ung thư phổi', 'Ung thư vú', 'Ung thư dạ dày'],
    },
    { 
      name: 'Tim mạch', 
      icon: '❤️',
      subDiseases: ['Bệnh mạch vành', 'Suy tim', 'Tăng huyết áp'],
    },
    { 
      name: 'Nội tiết - chuyển hóa', 
      icon: '🩸',
      subDiseases: ['Tiểu đường', 'Bệnh cường giáp', 'Rối loạn lipid máu'],
    },
    { 
      name: 'Xương - khớp', 
      icon: '🦴',
      subDiseases: ['Thoái hóa khớp', 'Loãng xương', 'Viêm khớp dạng thấp'],
    },
    { 
      name: 'Da - Tóc', 
      icon: '🧴',
      subDiseases: ['Viêm da cơ địa', 'Rụng tóc', 'Mụn trứng cá'],
    },
    { 
      name: 'Máu', 
      icon: '🩸',
      subDiseases: ['Thiếu máu', 'Bệnh bạch cầu', 'Rối loạn đông máu'],
    },
    { 
      name: 'Hô hấp', 
      icon: '🌬️',
      subDiseases: ['Hen suyễn', 'Viêm phổi', 'Viêm xoang'],
    },
    { 
      name: 'Dị ứng', 
      icon: '🤧',
      subDiseases: ['Dị ứng thực phẩm', 'Dị ứng phấn hoa', 'Dị ứng thuốc'],
    },
    { 
      name: 'Mắt', 
      icon: '👁️',
      subDiseases: ['Cận thị', 'Đục thủy tinh thể', 'Viêm kết mạc'],
    },
  ];

  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold text-gray-800">Danh sách các bệnh</h1>
      <p className="mt-4 text-gray-600">Thông tin chi tiết về các bệnh thường gặp.</p>

      {/* Hiển thị danh sách bệnh chính */}
      {!selectedDisease && !selectedSubDisease && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {diseases.map((disease, index) => (
            <div
              key={index}
              className="w-full h-40 bg-blue-100 flex flex-col items-center justify-center rounded-lg shadow-md cursor-pointer hover:bg-blue-200"
              onClick={() => setSelectedDisease(disease)} // Cập nhật bệnh được chọn
            >
              <span className="text-4xl">{disease.icon}</span>
              <p className="text-lg font-semibold text-blue-600 mt-2">{disease.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Hiển thị danh sách bệnh con */}
      {selectedDisease && !selectedSubDisease && (
        <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">{selectedDisease.name}</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {selectedDisease.subDiseases.map((subDisease, index) => (
              <div
                key={index}
                className="w-40 h-20 bg-green-100 flex items-center justify-center rounded-lg shadow-md cursor-pointer hover:bg-green-200"
                onClick={() => setSelectedSubDisease(subDisease)} // Cập nhật bệnh con được chọn
              >
                <p className="text-md font-medium text-green-600">{subDisease}</p>
              </div>
            ))}
          </div>
          <button
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => setSelectedDisease(null)} // Quay lại danh sách bệnh chính
          >
            Quay lại
          </button>
        </div>
      )}

      {/* Hiển thị bảng thông tin */}
      {selectedSubDisease && (
        <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">{selectedSubDisease}</h2>
          <table className="table-auto w-full mt-6 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200">Nguyên nhân</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200">Triệu chứng</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200">Điều trị</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Yếu tố di truyền, lối sống không lành mạnh, môi trường độc hại</td>
                <td className="border border-gray-300 px-4 py-2">Đau, mệt mỏi kéo dài, sụt cân không rõ nguyên nhân</td>
                <td className="border border-gray-300 px-4 py-2">Sử dụng thuốc, phẫu thuật, thay đổi lối sống</td>
              </tr>
            </tbody>
          </table>
          <button
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => setSelectedSubDisease(null)} // Quay lại danh sách bệnh con
          >
            Quay lại
          </button>
        </div>
      )}
    </div>
  );
};

export default Diseases;