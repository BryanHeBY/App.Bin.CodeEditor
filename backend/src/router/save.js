const fs = require("fs");
const iconv = require("iconv-lite");

module.exports = async function read({ body }) {
  const { path, encode, value } = body;

  if (!path) {
    return { code: 400, msg: "缺少文件路径参数", data: body };
  }

  try {
    if (!fs.existsSync(path)) {
      return { code: 404, msg: "文件不存在", data: body };
    }

    const stat = fs.statSync(path);
    if (!stat.isFile()) {
      return { code: 400, msg: "路径不是文件", data: body };
    }

    fs.writeFileSync(path, iconv.encode(value, encode));

    return { code: 200, msg: "操作成功", data: null };
  } catch (err) {
    if (err.code === "EACCES") {
      return { code: 401, msg: "权限不足，无法写入文件", data: body };
    } else if (err.code === "ENOENT") {
      return { code: 400, msg: "目录不存在，无法写入文件", data: body };
    } else {
      return { code: 400, msg: "文件操作错误", data: body };
    }
  }
};
