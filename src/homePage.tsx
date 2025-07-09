import React, { useState } from 'react';

import LoginForm from './LoginForm';
import './App.css';

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <div className="logo-icon"></div>
          <span className="logo-text">Sách Số</span>
        </div>
        <nav className="nav">
          <a href="#">Trang chủ</a>
          <a href="#">Phương Nam</a>
          <a href="#" onClick={() => setShowLogin(true)}>Đăng nhập</a>
          <a href="#">Đăng ký học sinh</a>
        </nav>
      </header>

      {/* Content */}
      <section className="content">
        {/* Image */}
        <div className="image-container">
          <img
            src="/homepage.png"
            alt="Kids with teacher"
            className="main-image"
          />
        </div>

        {/* Text */}
        <div className="text-container">
          <h2 className="title">SÁCH GIÁO KHOA TIẾNG ANH</h2>
          <p className="description">
            Áp dụng phương pháp học tập khoa học mới hệ thống học trực tuyến thông minh, ứng dụng công nghệ 4.0 với trí tuệ nhân tạo.<br/><br/>
            Việc áp dụng phương pháp mới này không những mang lại hiệu quả cao, tiết kiệm thời gian mà còn mang đến tính sáng tạo, tư duy độc lập, sự tìm tòi, nghiên cứu của học sinh.
          </p>
        </div>
      </section>

      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </div>
    
  );
}
