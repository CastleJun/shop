import React from 'react';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';

import { Product } from '../api/firebase';
import { useCart } from '../hooks/useCart';

interface Props {
  product: Product;
}

const ICON_CLASS = 'className="transition-all cursor-pointer hover:text-brand hover:scale-105';

const CartItem: React.FC<Props> = (props) => {
  const { product } = props;
  const { quantity, id, title, option, price, image } = product;
  const { removeItem, addOrUpdateItem } = useCart();

  const handleDelete = () => {
    removeItem.mutate(id);
  };

  const handleMinus = () => {
    if (quantity < 2) {
      return;
    }

    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };

  const handlePlus = () => {
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  };

  return (
    <li className="flex justify-between my-2 items-center">
      <img className="w-24 md:w-48 rounded-lg" src={image} alt={title} />
      <div className="flex flex-1 justify-between ml-4">
        <div className="basis-3/5">
          <p className="text-lg">{title}</p>
          <p className="text-xl font-bold text-brand">{option}</p>
          <p className="">₩{price.toLocaleString()}원</p>
        </div>
        <div className="text-2xl flex items-center">
          <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
          <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
