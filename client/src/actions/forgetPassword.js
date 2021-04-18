import React from 'react';
import axios from 'axios';
export const forgetPassword = (pack) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = axios.post('/api/resetpassword/newpassword', pack, config);

    // console.log(error);
  } catch (err) {
    alert(2);
  }
  // console.log(email);
};
