/* eslint-disable */
import { Dimensions } from 'react-native';
const moment = require('moment')
import 'moment-timezone';
// import jstz from 'jstz'
import AsyncStorage from '@react-native-community/async-storage';

import { Appearance, AppearanceProvider } from 'react-native-appearance';
import Moment from 'moment';
const defaultMode = Appearance.getColorScheme() || 'light';
const { width, height } = Dimensions.get('window');
export const helperFunctions = {
  themeBg,
  whiteToDark,
  blackWhite,
  themeDark,
  whiteColor,
  yellow,
  largeText,
  mediumFont,
  whiteDark,
  defaultPadding,
  yellowBg,
  flexRow,
  flexColumn,
  textSize,
  assBg,
  assToDarkBg,
  darkLightColor,
  smallFont,
  tinyFont,
  assColor,
  textBlack,
  yellowColor,
  lightDarkBg,
  themeColor,
  borderBottom,
  padding,
  moreLink,
  smallIconWidth,
  listItemBorder,
  margin,
  buttonHeight,
  calculateHeight,

  formatMobilePhone,
  formatDateTime,
  compareDateStrings,
  getDay,
  isDateToday,
  getTodayDateTime,
  getCurrentTimezone,
  convertMomentToCurrentTz,
  getTimelineDate,
  formatDateTimeWithDay,
  assMediumDark,
  timeConvert,
  dateFormat,
  get_time_diff,
  get_time_diff_seperate,
  firstDayOfWeek,
  deviceWiseWidth,
  inputHeight,
  deviceWiseWidthHeight,
  deviceWiseHeight,
  getTopPosition,
  calculateHeightToAdd,
  lightAss,
  headerHeight
};

function headerHeight() {
  return {
    height: 80
  }
}

function getTopPosition(start, args) {
  let mainTime = Moment(start);
  var format = 'hh:mm:ss';
  mainTime = Moment(mainTime, format);
  console.log('SSS', mainTime)
  var top = null;
  args.map(time => {

    let beforeTime = Moment(time.hour, format);
    let afterTime = Moment(time.hourEnd, format);
    if (mainTime.isBetween(beforeTime, afterTime)) {
      top = time.index == 0 ? 0 : 150 * (time.index - 1) + 75
    }
  })



  return { top: top }



}

function buttonHeight() { return width <= 420 ? { height: 45 } : width <= 480 ? { height: 45 } : width <= 760 ? { height: 45 } : width <= 960 ? { height: 55 } : { height: 60 } }

function calculateHeight(big, small) {
  const minutes = getDuration(big, small);
  const H = 150 / 60 * minutes;
  return { height: H }
}
function calculateHeightToAdd(big, small) {
  let minute = getDuration(big, small);
  let h = 150 / 60 * minute;

  return h;
}


function getDuration(b, s) {
  const sum = moment(b).diff(moment(s));
  const minutes = parseInt(moment.duration(sum).asMinutes());

  return minutes
}


function margin(a, b, c, d) {
  return {
    marginTop: a,
    marginBottom: b,
    marginLeft: c,
    marginRight: d
  }
}
function listItemBorder(key) {
  return {
    borderBottomWidth: 1,
    borderBottomColor: defaultMode === 'dark' ? '#ccc' : '#ddd'
  }
}
function deviceWiseHeight(sm, md, lg, exlg) {
  if (width <= 480) {
    return {
      height: sm
    }
  }
  if (width <= 760) {
    return {
      height: md
    }
  }
  if (width <= 960) {
    return {
      height: lg
    }
  }
  if (width > 960) {
    return {
      height: exlg
    }
  }
}

function deviceWiseWidthHeight(sm, md, lg, exlg) {
  if (width <= 480) {
    return {
      height: sm,
      width: sm
    }
  }
  if (width <= 760) {
    return {
      height: md,
      width: sm
    }
  }
  if (width <= 960) {
    return {
      height: lg,
      width: sm
    }
  }
  if (width > 960) {
    return {
      height: exlg,
      width: sm
    }
  }
}

function smallIconWidth() {
  if (width <= 480) {
    return {
      width: 25,
      height: 25,
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 50,
      ...helperFunctions.margin(0, 0, 0, 2)
    }
  }
  if (width <= 760) {
    return {
      width: 35,
      height: 35,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#fff'
    }
  }
  if (width <= 960) {
    return {
      width: 50,
      height: 50,
      borderRadius: 50
    }
  }
}

