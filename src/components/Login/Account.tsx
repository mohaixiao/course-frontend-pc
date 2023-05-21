import { Form, FormInstance, Input, message } from "antd";
import OAuth from "../OAuth/OAuth";
import { changeToLogin, switchForget } from "@/slices/loginSlice";
import { changeIsLogin, switchLoginState } from "@/slices/userSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { login } from "@/network/account";

const Account = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm<FormInstance<FormData>>();
  const forget = () => {
    dispatch(switchForget());
  };

  // 立即登录按钮
  const onLoginClick = async () => {
    const phone = form.getFieldValue("phone");
    const password = form.getFieldValue("password");
    /**
     * 请求接口逻辑
     */
    const data: any = await login({
      phone: phone,
      password: password,
    });
    if (data.code === 0) {
      dispatch(changeToLogin());
      dispatch(changeIsLogin(true));
      dispatch(switchLoginState(data.data.split(" ")[1]));
      sessionStorage.setItem("token", data.data.split(" ")[1]);
      message.success("登录成功！");
    }
  };
  return (
    <div className="mt-[20px] relative">
      <Form autoComplete="off" form={form}>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "请输入手机号" }]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password
            type="password"
            placeholder="请输入密码"
            autoComplete="false"
          />
        </Form.Item>
        <div className="flex items-center justify-between">
          <Form.Item>
            <div className="flex items-center mt-[2px] text-[10px]">
              <p>登录即同意小滴课堂</p>
              <a className="ml-[4px] text-[#169bd5]" target="__blank">
                《隐私政策》
              </a>
            </div>
          </Form.Item>

          <Form.Item>
            <span
              className="cursor-pointer text-center text-[12px] text-[#555555]"
              onClick={forget}
            >
              忘记密码
            </span>
          </Form.Item>
        </div>
        <Form.Item>
          <button
            type="submit"
            className="bg-[#4d555d] rounded-full rounded-5px text-center cursor-pointer select-none w-[300px] text-white h-[40px]"
            onClick={onLoginClick}
          >
            立即登录
          </button>
        </Form.Item>
      </Form>
      <OAuth type="login" />
    </div>
  );
};

export default Account;
