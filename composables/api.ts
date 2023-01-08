import { $fetch } from "ohmyfetch";
import type { FetchRequest, FetchOptions } from "ohmyfetch";

// 定义全局的接口域名
export const baseURL = "http://127.0.0.1:8081";

const _useApi = $fetch.create({
  baseURL: `${baseURL}`,
  // 请求拦截器
  async onRequest() {
    // 请求加token的操作
  },

  // 响应拦截器
  async onResponse() {
    // 接口请求异常捕获
    // 根据返回的状态码，定义错误提示
  },
});
// 导出封装的APi，实战时再加入参数的情况
export const useApi = async function (
  request: FetchRequest,
  options?: FetchOptions<"json">
) {
  return await _useApi(request, options);
};
