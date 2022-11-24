import React from 'react';

interface Props {
  text: string;
  price?: number;
}

const PriceCard: React.FC<Props> = (props) => {
  const { price, text } = props;

  return (
    <div className="bg-gray-50 p-8 mx-2 rounded-2xl text-center text-lg md:text-xl">
      <p>{text}</p>
      <p className="font-bold text-brand text-xl md:text-2xl">₩{price?.toLocaleString()}원</p>
    </div>
  );
};

export default PriceCard;
