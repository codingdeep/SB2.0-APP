import actionType from '../Action/typesOfAction';

const initialState = {
  emailAddress: '',
  fullName: '',
  imageUrl: '',
  mobile: '',
  loader: false,
  errorMsg: '',
  team: '',
  smsNotificationEnabled: true,
  emailNotificationEnabled: true,
  specialties: [],
  businessId: null,
  TechnicianId: "",
  selfBookingEnabled: ''
};

export default (state = initialState, action) => {
  switch (action.type) {

    case actionType.LOGINRESULT:
      console.log('AC',action)

      return {
        ...state,
        emailAddress:  action.emailAddress,
        fullName:  action.fullName,
        imageUrl: action.imageUrl,
        mobile: action.mobile,
        loader: false,
        errorMsg: action.errorMsg,
        team: action.team,
        emailNotificationEnabled:  action.emailNotificationEnabled,
        smsNotificationEnabled: action.smsNotificationEnabled,
        specialties:  action.specialties,
        businessId:  action.businessId,
        locationId: action.locationId,
        LOGEDUSER: action.LOGEDUSER,
        LOGEDDATA: action.LOGEDDATA,
        TechnicianId: action.allLogInData.technicianResponsibilities[0].id,
        selfBookingEnabled:  action.selfBookingEnabled,
        AllLogedUserData: action.allLogInData,
        customerBookingAllowed: action.allLogInData.technicianResponsibilities[0].customerBookingAllowed
      };
    case actionType.LOGINCHECK:
      return {
        ...state,
        loader: true,
        errorMsg: '',
      };
    case actionType.LOGINERROR:
      return {
        ...state,
        errorMsg: action.errorMsg,
        loader: false,
      };
    default:
      return state;
  }
};

