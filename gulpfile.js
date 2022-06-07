const gulp = require('gulp');
const rename = require('gulp-rename');
const htmlreplace = require('gulp-html-replace');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

// Move html to dist
gulp.task('html', () =>
	gulp
		.src('*.html')
		.pipe(htmlreplace({ css: 'css/style.min.css', js: 'js/script.min.js' }))
		.pipe(gulp.dest('dist'))
);

// Convert scss to css
gulp.task('scss', () =>
	gulp
		.src('src/scss/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest('dist/css'))
);

// Uglify javascript
gulp.task('js', () =>
	gulp
		.src('src/js/*.js')
		.pipe(babel({ presets: ['@babel/preset-env'] }))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('dist/js'))
);

// Minify images
gulp.task('images', () =>
	gulp
		.src('src/assets/images/*')
		.pipe(imagemin({ verbose: true }))
		.pipe(
			rename(path => {
				path.extname = `.min${path.extname}`;
			})
		)
		.pipe(gulp.dest('dist/assets/images'))
);

gulp.task('watch', () => {
	gulp.watch('*.html', gulp.parallel('html'));
	gulp.watch('src/scss/*.scss', gulp.parallel('scss'));
	gulp.watch('src/js/*.js', gulp.parallel('js'));
	gulp.watch('src/assets/images/*', gulp.parallel('images'));
});

exports.default = gulp.parallel('html', 'scss', 'js', 'images');
