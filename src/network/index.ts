import { message } from "antd";
import Axios, { AxiosRequestConfig } from "axios";

export const baseUrl = "http://127.0.0.1:8081/api";

export default function request(option: AxiosRequestConfig<any>) {
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = Axios.create({
      baseURL: baseUrl,
      timeout: 10000,
    });
    // 配置请求和响应拦截
    instance.interceptors.request.use(
      (config) => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          config.headers.Authorization = token;
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    instance.interceptors.response.use(
      (response) => {
        // 根据不同的返回状态码，返回不同的提示信息
        const data = response.data;
        if (data.code !== 0) {
          message.error(data.msg);
        }
        return response.data;
      },
      (err) => {
        return err;
      }
    );

    instance(option)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
