import List from "@/components/List";
import { getPhotos } from "@/services/unsplash";
import { Photo } from "@/types/photo";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const gap = 8;

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
      {List(photos, fetchMorePhotos, loading, gap)}
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
