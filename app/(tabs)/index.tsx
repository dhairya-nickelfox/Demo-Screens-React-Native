import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

export default function HomeScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const textInputRef = useRef<TextInput>(null);


   useEffect(() => {
    textInputRef.current?.focus();
  }, [focusedIndex]);

  
  const handleOtpChange = (text: string) => {
    const newOtp = [...otp];
    const currentIndex = focusedIndex;
    
    if (text.length === 1) {
      newOtp[currentIndex] = text;
      setOtp(newOtp);
      
      if (currentIndex < 3) {
        setFocusedIndex(currentIndex + 1);
      }
    } else if (text.length === 0) {
      if (currentIndex > 0) {
        setFocusedIndex(currentIndex - 1);
        newOtp[currentIndex - 1] = '';
        setOtp(newOtp);
      } else {
        newOtp[currentIndex] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleKeyPress = ({ nativeEvent }: { nativeEvent: any }) => {
  if (nativeEvent.key === 'Backspace') {
    const currentIndex = focusedIndex;
    const newOtp = [...otp];

    if (otp[currentIndex] !== '') {
      newOtp[currentIndex] = '';
      setOtp(newOtp);
    } else if (currentIndex > 0) {
      newOtp[currentIndex - 1] = '';
      setOtp(newOtp);
      setFocusedIndex(currentIndex - 1);
    }
  }
};


  const handleBoxPress = (index: number) => {
    setFocusedIndex(index);
    textInputRef.current?.focus();
  };


  return (
    // <View style={styles.container}>
    //   <View style={styles.titleContainer}>
    //     <Text style={styles.optText}>OTP Verification</Text>
    //     <Text style={styles.instructionText}>Enter the 4 digit code sent to</Text>
    //     <View style={styles.emailContainer}>
    //       <Text style={styles.emailText}>john@email.com</Text>
    //       <Image style={styles.editIcon} source={require('../../assets/images/edit-3.png')} />
    //     </View>
    //   </View>
      
    //   <View style={styles.otpContainer}>
    //     {otp.map((digit, index) => (
    //       <TouchableOpacity
    //         key={index}
    //         style={[
    //           styles.otpBox,
    //           focusedIndex === index && styles.otpBoxFocused
    //         ]}
    //         onPress={() => handleBoxPress(index)}
    //       >
    //         <Text style={styles.otpDigit}>{digit}</Text>
    //       </TouchableOpacity>
    //     ))}
    //   </View>
      
    //   <TextInput
    //     ref={textInputRef}
    //     style={styles.hiddenInput}
    //     value=""
    //     onKeyPress={handleKeyPress}
    //     onChangeText={handleOtpChange}
    //     keyboardType="numeric"
    //     maxLength={1}
    //     autoFocus={true}
    //     returnKeyType="done"
    //     blurOnSubmit={false}
    //     selectTextOnFocus={true}
    //   />
      
    //   <View style={styles.resendContainer}>
    //     <Text style={styles.resendText}>Didn't receive code? </Text>
    //     <TouchableOpacity>
    //       <Text style={styles.resendLink}>Resend</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <Text>hlo</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  titleContainer: {
    marginBottom: 32,
  },
  optText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  editIcon: {
    height: 16,
    width: 16,
    marginLeft: 8,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 0,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#90EE90',
    backgroundColor: '#FFF8DC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFocused: {
    borderColor: '#FF8C00',
    borderWidth: 3,
  },
  hiddenInput: {
    position: 'absolute',
    left: -9999,
    opacity: 0,
  },
  otpDigit: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: {
    fontSize: 16,
    color: '#666666',
  },
  resendLink: {
    fontSize: 16,
    color: '#FF8C00',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
