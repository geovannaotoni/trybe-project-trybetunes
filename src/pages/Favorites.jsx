import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    loading: false,
    favorites: [],
  };

  componentDidMount() {
    this.recoverFavoriteMusics();
  }

  recoverFavoriteMusics = async () => {
    this.setState({
      loading: true,
    });
    const favoritesMusics = await getFavoriteSongs(); // recuperar as músicas salvas como favoritas do localStorage
    this.setState({
      favorites: favoritesMusics,
      loading: false,
    });
  };

  // Função que recebe a lista de músicas favoritas do componente filho e atualiza no state a lista mais atualizada caso alguma musica seja excluida. Como ele altera o state, ele força a renderização dos MusicCards novamente, sem renderizar aqueles que não são favoritos mais
  updateFavorites = (newFavorites) => {
    this.setState({
      favorites: newFavorites,
    });
  };

  render() {
    const { loading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <section>
                {favorites.map((music) => (
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
    );
  }
}

export default Favorites;
