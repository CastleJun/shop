import React from 'react';

interface Props {
  text: string;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
}

const Button: React.FC<Props> = (props) => {
  const { text, onClick, type = 'button', disabled } = props;
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className="bg-brand py-2 px-4 text-white rounded-sm hover:brightness-110"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
