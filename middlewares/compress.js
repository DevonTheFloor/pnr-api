const compressImages = require('compress-images');

const photoAnnonce = (req, next) => {
  console.log('req.body :',req.body);
  console.log('req.file :', req.file);
  console.log('path :', req.file.path);
  let INPUT_path = `${req.file.path}`;
  console.log('input :', INPUT_path);
  let OUTPUT_path = './images/comp-';

  compressImages(
    INPUT_path, 
    OUTPUT_path, 
    { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "40"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: "gifsicle", command: ["--colors", "80", "--use-col=web"] } },
    function (error, completed, statistic) {
      console.log("-------------");
      console.log(error);
      console.log(completed);
      console.log(statistic);
      console.log("-------------");
    }
  );
  next();
}



module.exports = photoAnnonce;