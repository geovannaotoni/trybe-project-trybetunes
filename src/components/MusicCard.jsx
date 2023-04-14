import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    checked: false, // salva no state se o checkbox foi marcado ou não, e traz o booleano na propriedade checked do input
  };

  componentDidMount() {
    this.verifyFavorites(); // chama a função no momento que o componente é montado
  }

  componentDidUpdate() {
    this.getUpdateFavorites(); // chama a função toda vez que o componente é atualizado, ou seja, toda vez que se clica no checkbox
  }

  // Função para verificar se a música é favorita, atualizando o state dela como checked, se sim
  verifyFavorites = () => {
    const { favorites, trackId } = this.props;
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
      this.getUpdateFavorites();
    }
    this.setState((prevState) => ({
      loading: false,
      checked: !prevState.checked,
    }));
  };

  getUpdateFavorites = async () => {
    const { updateFavorites } = this.props; // função recebida no comp pai Favorites e Album
    const newFavorites = await getFavoriteSongs(); // obtém a lista das músicas favoritas salvas no localStorage após a remoção de uma música
    updateFavorites(newFavorites); // atualiza no componente pai Favorites a lista atualizada de músicas favoritas no state dele, forçando a renderização novamente do componente Pai ao remover uma música dos favoritos
  };

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
              <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
                Favorita
                <input
                  type="checkbox"
                  name=""
                  id={ trackId }
                  onChange={ this.handleCheckboxClick }
                  checked={ checked }
                />
              </label>
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
