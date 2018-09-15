
var gulp = require("gulp");
var merge = require("merge-stream");
var imagemin = require('gulp-imagemin');

var htmlDest = "dist/";


var mainScripts = [
    "src/features/data/dataModule.js",
    "src/features/state/stateModule.js",
    "src/features/interface/uiModule.js",
    "!src/features/interface/parallax.js",
    "src/assets/js/supporting-code.js",
    "src/assets/js/parallax-5.0.js",
    "src/features/**/*.js",
    "src/features/app/app.js"
]


var sassStyles = [
	"src/assets/css/classes.scss",
	"src/assets/css/styles.scss"
]


var cssStyles = [
	'temp/**/*.css',
	"node_modules/@fortawesome/fontawesome-free/css/all.css"
]


var shimFile = "node_modules/@babel/polyfill/dist/polyfill.js";


var vendorScripts = [
	"node_modules/mc-shared/shared.js"
]


var miscSrc = function() {

	var misc = gulp.src('src/assets/config/**/*.*')
	.pipe(gulp.dest("dist/assets/config/"))


	var story = gulp.src('src/assets/story/**/*')
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest('dist/assets/img'));


	var image = gulp.src('src/assets/img/**/*')
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest('dist/assets/img'));


	return merge(misc, story, image);

}


// var minify = process.env.NODE_ENV == "production";

var minify = {
	main:{
		full:{
			make:false,
			inject:false
		},
		min:{
			make:true,
			inject:true
		}
	},
	vendor:{
		full:{
			make:true,
			inject:true
		},
		min:{
			make:false,
			inject:false
		}
	}
}



var livereloadPort = 4220;

var directory = __dirname;


module.exports = {
	gulp:{
		shimFile:shimFile,
		htmlDest:htmlDest,
		mainScripts:mainScripts,
		vendorScripts:vendorScripts,
		sassStyles:sassStyles,
		cssStyles:cssStyles,
		miscSrc:miscSrc,
		minify:minify
	},
	livereloadPort:livereloadPort,
	basedir:directory
}




