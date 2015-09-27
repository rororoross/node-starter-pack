var gulp = require('gulp') ,
sass = require('gulp-sass') ,
scsslint = require('gulp-scss-lint') ,
autoprefixer = require('gulp-autoprefixer') ,
browserSync = require('browser-sync') ,
ejs = require('gulp-ejs') ,
plumber = require('gulp-plumber') ,
reload = browserSync.reload;

var SOURCE = {
	scss: 'scss/**/*.scss',
	css: 'public/css/',
	ejs: 'views/**/*.ejs',
	js: ['*.js', 'public/js/*.js'],
	images: 'public/img/**/*'
};

var AUTOPREFIXER_BROWSERS = [
'ie >=10',
'ie_mob >=10',
'ff >=30',
'chrome >=34',
'safari >=7',
'opera >=23',
'ios >=7',
'android >=4.4',
'bb >=10'
];

gulp.task('browser-sync', function(){
	browserSync({
		proxy: 'localhost:3000',
		notify: false
	});
});

gulp.task('bs-reload', function(){
	browserSync.reload();
});

gulp.task('scss-lint', function(){
	gulp.src('' + SOURCE.js)
	.pipe(scsslint());
});

gulp.task('sass', ['scss-lint'], function(){
	gulp.src(SOURCE.scss)
	.pipe(plumber())
	.pipe(sass())
	.pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
	.pipe(gulp.dest(SOURCE.css))
	.pipe(reload({stream:true}));
});

gulp.task('default', ['sass', 'browser-sync'], function(){
	gulp.watch(SOURCE.scss, ['sass']);
	gulp.watch([SOURCE.ejs, SOURCE.js], ['bs-reload']);
});