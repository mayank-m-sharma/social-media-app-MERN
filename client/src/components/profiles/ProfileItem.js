import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={`http://localhost:3000/${avatar.slice(7)}`} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        {/* <h5>bring username here...</h5> */}
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li className='text-primary' key={index}>
            <i className='fas fa-check'>{skill}</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
