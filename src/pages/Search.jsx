import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
state = {
  searchText: '',
  artist: '',
  btnDisabled: true,
  loading: false,
  results: [],
}

handleChange = ({ target }) => {
  this.setState({
    [target.name]: target.value,
  }, () => {
    const searchLengthNum = 2;
    const { searchText } = this.state;
    const lengthSearch = searchText.length;

    this.setState({ btnDisabled: lengthSearch < searchLengthNum });
  });
}

searchBtnClick = async (event) => {
  event.preventDefault();
  const { searchText } = this.state;
  this.setState({ loading: true });
  const response = await searchAlbumsAPI(searchText);
  this.setState({
    results: response,
    artist: searchText,
    loading: false,
    searchText: '',
  });
}

render() {
  const {
    searchText,
    btnDisabled,
    loading,
    results,
    artist,
  } = this.state;

  return (
    <div data-testid="page-search">
      <Header />
      { loading ? (
        <div><Loading /></div>
      ) : (
        <div>
          <form id="search-text">
            <label htmlFor="search-text">
              <input
                type="text"
                name="searchText"
                data-testid="search-artist-input"
                value={ searchText }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ btnDisabled }
              onClick={ this.searchBtnClick }
            >
              Pesquisar
            </button>
          </form>
          <div>
            <div>
              { results.length !== 0
               && (<h1>{` Resultado de álbuns de: ${artist}`}</h1>) }
              {results.map(({
                artistName,
                collectionId,
                collectionName,
                artworkUrl100,
              }) => (
                <div key={ collectionId }>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <h3>{ artistName }</h3>
                  <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    { collectionName }
                  </Link>

                </div>
              ))}
            </div>
          </div>
          { results.length === 0 && (<h1>Nenhum álbum foi encontrado</h1>) }
        </div>
      ) }
    </div>
  );
}
}
