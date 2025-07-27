import { StyleSheet } from 'react-native';

export const moviesSkeletonStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 10,
    },
    cardLoader: {
      width: 150,
      height: 180,
      borderRadius: 8,
    },
  });
