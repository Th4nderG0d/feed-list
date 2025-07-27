import { StyleSheet } from 'react-native';

export const homeStyles = () =>
  StyleSheet.create({
    sectionContainer: {
      gap: 12,
      padding: 16,
      backgroundColor: 'white',
    },
    title: { fontSize: 20, fontWeight: 'bold' },
    noDataStyles: {
      color: 'gray',
      fontSize: 16,
    },
  });
