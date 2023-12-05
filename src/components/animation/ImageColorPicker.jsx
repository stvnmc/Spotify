async function getColorFromImage(imageUrl) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Para permitir el acceso a imágenes de origen cruzado
    img.src = imageUrl;
  
    return new Promise((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
  
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, 1, 1);
  
        const pixel = context.getImageData(0, 0, 1, 1).data;
  
        const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        resolve(color);
      };
  
      img.onerror = (error) => {
        reject(error);
      };
    });
  }
  
  // Uso de la función
  getColorFromImage("URL_DE_LA_IMAGEN").then((color) => {
    console.log(color); // Aquí obtienes el color de la imagen
  });
  