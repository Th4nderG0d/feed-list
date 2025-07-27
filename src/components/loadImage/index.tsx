import { Image, StyleProp, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { FallbackImg } from '../../assets';
import { loadImgStyles } from './styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const LoadImage = ({
  uri,
  imgContainerStyle,
}: {
  uri: string;
  imgContainerStyle: StyleProp<ViewStyle>;
}) => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const styles = loadImgStyles(loading);
  return (
    <View style={[styles.imgContainerStyles, imgContainerStyle]}>
      {loading && (
        <SkeletonPlaceholder>
          <View style={styles.loader} />
        </SkeletonPlaceholder>
      )}
      <Image
        source={loadError ? FallbackImg : { uri }}
        style={styles.imgContainer}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoadError(true);
          setLoading(false);
        }}
        resizeMode="cover"
      />
    </View>
  );
};

export default LoadImage;
