const imageModule = {
  loadImage: (file, imageElementId) => {
    const reader = new FileReader();
    const imageElement = document.getElementById(imageElementId);
    reader.onload = (e) => {
      imageElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
  },

  clearImage: (imageElementId) => {
    const imageElement = document.getElementById(imageElementId);
    imageElement.src = '';
  },
}

export default imageModule;