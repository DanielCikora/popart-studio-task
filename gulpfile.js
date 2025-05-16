const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");

const paths = {
  scss: "./src/scss/**/*.scss",
  js: "./src/js/**/*.js",
  html: "./*.html",
  images: "src/assets/**/*.{png,jpg,jpeg,svg,gif,webp}",
  dist: "./dist/",
};

function minifyImages() {
  return gulp
    .src(paths.images, { encoding: false })
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest(paths.dist + "assets/"));
}

function copyVideos() {
  return gulp
    .src("src/assets/videos/**/*", { encoding: false })
    .pipe(gulp.dest(paths.dist + "assets/videos"));
}

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

function minifyHTML() {
  return gulp
    .src(paths.html)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(paths.dist));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dist,
    },
    serveStaticOptions: {
      extensions: ["html", "png", "jpg", "jpeg", "svg", "gif"],
    },
  });
  gulp.watch(paths.scss, compileSass);
  gulp.watch(paths.js, minifyJS).on("change", browserSync.reload);
  gulp.watch(paths.html, minifyHTML).on("change", browserSync.reload);
  gulp.watch(paths.images, minifyImages).on("change", browserSync.reload);
  gulp
    .watch("src/assets/videos/**/*", copyVideos)
    .on("change", browserSync.reload);
}

exports.default = gulp.series(
  gulp.parallel(compileSass, minifyJS, minifyHTML, minifyImages, copyVideos),
  serve
);
