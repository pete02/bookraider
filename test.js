var audioconcat = require('audioconcat')
 
var songs = [
  './mp3/James Dashner/the scorch trials/1.mp3',
  './mp3/James Dashner/the scorch trials/2.mp3'
]
 
audioconcat(songs)
  .concat('all.mp3')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.error('Audio created in:', output)
  })