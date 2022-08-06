'use strict';

// Elements
const imageContainer = document.querySelector('.image-container');
const imageViewer = document.querySelector('.image-viewer');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const images = document.querySelector('.image-viewer').children;

const apiKey = 'GarSNaDMsojS9fi2DsREH7HLrfkwCsrYhCMkx8feLaE';

let photosArr = [];

let apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${5}`;

let img;
let count = 0;

const getData = async function () {
  try {
    const response = await fetch(apiURL);
    photosArr = await response.json();

    displayPhoto();
  } catch (error) {
    console.log('something went wrong', error);
  }
};

const displayPhoto = function () {
  img = document.createElement('img');
  img.src = photosArr[count].urls.regular;
  img.alt = photosArr[count].alt_description;
  img.setAttribute('href', photosArr[count].links.html);

  imageContainer.appendChild(img);

  createImageViewer();
};

const createImageViewer = function () {
  for (let i = 0; i < 5; i++) {
    const smallImage = document.createElement('img');

    smallImage.src = photosArr[count + i].urls.small;
    smallImage.className = `image${count + i}`;
    imageViewer.appendChild(smallImage);
  }
};

const nextSlide = function () {
  count++;

  if (count === photosArr.length) count = 0;

  img.src = photosArr[count].urls.regular;
};

const prevSlide = function () {
  count--;
  if (count < 0) count = photosArr.length - 1;

  img.src = photosArr[count].urls.regular;
};

buttonNext.addEventListener('click', nextSlide);
buttonPrev.addEventListener('click', prevSlide);

imageViewer.addEventListener('click', function (e) {
  for (let i = 0; i < photosArr.length; i++)
    if (images[i].className === e.target.className) count = i;

  img.src = e.target.currentSrc;

  const [obj] = photosArr.filter(obj => obj.urls.small === e.target.currentSrc);
});

getData();

// Check if it is idle
let timer = 0;

const resetTimer = function () {
  timer = 0;
};

document.addEventListener('click', resetTimer);

document.addEventListener('mousemove', resetTimer);

document.addEventListener('keydown', resetTimer);

const isIdle = function () {
  timer++;

  if (timer === 5) {
    nextSlide();
    timer = 0;
  }
};

setInterval(isIdle, 1000);
