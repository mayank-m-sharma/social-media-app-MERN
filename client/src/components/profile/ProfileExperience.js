import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => (
  <div>
    <h3 className='text-dark'>{company}</h3>
    <p>
      <Moment format='MMMM Do, YYYY'>{from}</Moment> -{' '}
      {!to ? 'Present' : <Moment format='MMMM Do, YYYY'>{to}</Moment>}
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    {/* {!description ? (
      <p>test</p>
    ) : (
     
    )} */}
    {description && (
      <p>
        <strong>Descrption: </strong> {description}
      </p>
    )}
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
