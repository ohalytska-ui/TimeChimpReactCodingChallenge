import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Player from '../components/Player';
import Auth from '../components/Auth';

function CoreLayout({ children , history }) {
  
  let params = new URLSearchParams(window.location.hash.substring(1));
  const [token, setToken] = useState(params.get('access_token'));

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(
      (res) => {
        if (!res.ok) {
          throw Error(res.status);
        }
        return res.json();
      }).catch( error => { setToken(0);})
  }, []);

  return (
    token ? 
    (
      <div className="main">
        <SideBar />
        <div className="main__content">
          <Header history={history} />
          <div className="main__content__child">
            {children}
          </div>
        </div>
        <Player />
      </div>
    ): 
    (
      <Auth />
    )
  );
}

export default CoreLayout;
