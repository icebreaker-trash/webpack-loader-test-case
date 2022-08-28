console.log("Hello World!");
import "./a";
import("./b").then((res) => {
  console.log(res);
});
// @ts-ignore
import c from "babel-loader!file-loader?esModule=false&name=[contenthash].js!./file.ts";

console.log(c);

const script = document.createElement("script");

script.src = c;

script.onload = (e) => {
  console.log(e);
};
script.onerror = (e) => {
  console.error(e);
};

document.body.appendChild(script);
