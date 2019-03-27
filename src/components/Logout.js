import React from 'react';

const Logout = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.logoutClick();
  };

  return (
    <button type="button" onClick={handleClick} className="btn btn-primary">
      Sign out
    </button>
  );
};

export default Logout;
