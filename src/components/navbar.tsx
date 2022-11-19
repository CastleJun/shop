import React from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface Props {}

const Navbar: React.FC<Props> = (props) => {
  return (
    <header>
      <Link to="/">
        <FiShoppingBag />
        <h1>Shop</h1>
      </Link>
      <nav>
        <Link to="/products">Products</Link>
        <Link to="carts">Carts</Link>
        <Link to="products/new">
          <BsFillPencilFill />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
};

export default Navbar;
