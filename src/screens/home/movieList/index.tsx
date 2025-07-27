import { Text, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { MoviesSkeleton } from '../../../components/skeletonLoaders/MoviesSkeleton';
import { sectionType } from '../types';
import Card from '../../../components/card';
import { Movie } from '../../../stores/movie/types';
import { movieListStyles } from './styles';
import { movieStore } from '../../../stores/movie/MovieStore';

const MovieList = ({ section }: { section: sectionType }) => {
  const styles = movieListStyles();
  useEffect(() => {
    movieStore.initialLoadMovies(section.categoryId);
  }, [section.categoryId]);

  const movies = section.movies;
  const isLoading = movieStore.isLoadingMovies.get(section.categoryId);

  const renderMovieItem = ({ item }: { item: Movie }) => <Card item={item} />;
  const listFooterComp = () =>
    isLoading && movies.length ? <MoviesSkeleton /> : null;

  if (!movies.length && isLoading) return <MoviesSkeleton />;
  if (!movies.length && !isLoading)
    return <Text style={styles.noDataStyles}>No movies available.</Text>;

  return (
    <FlatList
      data={movies}
      contentContainerStyle={styles.listContainer}
      horizontal
      keyExtractor={item => `${item.title} ${item.id}`}
      renderItem={renderMovieItem}
      showsHorizontalScrollIndicator={false}
      onEndReached={() => {
        if (!isLoading && movieStore.canFetchMoreMovies(section.categoryId)) {
          movieStore.fetchMoreMoviesForCategory(section.categoryId);
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={listFooterComp}
    />
  );
};

export default MovieList;