function deviceWiseWidth(sm, md, lg, exlg) {
  if (width <= 480) {
    return {
      width: sm
    }
  }
  if (width <= 760) {
    return {
      width: md
    }
  }
  if (width <= 960) {
    return {
      width: lg
    }
  }
  if (width > 960) {
    return {
      width: exlg
    }
  }
}
function inputHeight() {
  if (width <= 480) {
    return {
      height: 45
    }
  }
  if (width <= 760) {
    return {
      width: 55
    }
  }
  if (width <= 960) {
    return {
      width: 60
    }
  }
  if (width > 960) {
    return {
      width: 65
    }
  }
}

function moreLink(size1, size2, size3) {
  if (width <= 480) {
    return size1 != undefined ? { fontSize: size1 } : { fontSize: 12 }
  }
  if (width <= 760) {
    return size2 != undefined ? { fontSize: size2 } : { fontSize: 16 }
  }
  if (width <= 960) {
    return size3 != undefined ? { fontSize: size3 } : { fontSize: 18 }
  }
}


function padding(top, bottom, left, right) {
  return {
    paddingTop: top,
    paddingBottom: bottom,
    paddingLeft: left,
    paddingRight: right
  }
}
function lightDarkBg() {
  return defaultMode === 'dark' ? { backgroundColor: '#444' } : { backgroundColor: '#fff' };
}
function borderBottom() {
  return { borderBottomColor: '#ddd', borderBottomWidth: 1, paddingTop: 10 };
}
function yellowColor() {
  return { color: '#fcbf24' };
}
function themeColor() {
  return defaultMode === 'dark' ? { color: '#fff' } : { color: '#424E9C' };
}
function lightAss() {
  return defaultMode === 'dark' ? '#dddddd' : '#999999';
}
function textBlack() {
  if (width <= 480) {
    return {
      color: defaultMode === 'dark' ? '#FFFFFF' : '#0e1317',
      fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: '700',
    };
  }
  if (width <= 760) {
    return {
      color: defaultMode === 'dark' ? '#FFFFFF' : '#0e1317',
      fontFamily: 'Poppins',
      fontSize: 17,
      fontWeight: '700',
    };
  }
  if (width <= 960) {
    return {
      color: defaultMode === 'dark' ? '#FFFFFF' : '#0e1317',
      fontFamily: 'Poppins',
      fontSize: 18,
      fontWeight: '700',
    };
  }
  if (width > 960) {
    return {
      color: defaultMode === 'dark' ? '#FFFFFF' : '#0e1317',
      fontFamily: 'Poppins',
      fontSize: 23,
      fontWeight: '700',
    };
  }
}

function flexRow() {
  return {
    display: 'flex',
    flexDirection: 'row',
  };
}
function flexColumn() {
  return {
    display: 'flex',
    flexDirection: 'column',
  };
}
function themeBg() {

  return defaultMode === 'dark' ? { backgroundColor: '#000' } : { backgroundColor: '#424E9C' }
}
function blackWhite() {

  return defaultMode === 'dark' ? { backgroundColor: '#000' } : { backgroundColor: '#fff' }
}
function themeDark() {

  return defaultMode === 'dark' ? { backgroundColor: '#444' } : { backgroundColor: '#424E9C' }
}
function whiteToDark() {
  return defaultMode === 'dark' ? { backgroundColor: '#444' } : { backgroundColor: '#ffffff' }
}
function assMediumDark() {
  return defaultMode === 'dark' ? { backgroundColor: '#666' } : { backgroundColor: '#ddd' }
}
function assBg() {

  return defaultMode === 'dark' ? { backgroundColor: '#222' } : { backgroundColor: '#F1F0F5' }
}
function assToDarkBg() {

  return defaultMode === 'dark' ? { backgroundColor: '#444' } : { backgroundColor: '#F1F0F5' }
}
function yellowBg() {
  return {
    backgroundColor: '#D39E17',
  };
}

function whiteColor() {
  return { color: '#FFFFFF' };
}
function mediumFont() {
  return width <= 350
    ? { fontSize: 15 }
    : width <= 480
      ? { fontSize: 16 }
      : width <= 760
        ? { fontSize: 22 }
        : width <= 960
          ? { fontSize: 25 }
          : { fontSize: 28 };
}
function largeText() {
  return width <= 480
    ? { fontSize: 30 }
    : width <= 760
      ? { fontSize: 33 }
      : width <= 960
        ? { fontSize: 37 }
        : { fontSize: 40 };
}
function textSize() {
  return width <= 480
    ? { fontSize: 17 }
    : width <= 760
      ? { fontSize: 18 }
      : width <= 960
        ? { fontSize: 20 }
        : { fontSize: 22 };
}
function smallFont() {
  return width <= 350
    ? { fontSize: 12 }
    : width <= 480
      ? { fontSize: 13 }
      : width <= 760
        ? { fontSize: 15 }
        : width <= 960
          ? { fontSize: 18 }
          : { fontSize: 20 };
}
function tinyFont() {
  return width <= 350
    ? { fontSize: 9, color: helperFunctions.darkLightColor() }
    : width <= 480
      ? { fontSize: 10, color: helperFunctions.darkLightColor() }
      : width <= 760
        ? { fontSize: 14, color: helperFunctions.darkLightColor() }
        : width <= 960
          ? { fontSize: 17, color: helperFunctions.darkLightColor() }
          : { fontSize: 20, color: helperFunctions.darkLightColor() };
}

