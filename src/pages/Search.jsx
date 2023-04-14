import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    inputName: '',
    buttonDisabled: true,
    loading: false,
    albums: [], // recebe o retorno da api com os albuns
    artistName: '', // recebe o nome do artista para ser salvo mesmo após a limpeza do inputName
    apiRequest: false, // permite ou não a renderização do resultado da api
  };

  // Mesma lógica do componente Login.jsx para o input
  handleChange = ({ target: { name, value } }) => {
    const minLength = 2;
    this.setState({
      [name]: value,
      buttonDisabled: value.length < minLength,
    });
  };

  // Função chamada após o click no button
  handleClick = async () => {
    this.setState({
      loading: true,
    });
    const { inputName } = this.state;
    const albumsList = await searchAlbumsAPI(inputName); // array em que cada album é um objeto com todas as infos de cada album
    this.setState({
      inputName: '', // limpa o input
      loading: false,
      albums: albumsList,
      artistName: inputName, // insere o nome do artista em outro state
      apiRequest: true, // quando true significa que já foi feita a requisição para API
    });
  };

  render() {
    const {
      inputName, buttonDisabled, loading, artistName, apiRequest, albums,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <form>
                <input
                  type="text"
                  data-testid="search-artist-input"
                  placeholder="Nome do Artista/Banda"
                  name="inputName"
                  value={ inputName }
                  onChange={ this.handleChange }
                />
                <button
                  data-testid="search-artist-button"
                  disabled={ buttonDisabled }
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
              </form>
            )
        }
        { artistName && <p>{`Resultado de álbuns de: ${artistName}`}</p>}
        <section>
          {
            apiRequest && albums.length === 0
              ? 'Nenhum álbum foi encontrado'
              : (
                albums.map((element) => (
                  <article
                    key={ element.collectionId }
                  >
                    <img src={ element.artworkUrl100 } alt={ element.collectionName } />
                    <p>{element.collectionName}</p>
                    <p>{element.artistName}</p>
                    <Link
                      to={ `/album/${element.collectionId}` }
                      data-testid={ `link-to-album-${element.collectionId}` }
                    >
                      Ver Músicas
                    </Link>
                  </article>
                ))
              )
          }
        </section>
      </div>
    );
  }
}

export default Search;
