import WallpaperCard from "@/components/WallpaperCard";
import { getPhotos } from "@/services/unsplash";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";

interface Photo {
  id: string;
  urls: {
    regular: string;
  };
}

export default function HomeScreen() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMorePhotos = async () => {
    if (loading) return;

    setLoading(true);
    const newPhotos = await getPhotos(page);
    setPhotos((prev) => [...prev, ...newPhotos]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchMorePhotos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        onEndReached={fetchMorePhotos}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <WallpaperCard imageUrl={item.urls.regular} />
        )}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" /> : null
        }
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