function darkLightColor() {
  return defaultMode === 'dark' ? '#ffffff' : '#000000';
}
function yellow() {
  return '#D39E17';
}
function assColor() {
  return defaultMode === 'dark' ? { color: '#ffffff' } : { color: '#666666' };
}

function whiteDark() {
  return {
    backgroundColor: '#FFFFFF',
  };
}
function defaultPadding() {
  return {
    paddingLeft: 20,
    paddingRight: 20,
  };
}

function firstDayOfWeek(dateObject, firstDayOfWeekIndex) {
  const dayOfWeek = dateObject.getDay(),
    firstDayOfWeek = new Date(dateObject),
    diff =
      dayOfWeek >= firstDayOfWeekIndex
        ? dayOfWeek - firstDayOfWeekIndex
        : 6 - dayOfWeek;

  firstDayOfWeek.setDate(dateObject.getDate() - diff);
  firstDayOfWeek.setHours(0, 0, 0, 0);

  return firstDayOfWeek;
}

// August 18th was a Saturday
let lastMonday = firstDayOfWeek(new Date('August 18, 2018 03:24:00'), 1);

// outputs something like "Mon Aug 13 2018 00:00:00 GMT+0200"
// (may vary according to your time zone)

function compareDateStrings(date, string) {
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getFullYear();
  date = yyyy + '-' + mm + '-' + dd;
  return date == string;
}

function formatMobilePhone(phone = '') {
  return (
    '(' +
    phone.substr(0, 3) +
    ') ' +
    phone.substr(3, 3) +
    '-' +
    phone.substr(6, 4)
  );
}

function isDateToday(date) {
  var q = new Date();
  var m = q.getMonth();
  var d = q.getDate();
  var y = q.getFullYear();

  var checkDate = new Date(date);
  if (
    checkDate.getFullYear() == y &&
    checkDate.getMonth() == m &&
    checkDate.getDate() == d
  ) {
    return true;
  } else {
    return false;
  }
}

function getDay(date, full) {
  var threeLetterDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var fullDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  var day = new Date(date).getDay();
  if (full) {
    return fullDays[day];
  } else {
    return threeLetterDays[day];
  }
}

function formatDateTime(dateTime, returnType) {
  var tz = jstz.determine() || 'America/New_York';

  var currTz = tz.name();
  var momentTime = moment(dateTime);
  var tzTime = momentTime.tz(currTz);

  if (returnType == 'date') {
    //return tzTime.format('MMMM Do, YYYY');
    return tzTime.format('MM Do, YYYY');
  } else if (returnType == 'time') {
    return tzTime.format('hh:mm a');
  } else {
    return tzTime.format('hh:mm a MMM D, YYYY');
  }
}

function formatDateTimeWithDay(dateTime, returnType) {

  ///var tz = jstz.determine() || 'America/New_York';



  ///var currTz = tz.name();
  var momentTime = moment(dateTime)
  //var tzTime = momentTime.tz(currTz);
  var tzTime = momentTime


  if (returnType == "date")
    return tzTime.format('ddd, MMM D YYYY');
  else if (returnType == "time")
    return tzTime.format('hh:mm a');
  else if (returnType == "timeCard")
    return tzTime.format('ddd MMM  D');
  else if (returnType == "time_after")
    //Fri, Jan 31 2020 10:00am
    return tzTime.format('ddd, MMM D YYYY hh:mm a');
  else if (returnType == 'latest')
    return tzTime.format('ddd, MMM D YYYY');
  else if (returnType == 'unique')
    return tzTime.format('MMM / D  YYYY');
  else
    return tzTime.format('hh:mm a, ddd, MMMM Do, YYYY');
}

function getTimelineDate(dateTime, fullDate) {
  var tzTime = moment(dateTime);

  if (fullDate) {
    return tzTime.format('MM/DD/YYYY');
  } else {
    return tzTime.format('MMM D');
  }
}

function getTodayDateTime() {
  // eslint-disable-next-line no-undef
  if (!sessionStorage.getItem('timezone')) {
    var tz = jstz.determine() || 'America/New_York';
    // eslint-disable-next-line no-undef
    sessionStorage.setItem('timezone', tz.name());
  }
  // eslint-disable-next-line no-undef
  var currTz = sessionStorage.getItem('timezone');

  return moment(new Date()).tz(currTz);
}

