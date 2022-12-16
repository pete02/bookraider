var audioconcat = require('audioconcat')
const fs=require('fs')
const audio=(songs,book,bookData)=>{
    var dir = `/mp3/ready/${book.Author}/${book.name}`
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    audioconcat(songs)
    .concat(`${dir}/${book.name}.mp3`)
    .on('start', function (command) {
        console.log('ffmpeg process started:', command)
    })
    .on('error', function (err, stdout, stderr) {
        console.error('Error:', err)
        console.error('ffmpeg stderr:', stderr)
    })
    .on('end', function (output) {
        console.error('Audio created in:', output)
        fs.rmSync('/mp3/temp', { recursive: true, force: true });
    })
}


module.exports=audio