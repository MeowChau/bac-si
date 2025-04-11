import React, { useState } from 'react';

const HealthTips = () => {
  const [selectedContent, setSelectedContent] = useState(''); // State để lưu nội dung được chọn

  const contentData = {
    'Phòng bệnh & Sống khỏe': [
      'Tập thể dục đều đặn giúp tăng cường sức khỏe.',
      'Ngủ đủ giấc để cơ thể phục hồi tốt hơn.',
      'Tránh xa các chất kích thích như thuốc lá và rượu bia.',
    ],
    'Dinh dưỡng': [
      'Ăn nhiều rau xanh và trái cây để bổ sung vitamin.',
      'Uống đủ 2 lít nước mỗi ngày.',
      'Hạn chế đồ ăn nhanh và thực phẩm chế biến sẵn.',
    ],
    'Mẹ & Bé': [
      'Bổ sung đầy đủ dinh dưỡng trong thai kỳ.',
      'Theo dõi lịch tiêm chủng cho bé.',
      'Tạo môi trường sống an toàn và lành mạnh cho trẻ.',
    ],
    'Người cao tuổi': [
      'Tập thể dục nhẹ nhàng như đi bộ hoặc yoga.',
      'Kiểm tra sức khỏe định kỳ.',
      'Ăn uống cân bằng để phòng ngừa bệnh tật.',
    ],
    'Khỏe đẹp': [
      'Uống đủ nước để giữ cho làn da khỏe mạnh.',
      'Sử dụng kem chống nắng khi ra ngoài.',
      'Duy trì chế độ ăn uống lành mạnh để giữ dáng.',
    ],
  };

  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold text-gray-800">Góc sức khỏe</h1>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {/* Các khối màu */}
        {Object.keys(contentData).map((key) => (
          <div
            key={key}
            className="w-60 h-40 bg-blue-100 flex items-center justify-center rounded-lg shadow-md cursor-pointer hover:bg-blue-200"
            onClick={() => setSelectedContent(key)} // Cập nhật nội dung khi nhấn
          >
            <p className="text-lg font-semibold text-blue-600">{key}</p>
          </div>
        ))}
      </div>

      {/* Hiển thị nội dung chi tiết */}
      {selectedContent && (
        <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">{selectedContent}</h2>
          <ul className="mt-4 text-gray-600 list-disc list-inside">
            {contentData[selectedContent].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HealthTips;