import React from 'react';
import { format } from 'date-fns';

const DateFormatter = ({ date }) => {
  // Convert the prop (string) to a Date object
  const dateObject = new Date(date);

  // Check if the dateObject is valid before proceeding
  if (isNaN(dateObject)) {
    return <p>Invalid date format</p>;
  }

  const formattedDate = format(dateObject, 'yyyy MMM dd HH:mm:ss');
  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};

export default DateFormatter;
