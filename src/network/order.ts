/**
 * 根据订单ID查询订单是否被购买过
 * @param id 商品订单id
 */

const baseUrl = "http://127.0.0.1:8081/api";

export const queryPay = async function (id: number) {
  const data = await fetch(`${baseUrl}/order/v1/query_pay`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  return data.json();
};

/**
 * 获取课程的支付二维码
 * @param options 场景：type 课程：id
 */
export const wechatPay = async function (options: {
  id: number;
  type: string;
}) {
  const data = await fetch(`${baseUrl}/order/v1/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(options),
  });
  return data.json();
};

/**
 * 查询订单状态
 * @param outTradeNo 订单号
 */
export const queryState = async (outTradeNo: string) => {
  const data = await fetch(
    `${baseUrl}/order/v1/query_state?out_trade_no=${outTradeNo}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data.json();
};
