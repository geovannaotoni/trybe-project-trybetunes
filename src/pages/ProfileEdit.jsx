import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: true,
    buttonDisabled: true,
  };

  componentDidMount() {
    this.getUserInfo();
  }

  // Recupera as informações do user do localStorage e seta elas no state
  getUserInfo = async () => {
    const { name, email, image, description } = await getUser();
    this.setState({
      name,
      email,
      image,
      description,
      loading: false,
    });
  };

  // Função chamada após qualquer mudança nos inputs, além de realizar a liberação do button após a validação.
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
      buttonDisabled: !this.verifyFields(),
    });
  };

  // valida os inputs para liberar o button
  verifyFields = () => {
    const { name, email, image, description } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    return (
      name.length > 0
      && image.length > 0
      && description.length > 0
      && email.length > 0
      && regex.test(email)
    );
  };

  // Função chamada ao clicar no button, salvando os novos dados no localStorage e redirecionando para a rota /profile
  handleClick = async () => {
    const { name, email, image, description } = this.state;
    const newUser = { name, email, image, description };
    // this.setState({
    //   loading: true,
    // });
    await updateUser(newUser);
    const { history } = this.props;
    history.push('/profile');
  };

  render() {
    const { name, email, image, description, loading, buttonDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <form>
                <label htmlFor="image">
                  <input
                    type="text"
                    name="image"
                    id="image"
                    data-testid="edit-input-image"
                    value={ image }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="name">
                  Fique à vontade para usar seu nome social
                  <input
                    type="text"
                    data-testid="edit-input-name"
                    id="name"
                    name="name"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="email">
                  Escolha um e-mail que consulte frequentemente
                  <input
                    type="email"
                    data-testid="edit-input-email"
                    id="email"
                    name="email"
                    value={ email }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="description">
                  Descrição
                  <textarea
                    name="description"
                    id="description"
                    cols="20"
                    rows="5"
                    data-testid="edit-input-description"
                    value={ description }
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  onClick={ this.handleClick }
                  disabled={ buttonDisabled }
                >
                  Editar perfil
                </button>
              </form>
            )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
