import React, { useState } from 'react';
import { DollarSign, Package, Lock, Upload, BarChart2, User } from 'lucide-react';
import '../../public/css/vendorDashboard.css';

function VendorDashboard({ user, changePassword }) {
  const [products, setProducts] = useState(user.products || []);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', image: '' });
  const [dashboardView, setDashboardView] = useState('products');
  const [passwordChange, setPasswordChange] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewProduct({ ...newProduct, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts([...products, { ...newProduct, id: products.length + 1, sales: 0 }]);
    setNewProduct({ name: '', price: '', stock: '', image: '' });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    try {
      await changePassword({
        currentPassword: passwordChange.currentPassword,
        newPassword: passwordChange.newPassword,
      });
      alert('Password changed successfully!');
      setPasswordChange({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordError('');
    } catch (error) {
      setPasswordError('Failed to change password. Please try again.');
    }
  };

  const totalSales = products.reduce((sum, product) => sum + product.price * product.sales, 0);
  const totalStock = products.reduce((sum, product) => sum + parseInt(product.stock, 10), 0);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="vendor-dashboard">
      <h2>Welcome, {user.name}!</h2>

      {/* Profile dropdown */}
      <div className="profile-dropdown">
        <div className="profile-logo" onClick={toggleDropdown}>
          <img src={user.profileImage || 'https://avatar.iran.liara.run/public/6'} alt="Profile" className="profile-logo-img" />
        </div>
        {dropdownOpen && (
          <div className="profile-dropdown-menu">
            <button onClick={() => setDashboardView('profile')}>Profile Details</button>
            <button onClick={() => setDashboardView('changePassword')}>Change Password</button>
          </div>
        )}
      </div>

      <nav className="dashboard-nav">
        {['products', 'analytics'].map((view) => (
          <button
            key={view}
            onClick={() => setDashboardView(view)}
            className={dashboardView === view ? 'active' : ''}
          >
            {view === 'products' ? <Package /> : <BarChart2 />}
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </nav>

      {dashboardView === 'products' && (
        <>
          <div className="product-list">
            <h3>Your Products</h3>
            {products.length ? (
              <div className="product-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.image || '/placeholder.svg'} alt={product.name} className="product-image" />
                    <h4>{product.name}</h4>
                    <p className="price"><DollarSign size={14} /> {parseFloat(product.price).toFixed(2)}</p>
                    <p>Stock: {product.stock}</p>
                  </div>
                ))}
              </div>
            ) : <p>You haven't added any products yet.</p>}
          </div>
          <form onSubmit={handleAddProduct} className="add-product-form">
            <h3>Add New Product</h3>
            {['name', 'price', 'stock'].map((field) => (
              <input
                key={field}
                type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newProduct[field]}
                onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
                required
              />
            ))}
            <input type="file" accept="image/*" onChange={handleFileChange} required />
            <button type="submit" className="upload-btn"><Upload className="btn-icon" /> Add Product</button>
          </form>
        </>
      )}

      {dashboardView === 'analytics' && (
        <div className="analytics">
          <h3>Sales Analytics</h3>
          <div className="analytics-cards">
            <div className="analytics-card">
              <h4>Total Sales</h4>
              <p><DollarSign size={18} /> {totalSales.toFixed(2)}</p>
            </div>
            <div className="analytics-card">
              <h4>Products</h4>
              <p>{products.length}</p>
            </div>
            <div className="analytics-card">
              <h4>Total Stock</h4>
              <p>{totalStock}</p>
            </div>
          </div>
        </div>
      )}

      {dashboardView === 'changePassword' && (
        <div className="change-password">
          <h3>Change Password</h3>
          <form onSubmit={handlePasswordChange} className="password-change-form">
            {passwordError && <p className="error-message">{passwordError}</p>}
            <input
              type="password"
              placeholder="Current Password"
              value={passwordChange.currentPassword}
              onChange={(e) => setPasswordChange({ ...passwordChange, currentPassword: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordChange.newPassword}
              onChange={(e) => setPasswordChange({ ...passwordChange, newPassword: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={passwordChange.confirmPassword}
              onChange={(e) => setPasswordChange({ ...passwordChange, confirmPassword: e.target.value })}
              required
            />
            <button type="submit" className="submit-btn">Update Password</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default VendorDashboard;
