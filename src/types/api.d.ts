export enum CourseLevel {
  Middle = "MIDDLE",
  Senior = "SENIOR",
}
export enum Player {
  Hwyun = "HWYUN",
}
export enum ProductType {
  Course = "COURSE",
}

/**
 * 接口返回基本数据类型
 */
export interface IApiBase<T> {
  code: number;
  msg: string;
  data: T;
}
/**
 * 微信二维码接口返回参数
 */
export interface IWechat {
  qrcodeUrl: string;
  ticket: string;
}
/**
 * 课程分类接口返回参数
 */
export interface ICategoryList {
  id: number;
  name: string;
  pid: number;
  gmt_create: string;
  gmt_modified: string;
  level: null;
  subCategoryList?: ICategoryList[];
}
/**
 * 轮播图接口返回参数
 */
export interface IBanner {
  id: number;
  location: string;
  name: string;
  img_url: string;
  pc_link: string;
  h5_link: string;
  expired: string;
  del: number;
  gmt_create: string;
  gmt_modified: string;
}
/**
 * 个人信息接口返回
 */
export interface IUserInfo {
  id: number;
  username: string;
  head_img: string;
  phone: string;
  pwd: string;
  position: null;
  slogan: string;
  sex: string;
  city: null;
  role: null;
  learn_time: null;
  vip_rank: number;
  vip_expired: null;
  gmt_create: string;
  gmt_modified: string;
  disabled: null;
  openid: null;
  unionid: null;
}
/**
 * 视频卡片接口返回参数
 */
export interface ICard {
  id: number;
  name: string;
  summay: string;
  row_num: number;
  column_num: number;
  product_list: ProductList[];
  card_type: string;
  icon: string;
  weight: number;
  del: number;
  gmt_create: string;
  gmt_modified: string;
}
export interface ProductList {
  id: number;
  title: string;
  cover_img: string;
  old_amount: string;
  amount: string;
  summary: string;
  detail: string;
  product_type: ProductType;
  uv: number;
  buy_num: number;
  teacher_id: number;
  course_level: CourseLevel;
  hour: number;
  episode_num: number;
  player: Player;
  tdk: null;
  ali_zip_url: null;
  bd_zip_url: string;
  note_url: string;
  del: number;
  gmt_modified: string;
  gmt_create: string;
  total_point: string;
  content_point: string;
  easy_point: string;
  logic_point: string;
}

/**
 * 讲师接口返回参数
 */
export interface ITeacher {
  id: number;
  name: string;
  profile: string;
  head_img: string;
  wechat_qrcode: null | string;
  pay_qrcode: null | string;
  point: number;
  remark: null | string;
  phone: string;
  online: string;
  gmt_create: string;
  gmt_modified: string;
}

/**
 * 分类查找视频接口返回参数
 */
export interface IPoductQuery {
  current_data: ProductList[];
  total_page: number;
  total_record: number;
}
/**
 * 视频详情接口返回参数
 */
export interface IVideoDitails {
  id: number;
  title: string;
  cover_img: string;
  old_amount: number;
  amount: number;
  summary: string;
  detail: string;
  product_type: string;
  uv: number;
  buy_num: number;
  teacher_id: number;
  course_level: string;
  hour: number;
  episode_num: number;
  player: string;
  tdk: string;
  ali_zip_url: null;
  bd_zip_url: string;
  note_url: string;
  del: number;
  gmt_modified: string;
  gmt_create: string;
  total_point: string;
  content_point: string;
  easy_point: string;
  logic_point: string;
  teacherDetail: TeacherDetail;
}
export interface TeacherDetail {
  id: number;
  name: string;
  profile: string;
  head_img: string;
  wechat_qrcode: string;
  pay_qrcode: string;
  point: number;
  remark: null;
  phone: string;
  online: string;
  gmt_create: string;
  gmt_modified: string;
}

/**
 * 最近在学接口返回参数
 */
export interface IlatestLearn {
  id: number;
  account_id: number;
  username: string;
  user_head_img: string;
  out_trade_no: string;
  transaction_no: null;
  order_state: string;
  total_amount: string;
  pay_amount: string;
  pay_type: null;
  product_id: number;
  product_type: string;
  product_title: string;
  product_img: string;
  ip: string;
  is_comment: number;
  discount_type: null;
  discount_amount: null;
  del: number;
  notify_time: null;
  gmt_create: string;
  gmt_modified: string;
}
/**
 * 视频章集接口参数返回
 */
export interface IChapter {
  id: number;
  product_id: number;
  title: string;
  ordered: number;
  gmt_create: string;
  gmt_modified: string;
  episodeList: EpisodeList[];
}
export interface EpisodeList {
  id: number;
  title: string;
  ordered: number;
  hwyun_id: string;
  aliyun_id: string;
  chapter_id: number;
  duration: string;
  free: number;
  product_id: number;
  gmt_create: string;
  gmt_modified: string;
}
/**
 * 课程评论列表返回参数
 */
export interface IComment {
  current_data: CurrentDatum[];
  total_page: number;
  total_record: number;
}
export interface CurrentDatum {
  id: number;
  content: string;
  account_id: number;
  head_img: string;
  username: string;
  up: number;
  order_id: number;
  product_id: number;
  gmt_create: string;
  gmt_modified: string;
  total_point: string;
  content_point: string;
  easy_point: string;
  logic_point: string;
  del: number;
}

// 资料接口返回参数
export interface IVideoMaterials {
  bd_zip_url: string;
  note_url: string;
}

// 热门商品排行榜
export interface IHotProduct {
  id: number;
  title: Title;
  img: string;
}

// 课程支付二维码
export interface IWechatPay {
  code_url: string;
  out_trade_no: string;
}

// 轮询查询订单状态
export interface IOrderState {
  order_state: string;
}

// 视频播放地址
export interface IVideoList {
  playResult: string;
  episodeId: string;
}

// 卷王排行榜
export interface IDuration {
  id: number;
  username: string;
  head_img: string;
  minute: string;
}

// 弹幕列表
export interface IDanmu {
  id: number;
  product_id: number;
  episode_id: number;
  account_id: number;
  head_img: string;
  username: string;
  content: string;
  style: null | string;
  play_time: number;
  source_type: string;
  target_url: null | string;
  gmt_create: string;
  gmt_modified: string;
  del: number;
}

export interface IPage<T> {
  current_data: T[];
  total_page: number;
  total_record: number;
}

export interface IPlayRecord {
  id: number;
  product_id: number;
  current_episode_id: number;
  account_id: number;
  learn_ids: string;
  pay_status: string;
  gmt_modified: string;
  product_title: string;
  cover_img: string;
  episode_num: number;
  product_type: string;
  episode_title: string;
}
