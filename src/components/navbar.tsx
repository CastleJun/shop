import React from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Button from './base-component/button';
import { useAuthContext } from './context/auth-context';
import User from './user';

interface Props {}

const Navbar: React.FC<Props> = () => {
  const { user, login, logout } = useAuthContext();

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shop</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        {user && <Link to="carts">Carts</Link>}
        {user && user?.isAdmin && (
          <Link to="products/new" className="text-2xl">
            <BsFillPencilFill />
          </Link>
        )}
        {!!user && <User user={user} />}
        {!user && <Button onClick={login} text="Login" />}
        {!!user && <Button onClick={logout} text="Logout" />}
      </nav>
    </header>
  );
};

export default Navbar;
