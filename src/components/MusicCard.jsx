import React, { Component } from 'react';
import PropTypes, { bool, func } from 'prop-types';
// import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      // favorites: [],
      // isFavorite: false,
    };
  }

  // async componentDidMount() {
  //   getFavoriteSongs();
  // }
  // const { trackName, previewUrl, trackId } = this.props;
  // handleChangeFavourite = async ({ target }) => {
  //   this.setState({
  //     loading: true,
  //   });
  //   await addSong();
  //   this.setState({
  //     loading: false,
  //   });
  //   console.log(target);
  // }

  render() {
    const { trackName, previewUrl, trackId, song, checked, onChange } = this.props;
    const { loading } = this.state;
    return (
      <div>
        { loading && (
          <div><Loading /></div>
        ) }
        <h2>{trackName}</h2>
        {' '}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor="checkbox"
        >
          <input
            id="checkbox"
            type="checkbox"
            name="favourite"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
            // onChange={ () => handleChangeFavourite(trackId) }
            onChange={ () => onChange(song, checked) }
          />
          Favorita

        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  song: PropTypes.shape({}).isRequired,
  checked: bool.isRequired,
  onChange: func.isRequired,
};
