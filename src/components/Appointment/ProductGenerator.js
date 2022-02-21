import Moment from 'moment';


//   "technician": {
//     "id": "315"
// },
// "quantity": 1,
// "chargeAmount": 34,
// "locatedProductVariant": {
//     "id": 3472
// }
export const ProductGenerator = (
  name,
  technicianId,
  quantity,
  chargeAmount,
  locatedProductVariant,
) => {
  return {

    name: name,
    main: {
      technician: {
        id: technicianId,
      },
      quantity: quantity,
      chargeAmount: chargeAmount,
      locatedProductVariant: {
        id: locatedProductVariant
      }
    }

  }
};

export const Products = (
    selectedProducts
) => {
  return selectedProducts
};


export const EditProductGenerator = (
  name,
  id,
  visitId,
  technicianId,
  quantity,
  chargeAmount,
  locatedProductVariant,
) => {
  let generateProduct = {

    name: name,
    main: {
      id: id,
      visit: {
        id: visitId
      },
      technician: {
        id: technicianId,
      },
      quantity: quantity,
      chargeAmount: chargeAmount,
      locatedProductVariant: {
        id: locatedProductVariant
      }
    }

  }
  if (!generateProduct.main.id) {
    delete generateProduct.main.id
  }
  if (!generateProduct.main.visit.id) {
    delete generateProduct.main.id
  }
  console.log("generateProduct.name", generateProduct.name);

  return generateProduct.name != null ? generateProduct : generateProduct.main;
};
