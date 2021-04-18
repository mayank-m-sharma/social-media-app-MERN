import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost}) => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState('');
  const [mediaPrefix, setMediaPrefix] = useState('');
  const [enableButton, setEnableButton] = useState(0);

  const mediaOnchange = (e) => {
    setMediaPrefix(e.target.files[0].name);
    setMedia(e.target.files[0]);
  };

  const textOnChange = (e) => {
    setText(e.target.value)
    setEnableButton(e.target.value.length)
  }
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <p className="post-salutation">Say Something...</p>
        {/* <p>{name}</p> */}
      </div>
      <form
        className='form my-1'
        encType='multipart/form-data'
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append('text', text);
          formData.append('media', media);
          addPost(formData);
          setText('');
          setMediaPrefix('');
          setMedia('')
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          className="post-textarea"
          onChange={textOnChange}
        ></textarea>
        <div className="image-upload">
          <div>
          <label for="file-input">
            {/* <img src="" height="20px" width="20px"/> */}
            <i class="fas fa-paperclip"> Add Media</i>
           <span>{mediaPrefix}</span>
          </label>
          <input
          type='file'
          filename='media'
          id="file-input"
          className="hidden-input"
          // value={media}
          onChange={mediaOnchange}
        />
          </div>
        <div>
          <input type='submit' className={enableButton > 0 ? 'btn post-submit right-align' : 'btn disabled post-submit right-align'} value='Post' />
        </div>
        </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(null, { addPost })(PostForm);
