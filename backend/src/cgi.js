const exec = require("./utils/exec");

// 获取 env、query、body
async function getData() {
  const env = process.env;

  const result = { api: env.HTTP_API_PATH || "", query: {}, body: {} };

  // query
  if (env.QUERY_STRING) {
    const urlParams = new URLSearchParams(env.QUERY_STRING);
    for (const [key, value] of urlParams) {
      result.query[key] = decodeURIComponent(value);
    }
  }

  // body
  if (env.REQUEST_METHOD === "POST") {
    const contentLength = parseInt(env.CONTENT_LENGTH || "0");

    if (contentLength !== 0) {
      const str = await new Promise((r) => {
        let str = "";

        process.stdin.on("data", (chunk) => {
          str += chunk.toString();
        });

        process.stdin.on("end", () => {
          r(str);
        });
      });

      try {
        result.body = str ? JSON.parse(str) : {};
      } catch (error) {
        result.body = {};
      }
    }
  }

  return result;
}

async function main() {
  try {
    const data = await getData();

    const { type, body } = await exec(data);

    if (type) {
      console.log(`Content-Type: ${type}`);
      console.log(`Content-Length: ${body.size}`);
      console.log(
        `Content-Disposition: attachment; filename="${body.filename}"`
      );
      console.log("");
      body.stream.pipe(process.stdout);
    } else {
      console.log("Content-Type: application/json; charset=utf-8\n");
      console.log(JSON.stringify(body));
    }
  } catch (error) {
    console.log("Content-Type: application/json; charset=utf-8\n");
    console.log(JSON.stringify({ code: 400, msg: "调用错误" }));
  }
}

main();
