
const faceapiModule = {
  loadModels: () => {
    return Promise.all([
      faceapi.nets.ageGenderNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.mtcnn.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
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