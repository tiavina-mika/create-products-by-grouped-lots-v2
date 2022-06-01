import { groupBy, map, sumBy } from "lodash";
import moment from "moment";
import { lots, products } from "./data";
import "./styles.css";

const data = [];
const data2 = new Map();
for (const product of products) {
  // for (const lot of lots) {
  //     if (lot.orderSupplierItem.supplierItemId === product.name.objectId) {

  //     }
  // }
  const lotsByProduct = lots.filter(
    (lot) => lot.orderSupplierItem.supplierItemId === product.name.objectId
  );
  console.table(
    product.commercialName + " lot",
    lotsByProduct.map(({ lotNumber, quantity, dlc }) => ({
      lotNumber,
      quantity,
      dlc: moment(dlc).format("DD/MM/YYYY")
    }))
  );

  const data3 = [];
  const groupByDlc2 = groupBy(lotsByProduct, "dlc");
  // console.log('lotsByProduct', groupBy(lotsByProduct, "dlc"))
  for (const [key, values] of Object.entries(groupByDlc2)) {
    // console.log({[key]: values})
    // console.log('r', groupByDlc2)
    const stockQuantity =
      values[0].orderSupplierItem.units.stock.unity.quantity;
    data.push({
      // product: product.commercialName,
      // id: product.objectId,
      ...product,
      // lots: values
      quantity: sumBy(values, "quantity") * stockQuantity,
      // quantity: sumBy(values, "quantity") * stockQuantity,
      dlc: moment.utc(+key).format("DD/MM/YYYY")
      // dlc: +key,
    });
    data3.push({
      quantity: sumBy(values, "quantity") * stockQuantity,
      dlc: moment.utc(+key).format("DD/MM/YYYY")
      // dlc: +key,
    });
  }
  data2.set(product.objectId, {
    product: product.commercialName,
    data: data3
  });
  // const groupedLotsByDLC = map(groupBy(lotsByProduct, "dlc"), (groupedLots, key) => {
  //     const stockQuantity = groupedLots[0].orderSupplierItem.units.stock.unity.quantity
  //     return {
  //         quantity: sumBy(groupedLots, "quantity") * stockQuantity,
  //         dlc: +key,
  //     }
  // })

  // // const productsByLots = []
  // const productsByLots = new Map();
  // for (const lot of groupedLotsByDLC) {
  //   productsByLots.set(product.objectId,
  //     {
  //       // ...product,
  //       // lotId: lot.objectId
  //       dlc: lot.dlc,
  //       expectedProduction: lot.quantity,
  //   })

  // data.push({
  //     // ...product,
  //     // lotId: lot.objectId
  //     dlc: lot.dlc,
  //     expectedProduction: lot.quantity,
  // })
  // }
  // data.push({
  //     product,
  //     lots: productsByLots.get(product.objectId)
  // })
}
// console.log("productsByLots: ", data.map(({ name, dlc, expectedProduction }) =>
// ({ name: name.name, expectedProduction, dlc: moment(dlc).format("DD/MM/YYYY") })))
// console.table("all lots: ", lots.map(({ lotNumber, quantity, dlc }) => ({ lotNumber, quantity, dlc: moment(dlc).format("DD/MM/YYYY") })))

console.log("data", groupBy(data, "objectId"));
// console.table("data", data)
console.log(
  "data2",
  [...data2.entries()].map((v) => ({ [v[0]]: v[1] }))
);
// console.log('match', lots.map(l => ({
// q: l.orderSupplierItem.units.stock.unity.quantity
// })))
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
