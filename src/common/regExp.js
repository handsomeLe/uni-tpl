// 正则, 没有用validateService里面的, 跟后端保持一致，不然有的前端过了后端没过
const commonPattern = {
  carIdReg: /^([京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXYZ][1-9DF][1-9ABCDEFGHJKLMNPQRSTUVWXYZ]\d{3}[1-9DF]|[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXYZ][\dABCDEFGHJKLNMxPQRSTUVWXYZ]{4}[\dABCDEFGHJKLNMxPQRSTUVWXYZ挂学警港澳]|[A-Z]{2}[\d]{5})$/, //  车牌号正则,包括新能源车，不包括特殊车辆，如：警、学、领、港等等
  phoneReg: new RegExp('(^(\\d{3,4}-)?\\d{7,8})$|(^[1][3,4,5,6,7,8,9][0-9]{9}$)'), //  手机号和固定电话同时验证正则
  allLetter: /^[A-Za-z]+$/, // 位符号不允许输入除英文字符之外的其他字符
  chineseAndEnTen: /^[\u4e00-\u9fa5a-zA-Z0-9]{0,10}$/, // 仅支持中英文、数字且长度小于等于10
  chinerseAndEnSixteen: /^[\u4e00-\u9fa5a-zA-Z0-9]{0,16}$/, // 仅支持中英文、数字且长度小于等于16
  numberAndEnSixteen: /^[a-zA-Z0-9]{0,16}$/, // 仅支持英文、数字且长度小于等于16
  numberAndEnThirty: /^[a-zA-Z0-9]{0,30}$/, // 仅支持英文、数字且长度小于等于30
  letterCombinationThree: /^[a-zA-Z0-9]{3}$/, // 字母或数字或两者组合均可
  zipCode: /^[0-9]{6}$/, // 邮编
  moilbe: /(^(\d{3,4}-)?\d{7,8})$|(^[1][3,4,5,6,7,8,9][0-9]{9}$)/, // 电话座机格式
  goodsTypeCode: /^[a-zA-Z0-9]{2}$/, // 商品类型类型代号
  idNumber: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, // 身份证号
  email: /^[A-Za-z0-9\u4e00-\u9fa5_]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, // 邮箱
  enterpriseCode: /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/, // 企业统一社会信用代码
  commonEnterpriseCode: /^(11|12|13|19|51|52|53|59|91|92|93|Y1)\d{6}[^_IOZSVa-z\W]{10}$/, // 企业统一社会信用代码
  maxTwoNumberReg: /^\d+(\.\d{0,2})?$/, // 最多两位小数
  naturalNumber: /^\d+$/, // 自然数
  naturalNumberTen: /^\d{0,10}$/, // 自然数最多10位
  pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, // 中文和英文数字
  patternSpace: /^[\u4E00-\u9FA5A-Za-z·\s]+$/, // 中文和英文 空格和·
  patternLang: /^[\u4E00-\u9FA5A-Za-z\s]+$/, // 中文和英文 空格和
  number: /[0-9]+/, // 数字
  chinerseAndSpotSpace: /^[\u4e00-\u9fa5a-zA-Z0-9·\s]+$/, // 中文和英文数字空格和·
  special: new RegExp(
    "[^`~!@#$^&*()=|{}':;',\\[\\]<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]",
  ), // 不包含特殊字符
  positiveNumber: /^([1-9]|[0-9][0-9.])+$/, // 正数(不含0，含小数)
  positiveInteger: /^[1-9]\d*$/, // 正整数
  numberAndEnglishTow: /^[0-9A-Za-z]{2}$/, // 两位数字、字母或其组合
  numberEnglish: /^[\u4E00-\u9FA5A-Za-z·\s]+$/,
  telReg: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,//手机号验证
  loginPwdReg: /(?!^[0-9]+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,32}$/,//登录密码验证
};
export default commonPattern;