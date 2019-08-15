
// 项目用到的一些常量

// 正则集合
export const PATTERNS = {
  phone: /^1[1|2|3|4|5|6|7|8|9][0-9]{9}$/,
  email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
  postCode: /^[1-9][0-9]{5}$/,
  idCard: /^\d{18}|\d{15}$/,
  isChinese: new RegExp('[\\u4E00-\\u9FFF]+', 'g'),
  isNumber: /^\d+(?=\.{0,1}\d+$|$)/
}
