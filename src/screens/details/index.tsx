import { View, Text } from 'react-native';
import React from 'react';
import { movieDetailsStyles } from './styles';
import Button from '../../components/button';
import LoadImage from '../../components/loadImage';

const MovieDetails = ({ route }: any) => {
  const { thumbnail, title, description, duration } = route.params;
  const styles = movieDetailsStyles();

  return (
    <View style={styles.container}>
      <LoadImage
        {...{ uri: thumbnail, imgContainerStyle: styles.imgContainer }}
      />
      <Text numberOfLines={1} style={styles.duration}>
        {`Duration : ${duration}`}
      </Text>
      <Button {...{ title: 'Watch Now' }} />
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text numberOfLines={2} style={styles.description}>
        {description}
      </Text>
    </View>
  );
};

export default MovieDetails;
