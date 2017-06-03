var gulp = require('gulp');
var server = require('gulp-server-livereload');
var autoprefixer = require('gulp-autoprefixer'),
// cssnano = require('gulp-cssnano'),
// jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
// notify = require('gulp-notify'),
cache = require('gulp-cache'),
del = require('del'),
inject = require('gulp-inject'),
angularFilesort = require('gulp-angular-filesort');


gulp.task('serve', function() {
	gulp.src('./')
	.pipe(server({
		livereload: true,
		directoryListing: false,
		open: true
	}));
});

gulp.task('watch', function() {

	// Create LiveReload server
	livereload.listen();

	// Watch any files in dist/, reload on change
	gulp.watch(['src/features/**/*.js', "src/css/**/*.css", "src/**/*.html"]).on('change', livereload.changed);

	// Watch .scss files
	gulp.watch('src/css/**/*.css', ['styles']);

	// Watch .js files
	gulp.watch('src/features/**/*.js', ['scripts']);

	// Watch image files
	gulp.watch('src/img/**/*', ['images']);

});

gulp.task('styles', function() {
	return gulp.src('src/assets/css/**/*.css', { style: 'expanded' })
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(gulp.dest('dist/assets/css'));
});

gulp.task('scripts', function() {
	return gulp.src('src/features/**/*.js')
	// .pipe(jshint('.jshintrc'))
	// .pipe(jshint.reporter('default'))
	.pipe(angularFilesort())
	.pipe(concat('main.js'))
	// .pipe(rename({suffix: '.min'}))
	// .pipe(uglify())
	.pipe(gulp.dest('dist/assets/js'));
});

gulp.task("vendor", function () {

	return gulp.src(["bower_components/**/*.js", "bower_components/**/*.css"])
	.pipe(gulp.dest("dist/bower_components"))
});

gulp.task("html", function () {

	return gulp.src('src/assets/**/*.html')
	.pipe(gulp.dest("dist/assets/"))
});

gulp.task('images', function() {
	return gulp.src('src/assets/img/**/*')
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest('dist/assets/img'));
});

gulp.task('fonts', function () {

	return gulp.src("src/assets/css/**/*.*")
	.pipe(gulp.dest("dist/assets/css"))
});

gulp.task("misc", function () {

	return gulp.src(["./favicon.ico"])
	.pipe(gulp.dest("dist"));
})

gulp.task('index', ["styles", "scripts", 'vendor', 'html', "fonts", "images", "misc"], function () {

	// It's not necessary to read the files (will speed up things), we're only after their paths: 
	var sources = gulp.src(['./dist/assets/**/*.js', './dist/assets/**/*.css'], {read: false});

	return gulp.src('./src/index.html')
	.pipe(inject(sources))
	.pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
	return del('dist');
});

gulp.task('build', ['clean'], function() {
	gulp.start("index");
});






