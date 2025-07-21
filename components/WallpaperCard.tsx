import { Image, Pressable, StyleSheet } from "react-native";

interface Props {
  imageUrl: string;
  onPress?: () => void;
}

export default function WallpaperCard({ imageUrl, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    aspectRatio: 2 / 3,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
