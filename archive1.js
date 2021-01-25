window.addEventListener('DOMContentLoaded', async () => {

    // are.na api
    const URL = "https://api.are.na/v2/channels/posters-8rocis3vqrc";
    const apiOptions = { method: "GET" };
    const response = await fetch(URL, apiOptions);
    const result = await response.json();
    let numOfPhotos = result.length;
    const photoLibrary = [];

    // option 1: random
    for (let i = 0; i < numOfPhotos; i += 1) {
        let apiResult = result.contents[i].image.display;
        const photo = new Image();
        photo.src = apiResult.url;
        photo.setAttribute('class', 'photo');
        photoLibrary.push(photo);
    }
    
  //alternate sorting:
    const copyPhotoLibrary = [...photoLibrary];
    const shuffledPhotoLibrary = copyPhotoLibrary.sort();
  
  const lastItem = photoLibrary.length - 1

  
  console.log (lastItem)
    for (let i = 0; i < numOfPhotos; i += 1) {
        document.getElementById("gallery").appendChild(photoLibrary[i]);
    }
});



