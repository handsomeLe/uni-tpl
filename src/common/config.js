let url_config = ""

if (process.env.NODE_ENV === "development") {
  // 开发环境
  url_config = "http://192.168.0.1:8080"
  // url_config = ''
  // url_config = ''
} else {
  // 生产环境
  //url_config = ''
  url_config = ""
}
export default url_config
