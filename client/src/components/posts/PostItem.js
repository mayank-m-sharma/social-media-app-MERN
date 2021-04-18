import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  deletePost,
  auth,
  post: { _id, text, media, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  const [fillHeart, toggleHeartFill] = useState(false);

  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img post-avatar' src={`http://localhost:3000/${avatar.slice(7)}`} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        {media && (
          <div className='post-media-container'>
            <img
              width='300px'
              src={`http://localhost:3000/${media.slice(7)}`}
              alt=''
            />
          </div>
        )}
        {showActions && (
          <Fragment>
            <br></br>
            <hr></hr>
            <div className='post-action-container'>
              <span
                onClick={(e) => {
                  addLike(_id);
                  toggleHeartFill(!fillHeart);
                }}
                className='post-likes lead p-1'
                type='button'
              >
                <i
                  className={fillHeart ? 'fas fa-heart' : 'far fa-heart'}
                  id='heart'
                ></i>
                <span className='post-likes-count'>{likes.length} likes</span>
              </span>
              <Link to={`/post/${_id}`} class='mt-20'>
                <p className='lead post-comment'>
                  <i className='fas fa-comments'>
                    <span className='hide-sm'> Comments</span>
                    {comments.length > 0 && (
                      <span class='comment-count'> {comments.length}</span>
                    )}
                  </i>
                </p>
              </Link>
              <p className='lead mt-20 post-share'>
                <i className='fas fa-share'>
                  <span className='hide-sm'> Share</span>
                </i>
              </p>
            </div>
            <p class='post-date'>
              Posted <Moment fromNow>{date}</Moment>
            </p>
            <div className='deletePost'>
              {!auth.loading && user === auth.user._id && (
                <button
                  type='button'
                  onClick={(e) => deletePost(_id)}
                  class='btn red'
                >
                  <i class='fas fa-times'></i>
                </button>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, deletePost })(PostItem);
