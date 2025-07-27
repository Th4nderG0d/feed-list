import { StyleSheet } from 'react-native';

export const movieDetailsStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 8,
      padding: 16,
      backgroundColor: 'white',
    },
    imgContainer: {
      height: 250,
      borderRadius: 8,
    },
    title: { fontSize: 28, fontWeight: 700 },
    description: { fontSize: 18 },
    duration: {
      fontSize: 12,
      fontWeight: 500,
      backgroundColor: 'lightgray',
      alignSelf: 'flex-end',
      padding: 4,
      borderRadius: 4,
    },
  });
