import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AudiobookScreen() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('Male');
  const [selectedTab, setSelectedTab] = useState('Audiobook');

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const selectVoice = (voice: string) => {
    setSelectedVoice(voice);
    setShowDropdown(false);
  };

  const chapters = [
    { id: 1, title: 'Introduction to the Fire Se...', duration: '57 min', locked: false },
    { id: 2, title: 'Building Construction', duration: '50 min', locked: true },
    { id: 3, title: 'Building Construction', duration: '50 min', locked: true },
    { id: 4, title: 'Fire Dynamics', duration: '58 min', locked: true },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity style={styles.navigationContainer}>
          <Image
            source={require('../../assets/images/Vector-1.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.audiobookText}>Audiobook</Text>

        <View style={styles.rightButtonsContainer}>
          <TouchableOpacity onPress={toggleDropdown} style={styles.navigationContainer}>
            <Image
              source={require('../../assets/images/bxs_user-voice.png')}
              style={styles.headerImage1}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationContainer}>
            <Image
              source={require('../../assets/images/search.png')}
              style={styles.headerImage2}
            />
          </TouchableOpacity>
        </View>

        {showDropdown && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={[styles.dropdownItem, selectedVoice === 'Male' && styles.selectedItem]}
              onPress={() => selectVoice('Male')}
            >
              <Image style={styles.speakerIcon} source={require('../../assets/images/Frame.png')} />
              <Text style={styles.dropdownText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.dropdownItem, selectedVoice === 'Female' && styles.selectedItem]}
              onPress={() => selectVoice('Female')}
            >
              <Image style={styles.speakerIcon} source={require('../../assets/images/Frame.png')} />
              <Text style={styles.dropdownText}>Female</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <LinearGradient
        colors={['#F95C15', '#FFBA4A']}
        style={styles.ProgressCard}
      >
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.chapterNumber}>Chapter 1</Text>
            <Text style={styles.chapterName}>Introduction to the Fire Se...</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.continueButton}>
                <View style={styles.playIcon} />
              </TouchableOpacity>
              <Text style={styles.continueText}>Continue</Text>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
              <Text style={styles.progressText}>90%</Text>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/Rectangle.png')}
              style={styles.cardImage}
            />
          </View>
        </View>
      </LinearGradient>

      {/* Custom Tab Bar */}
      <View style={styles.tabContainer}>
        {['Audiobook', 'Downloads', 'Bookmarks'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.activeTabButton
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chapter List Header */}
      <View style={styles.chapterHeader}>
        <Text style={styles.chapterCount}>26 Chapters</Text>
        <TouchableOpacity>
          <Text style={styles.buyAllText}>Buy All</Text>
        </TouchableOpacity>
      </View>

      {/* Chapter List */}
      <View style={styles.chapterList}>
        {chapters.map((chapter) => (
          <View key={chapter.id} style={styles.chapterItem}>
            <View style={styles.chapterIcon}>
              <View style={[styles.iconCircle, chapter.locked && styles.lockedIconBg]}>
                {chapter.locked ? (

                  <Image
                    style={styles.lockIcon}
                    source={require('../../assets/images/locked.png')}

                  />
                ) : (
                  <Image
                    style={styles.lockIcon}
                    source={require('../../assets/images/unlocked.png')}

                  />
                )}
              </View>
            </View>

            <View style={styles.chapterInfo}>
              <View style={styles.chapterTitleRow}>
                <Text style={styles.chapterTitle}>Chapter {chapter.id}</Text>
                {chapter.locked && <Text style={styles.lockedLabel}>LOCKED</Text>}
              </View>
              <Text style={styles.chapterSubtitle} numberOfLines={1}>{chapter.title}</Text>
              <Text style={styles.chapterDuration}>{chapter.duration}</Text>
            </View>

            <View style={styles.chapterActions}>
              <TouchableOpacity style={styles.actionButton}>

                <Image

                  style={[styles.actionIcon, chapter.locked && styles.actionIconLocked]}
                  source={require('../../assets/images/locked_bookmark.png')}

                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                
                <Image
                  source={
                    chapter.locked
                      ? require('../../assets/images/locked_download.png')   
                      : require('../../assets/images/cross.png')
                  }
                  style={[styles.actionIcon, chapter.locked && styles.actionIconLocked]}
                />

              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingTop: SCREEN_HEIGHT * 0.06,
    paddingBottom: SCREEN_HEIGHT * 0.02,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  navigationContainer: {
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_WIDTH * 0.11,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    gap: SCREEN_WIDTH * 0.025,
  },
  backIcon: {
    width: SCREEN_WIDTH * 0.02,
    height: SCREEN_WIDTH * 0.04,
    fontSize: 14,
    color: '#000000',
  },
  audiobookText: {
    fontSize: SCREEN_WIDTH * 0.048,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  headerImage1: {
    width: SCREEN_WIDTH * 0.055,
    height: SCREEN_WIDTH * 0.055,
  },
  headerImage2: {
    width: SCREEN_WIDTH * 0.045,
    height: SCREEN_WIDTH * 0.045,
  },
  dropdown: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.12,
    right: SCREEN_WIDTH * 0.18,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    paddingVertical: SCREEN_HEIGHT * 0.015,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    minWidth: SCREEN_WIDTH * 0.35,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.015,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    borderRadius: 8,
  },
  selectedItem: {
    backgroundColor: '#FFF5F0',
  },
  speakerIcon: {
    width: SCREEN_WIDTH * 0.055,
    height: SCREEN_WIDTH * 0.055,
    marginRight: SCREEN_WIDTH * 0.03,
    tintColor: '#F95C15',
  },
  ProgressCard: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.2,
    borderRadius: 24,
    marginHorizontal: SCREEN_WIDTH * 0.05,
    marginTop: SCREEN_HEIGHT * 0.025,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    padding: SCREEN_WIDTH * 0.05,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: SCREEN_WIDTH * 0.35,
  },
  imageContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.4,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  chapterNumber: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: SCREEN_HEIGHT * 0.005,
  },
  chapterName: {
    fontSize: SCREEN_WIDTH * 0.035,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: SCREEN_HEIGHT * 0.022,
    marginBottom: SCREEN_HEIGHT * 0.012,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.015,
  },
  continueButton: {
    width: SCREEN_WIDTH * 0.065,
    height: SCREEN_WIDTH * 0.065,
    borderRadius: SCREEN_WIDTH * 0.0325,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SCREEN_WIDTH * 0.02,
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: SCREEN_WIDTH * 0.016,
    borderRightWidth: 0,
    borderTopWidth: SCREEN_WIDTH * 0.011,
    borderBottomWidth: SCREEN_WIDTH * 0.011,
    borderLeftColor: '#F95C15',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    marginLeft: SCREEN_WIDTH * 0.005,
  },
  continueText: {
    fontSize: SCREEN_WIDTH * 0.038,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
  },
  progressBar: {
    flex: 1,
    height: SCREEN_HEIGHT * 0.006,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: SCREEN_HEIGHT * 0.003,
    marginRight: SCREEN_WIDTH * 0.02,
  },
  progressFill: {
    width: '90%',
    height: '100%',
    backgroundColor: '#1E3A8A',
    borderRadius: SCREEN_HEIGHT * 0.003,
  },
  progressText: {
    fontSize: SCREEN_WIDTH * 0.033,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Custom Tab Styles
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_WIDTH * 0.05,
    marginTop: SCREEN_HEIGHT * 0.025,
    marginBottom: SCREEN_HEIGHT * 0.02,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: SCREEN_WIDTH * 0.01,
  },
  tabButton: {
    paddingHorizontal: SCREEN_WIDTH * 0.045,
    paddingVertical: SCREEN_HEIGHT * 0.012,
    borderRadius: 25,
    marginRight: SCREEN_WIDTH * 0.015,
    backgroundColor: 'transparent',
  },
  activeTabButton: {
    backgroundColor: '#F95C15',
  },
  tabText: {
    fontSize: SCREEN_WIDTH * 0.037,
    fontWeight: '600',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  // Chapter List Styles
  chapterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SCREEN_WIDTH * 0.06,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  chapterCount: {
    fontSize: SCREEN_WIDTH * 0.048,
    fontWeight: '700',
    color: '#000000',
  },
  buyAllText: {
    fontSize: SCREEN_WIDTH * 0.038,
    fontWeight: '600',
    color: '#F95C15',
  },
  chapterList: {
    marginHorizontal: SCREEN_WIDTH * 0.06,
    paddingBottom: SCREEN_HEIGHT * 0.05,
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: SCREEN_WIDTH * 0.04,
    marginBottom: SCREEN_HEIGHT * 0.015,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  chapterIcon: {
    marginRight: SCREEN_WIDTH * 0.035,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFE8D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedIconBg: {
    backgroundColor: '#FFE8D6',
  },
  documentIcon: {
    fontSize: SCREEN_WIDTH * 0.06,
  },
  lockIcon: {
    width: 24,
    height: 24,
  },
  chapterInfo: {
    flex: 1,
    marginRight: SCREEN_WIDTH * 0.02,
  },
  chapterTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.005,
  },
  chapterTitle: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: '700',
    color: '#000000',
    marginRight: SCREEN_WIDTH * 0.025,
  },
  lockedLabel: {
    fontSize: SCREEN_WIDTH * 0.028,
    fontWeight: '700',
    color: '#F95C15',
    backgroundColor: '#FFE8D6',
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    paddingVertical: SCREEN_HEIGHT * 0.003,
    borderRadius: 6,
  },
  chapterSubtitle: {
    fontSize: SCREEN_WIDTH * 0.038,
    color: '#8E8E93',
    marginBottom: SCREEN_HEIGHT * 0.005,
  },
  chapterDuration: {
    fontSize: SCREEN_WIDTH * 0.033,
    color: '#C7C7CC',
  },
  chapterActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SCREEN_WIDTH * 0.02,
  },
  actionButton: {
    padding: SCREEN_WIDTH * 0.015,
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  actionIconLocked: {
    opacity: 1,
  },
  dropdownText: {
    fontSize: SCREEN_WIDTH * 0.042,
    color: '#000000',
    fontWeight: '600',
  },
});
