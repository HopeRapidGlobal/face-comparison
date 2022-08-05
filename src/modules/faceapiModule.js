
const faceapiModule = {
  loadModels: () => {
    const MODEL_URL = './models';
    return Promise.all([
      faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.mtcnn.loadFromUri(MODEL_URL),
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    ])
  },
  
  compare: async (sourceElement, targetElement) => {
    // source
    let sourceFaceDescription = await faceapi
      .detectSingleFace(sourceElement, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (!sourceFaceDescription) {
      alert('No faces detected in source image');
      return;
    }
    const displaySize = {
      width: sourceElement.width,
      height: sourceElement.height,
    };
    sourceFaceDescription = faceapi.resizeResults(sourceFaceDescription, displaySize);
    
    // target
    const targetFaceDescription = await faceapi
      .detectSingleFace(targetElement, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (!targetFaceDescription) {
      alert('No faces detected in target image');
      return;
    }

    const maxDescriptorDistance = 0.6;
    const faceMatcher = new faceapi.FaceMatcher(targetFaceDescription.descriptor, maxDescriptorDistance);
    const result = faceMatcher.matchDescriptor(sourceFaceDescription.descriptor);
    return result;
  },
}

export default faceapiModule;