import React, { Component } from 'react';
import { shape } from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    btnDisabled: true,
    inputName: '',
    loading: false,
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      const nameLengthNum = 3;
      const { inputName } = this.state;
      const lengthName = inputName.length;

      this.setState({ btnDisabled: lengthName < nameLengthNum });
    });
  }

handleBtnClick = async () => {
  const { inputName } = this.state;
  const { history } = this.props;
  this.setState({ loading: true });
  await createUser({ name: inputName });
  history.push('/search');
}

render() {
  const {
    btnDisabled,
    inputName,
    loading,
  } = this.state;

  return (
    <form data-testid="page-login">
      { loading ? (<Loading />) : null }
      <label htmlFor="form">
        <input
          value={ inputName }
          data-testid="login-name-input"
          placeholder="Insira seu nome"
          type="text"
          name="inputName"
          id=""
          onChange={ this.handleChange }
        />
      </label>
      <button
        data-testid="login-submit-button"
        type="button"
        disabled={ btnDisabled }
        onClick={ this.handleBtnClick }
      >
        Entrar
      </button>
    </form>
  );
}
}

Login.propTypes = {
  history: shape({}).isRequired,
  // history: PropTypes.number.isRequired,
};
