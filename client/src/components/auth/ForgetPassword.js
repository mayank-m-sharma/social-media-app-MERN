import React, { Fragment, useState } from 'react';
import { sendResetLink } from '../../actions/auth';
import M from 'materialize-css';
const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    M.toast({
      html: 'Reset link has been sent to your email',
      classes: '#81c784 green lighten-2',
    });
    try {
      sendResetLink(email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Reset Your Password</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Provide your registered email, and we
        will send you a verification code.
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary'
          value='Send Verification Code'
        />
      </form>
    </Fragment>
  );
};
export default ForgetPassword;
