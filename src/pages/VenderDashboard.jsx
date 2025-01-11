import React, { useState } from 'react';
import { DollarSign, Edit, Trash2, BarChart2, Package, Upload } from 'lucide-react';
import '../../public/css/vendorDashboard.css';

function VendorDashboard({ user }) {
  const [products, setProducts] = useState(user.products || []); // Initialize with user products or an empty array
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [dashboardView, setDashboardView] = useState('products');

  // Add a new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: products.length + 1, // Unique ID
      sales: 0,
      image: '/placeholder.svg?height=200&width=200', // Placeholder image
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: '', price: '', stock: '' });
  };

  // Edit a product
  const handleEditProduct = (product) => {
    setEditingProduct(product); // Set the product to edit
    setNewProduct({ name: product.name, price: product.price, stock: product.stock });
  };

  // Update the product
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? { ...p, ...newProduct } : p
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', stock: '' });
  };

  // Delete a product
  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((p) => p.id !== productId);
    setProducts(updatedProducts);
  };

  const totalSales = products.reduce((sum, product) => sum + product.price * product.sales, 0);
  const totalStock = products.reduce((sum, product) => sum + parseInt(product.stock, 10), 0);

  return (
    <div className="vendor-dashboard">
      <h2>Welcome, {user.name}!</h2>
      <nav className="dashboard-nav">
        <button
          onClick={() => setDashboardView('products')}
          className={dashboardView === 'products' ? 'active' : ''}
        >
          <Package /> Products
        </button>
        <button
          onClick={() => setDashboardView('analytics')}
          className={dashboardView === 'analytics' ? 'active' : ''}
        >
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
                    <p className="price">
                      <DollarSign size={14} /> {parseFloat(product.price).toFixed(2)}
                    </p>
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
              <p>
                <DollarSign size={18} /> {totalSales.toFixed(2)}
              </p>
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
    </div>
  );
}

export default VendorDashboard;
