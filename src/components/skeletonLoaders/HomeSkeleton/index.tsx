import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';
import { homeSkeletonStyles } from './styles';

export const HomeSkeleton = () => {
  const styles = homeSkeletonStyles();
  return (
    <SkeletonPlaceholder>
      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.container}>
          <View style={styles.titleLoader} />

          <View style={styles.cardContainer}>
            {[...Array(4)].map((_x, idx) => (
              <View key={idx} style={styles.cardLoader} />
            ))}
          </View>
        </View>
      ))}
    </SkeletonPlaceholder>
  );
};
