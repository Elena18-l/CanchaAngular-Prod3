import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import YoutubePlayer from 'react-native-youtube-iframe';

// Función para extraer el ID de YouTube
const extractYouTubeId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:.*v=|\/)([a-zA-Z0-9_-]{11}))|youtu\.be\/([a-zA-Z0-9_-]{11}))/;
  const match = url.match(regex);
  return match ? (match[1] || match[2]) : null;
};

const PlayerMedia = () => {
  const route = useRoute();
  const { playerId } = route.params as { playerId: string };

  const [gallery, setGallery] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const db = getFirestore();
        const playerRef = doc(db, 'players', playerId);
        const playerSnap = await getDoc(playerRef);

        if (playerSnap.exists()) {
          const data = playerSnap.data();
          const galleryData = data.gallery || [];
          const videoData = data.video || [];

          setGallery(galleryData);
          setVideos(videoData);

          // Establece el primer recurso como el seleccionado
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
    // Al cambiar de tipo, establecer el primer recurso de ese tipo
    if (mediaType === 'photo') {
      setSelectedMedia(gallery[0] || null);
    } else {
      setSelectedMedia(videos[0] || null);
    }
  }, [mediaType]);

  const handleMediaToggle = () => {
    setMediaType(prev => (prev === 'photo' ? 'video' : 'photo'));
  };

  const currentList = mediaType === 'photo' ? gallery : videos;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contenido multimedia</Text>
      <Text style={styles.subtitle}>Jugador ID: {playerId}</Text>

      <TouchableOpacity onPress={handleMediaToggle} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {mediaType === 'photo' ? 'Ver videos' : 'Ver fotos'}
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#e91e63" />
      ) : (
        <>
          {selectedMedia && mediaType === 'photo' && (
            <Image source={{ uri: selectedMedia }} style={styles.mainImage} resizeMode="contain" />
          )}

          {selectedMedia && mediaType === 'video' && (() => {
            const videoId = extractYouTubeId(selectedMedia);
            console.log('Selected media URL:', selectedMedia);

            return videoId ? (
              <YoutubePlayer
                videoId={videoId}
                height={315}
                width={560}
                play={false}
              />
            ) : (
              <Text>No se pudo cargar el video.</Text>
            );
          })()}

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
            {currentList.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedMedia(item)}>
                {mediaType === 'photo' ? (
                  <Image
                    source={{ uri: item }}
                    style={[
                      styles.thumbnail,
                      item === selectedMedia && styles.thumbnailSelected,
                    ]}
                  />
                ) : (
                  <View style={[styles.thumbnail, styles.videoThumbnail]}>
                    <Text style={{ color: '#fff' }}>🎥</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce4ec',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  toggleButton: {
    backgroundColor: '#e91e63',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  mainImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 0,
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
    borderColor: '#e91e63',
  },
  videoThumbnail: {
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlayerMedia;
