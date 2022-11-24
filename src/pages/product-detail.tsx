import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Product } from '../api/firebase';
import Button from '../components/base-component/button';
import { useCart } from '../hooks/useCart';

interface Props {}

const ProductDetail: React.FC<Props> = () => {
  const { state }: { state: { product: Product } } = useLocation();
  const { id, price, image, title, category, description, options } = state.product;
  const [success, setSuccess] = useState<string | null>(null);
  const [selected, setSelected] = useState(options && options[0]);

  const { addOrUpdateItem } = useCart();
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  const handleClick = () => {
    const product = { id, image, title, price, option: selected, quantity: 1 };

    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('장바구니에 추가되었습니다.');
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      },
    });
  };

  return (
    <>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img className="w-full px-4 basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">₩{price.toLocaleString()}</p>
          <p className="text-lg py-4">{description}</p>
          <div className="flex items-center">
            <label className="text-brand font-bold" htmlFor="select">
              옵션:
            </label>
            <select
              className="p-2 m-4 flex-1 border-2 border-dash border-brand outline-none"
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => {
                  const idNumber = index;
                  return <option key={`${id}${idNumber}`}>{option}</option>;
                })}
            </select>
          </div>
          {success && <p className="my-2">⭐️{success}</p>}
          <Button text="장바구니 추가" onClick={handleClick} />
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
