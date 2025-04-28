import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import YoutubePlayer from 'react-native-youtube-iframe';
import Banner from '../components/banner';

// Función para extraer el ID de YouTube
const extractYouTubeId = (url: string) => {
  const regex = /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|.*v=|\/)([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11}))/;
  const match = url.match(regex);
  return match ? match[1] || match[2] : null;
};

const PlayerMedia = () => {
  const route = useRoute();
  const { playerId } = route.params as { playerId: string };

  const [gallery, setGallery] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get('window').width;
  const videoHeight = (screenWidth - 16) * (9 / 16);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const db = getFirestore();
        const playerRef = doc(db, 'players', playerId);
        const playerSnap = await getDoc(playerRef);

        if (playerSnap.exists()) {
          const data = playerSnap.data();
          const galleryData: string[] = data.gallery || [];
          const videoData: string[] = data.video || [];

          setGallery(galleryData);
          setVideos(videoData);
          setSelectedMedia(
            mediaType === 'photo' ? galleryData[0] : videoData[0]
          );
        }
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [playerId]);

  useEffect(() => {
    if (mediaType === 'photo') {
      setSelectedMedia(gallery[0] || null);
    } else {
      setSelectedMedia(videos[0] || null);
    }
  }, [mediaType]);

  const handleMediaToggle = () => {
    setMediaType((prev) => (prev === 'photo' ? 'video' : 'photo'));
  };

  const currentList = mediaType === 'photo' ? gallery : videos;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.outerContainer}>
        <Banner playerId={playerId} />

        <View style={styles.container}>
          <TouchableOpacity onPress={handleMediaToggle} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>
              {mediaType === 'photo' ? 'Ver videos' : 'Ver fotos'}
            </Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#FF9809" />
          ) : (
            <>
              {selectedMedia && mediaType === 'photo' && (
                <Image
                  source={{ uri: selectedMedia }}
                  style={styles.mainImage}
                  resizeMode="cover"
                />
              )}

              {selectedMedia && mediaType === 'video' && (() => {
                const videoId = extractYouTubeId(selectedMedia);
                return videoId ? (
                  <View style={styles.videoWrapper}>
                    <YoutubePlayer
                      videoId={videoId}
                      height={videoHeight}
                      play={false}
                    />
                  </View>
                ) : (
                  <Text>No se pudo cargar el video.</Text>
                );
              })()}

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollContainer}
              >
                {currentList.map((item, index) => {
                  const isSelected = item === selectedMedia;
                  const thumbnailUrl =
                    mediaType === 'video'
                      ? `https://img.youtube.com/vi/${extractYouTubeId(item)}/hqdefault.jpg`
                      : item;

                  return (
                    <TouchableOpacity key={index} onPress={() => setSelectedMedia(item)}>
                      <Image
                        source={{ uri: thumbnailUrl }}
                        style={[
                          styles.thumbnail,
                          isSelected && styles.thumbnailSelected,
                        ]}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
  },
  toggleButton: {
    backgroundColor: '#FF9809',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    marginBottom: 20,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailSelected: {
    borderColor: '#FF9809',
  },
  videoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#000',
  },
});

export default PlayerMedia;
