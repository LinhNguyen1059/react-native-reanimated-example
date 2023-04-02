import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import Header from '../../components/header';
import Calendar from './components/calendar';
import {View} from 'react-native';

function CalendarScreen() {
  const [date, setDate] = React.useState(new Date());

  const onDateChange = (_date: Date) => {
    setDate(_date);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <View style={{flex: 1}}>
        <Calendar date={date} onDateChange={onDateChange} />
      </View>
    </SafeAreaView>
  );
}

export default CalendarScreen;
