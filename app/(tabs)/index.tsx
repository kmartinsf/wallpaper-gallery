import WallpaperCard from "@/components/WallpaperCard";
import { getPhotos } from "@/services/unsplash";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

interface Photo {
  id: string;
  description: string;
  urls: {
    regular: string;
  };
}

export default function HomeScreen() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    getPhotos().then((photos) => {
      console.log("🔍 Fotos recebidas:", photos.length);
      setPhotos(photos);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        columnWrapperStyle={{ gap: 2 }}
        renderItem={({ item }) => (
          <WallpaperCard imageUrl={item.urls.regular} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingHorizontal: 12,
    paddingTop: 24,
  },
});
