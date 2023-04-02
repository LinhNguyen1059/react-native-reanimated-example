import React, {useMemo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import styles from '../calendar.styles';
import Day from './day';
import Month, {MONTH} from './month';
import Year from './year';

interface MonthProps {
  minDate?: Date;
  maxDate?: Date;
  date: Date;
  onDateChange?: (date: Date) => void;
}

const NEXT_IMAGE = require('../images/next.png');
const PREV_IMAGE = require('../images/prev.png');
const ARROW_DOWN_IMAGE = require('../images/arrow-dropdown.png');

function Calendar({date, minDate, maxDate, onDateChange}: MonthProps) {
  const [mode, setMode] = React.useState<'day' | 'month' | 'year'>('day');
  const [month, setMonth] = React.useState(date);
  const [year, setYear] = React.useState(date);

  const isMinDate = useMemo(() => {
    const initMinDate = minDate || new Date(1970, 0, 1, 0, 0, 0);
    return (
      initMinDate &&
      initMinDate.getFullYear() === year.getFullYear() &&
      initMinDate.getMonth() === month.getMonth()
    );
  }, [minDate, month, year]);

  const isMaxDate = useMemo(() => {
    const initMaxDate =
      maxDate || new Date(new Date().getFullYear() + 1, 11, 31, 0, 0, 0);
    return (
      initMaxDate &&
      initMaxDate.getFullYear() === year.getFullYear() &&
      initMaxDate.getMonth() === month.getMonth()
    );
  }, [maxDate, month, year]);

  const onModeChange = () => {
    if (mode === 'day') {
      setMode('month');
    } else if (mode === 'month') {
      setMode('year');
    } else if (mode === 'year') {
      setMode('day');
    }
  };

  const onMonthChange = (_month: Date) => {
    setMonth(_month);
    setMode('day');
  };

  const onYearChange = (_year: Date) => {
    setYear(_year);
    setMode('month');
  };

  const onPrevPress = () => {
    if (isMinDate) {
      return;
    }

    if (mode === 'day') {
      setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
      if (month.getMonth() === 0) {
        setYear(new Date(year.getFullYear() - 1, 0, 1));
      }
    }
  };

  const onNextPress = () => {
    if (isMaxDate) {
      return;
    }

    if (mode === 'day') {
      setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));
      if (month.getMonth() === 11) {
        setYear(new Date(year.getFullYear() + 1, 0, 1));
      }
    }
  };

  const render = () => {
    if (mode === 'day') {
      return <Day {...{date, month, year, onDateChange, minDate, maxDate}} />;
    }

    if (mode === 'month') {
      return <Month {...{month, year, onMonthChange, minDate, maxDate}} />;
    }

    return <Year {...{year, minDate, maxDate, onYearChange}} />;
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={onModeChange}>
          <Text style={styles.headerText}>
            {MONTH[month.getMonth()]} {year.getFullYear()}
          </Text>
          <Image source={ARROW_DOWN_IMAGE} style={styles.arrowImage} />
        </TouchableOpacity>
        {mode === 'day' && (
          <View style={styles.arrowContainer}>
            <TouchableOpacity
              style={[styles.arrowButton, isMinDate && styles.arrowDisabled]}
              disabled={isMinDate}
              onPress={onPrevPress}>
              <Image source={PREV_IMAGE} style={styles.arrowImage} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.arrowButton, isMaxDate && styles.arrowDisabled]}
              disabled={isMaxDate}
              onPress={onNextPress}>
              <Image source={NEXT_IMAGE} style={styles.arrowImage} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {render()}
    </View>
  );
}

export default Calendar;
