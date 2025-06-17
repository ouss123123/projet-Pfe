import gulp from "gulp";
import terser from "gulp-terser";
import babel from "gulp-babel";

gulp.task("minify-jsx", () => {
  return gulp
    .src("src/Pages/**/*.jsx", "src/Components/**/*.jsx", { pwd: "./src" })
    .pipe(
      babel({
        presets: ["@babel/preset-react", "@babel/preset-env"],
      })
    )
    .pipe(terser())
    .pipe(gulp.dest("dist"));
});

gulp.task("default", gulp.series("minify-jsx"));
