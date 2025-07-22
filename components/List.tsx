import { ActivityIndicator, FlatList, StyleProp, ViewStyle } from "react-native";
import WallpaperCard from "./WallpaperCard";
import { Photo } from "@/types/photo";


export default function List(
    photos: Photo[],
    fetchMorePhotos: () => void,
    loading: boolean,
    gap: number = 8,
    style?: StyleProp<ViewStyle>
) {
  return (
    <FlatList
      data={photos}
      numColumns={2}
      style={style}
      keyExtractor={(item) => item.id}
      columnWrapperStyle={{ gap }}
      onEndReached={fetchMorePhotos}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <WallpaperCard imageUrl={item.urls.regular} />}
      ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
    />
  );
}
