import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AudioPlayerScreen() {
  const router = useRouter();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showSpeedSelector, setShowSpeedSelector] = useState(false);

  // Load audio on component mount
  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const loadAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../../assets/images/audio.mp3'),
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis || 0);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  };

  const togglePlayPause = async () => {
    if (!sound) return;

    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const skipForward = async () => {
    if (!sound) return;
    const newPosition = Math.min(position + 10000, duration);
    await sound.setPositionAsync(newPosition);
  };

  const skipBackward = async () => {
    if (!sound) return;
    const newPosition = Math.max(position - 10000, 0);
    await sound.setPositionAsync(newPosition);
  };

  const changePlaybackSpeed = async () => {
    if (!sound) return;
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    
    await sound.setRateAsync(nextSpeed, true);
    setPlaybackSpeed(nextSpeed);
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (duration === 0) return 0;
    return position / duration;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Background Circles */}
      <View style={styles.backgroundCircle1} />
      <LinearGradient
        colors={['#F7E4D7', '#F7E4D7']}
        style={styles.backgroundCircle2}
      />

      {/* Top Navigation */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.backButton}>
            <Image
            source={require('../../assets/images/Vector-1.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.chaptersButton}>
          <Text style={styles.chaptersText}>Chapters</Text>
          <View style={styles.dropdownIcon} />
        </TouchableOpacity>
      </View>

      {/* Album Art / Cover Image */}
      <View style={styles.albumArtContainer}>
        <Image
          source={require('../../assets/images/palyerImage.png')}
          style={styles.albumArt}
        />
      </View>

      {/* Chapter Info */}
      <Text style={styles.chapterTitle}>Chapter 1</Text>
      <Text style={styles.chapterSubtitle}>
        Introduction to the Fire Service and Fire Fighter
      </Text>

      {/* Audio Waveform */}
      <View style={styles.waveformContainer}>
        <View style={styles.waveform}>
          {[9, 18, 14.63, 22.5, 27, 18, 18, 11.25, 22.5, 22.5, 27, 14.63, 6.75, 18, 14.63, 18, 27, 18, 22.5, 14.63, 6.75, 11.25, 18, 22.5, 14.63, 9, 18, 14.63, 22.5, 6.75, 14.63, 14.63, 18, 14.63, 22.5, 11.25, 18, 14.63, 18].map((height, index) => {
            const progress = getProgress();
            const barProgress = index / 39;
            const isActive = barProgress <= progress;
            
            return (
              <View
                key={index}
                style={[
                  styles.waveformBar,
                  {
                    height: (height / 27) * 27,
                    opacity: isActive ? 1 : 0.3,
                    backgroundColor: '#FF7A2D',
                  },
                ]}
              />
            );
          })}
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Main Player Controls */}
      <View style={styles.mainControlsContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Image
            source={require('../../assets/images/play-back.png')}
            style={styles.skipIcon}
          />
        </TouchableOpacity>

        {/* Backward 10s */}
        <TouchableOpacity style={styles.controlButton} onPress={skipBackward}>
          <Image
            source={require('../../assets/images/10sec-backward.png')}
            style={styles.skipIcon}
          />
        </TouchableOpacity>

        {/* Play/Pause Button */}
        <TouchableOpacity 
          style={styles.playPauseButton}
          onPress={togglePlayPause}
        >
          <View style={styles.playPauseCircle}>
            {isPlaying ? (
              <View style={styles.pauseIcon}>
                <View style={styles.pauseBar} />
                <View style={styles.pauseBar} />
              </View>
            ) : (
              <View style={styles.playIcon} />
            )}
          </View>
        </TouchableOpacity>

        {/* Forward 10s */}
        <TouchableOpacity style={styles.controlButton} onPress={skipForward}>
          <Image
            source={require('../../assets/images/10sec.png')}
            style={[styles.skipIcon, styles.skipIconForward]}
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <Image
            source={require('../../assets/images/play-next.png')}
            style={styles.skipIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.bottomButton}>
          <Image
            source={require('../../assets/images/bookmarkIcon.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Image
            source={require('../../assets/images/fluent_note-add-16-filled.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.speedButton} onPress={changePlaybackSpeed}>
          <Text style={styles.speedText}>{playbackSpeed.toFixed(1)}x</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Image
            source={require('../../assets/images/bxs_user-voice.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Image
            source={require('../../assets/images/downloadIcon.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Recommended Audiobooks Section */}
      <View style={styles.recommendedSection}>
        <Text style={styles.recommendedTitle}>Recommended audiobooks</Text>
        
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.recommendedScrollView}
          contentContainerStyle={styles.recommendedGrid}
        >
          {/* Audiobook Card 1 */}
          <View style={styles.audioCard}>
            <Image
              source={require('../../assets/images/audiobook-recom.png')}
              style={styles.audioCardImage}
            />
            <View style={styles.audioCardInfo}>
              <Text style={styles.audioCardTitle}>Audiobook 1-2-3</Text>
              <Text style={styles.audioCardSubtitle}>
                Handle Non emergency Phone{'\n'}calls.
              </Text>
            </View>
          </View>

          {/* Audiobook Card 2 */}
          <View style={styles.audioCard}>
            <Image
              source={require('../../assets/images/audiobook-recom.png')}
              style={styles.audioCardImage}
            />
            <View style={styles.audioCardInfo}>
              <Text style={styles.audioCardTitle}>Audiobook 1-2-3</Text>
              <Text style={styles.audioCardSubtitle}>
                Handle emergency Phone{'\n'}calls.
              </Text>
            </View>
          </View>

          {/* Audiobook Card 3 */}
          <View style={styles.audioCard}>
            <Image
              source={require('../../assets/images/audiobook-recom.png')}
              style={styles.audioCardImage}
            />
            <View style={styles.audioCardInfo}>
              <Text style={styles.audioCardTitle}>Audiobook 1-2-3</Text>
              <Text style={styles.audioCardSubtitle}>
                Handle emergency Phone{'\n'}calls.
              </Text>
            </View>
          </View>

          {/* Audiobook Card 4 */}
          <View style={styles.audioCard}>
            <Image
              source={require('../../assets/images/audiobook-recom.png')}
              style={styles.audioCardImage}
            />
            <View style={styles.audioCardInfo}>
              <Text style={styles.audioCardTitle}>Audiobook 1-2-3</Text>
              <Text style={styles.audioCardSubtitle}>
                Handle emergency Phone{'\n'}calls.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF5F5',
  },
  // Background Circles
  backgroundCircle1: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.1,
    left: SCREEN_WIDTH * 0.136,
    width: SCREEN_WIDTH * 0.933,
    height: SCREEN_WIDTH * 0.933,
    borderRadius: SCREEN_WIDTH * 0.4665,
    backgroundColor: '#FAF4F4',
    opacity: 1,
    shadowColor: '#bbbbbbff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 300,
  },
  backgroundCircle2: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.177,
    left: SCREEN_WIDTH * 0.045,
    width: SCREEN_WIDTH * 0.709,
    height: SCREEN_WIDTH * 0.709,
    borderRadius: SCREEN_WIDTH * 0.3545,
    opacity: 0.02,
  },
  // Top Navigation
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.053,
    paddingTop: SCREEN_HEIGHT * 0.06,
    paddingBottom: SCREEN_HEIGHT * 0.02,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',

  },
  backIcon: {
    width: 7,
    height: 14,
    tintColor: '#000000',
  },
  chaptersButton: {
    width:103,
    height:40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 12,
    gap: 10,
  },
  chaptersText: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 12,
    color: '#070707',
    letterSpacing: -0.3,
  },
  dropdownIcon: {
    width: 0,
    height: 1,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#000000',
  },
  // Album Art
  albumArtContainer: {
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.015,
    zIndex: 5,
  },
  albumArt: {
    width: 205,
    height: 218,
    borderRadius: 20,
   
    
  },
  // Chapter Info
  chapterTitle: {
    fontFamily: 'System',
    fontWeight: '800',
    fontSize: 20,
    lineHeight: 32,
    color: '#0C1121',

    textAlign: 'center',
    marginTop: -20,
    letterSpacing: -0.4,
  },
  chapterSubtitle: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#676F88',
    textAlign: 'center',
    marginTop: SCREEN_HEIGHT * 0.005,
    marginHorizontal: SCREEN_WIDTH * 0.093,
    letterSpacing: -0.2,
  },
  // Waveform
  waveformContainer: {
    marginTop: SCREEN_HEIGHT * 0.035,
    marginHorizontal: SCREEN_WIDTH * 0.053,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 27,
    paddingHorizontal: 20,
  },
  waveformBar: {
    width: 4,
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 9,
    paddingHorizontal: 16,
  },
  timeText: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 20,
    color: '#676F88',
    letterSpacing: -0.2,
  },
  // Main Controls
  mainControlsContainer: {
    width:336,
    height:74,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SCREEN_HEIGHT * 0.02,
    gap: 30,
    paddingVertical: 11,
    paddingHorizontal: 20,
    backgroundColor:'#FFFFFF',
    borderRadius:50,
    marginLeft:28
    
  },
  controlButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  skipIcon: {
    width: 24,
    height: 24,
    
  },
  skipIconForward: {
    
  },
  skipText: {
    position: 'absolute',
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -6 }, { translateY: -4 }],
  },
  playPauseButton: {
    width: 52,
    height: 52,
  },
  playPauseCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    borderColor: '#FFE4D5',
    backgroundColor: '#FF7A2D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 0,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderLeftColor: '#FFE4D5',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 3,
  },
  pauseIcon: {
    flexDirection: 'row',
    gap: 3,
  },
  pauseBar: {
    width: 3,
    height: 18,
    backgroundColor: '#FFE4D5',
    borderRadius: 1.5,
  },
  // Bottom Controls
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 29,
    gap: 40,
    paddingVertical: 14,
    paddingHorizontal:36,
  },
  bottomButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomIcon: {
    width: 24,
    height: 24,
    
  },
  speedButton: {
    borderWidth: 1,
    borderColor: 'rgba(60, 60, 67, 0.6)',
    borderRadius: 7,
    paddingHorizontal: 0,
    paddingVertical: 4,
    minWidth: 47,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedText: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 14,
    color: '#070707',
    letterSpacing: -0.2,
  },
  // Recommended Section
  recommendedSection: {
    marginTop: SCREEN_HEIGHT * 0.03,
    marginHorizontal: SCREEN_WIDTH * 0.053,
    paddingBottom: SCREEN_HEIGHT * 0.05,
  },
  recommendedTitle: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: '#070707',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  recommendedScrollView: {
    flexGrow: 0,
  },
  recommendedGrid: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: SCREEN_WIDTH * 0.053,
  },
  audioCard: {
    width: 214,
  },
  audioCardImage: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    marginBottom: 8,
  },
  audioCardInfo: {
    paddingHorizontal: 4,
  },
  audioCardTitle: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
    color: '#0C1121',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  audioCardSubtitle: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 20,
    color: '#676F88',
  },
  // FAB
  fab: {
    position: 'absolute',
    right: SCREEN_WIDTH * 0.027,
    bottom: SCREEN_HEIGHT * 0.1,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(6px)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  fabIcon: {
    width: 16,
    height: 16,
    tintColor: '#000000',
  },
});
