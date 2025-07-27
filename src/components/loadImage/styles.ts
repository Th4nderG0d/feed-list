import { StyleSheet } from 'react-native';

export const loadImgStyles = (loading: boolean) =>
  StyleSheet.create({
    imgContainerStyles: {
      overflow: 'hidden',
    },
    loader: { height: 250, borderRadius: 8 },
    imgContainer: {
      width: '100%',
      height: '100%',
      position: loading ? 'absolute' : 'relative',
      opacity: loading ? 0 : 1,
    },
  });
