import React from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';

import Button from '../components/base-component/button';
import CartItem from '../components/cart-item';
import PriceCard from '../components/price-card';
import { useCart } from '../hooks/useCart';

interface Props {}

const SHIPPING = 3000;

const Cart: React.FC<Props> = () => {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products && (products.reduce((prev, current) => prev + current.price * current.quantity, 0) as number);

  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 py-4 px-8">
            {products?.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
          <div className="flex justify-between items-center mb-7 p-2 md:px-8 lg:px-16">
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill className="shrink-0" />
            <PriceCard text="상품 총액" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            <PriceCard text="상품 총액" price={(totalPrice ?? 0) + SHIPPING} />
          </div>
          <Button text="주문하기" />
        </>
      )}
    </section>
  );
};

export default Cart;
