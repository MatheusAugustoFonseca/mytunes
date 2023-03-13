import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    loading: false,
    userInfos: {},
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const userInfoFunc = await getUser();
    this.setState({
      userInfos: { ...userInfoFunc },
      loading: false,
    });
  }

  render() {
    const { loading, userInfos } = this.state;
    const { image, name, email, description } = userInfos;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? (<Loading />
        ) : (
          <div>
            Profile
            <img
              data-testid="profile-image"
              src={ image }
              alt={ `Imagem do user ${name} ` }
            />
            <label htmlFor="name">
              Nome:
              <p id="name">
                {/* Nome
              {' '} */}
                {name}
              </p>
            </label>
            <p>
              {/* E-mail */}
              {email}
            </p>
            <p>
              {/* Descrição
              {' '} */}
              {description}
            </p>
            <div>
              <Link to="/profile/edit">
                Editar perfil
              </Link>
            </div>
          </div>
        ) }

      </div>
    );
  }
}
