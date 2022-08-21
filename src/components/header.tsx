import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ICON} from '../icons';

interface Props {
  style?: ViewStyle;
  onPress?: () => void;
}

function Header(props: Props) {
  const {style: styleOverRight, onPress} = props;
  const navigation = useNavigation();

  const onBackPress = () => {
    onPress ? onPress() : navigation.goBack();
  };

  return (
    <View style={styleOverRight}>
      <TouchableOpacity style={styles.headerButton} onPress={onBackPress}>
        <Image source={ICON['arrow-right']} style={styles.arrow} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    width: 24,
    height: 24,
    transform: [{rotate: '180deg'}],
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
