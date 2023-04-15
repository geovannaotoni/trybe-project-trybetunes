import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import '../styles/MusicCard.css'

class MusicCard extends Component {
  state = {
    loading: false,
    checked: false, // salva no state se o checkbox foi marcado ou não, e traz o booleano na propriedade checked do input
  };

  componentDidMount() {
    this.verifyFavorites(); // chama a função no momento que o componente é montado
  }

  // componentDidUpdate() {
  //   this.getUpdateFavorites(); // chama a função toda vez que o componente é atualizado, ou seja, toda vez que se clica no checkbox
  // }

  // Função para verificar se a música é favorita, atualizando o state dela como checked, se sim
  verifyFavorites = async () => {
    const { trackId } = this.props;
    const favorites = await getFavoriteSongs();
    this.setState({
      checked: favorites.some((favorite) => favorite.trackId === trackId), // verifica se o trackId do componente é igual a algum trackId dos elementos contidos na lista de musicas favoritadas
    });
  };

  // Função chamada ao clicar no checkbox, alterando o state loading e checked, além de chamar a função assíncrona addSong
  handleCheckboxClick = async () => {
    this.setState({
      loading: true,
    });
    const { checked } = this.state;
    if (!checked) {
      await addSong(this.props); // recebe como parâmetro o objeto recebido da API getMusics, ou seja, o props do componente, para salvar no localStorage
    } else {
      await removeSong(this.props);
      // this.getUpdateFavorites();
    }
    // this.setState((prevState) => ({
    //   loading: false,
    //   checked: !prevState.checked,
    // }));
    await this.verifyFavorites();
    this.setState({
      loading: false,
    });
  };

  // getUpdateFavorites = async () => {
  //   const { updateFavorites } = this.props; // função recebida no comp pai Favorites e Album
  //   const newFavorites = await getFavoriteSongs(); // obtém a lista das músicas favoritas salvas no localStorage após a remoção de uma música
  //   updateFavorites(newFavorites); // atualiza no componente pai Favorites a lista atualizada de músicas favoritas no state dele, forçando a renderização novamente do componente Pai ao remover uma música dos favoritos
  // };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        {
          loading
            ? <Loading />
            : (
              <>
              <input
                  type="checkbox"
                  name=""
                  id={ trackId }
                  onChange={ this.handleCheckboxClick }
                  checked={ checked }
                  className="favoriteInput"
                />
              <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` } className="heart-checkbox-label">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00D5E2"
                >
                  <path
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </label>
              </>
            )
          }
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
