import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import config from '../../../config';
import './_auth.scss';

export default function Auth() {

  function handleOnClickAuth () {
    var url = config.api.url;
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(config.api.clientId);
    url += '&scope=' + encodeURIComponent(config.api.scope);
    url += '&redirect_uri=' + encodeURIComponent(config.api.redirectUrl);
    window.location = url;
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <h1>Please log in to the application <FontAwesomeIcon icon={faSignInAlt} /></h1>
        <button onClick={handleOnClickAuth} className="auth__btn">Log in with Spotify</button>
      </div>
    </div>
  );
}

