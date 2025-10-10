import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TabTwoScreen() {
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
    { id: 1, title: 'Introduction to the Fire  Service Service Service Service Service Service Service Service', duration: '57 min', locked: false },
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
            <Text style={styles.chapterName}>Introduction to the Fire Service...</Text>
            
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
              <View style={[styles.iconCircle, chapter.locked && styles.lockedIcon]}>
                {chapter.locked ? (
                  <Text style={styles.lockIcon}></Text>
                ) : (
                  <View style={styles.playIconSmall} />
                )}
              </View>
            </View>
            
            <View style={styles.chapterInfo}>
              <View style={styles.chapterTitleRow}>
                <Text style={styles.chapterTitle}>Chapter {chapter.id}</Text>
                {chapter.locked && <Text style={styles.lockedLabel}>LOCKED</Text>}
              </View>
              <Text style={styles.chapterSubtitle}>{chapter.title}</Text>
              <Text style={styles.chapterDuration}>{chapter.duration}</Text>
            </View>
            
            <View style={styles.chapterActions}>
              <TouchableOpacity style={styles.bookmarkButton}>
                {/* <Text style={styles.bookmarkIcon}></Text> */}
                <Image
                style = {styles.bookmarkIcon}
                source={require('../../assets/images/bookmark.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.downloadButton}>
                {/* <Text style={styles.downloadIcon}></Text> */}
                <Image
                style = {styles.downloadIcon}
                source={require('../../assets/images/cross.png')}
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
    backgroundColor: '#F9F5F4',
  },
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 56,
    paddingBottom: 24,
    position: 'relative',
  },
  navigationContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  backIcon: {
    width: 7,
    height: 14,
    fontSize: 14,
    color: '#000000',
  },
  audiobookText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  headerImage1: {
    width: 20,
    height: 20,
  },
  headerImage2: {
    width: 16,
    height: 16,
  },
  dropdown: {
    position: 'absolute',
    top: 105,
    right: 70,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 140,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  selectedItem: {
    backgroundColor: '#F9F9F9',
  },
  speakerIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: '#FF8C00',
  },
  ProgressCard: {
    width: 335,
    height: 146,
    borderRadius: 20,
    marginHorizontal: 28,
    marginTop: 20,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 153,
    height: 146,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 153,
    height: 146,
    resizeMode: 'cover',
  },
  chapterNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  chapterName: {
    fontSize: 12,
    fontWeight: '300',
    color: '#FFFFFF',
    lineHeight: 16,
    marginBottom: 10,
    paddingRight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 0,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderLeftColor: '#F95C15',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    marginLeft: 1,
  },
  continueText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    width: '90%',
    height: '100%',
    backgroundColor: '#1E3A8A',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  // Custom Tab Styles
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 36,
    marginTop: 20,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    borderRadius:20,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  activeTabButton: {
    backgroundColor: '#F95C15',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  // Chapter List Styles
  chapterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  chapterCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  buyAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F95C15',
  },
  chapterList: {
    marginHorizontal: 24,
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  chapterIcon: {
    marginRight: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F95C15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedIcon: {
    backgroundColor: '#E5E5E5',
  },
  playIconSmall: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#FFFFFF',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    marginLeft: 2,
  },
  lockIcon: {
    fontSize: 16,
    color: '#999999',
  },
  chapterInfo: {
    flex: 1,
  },
  chapterTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 8,
  },
  lockedLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#F95C15',
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  chapterSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  chapterDuration: {
    fontSize: 12,
    color: '#999999',
  },
  chapterActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkButton: {
    padding: 8,
    marginRight: 4,
  },
  downloadButton: {
    padding: 8,
  },
  bookmarkIcon: {
    width:16,
    height:16
  },
  downloadIcon: {
    width:24,
    height:24
  },
  dropdownText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
});
