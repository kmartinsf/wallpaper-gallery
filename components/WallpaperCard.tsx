import { useRef } from "react";
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface Props {
  imageUrl: string;
  onPress?: () => void;
}

export default function WallpaperCard({ imageUrl, onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const translateY = scale.interpolate({
    inputRange: [1, 1.1],
    outputRange: [0, -4],
  });

  const shadowOpacity = scale.interpolate({
    inputRange: [1, 1.05],
    outputRange: [0.15, 0.3],
  });

  const elevation = scale.interpolate({
    inputRange: [1, 1.05],
    outputRange: [2, 8],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.wrapper}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }, { translateY }],
            shadowOpacity,
            elevation: Platform.OS === "android" ? elevation : undefined,
          } as Animated.AnimatedProps<ViewStyle>,
        ]}
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 8,
    aspectRatio: 2 / 3,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
