const videoModule = {
  getVideo: () => {
    return document.getElementById('video');
  },
  
  startVideo: async () => {
    const video = videoModule.getVideo();
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    video.style.display = 'block';
  },

  takePhoto: () => {
    const video = videoModule.getVideo();
    video.pause();
  },

  stopVideo: () => {
    const video = videoModule.getVideo();
    video.style.display = 'none';
    video.srcObject?.getTracks().forEach((track) => track.stop());
  },
}

export default videoModule;