import React, {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {checkDateIsNotInCurrentMonth, getMonthCalendar} from '../utils';
import styles from '../calendar.styles';

interface DayProps {
  date: Date;
  month: Date;
  year: Date;
  minDate?: Date;
  maxDate?: Date;
  onDateChange?: (date: Date) => void;
}

const WEEKS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function Day({date, month, year, minDate, maxDate, onDateChange}: DayProps) {
  const data = useMemo(() => {
    const initMonth = month.getMonth();
    const initYear = year.getFullYear();

    return getMonthCalendar(initYear, initMonth);
  }, [month, year]);

  const onItemPress = (_date: Date) => {
    onDateChange && onDateChange(_date);
  };

  function renderItem({item}: {item: Date}) {
    const isNotCurrentMonth = checkDateIsNotInCurrentMonth(
      item,
      month.getMonth(),
      year.getFullYear(),
    );
    const isToday = item.toDateString() === new Date().toDateString();
    const isSelected = date
      ? item.toDateString() === date.toDateString()
      : false;
    const isLessThanMinDate = minDate && item.getTime() < minDate.getTime();
    const isGreaterThanMaxDate = maxDate && item.getTime() > maxDate.getTime();

    const textStyle = [
      styles.dayItemText,
      isNotCurrentMonth && styles.dayItemTextDisabled,
      isToday && styles.dayItemTextToday,
      isSelected && styles.dayItemTextSelected,
    ];

    const wrapperStyle = [
      styles.itemContent,
      isSelected && styles.dayItemSelected,
    ];

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        disabled={
          isNotCurrentMonth || isLessThanMinDate || isGreaterThanMaxDate
        }
        onPress={() => onItemPress(item)}>
        <View style={wrapperStyle}>
          <Text style={textStyle}>{item.getDate()}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.weeksContainer}>
        {WEEKS.map((week, index) => (
          <View key={index} style={styles.weekItemContainer}>
            <Text style={styles.weekItemText}>{week}</Text>
          </View>
        ))}
      </View>
      <FlashList
        data={data}
        keyExtractor={item => item.toISOString()}
        renderItem={renderItem}
        estimatedItemSize={40}
        numColumns={7}
        extraData={date}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default Day;
