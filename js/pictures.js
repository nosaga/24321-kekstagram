'use strict';
var form = document.querySelector('.img-upload__form');
var fileInput = form.elements.filename;
var formUpload = document.querySelector('.img-upload__overlay');
var uploadClose = document.querySelector('.img-upload__cancel');
var mainImg = document.querySelector('.img-upload__preview');
var effectsBlock = document.querySelector('.effect-level__line');
var effectsPin = document.querySelector('.effect-level__pin');
var effectsDepth = document.querySelector('.effect-level__depth');
var effectsChrome = document.querySelector('#effect-chrome');
var ESC_BTN = 27;
var ENTER_BTN = 13;
var EFFECT_MAX = 454;

var getRandomFrom = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var getRandom = function (items) {
  var item = Math.floor(Math.random() * items.length);
  return items[item];
};

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var generatePhotos = function () {
  var photos = [];

  for (var i = 0; i < 25; i++) {
    photos.push(
        {
          url: 'photos/' + getRandomFrom(1, 20) + '.jpg',
          comments: getRandom(comments),
          likes: getRandomFrom(15, 200)
        }
    );
  }
  return photos;
};

var photos = generatePhotos();
var similarListPhotos = document.querySelector('.pictures');
var similarPhotos = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var renderPhotos = function (index) {
  var photoElement = similarPhotos.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photos[index].url;
  photoElement.querySelector('.picture__comments').innerHTML = photos[index].comments.length;
  photoElement.querySelector('.picture__likes').innerHTML = photos[index].likes;
  photoElement.dataset.index = index;

  photoElement.addEventListener('click', function (evt) {
    var target = evt.target;
    renderBigPicture(target.closest('.picture').dataset.index);
  });
  return photoElement;
};

var setPhotos = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhotos(i));
  }
  return similarListPhotos.appendChild(fragment);
};

var hideBlock = function (elemClass) {
  return elemClass.classList.add('visually-hidden');
};

var setDialog = function () {
  return document.querySelector('.big-picture').classList.remove('hidden');
};

var renderBigPicture = function (photo) {
  var bigPicture = photos[photo];
  document.querySelector('.big-picture__img').children[0].src = bigPicture.url;
  document.querySelector('.likes-count').innerHTML = bigPicture.likes;
  document.querySelector('.comments-count').innerHTML = bigPicture.comments.length;
  var commentsBlocks = document.createDocumentFragment();
  var commentBlock = document.querySelector('.social__comment');
  for (var i = 0; i < 5; i++) {
    var newCommentBlock = commentBlock.cloneNode(true);
    newCommentBlock.children[0].src = 'img/avatar-' + getRandomFrom(1, 6) + '.svg';
    newCommentBlock.children[1].innerHTML = bigPicture.comments;
    commentsBlocks.appendChild(newCommentBlock);
  }
  document.querySelector('.social__comments').appendChild(commentsBlocks);

  hideBlock(document.querySelector('.social__comment-count'));
  hideBlock(document.querySelector('.comments-loader'));
  setDialog();
  return bigPicture;
};

var showForm = function () {
  formUpload.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeForm = function () {
  formUpload.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_BTN) {
    closeForm();
  }
};

fileInput.addEventListener('change', showForm);
fileInput.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BTN) {
    showForm();
  }
});
uploadClose.addEventListener('click', closeForm);
uploadClose.addEventListener('keydown', function () {
  onPopupEscPress();
});


var effectsLevel = effectsPin.style.left;


effectsPin.addEventListener('mousedown', function (e) {
  e.preventDefault();
  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  var thumbCoords = getCoords(effectsPin);
  var shiftX = e.pageX - thumbCoords.left;

  var blockCoords = getCoords(effectsBlock);

  var onMouseMove = function (evt) {
    evt.preventDefault();
    var newLeft = evt.pageX - shiftX - blockCoords.left;
    if (newLeft < 0) {
      newLeft = 0;
    }

    var rightEdge = effectsBlock.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    effectsPin.style.left = newLeft + 'px';
    effectsDepth.style.width = newLeft + 'px';
    effectsLevel = effectsLevel * 100 / EFFECT_MAX;
    return effectsLevel;
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  return effectsLevel;
});

var clearFilters = function () {
  var styles = effectsPin.style.left = effectsDepth.style.width = 0;
  return styles;
}

effectsChrome.addEventListener('change', function () {
  clearFilters();
  mainImg.style.filter = 'grayscale(' + effectsLevel + ')';
  console.log('I work');
});


effectsChrome.addEventListener('change', function () {
  clearFilters();
  mainImg.style.filter = 'grayscale(' + effectsLevel + ')';
  console.log('I work');
});


setPhotos();
