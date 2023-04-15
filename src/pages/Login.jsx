import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Login.css';

class Login extends Component {
  state = {
    inputName: '',
    buttonDisabled: true,
    isLogged: false,
  };

  // Função chamada após qualquer mudança no input, além de realizar a liberação do button após a validação.
  handleChange = ({ target: { name, value } }) => {
    const minLength = 2;
    this.setState({
      [name]: value,
      buttonDisabled: value.length <= minLength,
    });
  };

  // Função para ser realizada após o clique do botão. Ela seta o state como isLogged = true, para que seja carregado o componente <Loading>. Além disso, ela chama a função createUser e redireciona para a rota /search
  handleClick = async () => {
    const { inputName } = this.state;
    const { history } = this.props;
    this.setState({
      isLogged: true,
    });
    await createUser({ name: inputName });
    history.push('/search');
  };

  render() {
    const { inputName, buttonDisabled, isLogged } = this.state;
    return (
      <div data-testid="page-login" className="loginContainer">
        <h1><strong>&#9835; Trybe</strong>Tunes &#9835;</h1>
        {
          isLogged
            ? <Loading />
            : (
              <form>
                <input
                  type="text"
                  data-testid="login-name-input"
                  placeholder="Digite seu nome aqui"
                  onChange={ this.handleChange }
                  name="inputName"
                  value={ inputName }
                />
                <button
                  data-testid="login-submit-button"
                  onClick={ this.handleClick }
                  disabled={ buttonDisabled }
                >
                  Entrar
                </button>
              </form>
            )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
