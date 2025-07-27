import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Movie } from '../../stores/movie/types';
import { cardStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import LoadImage from '../loadImage';

const Card = ({ item }: { item: Movie }) => {
  const styles = cardStyles();
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('details', item)}
    >
      <LoadImage
        {...{ uri: item.thumbnail, imgContainerStyle: styles.imgContainer }}
      />
    </TouchableOpacity>
  );
};

export default Card;
