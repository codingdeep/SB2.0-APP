/* eslint-disable */
import actionType from './typesOfAction';

export function StartClock(

    locationId,
    latitude,
    longitude,
    CardIsOpen,
    CardId
) {
  return {
    type: actionType.STARTCLOCK,
    locationId: locationId,
    latitude,
    longitude,
    CardIsOpen,
    CardId
  };
}
export function BreakOnOff(

  locationId,
  latitude,
  longitude,
  CardIsOpen,
  CardId,
  breakId
) {
  return {
    type: actionType.BREAKROFFON,
    locationId: locationId,
    latitude,
    longitude,
    CardIsOpen,
    CardId,
    breakId
  };
}


export function ClockActivator(start, sec, min, hour) {
  return {
    type: actionType.CLOCKACTIVITORNOW,
    start: start,
    sec: sec,
    min: min,
    hour: hour,
  };
}

export function ClockRealtimeCheck() {
  return {
    type: actionType.GETREALTIMEREFRSH,
  };
}

export function GetTodayDetailsTime(locationId) {
  return {
    type: actionType.GETTODAYWORKTIME,
    locationId
  };
}
export function GetOpenCardInfo(locationId) {
  return {
    type: actionType.GETOPENCARDINFO,
    locationId
  };
}
