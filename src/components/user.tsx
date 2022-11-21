import React from 'react';

interface Props {
  user: any;
}

const User: React.FC<Props> = (props) => {
  const { user } = props;
  const { photoURL, displayName } = user;

  return (
    <div className="flex items-center shrink-0">
      <img className="w-10 h-10 rounded-full mr-2" src={photoURL} alt={displayName} />
      <span className="hidden md:block">{displayName}</span>
    </div>
  );
};

export default User;
