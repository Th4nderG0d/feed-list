import { StyleSheet } from 'react-native';

export const buttonStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: 'black',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
    },
    txtStyles: {
      color: 'white',
      fontSize: 16,
      fontWeight: '700',
    },
  });
