import { shape } from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    loading: false,
    // name: '',
    // email: '',
    // image: '',
    // description: '',
    userInfo: {
      name: '',
      email: '',
      image: '',
      description: '',
    },
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const userInfo = await getUser();
    this.setState({
      userInfo,
      loading: false,
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState((prev) => ({
      userInfo: {
        ...prev.userInfo,
        [name]: value,
      },
    }));
  }

  btnClickProfile = () => {
    const { history } = this.props;
    this.setState({ loading: true }, async () => {
      const { userInfo } = this.state;
      await updateUser(userInfo);
      this.setState({ loading: false });
      history.push('/profile');
    });
  }

  render() {
    const { loading, userInfo: { email, name, description, image } } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading /> : (
          <form>
            <input
              type="text"
              name="name"
              id="name"
              onChange={ this.handleChange }
              value={ name }
              data-testid="edit-input-name"
            />
            <input
              type="email"
              name="email"
              id="name"
              onChange={ this.handleChange }
              value={ email }
              data-testid="edit-input-email"
            />
            <input
              type="text"
              name="description"
              id="description"
              onChange={ this.handleChange }
              value={ description }
              data-testid="edit-input-description"
            />
            <input
              type="text"
              name="image"
              id="image"
              onChange={ this.handleChange }
              value={ image }
              data-testid="edit-input-image"
            />
            <button
              type="submit"
              data-testid="edit-button-save"
              onClick={ this.btnClickProfile }
              disabled={ !email || !name || !description || !image }
            >
              Salvar
            </button>
          </form>

        )}

      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: shape({}).isRequired,
};
