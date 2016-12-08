// @flow
import type { GithubUser } from './github.js';
import { fetchUser, GithubFetchUserError } from './github.js';
import { List } from './collections.js';
import { AppUI } from './app-ui.js';

const users: Array<string> = [
  'DamonOehlman'
];

class GithubUserWithImage {
  user: GithubUser;
  imagePromise: Promise<Image>;

  constructor(user, imagePromise) {
    this.user = user;
    this.imagePromise = imagePromise;
  }
}

Promise.all(users.map(fetchUser))
  .then(users => fetchAvatars(users))
  .then(usersWithImages => appendAvatar(usersWithImages))
  .catch((err: Error) => reportError(err));

function byFullName(a: GithubUser, b: GithubUser): number {
  return a.name.localeCompare(b.name);
}

function fetchAvatars(users) {
  return users.map(user => {
    return new GithubUserWithImage(user, new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (error: Error) => reject(error);
      image.src = user.avatar_url;
    }));
  });
}

function appendAvatar(usersWithImages) {
  return usersWithImages.map(user => {
    user.imagePromise.then(image => AppUI.appendImage(image))

    return user;
  });
}

function reportError(err) {
  const canvas = document.createElement('canvas');
  const context = canvas && canvas.getContext('2d');

  if (context) {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    context.fillStyle = '#FF0000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = '24px sans-serif';
    context.fillStyle = '#FFFFFF';
    context.fillText(err.message, 100, 100);
  }

  document.body.appendChild(canvas);
}
