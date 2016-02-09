var gulp = require('gulp'),
	less = require('gulp-less'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	cache = require('gulp-cache'),
	watch = require('gulp-watch'),
	LessPluginAutoPrefix = require('less-plugin-autoprefix'),

	autoprefix = new LessPluginAutoPrefix({browsers: ["> 5%"]});

var src = {
	css: 'src/css/style.less',
	img: 'src/img/**/*'
};

//Compile Less
gulp.task('css', function () {
	return gulp.src(src.css)
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(gulp.dest('build/css'));
});

//Compress images
gulp.task('img', function() {
	return gulp.src(src.img)
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('build/img'));
});

// Clean destination folders
gulp.task('clean', function() {
	return gulp.src(['buld/css', 'buld/img'], {read: false})
		.pipe(clean());
});

//Watch
gulp.task('watch', function() {
	gulp.watch('src/css/**/*.less', ['css']);
	gulp.watch('src/img/**/*', ['img']);
});

// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('css', 'img');
});