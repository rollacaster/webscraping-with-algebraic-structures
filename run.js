const nodemon = require('nodemon')

nodemon({
  script: './index.js',
  stdout: false // important: this tells nodemon not to output to console
})
  .on('start', function() {
    console.log('\033c')
  })
  .on('restart', function() {
    console.log('\033c')
  })
  .on('readable', function() {
    this.stdout.pipe(process.stdout)
    this.stderr.pipe(process.stdout)
  })
  .on('error', function() {
    console.log('error')
  })
