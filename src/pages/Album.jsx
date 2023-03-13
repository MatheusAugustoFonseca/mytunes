import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    songs: [],
    infos: {},
    loading: false,
    favorite: [],
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    await getFavoriteSongs();
    // console.log(await getFavoriteSongs());
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    // console.log(response);
    const allSongs = response.filter((songTag) => songTag.kind);
    this.setState({
      infos: response[0],
      songs: [...allSongs],
      favorite: await getFavoriteSongs(),
      loading: false,
    });
  }

  handleChangeFavourite = async (song, checked) => {
    // console.log(song);
    if (!checked) {
      this.setState({
        loading: true,
      }, async () => {
        addSong(song);
        this.setState({
          favorite: await getFavoriteSongs(),
          loading: false,
        });
      });
    } else {
      this.setState({
        loading: true,
      }, async () => {
        removeSong(song);
        this.setState({
          favorite: await getFavoriteSongs(),
          loading: false,
        });
      });
    }
  }

  render() {
    const { infos, songs, loading, favorite } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <h1 data-testid="artist-name">
              Nome do artista:
              {' '}
              {infos.artistName}
            </h1>
            <h1 data-testid="album-name">
              Nome do album:
              {' '}
              { infos.collectionName }
            </h1>
            <div>
              { songs.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  trackId={ song.trackId }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  song={ song }
                  checked={ favorite.some(({ trackId }) => trackId === song.trackId) }
                  onChange={ this.handleChangeFavourite }
                />
              ))}
            </div>
          </div>
        )}

      </div>
    );
  }
}

Album.propTypes = {
  match: shape({
    params: shape({
      id: string.isRequired,
    }).isRequired,
  }).isRequired,
  // match: PropTypes.objectOf(PropTypes.string).isRequired,
  // params: PropTypes.objectOf(PropTypes.string).isRequired,
  // id: PropTypes.string.isRequired,
};
