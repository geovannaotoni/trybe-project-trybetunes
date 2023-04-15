import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../styles/Header.css';

class Header extends Component {
  state = {
    userName: '',
    loading: false,
  };

  // chama a função após o componente ser montado na página
  componentDidMount() {
    this.getUserName();
  }

  // Função que recupera o nome da pessoa logada pela função getUser, e seta esse nome no state.
  getUserName = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      userName: user.name,
      loading: false,
    });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h1><strong>&#9835; Trybe</strong>Tunes &#9835;</h1>
        <nav>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search"><i className="fa fa-search" /> Pesquisa</Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites"><i className="fa fa-heart"></i> Favoritos</Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile"><i className="fa fa-user" /> Perfil</Link>
            </li>
          </ul>
        </nav>
        {
          loading
            ? <Loading />
            : (
              <p data-testid="header-user-name">{ userName }</p>
            )
        }
      </header>
    );
  }
}

export default Header;
