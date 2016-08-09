// loading modules
var gulp				= require('gulp');
var sass				= require('gulp-sass');
var clean				= require('gulp-clean');
var runSequence	= require('gulp-sequence');
var browserSync	= require('browser-sync');
var minifyCss 	= require('gulp-minify-css');
var cssGlobbing = require('gulp-css-globbing');
var plumber 		= require('gulp-plumber');
var pixrem 			= require('gulp-pixrem');
var uglify 			= require('gulp-uglify');
var concat 			= require('gulp-concat');
var reload			= browserSync.reload;
var htmlmin 		= require('gulp-htmlmin');
var surge 			= require('gulp-surge');

// define variables
var src = {
	vendor: [
		'src/vendor/angular/angular.js',
		'src/vendor/angular-route/angular-route.js',
		'src/vendor/leaflet/dist/leaflet.js',
		'src/vendor/angular-leaflet-directive/dist/angular-leaflet-directive.js',
		'src/vendor/picturefill/dist/picturefill.js',
		'src/vendor/modernizr-lite/modernizr.js',
		'src/vendor/smooth-scroll/dist/js/smooth-scroll.js'
	],
	js: [
		'src/js/app.js',
		'src/js/controllers/MainController.js',
		'src/js/controllers/MapController.js',
		'src/js/helpers.js'
	],
	fonts: 'src/fonts/*',
	scss_init: 'src/scss/main.scss',
	scss: 'src/**/*.scss',
	css: 'src/vendor/leaflet/dist/leaflet.css',
	html: 'index.html',
	views: 'views/**/*.html',
	images: 'src/img/**/*',
	build: 'dist',
	icons: [
		'apple-touch-icon-precomposed.png',
		'touch-icon-192x192.png'
	]
};

// Deletes previous compilations
gulp.task('clean', function () {
	return gulp.src([src.build])
	.pipe(clean({force: true}))
});

// Copies images to build folder
gulp.task('images:build', function() {
	return gulp.src(src.images)
	.pipe(gulp.dest(src.build + '/img'));
});

// Copies icons to build folder
gulp.task('icons:build', function() {
	 return gulp.src(src.icons)
	 .pipe(gulp.dest(src.build));
});

// Copies fonts to build folder
gulp.task('fonts:build', function() {
	return gulp.src(src.fonts)
	.pipe(gulp.dest(src.build + '/fonts'));
});

// Compiles scss and minifies the css to build folder
gulp.task('sass:build', function(){
	return gulp.src([src.scss_init, src.css])
	.pipe(plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
	.pipe(cssGlobbing({
		extensions: ['.scss']
	}))
	.pipe(sass())
	.pipe(concat('main.css'))
	.pipe(pixrem())
	.pipe(minifyCss())
	.pipe(plumber.stop())
	.pipe(gulp.dest(src.build + '/css'));
});

// Concatenates vendor js and main initializer to build folder
gulp.task('vendor:build', function() {
	return gulp.src(src.vendor)
	.pipe(plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
	.pipe(uglify())
	.pipe(concat('base.js'))
	.pipe(plumber.stop())
	.pipe(gulp.dest(src.build + '/js'));
});

// Concatenates and minifies js, controllers and helpers to build folder
gulp.task('js:build', function() {
	return gulp.src(src.js)
	.pipe(plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
	.pipe(uglify({ mangle: false }))
	.pipe(concat('main.js'))
	.pipe(plumber.stop())
	.pipe(gulp.dest(src.build + '/js'));
});

// Compiles the index.html to build folder
gulp.task('html:build', function(){
	gulp.src(src.html)
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest(src.build));
});

// Compiles the views/*.html to build folder
gulp.task('views:build', function(){
	gulp.src(src.views)
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest(src.build + '/views'));
});

// Gulp task - watch
gulp.task('watch', ['build'], () => {
  gulp.watch(src.vendor, ['vendor:build', reload]);
  gulp.watch(src.js, ['js:build', reload]);
  gulp.watch([src.scss], ['sass:build', reload]);
  gulp.watch([src.images], ['images:build', reload]);
  gulp.watch([src.html], ['html:build', reload]);
  gulp.watch([src.views], ['views:build', reload]);
});

// Build gulp task - gulp build
gulp.task('build', ['clean'], cb => {
  runSequence(
    ['images:build', 'icons:build', 'vendor:build', 'js:build'], 'fonts:build', 'sass:build', 'html:build', 'views:build',cb
  );
});

// Default gulp task - gulp
gulp.task('default', ['build'], () => {
  browserSync({
    notify: false,
    open: false,
    logPrefix: 'BS',
    server: [src.build]
  });

  gulp.watch(src.vendor, ['vendor:build', reload]);
  gulp.watch([src.js], ['js:build', reload]);
  gulp.watch([src.scss], ['sass:build', reload]);
  gulp.watch([src.images], ['images:build', reload]);
  gulp.watch([src.html], ['html:build', reload]);
  gulp.watch([src.views], ['views:build', reload]);
});

gulp.task('deploy:build', ['build'], () => {
  return surge({
    project: './dist',
    domain: 'foundersmapquest.surge.sh'
  })
})