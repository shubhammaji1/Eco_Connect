import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Upload, Edit, Trash2, DollarSign, BarChart2, Package } from 'lucide-react';
import '../../public/css/vendorVault.css';

// Simulated user data (replace with actual authentication and API calls in a real app)
const existingUser = {
  email: 'vendor@example.com',
  password: 'password123',
  name: 'Eco Vendor',
  products: [
    { id: 1, name: 'Eco-friendly Water Bottle', price: 15.99, stock: 50, sales: 120, image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: 'Bamboo Utensil Set', price: 12.99, stock: 30, sales: 85, image: "/placeholder.svg?height=200&width=200" },
  ]
};

function LoginForm({ onLogin, onToggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (email === existingUser.email && password === existingUser.password) {
      onLogin(existingUser);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" method='POST'>
      <h2>Login to VendorVault</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="input-group">
        <Mail className="input-icon" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <Lock className="input-icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-btn">Login</button>
      <p>Don't have an account? <button type="button" onClick={onToggleForm} className="toggle-form-btn">Sign up</button></p>
    </form>
  );
}

function SignupForm({ onToggleForm }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // In a real app, you would send this data to your backend
    alert('Sign up successful! Please log in with your new account.');
    onToggleForm();
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign up for VendorVault</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="input-group">
        <User className="input-icon" />
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <Mail className="input-icon" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <Lock className="input-icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <Lock className="input-icon" />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-btn">Sign Up</button>
      <p>Already have an account? <button type="button" onClick={onToggleForm} className="toggle-form-btn">Login</button></p>
    </form>
  );
}

function VendorDashboard({ user }) {
  const [products, setProducts] = useState(user.products);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [dashboardView, setDashboardView] = useState('products');

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
      sales: 0,
      image: "/placeholder.svg?height=200&width=200"
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: '', price: '', stock: '' });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, price: product.price, stock: product.stock });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProducts = products.map(p => 
      p.id === editingProduct.id ? { ...p, ...newProduct } : p
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', stock: '' });
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
  };

  const totalSales = products.reduce((sum, product) => sum + (product.price * product.sales), 0);
  const totalStock = products.reduce((sum, product) => sum + parseInt(product.stock), 0);

  return (
    <div className="vendor-dashboard">
      <h2>Welcome, {user.name}!</h2>
      <nav className="dashboard-nav">
        <button onClick={() => setDashboardView('products')} className={dashboardView === 'products' ? 'active' : ''}>
          <Package /> Products
        </button>
        <button onClick={() => setDashboardView('analytics')} className={dashboardView === 'analytics' ? 'active' : ''}>
          <BarChart2 /> Analytics
        </button>
      </nav>
      
      {dashboardView === 'products' && (
        <>
          <div className="product-list">
            <h3>Your Products</h3>
            {products.length > 0 ? (
              <div className="product-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h4>{product.name}</h4>
                    <p className="price"><DollarSign size={14} /> {product.price.toFixed(2)}</p>
                    <p>Stock: {product.stock}</p>
                    <div className="product-actions">
                      <button onClick={() => handleEditProduct(product)} className="edit-btn">
                        <Edit size={14} /> Edit
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="delete-btn">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>You haven't added any products yet.</p>
            )}
          </div>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="add-product-form">
            <h3>{editingProduct ? 'Update Product' : 'Add New Product'}</h3>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              required
            />
            <button type="submit" className="upload-btn">
              {editingProduct ? (
                <>
                  <Edit className="btn-icon" />
                  Update Product
                </>
              ) : (
                <>
                  <Upload className="btn-icon" />
                  Add Product
                </>
              )}
            </button>
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
          <div className="sales-by-product">
            <h4>Sales by Product</h4>
            {products.map(product => (
              <div key={product.id} className="sales-item">
                <span>{product.name}</span>
                <span>{product.sales} sold</span>
                <span><DollarSign size={14} /> {(product.price * product.sales).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function VendorVault() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="vendor-vault">
      <h1>VendorVault</h1>
      {user ? (
        <VendorDashboard user={user} />
      ) : (
        isLogin ? (
          <LoginForm onLogin={handleLogin} onToggleForm={toggleForm} />
        ) : (
          <SignupForm onToggleForm={toggleForm} />
        )
      )}
    </div>
  );
}