const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");

const paths = {
  scss: "./src/scss/**/*.scss",
  js: "./src/js/**/*.js",
  html: "./*.html",
  images: "./src/images/**/*",
  dist: "./dist/",
};

function minifyJS() {
  return gulp
    .src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + "js"));
}

function compileSass() {
  return gulp
    .src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist + "css"))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
    open: true,
  });
  gulp.watch(paths.scss, compileSass);
  gulp.watch(paths.js, minifyJS).on("change", browserSync.reload);
  gulp.watch(paths.js).on("change", browserSync.reload);
  gulp.watch(paths.html).on("change", browserSync.reload);
}
exports.default = gulp.series(gulp.parallel(compileSass, minifyJS), serve);
