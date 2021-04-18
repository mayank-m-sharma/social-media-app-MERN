import React, { Fragment, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { forgetPassword } from '../../actions/auth';
import M from 'materialize-css';
import PropTypes from 'prop-types';

const ResetPassword = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  });

  const { password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const tok = useParams();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      M.toast({
        html: `Passwords don't match`,
        classes: '#d32f2f red darken-2',
      });
    } else {
      const pack = {
        token: tok.token,
        password,
      };
      const res = forgetPassword(pack);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Reset Your Password</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Make a new password
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Add a new password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary'
          value='CHANGE PASSWORD'
        />
      </form>
    </Fragment>
  );
};

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(ResetPassword);
