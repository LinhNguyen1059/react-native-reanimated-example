export function getMonthsAndYearsBetweenDates(
  minDate: Date,
  maxDate: Date,
): {
  month: number;
  year: number;
}[] {
  const startMonth = minDate.getMonth();
  const startYear = minDate.getFullYear();
  const endMonth = maxDate.getMonth();
  const endYear = maxDate.getFullYear();

  const months = [];
  let currMonth = startMonth;
  let currYear = startYear;

  while (
    currYear < endYear ||
    (currYear === endYear && currMonth <= endMonth)
  ) {
    months.push({
      month: currMonth,
      year: currYear,
    });
    if (currMonth === 11) {
      currMonth = 0;
      currYear++;
    } else {
      currMonth++;
    }
  }

  return months;
}

export function getMonthCalendar(year: number, month: number) {
  const dates = [];
  const date = new Date(year, month, 1);
  const firstDay = date.getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let day = 1 - firstDay;
  for (let i = 0; i < 42; i++) {
    if (day >= 1 && day <= lastDate) {
      dates.push(new Date(year, month, day, 0, 0, 0));
    } else {
      const prevMonth = month === 0 ? 11 : month - 1;
      const nextMonth = month === 11 ? 0 : month + 1;
      const prevMonthLastDate = new Date(year, month, 0, 0, 0, 0).getDate();
      if (day < 1) {
        dates.push(new Date(year, prevMonth, prevMonthLastDate + day, 0, 0, 0));
      } else {
        dates.push(new Date(year, nextMonth, day - lastDate, 0, 0, 0));
      }
    }
    day++;
  }
  return dates;
}

export function checkDateIsNotInCurrentMonth(
  date: Date,
  month: number,
  year: number,
) {
  return date.getMonth() !== month || date.getFullYear() !== year;
}
