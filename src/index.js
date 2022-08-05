import imageModule from "./modules/imageModule.js";
import faceapiModule from "./modules/faceapiModule.js";
import videoModule from "./modules/videoModule.js";

let taragetElementId = 'targetImage';

document.addEventListener('DOMContentLoaded', () => {
  faceapiModule
    .loadModels()
    .then(() => {
      console.log('model loaded');
    });
});

document.getElementById('sourceInput').addEventListener('change', (event) => {
  imageModule.loadImage(event.target.files[0], 'sourceImage');
  event.target.value = '';
});

document.getElementById('targetInput').addEventListener('change', (event) => {
  imageModule.loadImage(event.target.files[0], 'targetImage');
  event.target.value = '';
  videoModule.stopVideo();
  taragetElementId = 'targetImage';
});

document.getElementById('startVideo').addEventListener('click', () => {
  taragetElementId = 'video';
  imageModule.clearImage('targetImage');
  videoModule.startVideo();
});

document.getElementById('takePhoto').addEventListener('click', () => {
  videoModule.takePhoto();
});

document.getElementById('compareImage').addEventListener('click', async () => {
  const sourceElement = document.getElementById('sourceImage');
  const targetElement = document.getElementById(taragetElementId);
  const result = await faceapiModule.compare(sourceElement, targetElement);
  let resultText = '';
  if (result) {
    const similarity = Math.round((1 - result.distance) * 10000) / 100;
    resultText = `Similarity ${similarity}%`;
  } else {
    resultText = 'Error';
  }
  document.getElementById('result').innerHTML = resultText;
});