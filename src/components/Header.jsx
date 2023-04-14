import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
        <p>TrybeTunes</p>
        {
          loading
            ? <Loading />
            : (
              <p data-testid="header-user-name">{ userName }</p>
            )
        }
        <nav>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
