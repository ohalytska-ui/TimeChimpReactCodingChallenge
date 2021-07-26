import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadphonesAlt,
  faHeart,
  faPlayCircle,
  faSearch, faStream,
} from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Avatar } from '../../../assets/images/avatar.svg';
import './_sidebar.scss';

function renderSideBarOption(link, icon, text, { selected } = {}) {
  return (
    <div
      className={cx('sidebar__option', { 'sidebar__option--selected': selected })}
    >
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  )
}

let params = new URLSearchParams(window.location.hash.substring(1));
let token = params.get('access_token');

export default function SideBar() {
  
  const [me, setMe] = useState([]);
  const [avatar, setAvatar] = useState([]);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => res.json()).then(
      (result) => {
        if (!("error" in result)){
          setMe(result.display_name);
        }
      }
    )
    
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => res.json()).then(
      (result) => {
        if (!("error" in result)){
          setAvatar(result.images);
        }
      }
    )
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        {
          (avatar.length===0)? 
          (<Avatar />):
          (<div className="sidebar__profile__avatar" style={{ backgroundImage: `url(${avatar[0].url})`, backgroundPosition: `center`, backgroundSize: `80% auto`}}/>)
        }
        <p>{me}</p>
      </div>
      <div className="sidebar__options">
        {renderSideBarOption('/', faHeadphonesAlt, 'Discover', { selected: true })}
        {renderSideBarOption('/search', faSearch, 'Search')}
        {renderSideBarOption('/favourites', faHeart, 'Favourites')}
        {renderSideBarOption('/playlists', faPlayCircle, 'Playlists')}
        {renderSideBarOption('/charts', faStream, 'Charts')}
      </div>
    </div>
  );
}
