import actionType from './typesOfAction';

export function GetProduct(locaionId) {
  return {
    type: actionType.GETPRODUCT,
    locaionId,

  };
}


