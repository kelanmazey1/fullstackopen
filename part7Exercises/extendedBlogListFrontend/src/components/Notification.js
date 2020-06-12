import React from 'react';

const Notification = ({ notification, isError }) => {
  if (notification === null) {
    return null;
  }

  let className = null;

  if (isError) {
    className = 'error';
  } else {
    className = 'notification';
  }

  return (
    <div className={className}>
      {notification}
    </div>
  );
};

export default Notification;
