const fs = require("fs");

module.exports = async function read({ query }) {
  const { path } = query;

  if (!path) {
    return { code: 400, msg: "缺少文件路径参数" };
  }

  if (!fs.existsSync(path)) {
    return { code: 404, msg: "文件不存在" };
  }

  const stat = fs.statSync(path);
  if (!stat.isFile()) {
    return { code: 400, msg: "路径不是文件" };
  }

  return {
    code: 200,
    msg: "操作成功",
    data: {
      size: stat.size,
      filename: path.split("/").pop(),
      stream: fs.createReadStream(path),
    },
  };
};
