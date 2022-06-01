import { groupBy, sumBy } from "lodash";
import moment from "moment";
import { formatSubcontractorProduct } from "../utils/utils";
import { lots, products } from "../utils/data";
import "./styles.css";

// ---------------------------------------------------- //
// ------------------ CLIENT SIDE --------------------- //
// ---------------------------------------------------- //
const productsByLotsDlc = [];
for (const product of products) {
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

  const groupedLotsByDlc = groupBy(lotsByProduct, "dlc");
  for (const [key, values] of Object.entries(groupedLotsByDlc)) {
    const stockQuantity =
      values[0].orderSupplierItem.units.stock.unity.quantity;
    const quantity = sumBy(values, "quantity") * stockQuantity;
    const dlc = moment.utc(+key).format("DD/MM/YYYY");
    // const dlc = +key

    const formattedProduct = formatSubcontractorProduct(product, dlc, quantity);
    productsByLotsDlc.push(formattedProduct);
    // productsByLotsDlc.push({
    //   // product: product.commercialName,
    //   // id: product.objectId,
    //   ...product,
    //   quantity: sumBy(values, "quantity") * stockQuantity,
    //   dlc: moment.utc(+key).format('DD/MM/YYYY'),
    //   // dlc: +key,
    // })
  }
}

// data to send to the api
const data = {
  saleDate: moment().valueOf(),
  products: productsByLotsDlc, // remove duplicated value
  brand: "FOODCHERI",
  user: "tiavinamika@gmail.com",
  siteId: "xxx"
};

console.log("client side products data", data);

// ---------------------------------------------------- //
// ------------------ SERVER SIDE --------------------- //
// ---------------------------------------------------- //
console.log("server side data", groupBy(productsByLotsDlc, "itemId"));

const App = () => {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
};

export default App;
