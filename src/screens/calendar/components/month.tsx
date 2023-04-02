import React, {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import styles from '../calendar.styles';

interface MonthProps {
  month: Date;
  year: Date;
  minDate?: Date;
  maxDate?: Date;
  onMonthChange?: (month: Date) => void;
}

export const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function Month({month, year, minDate, maxDate, onMonthChange}: MonthProps) {
  const data = useMemo(() => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(new Date(year.getFullYear(), i, 1));
    }
    return months;
  }, [year]);

  const onItemPress = (_month: Date) => {
    onMonthChange && onMonthChange(_month);
  };

  function renderItem({item}: {item: Date}) {
    const isSelected =
      item.getMonth() === month.getMonth() &&
      item.getFullYear() === month.getFullYear();
    const isMonthLessThanMinDate =
      minDate &&
      item.getFullYear() === minDate.getFullYear() &&
      item.getMonth() < minDate.getMonth();
    const isMonthGreaterThanMaxDate =
      maxDate &&
      item.getFullYear() === maxDate.getFullYear() &&
      item.getMonth() > maxDate.getMonth();

    const wrapperStyle = [
      styles.monthItemWrapper,
      isSelected && styles.monthItemSelected,
    ];

    const textStyle = [
      styles.monthItemText,
      isSelected && styles.monthItemTextSelected,
      isMonthLessThanMinDate && styles.monthItemTextDisabled,
      isMonthGreaterThanMaxDate && styles.monthItemTextDisabled,
    ];

    return (
      <View style={styles.monthItemContainer}>
        <TouchableOpacity
          style={wrapperStyle}
          disabled={isMonthLessThanMinDate || isMonthGreaterThanMaxDate}
          onPress={() => onItemPress(item)}>
          <Text style={textStyle}>{MONTH[item.getMonth()]}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlashList
        data={data}
        keyExtractor={item => item.toISOString()}
        renderItem={renderItem}
        estimatedItemSize={40}
        numColumns={2}
        extraData={month}
        contentContainerStyle={styles.monthListContainer}
      />
    </View>
  );
}

export default Month;
