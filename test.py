from httpx import stream
import ffmpeg
stream=ffmpeg.input("./suzanne.mp3")
stream=ffmpeg.output("test.mp4")
ffmpeg.run(stream)