import actionType from './typesOfAction';

export function StoreData(businessId) {
  return {
    type: actionType.STORECHECK,
    BusinessId: businessId,

  };
}
export function LogedStoreData(StoreData) {
  return {
    type: actionType.LOGEDSTORECHECK,
    // BusinessId: businessId,
    // nav: nav,
    StoreData
  };
}
