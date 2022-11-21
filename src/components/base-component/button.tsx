import React from 'react';

interface Props {
  text: string;
  onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
  const { text, onClick } = props;
  return (
    <button className="bg-brand py-2 px-4 text-white rounded-sm hover:brightness-110" type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
