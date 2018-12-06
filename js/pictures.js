'use strict';


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
}

setPhotos();
