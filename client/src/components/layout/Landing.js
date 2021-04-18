import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import video from './landingvideo3.mp4';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='landing-body'>
      <header className='v-header landing-container'>
        <div className='fullscreen-video-wrap'>
          <video src={video} autoPlay loop muted></video>
        </div>
        <div className='header-overlay'></div>
        <div className='header-content'>
          <h1>Binary Diary</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed sit
            nostrum harum rem maiores consequuntur delectus laboriosam molestias
            explicabo ab.
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-large landing-btn'>
              Sign Up
            </Link>
            <Link
              to='/login'
              className='btn btn-large black-text white landing-btn'
            >
              Login
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
