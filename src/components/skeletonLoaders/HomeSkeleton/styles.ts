import { StyleSheet } from 'react-native';

export const homeSkeletonStyles = () =>
  StyleSheet.create({
    container: { gap: 8, padding: 16 },
    titleLoader: {
      width: 150,
      height: 20,
      borderRadius: 4,
    },
    cardContainer: { flexDirection: 'row', gap: 10 },
    cardLoader: {
      width: 150,
      height: 180,
      borderRadius: 8,
    },
  });
