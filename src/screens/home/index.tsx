import React, { useEffect } from 'react';
import { SectionList, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import { homeStyles } from './styles';
import { movieStore } from '../../stores/movie/MovieStore';
import { HomeSkeleton } from '../../components/skeletonLoaders/HomeSkeleton';
import { sectionType } from './types';
import MovieList from './movieList';

const HomeScreen = observer(() => {
  const styles = homeStyles();

  useEffect(() => {
    movieStore.initialLoadCategories();
  }, []);

  const renderCategoryHeader = ({ section }: { section: sectionType }) => (
    <Text style={styles.title}>{section.title}</Text>
  );

  const sections = movieStore.categories.map(category => ({
    title: category.name,
    data: [{}],
    categoryId: category.id,
    movies: movieStore.moviesByCategoryId.get(category.id) || [],
  }));

  if (movieStore.isLoadingCategories && !movieStore.categories.length) {
    return <HomeSkeleton />;
  }

  if (!movieStore.isLoadingCategories && !movieStore.categories.length) {
    return <Text style={styles.noDataStyles}>No categories available.</Text>;
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(_, i) => i.toString()}
      renderSectionHeader={renderCategoryHeader}
      renderItem={({ section }) => <MovieList section={section} />}
      onEndReached={() => {
        if (!movieStore.isLoadingCategories && !!movieStore.categories.length) {
          return movieStore.fetchMoreCategories();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        movieStore.categories.length && movieStore.isLoadingCategories ? (
          <HomeSkeleton />
        ) : null
      }
      contentContainerStyle={styles.sectionContainer}
    />
  );
});

export default HomeScreen;
