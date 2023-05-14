const onloadFunction = () => {
  let imageIDs = [
    "redirect-to-play-game-image-btn-1",
    "redirect-to-play-game-image-btn-2",
    "redirect-to-play-game-image-btn-3",
  ];

  for (let i = 1; i <= imageIDs.length; i++) {
    // First get the image height and width in a let
    let element = document.getElementById(imageIDs[i - 1]);
    let positionInfo = element.getBoundingClientRect();
    let imgHeight = positionInfo.height;
    let imgWidth = positionInfo.width;

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    let imgLeft = Math.floor(Math.random() * (screenWidth - imgWidth));
    let imgTop = Math.floor(Math.random() * (screenHeight - imgHeight));

    document.getElementById(imageIDs[i - 1]).style.top = imgTop + "px";
    document.getElementById(imageIDs[i - 1]).style.left = imgLeft + "px";
  }
};
