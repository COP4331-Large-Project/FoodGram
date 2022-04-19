import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

function LoggedInName()
{
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;
    const doLogout = event => 
    {
    event.preventDefault();
        localStorage.removeItem("user_data")
        window.location.href = '/';
    };
  return(
   <div id="loggedInDiv">
    <span id="userName">Logged In As {firstName} {lastName}</span><br />
    <button type="button" id="logoutButton" class="btn btn-info" 
      onClick={doLogout}> Log Out
      <FontAwesomeIcon icon={faSignOut} size="lg" />
      </button>
   </div>
  );
};
export default LoggedInName;
