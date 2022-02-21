import Moment from 'moment';

export const ServiceGenerator = (
  technicianId,
  offeredServiceId,
  expectedStartTime,
  to
) => {
  return {
    technician: {
      id: technicianId,
    },
    offeredService: {
      id: offeredServiceId,
    },
    expectedStartTime: Moment(expectedStartTime).format('YYYY-MM-DDTHH:mm:ss'),
    period: {
      to: Moment(to).format('YYYY-MM-DDTHH:mm:ss'),
    }
  };
};

// export const serviceToBook = selectedServices => {
//   return selectedServices;
// };

export const EditServiceGenerator = (
  id,
  visitId,
  technicianId,
  offeredServiceId,
  expectedStartTime,
  to,
) => {
  let generateService = {
    id: id,
    visit: {
      id: visitId,
    },
    technician: {
      id: technicianId,
    },
    offeredService: {
      id: offeredServiceId,
    },
    expectedStartTime: Moment(expectedStartTime).format('YYYY-MM-DDTHH:mm:ss'),
    period: {
      to: Moment(to).format('YYYY-MM-DDTHH:mm:ss'),
    },
  };
  if (!generateService.id || generateService.id == null) {
    delete generateService.id;
  }
  if (!generateService.visit.id || generateService.visit.id == null) {
    delete generateService.id;
  }
  console.log('generateService', generateService);

  return generateService;
};
