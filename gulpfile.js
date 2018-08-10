var gulp  = require( 'gulp' ),
	gutil = require( 'gulp-util' ),

	// CSS related
	sass         = require( 'gulp-sass' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	mmq          = require( 'gulp-merge-media-queries' ),
	sourcemaps   = require( 'gulp-sourcemaps' ),
	filter       = require( 'gulp-filter' ),
	minifycss    = require( 'gulp-uglifycss' ),

	// JS related
	concat = require( 'gulp-concat' ),
	uglify = require( 'gulp-uglify' ),

	// Others
	rename  = require( 'gulp-rename' ),
	notify  = require( 'gulp-notify' ),
	plumber = require( 'gulp-plumber' );

// Default Gulp task
gulp.task( 'default', ['front-css', 'admin-css', 'front-js', 'admin-js'], function() {

});

// Watch task
gulp.task( 'watch', ['front-css', 'admin-css', 'front-js', 'admin-js'], function() {
	// Styles
	gulp.watch( ['assets/src/css/**/*.scss'], ['front-css'] );
	gulp.watch( ['assets/src/css/**/*.scss'], ['admin-css'] );

	// Scripts
	gulp.watch( ['assets/src/js/modules/*.js'], ['front-js'] );
	gulp.watch( ['assets/src/js/admin/*.js'], ['admin-js'] );
});

// Styles task
gulp.task( 'front-css', function() {
	return  gulp.src( 'assets/src/css/front.scss' )
	.pipe( plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) }) )
	.pipe( sourcemaps.init() )
	.pipe( sass({
		errLogToConsole: true,
		outputStyle: 'compressed',
		precision: 10
	}) )
	.pipe( sourcemaps.write({ includeContent: false }) )
	.pipe( sourcemaps.init({ loadMaps: true }) )
	.pipe( autoprefixer( {
		browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
	}) )
	.pipe( sourcemaps.write('.') )
	.pipe( plumber.stop() )
	.pipe( filter( '**/*.css' ) )
	.pipe( mmq({
		log: true
	}) )
	.pipe( rename( 'front.css' ) )
	.pipe( gulp.dest( 'assets/dist/css' ) )
	.pipe( rename({ suffix: '.min' }) )
	.pipe( minifycss({
		maxLineLen: 0,
		uglyComments: true
	}) )
	.pipe( gulp.dest( 'assets/dist/css' ) );
});

gulp.task( 'admin-css', function() {
	return  gulp.src( 'assets/src/css/admin.scss' )
	.pipe( plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) }) )
	.pipe( sourcemaps.init() )
	.pipe( sass({
		errLogToConsole: true,
		outputStyle: 'compressed',
		precision: 10
	}) )
	.pipe( sourcemaps.write({ includeContent: false }) )
	.pipe( sourcemaps.init({ loadMaps: true }) )
	.pipe( autoprefixer( {
		browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
	}) )
	.pipe( sourcemaps.write('.') )
	.pipe( plumber.stop() )
	.pipe( filter( '**/*.css' ) )
	.pipe( mmq({
		log: true
	}) )
	.pipe( rename( 'admin.css' ) )
	.pipe( gulp.dest( 'assets/dist/css' ) )
	.pipe( rename({ suffix: '.min' }) )
	.pipe( minifycss({
		maxLineLen: 0,
		uglyComments: true
	}) )
	.pipe( gulp.dest( 'assets/dist/css' ) );
});


// Scripts task
gulp.task( 'front-js', function() {
	return  gulp.src( 'assets/src/js/modules/*.js' )
	.pipe( sourcemaps.init() )
	.pipe( concat( 'front.js' ) )
	.pipe( sourcemaps.write() )
	.pipe( gulp.dest( 'assets/dist/js' ) )
	.pipe( uglify() )
	.pipe( rename({ suffix: '.min' }) )
	.pipe( gulp.dest( 'assets/dist/js' ) );
});

gulp.task( 'admin-js', function() {
	return  gulp.src( 'assets/src/js/admin/*.js' )
	.pipe( sourcemaps.init() )
	.pipe( concat( 'admin.js' ) )
	.pipe( sourcemaps.write() )
	.pipe( gulp.dest( 'assets/dist/js' ) )
	.pipe( uglify() )
	.pipe( rename({ suffix: '.min' }) )
	.pipe( gulp.dest( 'assets/dist/js' ) );
});

