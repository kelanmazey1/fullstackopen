import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.text === null) {
    return null;
  }

  let className = null;

  if (notification.error) {
    className = 'error';
  } else {
    className = 'notification';
  }

  return (
    <div className={className}>
      {notification.text}
    </div>
  );
};

export default Notification;