function getCurrentTimezone() {
  if (!sessionStorage.getItem('timezone')) {
    var tz = jstz.determine() || 'America/New_York';
    sessionStorage.setItem('timezone', tz.name());
  }
  return sessionStorage.getItem('timezone');
}

function convertMomentToCurrentTz(time) {
  return time.tz(getCurrentTimezone());
}

function timeConvert(n, minute = '') {
  // eslint-disable-next-line no-undef
  if (!sessionStorage.getItem('timezone')) {
    var tz = jstz.determine() || 'America/New_York';
    // eslint-disable-next-line no-undef
    sessionStorage.setItem('timezone', tz.name());
  }

  if (minute == '') {
    var spl = n.split('PT');
    var s = spl[1].split('H');
    if (s.length == 2) {
      var min = s[1].split('M');

      if (min[0] == '') {
        return s[0] + ' :' + '00 mins';
      } else {
        return s[0] + ' :' + min[0] + 'mins';
      }
    } else {
      var spl = n.split('PT');
      var s = spl[1].split('H');

      var min = spl[1].split('M');

      return min[0] + ' mins';
    }
  }

  if (minute != '') {
    var spl = n.split('PT');
    var s = spl[1].split('H');
    if (s.length == 2) {
      var min = s[1].split('M');

      return Number(s[0]) * 60 + Number(min[0]);
    } else {
      var spl = n.split('PT');
      var s = spl[1].split('H');

      var min = spl[1].split('M');

      return min[0];
    }
  }
}

function dateFormat(date) {
  if (!sessionStorage.getItem('timezone')) {
    var tz = jstz.determine() || 'America/New_York';
    sessionStorage.setItem('timezone', tz.name());
  }

  var month = '' + (date.getMonth() + 1);
  var day = '' + date.getDate();
  var year = date.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

function get_time_diff(datetime) {
  if (!sessionStorage.getItem('timezone')) {
    var tz = jstz.determine() || 'America/New_York';
    sessionStorage.setItem('timezone', tz.name());
  }

  var datetime =
    typeof datetime !== 'undefined' ? datetime : '2014-01-01 01:02:03.123456';

  var datetime = new Date(datetime).getTime();
  var now = new Date().getTime();

  if (isNaN(datetime)) {
    return '';
  }

  //console.log( datetime + " " + now);

  if (datetime < now) {
    var milisec_diff = now - datetime;
  } else {
    var milisec_diff = datetime - now;
  }

  var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

  var date_diff = new Date(milisec_diff);
  var time = '';

  if (days != null && days != undefined && days != 0 && days != '') {
    time += days + ' days ';
  }
  if (date_diff.getHours() != null || date_diff.getHours() != undefined) {
    time += date_diff.getHours() + ' hrs ';
  }
  if (date_diff.getMinutes() != null || date_diff.getMinutes() != undefined) {
    time += date_diff.getMinutes() + ' mins ';
  }
  //return days + " Days "+ date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes " + date_diff.getSeconds() + " Seconds";
  //return days + " days "+ date_diff.getHours() + " hrs " + date_diff.getMinutes() + " minutes ";

  return time;
}

function get_time_diff_seperate(datetime) {
  if (!sessionStorage.getItem('timezone')) {
    var tz = jstz.determine() || 'America/New_York';
    sessionStorage.setItem('timezone', tz.name());
  }

  var datetime =
    typeof datetime !== 'undefined' ? datetime : '2014-01-01 01:02:03.123456';

  var datetime = new Date(datetime).getTime();
  var now = new Date().getTime();

  if (isNaN(datetime)) {
    return '';
  }

  //console.log( datetime + " " + now);

  if (datetime < now) {
    var milisec_diff = now - datetime;
  } else {
    var milisec_diff = datetime - now;
  }

  var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

  var date_diff = new Date(milisec_diff);

  //return days + " Days "+ date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes " + date_diff.getSeconds() + " Seconds";
  //return days + " days "+ date_diff.getHours() + " hrs " + date_diff.getMinutes() + " minutes ";

  if (days != null || day != undefined) {
    if (days > 30) {
      return days;
    } else {
      return days;
    }
  } else if (
    date_diff.getHours() != null ||
    date_diff.getHours() != undefined
  ) {
    return date_diff.getHours() + ' hours ';
  } else if (
    date_diff.getMinutes() != null ||
    date_diff.getMinutes() != undefined
  ) {
    return date_diff.getMinutes() + ' mins ';
  }
}
