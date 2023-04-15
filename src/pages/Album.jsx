import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import '../styles/Album.css';

class Album extends Component {
  state = {
    album: {},
    musics: [],
    favorites: [],
    loading: true,
  };

  componentDidMount() {
    this.getMusicsFromAPI();
  }

  recoverFavoriteMusics = async () => {
    const favoritesMusics = await getFavoriteSongs(); // recuperar as músicas salvas como favoritas do localStorage
    this.setState({
      favorites: favoritesMusics,
      loading: false,
    });
  };

  // Função que recebe a lista de músicas favoritas do componente filho e atualiza no state a lista mais atualizada caso alguma musica seja adicionada/excluida
  updateFavorites = (newFavorites) => {
    this.setState({
      favorites: newFavorites,
    });
  };

  getMusicsFromAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsList = await getMusics(id); // recebe como parâmetro o id do álbum e retorna um array onde o primeiro elemento é um objeto com informações do álbum e o restante dos elementos são as músicas do álbum
    this.setState({
      album: musicsList[0],
      musics: musicsList.slice(1),
    });
    this.recoverFavoriteMusics();
  };

  render() {
    const { album, musics, loading, favorites } = this.state;
    return (
      <div data-testid="page-album" className="albumContainer">
        <Header />
        <div>
        <section>
          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
          <h3 data-testid="artist-name">{album.artistName}</h3>
          <h4 data-testid="album-name">{album.collectionName}</h4>
          {/* <button
            onClick={() => this.props.history.goBack()}
          >
          Voltar
        </button> */}
        </section>
        {
          loading
            ? <Loading />
            : (
              <section>
                <p>Lista de Músicas deste Álbum</p>
                {musics.map((music) => (
                  <article key={ music.trackId }>
                    <MusicCard
                      { ...music }
                      favorites={ favorites }
                      updateFavorites={ this.updateFavorites }
                    />
                  </article>
                ))}
              </section>
            )
        }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
