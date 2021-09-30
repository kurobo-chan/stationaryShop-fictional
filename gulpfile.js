// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify"); 
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const assets = require("postcss-assets");
const cssdeclsort = require("css-declaration-sorter");
const mqpacker = require("css-mqpacker");

// style.scssをタスクを作成する
gulp.task("sass", function () {
  return gulp
    .src("./sass/**/*.scss")
    .pipe(
      plumber({ errorHandler: notify.onError("Error:<%= error.message %>") })
    )
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(postcss([mqpacker()])) //②「sass」の後に指定
    .pipe(postcss([cssdeclsort({ order: "smacss" })]))
    .pipe(
      postcss([
        assets({
          loadPaths: ["./images"],
        }),
      ])
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./css"));
});
//監視
gulp.task('sass:watch', function() {
  gulp.watch('./sass/**/*.scss', gulp.task('sass'));
});
