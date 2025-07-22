import List from "@/components/List";
import { searchPhotos } from "@/services/unsplash";
import { Photo } from "@/types/photo";
import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const gap = 8;

  const fetchPhotos = async (query: string, pageToFetch = 1) => {
    if (!query.trim() || loading) return;

    setLoading(true);
    try {
      const newPhotos = await searchPhotos(query, pageToFetch);
      if (pageToFetch === 1) {
        setPhotos(newPhotos);
      } else {
        setPhotos((prev) => [...prev, ...newPhotos]);
      }
      setPage(pageToFetch);
    } catch (err) {
      console.error("Erro na busca:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === "") {
      setPhotos([]);
      setPage(1);
      return;
    }
    fetchPhotos(text, 1);
  };

  const handleLoadMore = () => {
    if (!loading && searchText.trim()) {
      fetchPhotos(searchText, page + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={searchText}
        onChangeText={handleSearch}
        style={styles.input}
        placeholder="Pesquise por imagens aqui"
        placeholderTextColor={"#111"}
      />

      {List(photos, handleLoadMore, loading, gap, styles.list)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    justifyContent: "flex-start",
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  list: {
    marginTop: 16,
  },
  input: {
    backgroundColor: "#d2d2d2",
    borderColor: "#223",
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 16,
    color: "#223",
    textTransform: "capitalize",
  },
});
