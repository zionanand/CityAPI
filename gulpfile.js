var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha');

gulp.task('default', function(){
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {
      PORT: 8090
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', function(){
    console.log('Restarting..')
  });  
})

gulp.task('test', function(){
   // env({vars: {ENV:'Test'}});
    gulp.src('tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}))
   //  console.log('test file')
});

module.exports = gulp;