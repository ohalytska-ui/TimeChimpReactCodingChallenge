import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount() {
    let params = new URLSearchParams(window.location.hash.substring(1));
    let token = params.get('access_token');

    fetch("https://api.spotify.com/v1/browse/categories", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => res.json()).then(
      (result) => {
        if (!("error" in result)){
          this.setState({
            categories: result.categories.items
          });
        }
      }
    )

    fetch("https://api.spotify.com/v1/browse/new-releases", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => res.json()).then(
      (result) => {
        if (!("error" in result)){
          this.setState({
            newReleases: result.albums.items
          });
        }
      }
    )

    fetch("https://api.spotify.com/v1/browse/featured-playlists", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => res.json()).then(
      (result) => {
        if (!("error" in result)){
          this.setState({
            playlists: result.playlists.items
          });
        }
      }
    )
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
