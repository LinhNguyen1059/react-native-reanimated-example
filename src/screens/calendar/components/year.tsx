import React, {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import styles from '../calendar.styles';

interface YearProps {
  minDate?: Date;
  maxDate?: Date;
  year: Date;
  onYearChange?: (year: Date) => void;
}

function Year({minDate, maxDate, year, onYearChange}: YearProps) {
  const data = useMemo(() => {
    const minYear = minDate ? minDate.getFullYear() : 1970;
    const maxYear = maxDate
      ? maxDate.getFullYear()
      : new Date().getFullYear() + 1;

    const years = Array.from(
      {length: maxYear - minYear + 1},
      (_, index) => new Date(minYear + index, 0, 1),
    );

    return years.sort((a, b) => b.getTime() - a.getTime());
  }, [minDate, maxDate]);

  const onItemPress = (_year: Date) => {
    onYearChange && onYearChange(_year);
  };

  function renderItem({item}: {item: Date}) {
    const isSelected = item.getFullYear() === year.getFullYear();

    const wrapperStyle = [
      styles.monthItemWrapper,
      isSelected && styles.monthItemSelected,
    ];

    const textStyle = [
      styles.monthItemText,
      isSelected && styles.monthItemTextSelected,
    ];

    return (
      <View style={styles.monthItemContainer}>
        <TouchableOpacity
          style={wrapperStyle}
          onPress={() => onItemPress(item)}>
          <Text style={textStyle}>{item.getFullYear()}</Text>
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
        numColumns={3}
        extraData={year}
        contentContainerStyle={styles.monthListContainer}
      />
    </View>
  );
}

export default Year;
