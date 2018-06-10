export const getProductDetails = (product) => {
  const parser = new DOMParser();
  const parsedHTML = parser.parseFromString(product, 'text/html');
  const productName = getProductName(parsedHTML);
  const productImage = getProductImage(parsedHTML);
  const productPrice = getProductPrice(parsedHTML);
  const productSellerName = getProductSellerName(parsedHTML);
  const productSellerRating = getProductSellerRating(parsedHTML);
  const productHighlight = getProductHighlight(parsedHTML);
  const productRating = getProductRating(parsedHTML);
  const productRatingCount = getProductRatingCount(parsedHTML);
  const questionCountAboutProduct = getQuestionCountAboutProduct(parsedHTML);
  const productInstallmentPlans = getProductInstallmentPlans(parsedHTML);
  const liveUpDeliveryInfo = getLiveUpDeliveryInfo(parsedHTML);
  const homeDeliveryInfo = getHomeDeliveryInfo(parsedHTML);
  const cODDeliveryInfo = getCODDeliveryInfo(parsedHTML);
  const productReturnInfo = getProductReturnInfo(parsedHTML);
  const productWarrantyInfo = getProductWarrantyInfo(parsedHTML);
  const productDetails = { productName, productImage, productPrice, productSellerName, productSellerRating, productHighlight, productRating, productRatingCount, questionCountAboutProduct, productInstallmentPlans, liveUpDeliveryInfo, homeDeliveryInfo, cODDeliveryInfo, productReturnInfo, productWarrantyInfo };
  return productDetails;
};

export const getProductName = (parsedHtml) => {
  const productName = parsedHtml.getElementById('module_product_title_1').childNodes[0].innerText;
  return productName;
};

export const getProductPrice = (parsedHtml) => {
  const productPrice = parsedHtml.getElementById('module_product_price_1').querySelector('.pdp-product-price span').innerText;
  return productPrice;
};

export const getProductSellerName = (parsedHtml) => {
  const sellerName = parsedHtml.getElementById('module_seller_info').querySelector('.seller-name__detail a').innerText;
  return sellerName;
};

export const getProductSellerRating = (parsedHtml) => {
  const productSellerRatingNode = parsedHtml.getElementById('module_seller_info').querySelector('.seller-info-num');
  if (productSellerRatingNode) {
    return productSellerRatingNode.innerText;
  }
  return 'no info available';
};

export const getProductImage = (parsedHTML) => {
  const imageSource = parsedHTML.getElementById('module_item_gallery_1').querySelector('.gallery-preview-panel__content img').getAttribute('src');
  return imageSource;
};

export const getProductHighlight = (parsedHtml) => {
  const highlightList = [];
  const highlightListNodes = parsedHtml.getElementById('module_product_detail').querySelectorAll('.pdp-product-highlights li');
  highlightListNodes.forEach((highlight) => {
    highlightList.push(highlight.innerText);
  });
  return highlightList;
};

export const getProductRating = (parsedHtml) => {
  const productRating = parsedHtml.getElementById('module_product_review').querySelector('.mod-rating .score span').innerText;
  return productRating;
};

export const getProductRatingCount = (parsedHtml) => {
  const productRatingCount = parsedHtml.getElementById('module_product_review').querySelector('.mod-rating .count').innerText;
  return productRatingCount;
};

export const getQuestionCountAboutProduct = (parsedHtml) => {
  const questionCount = parsedHtml.getElementById('module_product_review_star_1').querySelector('.pdp-review-summary a:last-child').innerText;
  return questionCount;
};

export const getProductInstallmentPlans = (parsedHtml) => {
  const installmentItem = parsedHtml.getElementById('module_installment').querySelector('.installment-item p');
  if (installmentItem) {
    return installmentItem.innerText;
  }
  return 'no installments';
};

export const getLiveUpDeliveryInfo = (parsedHtml) => {
  const wrapItem = parsedHtml.getElementById('module_seller_delivery').querySelector('.delivery');
  if (wrapItem) {
    const liveUpDeliveryInfo = wrapItem.querySelector('.delivery-option-item_type_liveup .delivery-option-item__title').innerText;
    return liveUpDeliveryInfo;
  }
  return 'liveUp delivery option not available';
};

export const getHomeDeliveryInfo = (parsedHtml) => {
  const wrapItem = parsedHtml.getElementById('module_seller_delivery').querySelector('.delivery');
  if (wrapItem) {
    const homeDeliveryInfo = wrapItem.querySelector('.delivery-option-item_type_economy .delivery-option-item__shipping-fee').innerText;
    return homeDeliveryInfo;
  }
  return 'home delivery option not available';
};

export const getCODDeliveryInfo = (parsedHtml) => {
  const wrapperItem = parsedHtml.getElementById('module_seller_delivery').querySelector('.delivery');
  if (wrapperItem) {
    const codItemValue = wrapperItem.querySelector('.delivery-option-item_type_COD') ? wrapperItem.querySelector('.delivery-option-item_type_COD .delivery-option-item__title').innerText : wrapperItem.querySelector('.delivery-option-item_type_noCOD .delivery-option-item__title').innerText;
    return codItemValue;
  }
  return 'COD option not available';
};

export const getProductReturnInfo = (parsedHtml) => {
  const productReturnInfo = parsedHtml.getElementById('module_seller_warranty').querySelector('.delivery-option-item_type_returnPolicy14 .delivery-option-item__title').innerText;
  return productReturnInfo;
};

export const getProductWarrantyInfo = (parsedHtml) => {
  const wrapperItem = parsedHtml.getElementById('module_seller_warranty');
  const productWarrantyInfo = wrapperItem.querySelector('.delivery-option-item_type_warranty') ? wrapperItem.querySelector('.delivery-option-item_type_warranty .delivery-option-item__title').innerText : wrapperItem.querySelector('.delivery-option-item_type_noWarranty .delivery-option-item__title').innerText;
  return productWarrantyInfo;
};
