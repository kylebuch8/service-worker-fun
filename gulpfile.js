const { watch, series } = require("gulp");
const compress = require("compression");
const browserSync = require("browser-sync").create();

function defaultTask() {
  browserSync.init({
    server: {
      baseDir: "./",
      middleware: [compress()]
    }
  });


  watch([
    "main.css",
    "main.js",
    "index.html"
  ]).on("change", browserSync.reload);
}

exports.default = series(
  defaultTask
);