const fs = require("fs");
const plist = require("plist");
const path = require("path");

const getAllFile = function (dir) {
  let res = [];
  function traverse(dir) {
    fs.readdirSync(dir).forEach((file) => {
      const pathname = path.join(dir, file);
      if (fs.statSync(pathname).isDirectory()) {
        traverse(pathname);
      } else {
        res.push(pathname);
      }
    });
  }
  traverse(dir);
  return res;
};

/**
 *
 * @param {Object} changeParams 需要修改的参数，对象形式
 */
const main = (changeParams) => {
  const allFilePathname = getAllFile("./files");
  for (let i = 0; i < allFilePathname.length; i++) {
    const filePathname = allFilePathname[i];
    const fileContent = fs.readFileSync(filePathname, "utf-8");
    const obj = plist.parse(fileContent);
    const newObj = { ...obj, ...changeParams };
    fs.writeFileSync(
      filePathname.replace(/files/, "output"),
      plist.build(newObj),
      { encoding: "utf8" },
      (err) => {
        console.log("error:", err);
      }
    );
  }
};

main({
  ["Build Version"]: "14B72",
});
