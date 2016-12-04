// @flow
import type { GithubUser } from './github.js';
import { fetchUser, GithubFetchUserError } from './github.js';
import { List } from './collections.js';
import { AppUI } from './app-ui.js';

const users: Array<string> = [
  'jessitron',
  'joshduck',
  'DamonOehlman',
  'chrisdoble',
  'hearnden',
  'kouky',
  'icosahebron'
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
  .catch(err => reportError(err))
  .catch(err => console.error(err));

function byFullName(a: GithubUser, b: GithubUser): number {
  return a.name.localeCompare(b.name);
}

function fetchAvatars(users) {
  return users.map(user => {
    return new GithubUserWithImage(user, new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = user.avatarUrl;
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
  console.error(err);
}
