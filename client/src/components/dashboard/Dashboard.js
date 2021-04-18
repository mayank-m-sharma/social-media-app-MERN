import React, { useEffect, useState, useRef, Fragment } from "react";
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DashboardAction from "./DashboardAction";
import Experience from "./Experience";
import Education from "./Education";
import Spinner from "../layout/Spinner";
import { changeProfilePic } from "../../actions/auth";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {

  const [avatar, setMedia] = useState("");
  const [mediaPrefix, setMediaPrefix] = useState('');

  const mediaOnchange = (e) => {
    setMedia(e.target.files[0]);
    
    setMediaPrefix(e.target.files[0].name);
  };
  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    console.log(avatar)
    formData.append('avatar', avatar);
    changeProfilePic(formData, user._id);
    setMediaPrefix('');
    setMedia('')
  }
  useEffect(() => {
    getCurrentProfile();
    // window.localStorage.setItem('savedProfile', JSON.stringify(profile));
  }, [getCurrentProfile]);

  const flag = localStorage.getItem("savedProfile");
  const expFlag = localStorage.getItem("exp");
  const eduFlag = localStorage.getItem("edu");
  // console.log(eduFlag.length);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Profile</h1>
      <p className="lead">
        <i className="fas fa-user">Welcome {user && user.name}</i>
      </p>
      {flag !== null ? (
        <Fragment>
          <div className="dashboard-act">
            <div>
              <DashboardAction />
            </div>
            <div>
              <div className="dashboard-profile">
                {user && (
                  <div>
                    <label htmlFor="file-input">
                      <img
                        className="round-img post-avatar"
                        src={`http://localhost:3000/${user.avatar.slice(7)}`}
                        alt=""
                      />
                      <p>Change profile Picture</p> <span>{mediaPrefix}</span>
                      <form encType='multipart/form-data' onSubmit={e => onSubmit(e)}>
                        <input type='file' filename='avatar' onChange={mediaOnchange} className="hidden-input" id="file-input"/>
                        <input type="submit" className="btn" value="change"/>
                      </form>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="lead my-1">
            <a href={`/profile/${user._id}`}>View Profile as guest</a>
          </p>
          {expFlag.length > 2 ? (
            <Experience experience={profile.experience} />
          ) : (
            <p className="component-missing">No expereince found, Add some!</p>
          )}

          {eduFlag.length > 2 ? (
            <Education education={profile.education} />
          ) : (
            <p className="component-missing">
              No education detail found, Add some!
            </p>
          )}
          <div className="my-2">
            <button onClick={() => deleteAccount()} className="btn btn-danger">
              <i className="fas fa-user-minus"></i> DELETE ACCOUNT PERMANENTLY
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p className="component-missing">
            You have not yet setup a profile, please add some info
          </p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
