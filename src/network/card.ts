/**
 * 获取卡片列表
 */
export const getCardList = async function () {
  const data = await fetch("http://127.0.0.1:8081/api/product/v1/card");
  const cardList = data.json();
  return cardList;
};


