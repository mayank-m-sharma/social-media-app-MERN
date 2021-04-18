import React, { Fragment } from 'react';

function NotFound() {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle'>404 Not Found</i>
      </h1>
      <p className='large'>Sorry, the page you're looking for does not exist</p>
    </Fragment>
  );
}

export default NotFound;
