import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Cart from './pages/cart';
import Home from './pages/home';
import NewProduct from './pages/new-product';
import NotFound from './pages/not-found';
import ProductDetail from './pages/product-detail';
import Products from './pages/products';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/products', element: <Products /> },
      { path: '/products/id', element: <ProductDetail /> },
      { path: '/products/new', element: <NewProduct /> },
      { path: '/cart', element: <Cart /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
