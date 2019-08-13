var gulp = require('gulp'),
babel = require('gulp-babel');
browserSync = require('browser-sync');
gulp.task('babel', function () {
    return gulp.src('firebase.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist/'))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './',
        },
        notify: false,

    });
});
gulp.task('watch', ['browser-sync', 'babel'], function () {
    gulp.watch('index.html', browserSync.reload);
    gulp.watch('firebase.js', ['babel']);

});