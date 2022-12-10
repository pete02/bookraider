import Upscaler from 'upscaler';
const upscaler = new Upscaler();
upscaler.upscale('C:\Users\petri\Desktop\image.jpg').then(upscaledImage => {
  console.log(upscaledImage); // base64 representation of image src
});