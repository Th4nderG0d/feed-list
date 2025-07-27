import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { moviesSkeletonStyles } from './styles';

export const MoviesSkeleton = () => {
  const styles = moviesSkeletonStyles();
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        {[...Array(4)].map((_, idx) => (
          <View key={idx} style={styles.cardLoader} />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};
