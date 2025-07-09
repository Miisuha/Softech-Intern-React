import React, { useState, useEffect } from 'react';
import { 
  Home, Bell, BookOpen, Users, Book, GraduationCap, Gamepad2, Target,
  UserCheck, HelpCircle, Settings, Plus, FileDown, Search,
  Edit, Eye, Trash2, ChevronLeft, ChevronRight
} from 'lucide-react';
import './App.css';

interface User {
  id: number;
  code: string;
  name: string;
  accountType: string;
  email: string;
  createdDate: string;
  avatar: string; // ✅ add this
}


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchFilters, setSearchFilters] = useState({
    accountType: 'Học sinh',
    level: 'Tất cả',
    email: '',
    phone: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/users');
        const data = await res.json();

        const mappedUsers: User[] = data.map((user: any) => ({
          id: user.id,
          code: String(user.id).padStart(5, '0'),
          name: user.name,
          accountType: user.role || 'Học sinh',
          email: user.email,
          createdDate: new Date().toLocaleString(),
          avatar: user.avatar // ✅ map avatar
        }));


        setUsers(mappedUsers);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    console.log('Searching with filters:', searchFilters);
  };

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">
              <div className="logo-circle orange"></div>
              <div className="logo-circle blue"></div>
              <div className="logo-circle green"></div>
              <div className="logo-circle red"></div>
            </div>
            <span className="logo-text">Sách Số</span>
          </div>
        </div>
        <div className="header-right">
          <div className="notification-bell">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </div>
          <div className="user-profile">
            <div className="user-avatar">
              <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" alt="User" />
            </div>
            <span className="user-name">Test IT ON</span>
          </div>
        </div>
      </header>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <div className="nav-item"><Home size={20} /><span>Trang chủ</span></div>
            <div className="nav-item"><Bell size={20} /><span>Thông báo</span></div>
            <div className="nav-item"><BookOpen size={20} /><span>Sách điện tử (offline)</span></div>
            <div className="nav-item"><Users size={20} /><span>Cộng cụ</span></div>
            <div className="nav-item"><Book size={20} /><span>Sách điện tử</span></div>
            <div className="nav-item"><GraduationCap size={20} /><span>Lớp học</span></div>
            <div className="nav-item"><Gamepad2 size={20} /><span>Education Game</span></div>
            <div className="nav-item"><Target size={20} /><span>Hướng dẫn sử dụng</span></div>
            <div className="nav-section">
              <div className="nav-section-title">ADMINISTRATORS</div>
              <div className="nav-item"><UserCheck size={20} /><span>Thư viện</span></div>
              <div className="nav-item"><HelpCircle size={20} /><span>Quản lý câu hỏi</span></div>
              <div className="nav-item"><Users size={20} /><span>Quản lý lớp học</span></div>
              <div className="nav-item"><Target size={20} /><span>Ngân hàng đề kiểm tra</span></div>
              <div className="nav-item active"><Users size={20} /><span>Quản lý người dùng</span></div>
              <div className="nav-item"><Settings size={20} /><span>Type & OptionType</span></div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="breadcrumb">
            <Home size={16} />
            <span>Administration</span>
            <span className="separator">›</span>
            <span>Quản lý người dùng</span>
          </div>

          <div className="content-header">
            <h1>QUẢN LÝ NGƯỜI DÙNG</h1>
            <div className="content-actions">
              <button className="btn btn-primary"><Plus size={16} />Thêm người dùng</button>
              <button className="btn btn-secondary"><FileDown size={16} />Nhập từ excel</button>
            </div>
          </div>

          {/* Search Filters */}
          <div className="search-filters">
            <div className="filter-group">
              <label>Loại tài khoản:</label>
              <select 
                value={searchFilters.accountType}
                onChange={(e) => handleFilterChange('accountType', e.target.value)}
              >
                <option value="Học sinh">admin</option>
                <option value="Giáo viên">customer</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Email:</label>
              <input 
                type="text"
                value={searchFilters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
                placeholder="Nhập email..."
              />
            </div>
            <div className="filter-group">
              <label>Họ và tên:</label>
              <input 
                type="text"
                value={searchFilters.phone}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                placeholder="Nhập họ và tên..."
              />
            </div>
            <button className="btn btn-search" onClick={handleSearch}>
              <Search size={16} />Tìm kiếm
            </button>
          </div>

          {/* Data Table */}
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mã</th>
                  <th>Họ và tên</th>
                  <th>Loại tài khoản</th>
                  <th>Email</th>
                  <th>Ngày tạo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{user.code}</td>
                    <td>
                      <div className="user-cell">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="user-avatar-small" 
                          style={{ width: '24px', height: '24px', borderRadius: '50%', marginRight: '6px' }}
                        />
                        {user.name}
                      </div>
                    </td>
                    <td><span className="account-type">{user.accountType}</span></td>
                    {/* <td><span className={`level-badge level-${user.level.replace(' ', '-').toLowerCase()}`}>{user.level}</span></td> */}
                    <td>{user.email}</td>
                    {/* <td>{user.phone || ''}</td> */}
                    <td>{user.createdDate}</td>
                    <td className="actions">
                      <button className="action-btn edit"><Edit size={14} /></button>
                      <button className="action-btn view"><Eye size={14} /></button>
                      <button className="action-btn delete"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <div className="pagination-info"><span>1 2 3 4 5 ... {totalPages}</span></div>
            <div className="pagination-controls">
              <button className="pagination-btn" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}><ChevronLeft size={16} /></button>
              <span className="pagination-current">10 / trang</span>
              <button className="pagination-btn" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}><ChevronRight size={16} /></button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
