var gulp = require('gulp')
var imagemin = require('gulp-imagemin')
var pngquant = require('imagemin-pngquant')

gulp.task('images', function () {
    return gulp.src(['images/**/*.{jpg,png,gif}'])
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist'))
})