import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Header from '../../components/header';
import Picker from './picker';

const HOURS = Array.from({length: 24}, (_, i) => ({
  label: i < 10 ? `0${i}` : i.toString(),
  value: i.toString(),
}));
const MINUTES = Array.from({length: 60}, (_, i) => ({
  label: i < 10 ? `0${i}` : i.toString(),
  value: i.toString(),
}));
const SECONDS = Array.from({length: 60}, (_, i) => ({
  label: i < 10 ? `0${i}` : i.toString(),
  value: i.toString(),
}));

function PickerScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <View style={{flexDirection: 'row', flex: 1}}>
        <Picker data={HOURS} initialIndex={3} />
        <Picker data={MINUTES} initialIndex={24} />
        <Picker data={SECONDS} initialIndex={37} />
      </View>
    </SafeAreaView>
  );
}

export default PickerScreen;
