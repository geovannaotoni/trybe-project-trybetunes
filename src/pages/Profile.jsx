import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: true,
  };

  componentDidMount() {
    this.getUserInfo();
  }

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

  render() {
    const { name, email, image, description, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <section>
                <img src={ image } alt={ name } data-testid="profile-image" />
                <h4>Nome</h4>
                <p>{name}</p>
                <h4>E-mail</h4>
                <p>{email}</p>
                <h4>Descrição</h4>
                <p>{description}</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </section>
            )
        }
      </div>
    );
  }
}

export default Profile;
