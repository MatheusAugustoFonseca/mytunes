import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    loading: false,
    favorite: [],
    // checked: true,
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    await getFavoriteSongs();
    this.setState({
      loading: false,
      favorite: await getFavoriteSongs(),
    });
  }

  handleChangeFavourite = async (song) => {
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

  // handleChangeFavourite = async (song, checked) => {
  //   // console.log(song);
  //   if (!checked) {
  //     this.setState({
  //       loading: true,
  //     }, async () => {
  //       addSong(song);
  //       this.setState({
  //         favorite: await getFavoriteSongs(),
  //         loading: false,
  //       });
  //     });
  //   } else {
  //     this.setState({
  //       loading: true,
  //     }, async () => {
  //       removeSong(song);
  //       this.setState({
  //         favorite: await getFavoriteSongs(),
  //         loading: false,
  //       });
  //     });
  //   }
  // }

  render() {
    const { loading, favorite } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {/* { loading && <Loading /> } */}
        { loading ? <Loading /> : (
          favorite.map((song) => (
            <MusicCard
              key={ song.trackId }
              trackId={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              song={ song }
              checked={ favorite.some(({ trackId }) => trackId === song.trackId) }
              onChange={ this.handleChangeFavourite }
            />
          ))
        )}
        {/* { } */}

      </div>
    );
  }
}
