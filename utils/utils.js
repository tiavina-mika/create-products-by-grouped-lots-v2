/**
 * format product as data to send to the api
 */
export const formatSubcontractorProduct = (product, dlc, quantity) => {
  const productImages = product.appImage;
  const type = "SubcontractorProduct";
  const name = product.name && product.name.name ? product.name.name : "";

  return {
    itemId: product.objectId,
    itemType: type,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    dlc,
    name,
    commercialName: product.commercialName,
    brand: product.brand,
    uniqueCode: product.uniqueCode,
    itemBrand: product.brands || [product.brand],
    productType: product.type,
    internalTag: product.internalTag,
    image:
      Array.isArray(productImages) && productImages.length > 0
        ? productImages[0]
        : productImages,
    rating: product.rating,
    nutriscore:
      (product.nutritionInformation &&
        product.nutritionInformation.nutriscore) ||
      null,
    subcontractor: product.subcontractor,
    price: product.price,
    foodcost: product.foodcost || product.totalCost,
    season: product.season,
    expectedProduction: quantity,
    nationalSend: true,
    sendCapital: true,
    smallRetail: true,
    lunchbag: false
  };
};
