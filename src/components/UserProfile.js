import React from "react";

const UserProfile = ({ ...props }) => {
  return (
    <div className="user-profile">
      <img src={props.src} alt={props.alt} />
    </div>
  );
};

export default UserProfile;
