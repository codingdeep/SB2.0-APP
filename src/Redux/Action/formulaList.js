import actionType from './typesOfAction';

export function GetFormulaList(locaionId, clientId, nav, clientInfo) {
  return {
    type: actionType.FORMULALIST,
    locaionId: locaionId,
    clientId: clientId,
    nav: nav,
    clientInfo: clientInfo,
  };
}

export function AddNewFormulaList(nav, state) {
  return {
    type: actionType.ADDFORMULA,
    nav: nav,
    NewFormulaInfo: state,
  };
}

export function DeleteFormula(formulaId, state, callback) {
  return {
    type: actionType.DELETEFORMULA,
    formulaId,
    state,
    callback,
  };
}
