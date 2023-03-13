import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    loading: true,
    name: '',
  }

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({
      loading: false,
      name,
    });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <div>
        {
          loading ? (
            <Loading />
          ) : (
            <header data-testid="header-component">
              <nav>
                <Link
                  data-testid="link-to-search"
                  to="/search"
                >
                  Pesquisa
                  {' '}
                </Link>

                <Link
                  data-testid="link-to-favorites"
                  to="/favorites"
                >
                  {' '}
                  Favoritos
                  {' '}
                </Link>

                <Link
                  data-testid="link-to-profile"
                  to="/profile"
                >
                  {' '}
                  Perfil
                  {' '}
                </Link>
              </nav>
              <p
                data-testid="header-user-name"
              >
                {name}
              </p>
            </header>
          )
        }
      </div>

    );
  }
}
