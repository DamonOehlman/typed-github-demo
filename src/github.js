// @flow
import type { JSON } from './json.js';
import { TypedJSON, TypedMapChecker } from './json.js';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_ACCEPT_HEADER = 'application/vnd.github.v3+json';
const GITHUB_ACCESS_TOKEN = 'b88f6996f508f1ea50348cdce3745486d295685c';

export type GithubUser = {|
  id: number,
  name: string,
  avatarUrl: string,
  url: string,
|};

export function fetchUser(name: string): Promise<GithubUser> {
  const url = `${GITHUB_API_URL}/users/${name}`;
  const options: RequestOptions = {
    method: 'GET',
    headers: {
      'accept': GITHUB_ACCEPT_HEADER,
      'authorization': `token ${GITHUB_ACCESS_TOKEN}`
    },
    cache: 'default',
    mode: 'cors'
  };

  return fetch(url, options)
    .catch(err => {
      throw new GithubFetchUserError(name);
    })
    .then(response => response.json())
    .then((json: mixed) => TypedJSON.parse(json))
    .then((userResponse: JSON) => {
      if (userResponse instanceof Map) {
        return {
          id: TypedMapChecker.requireNumber(userResponse, 'id'),
          name: TypedMapChecker.requireString(userResponse, 'name'),
          avatarUrl: TypedMapChecker.requireString(userResponse, 'avatar_url'),
          url: TypedMapChecker.requireString(userResponse, 'html_url')
        };
      }

      throw new Error('invalid JSON received from github');
    });
};

export class GithubFetchUserError extends Error {
  name: string;

  constructor(name: string) {
    super(`Could not fetch github user details for: ${name}`);
    this.name = name;
  }
}
