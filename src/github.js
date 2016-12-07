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
  url: string
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
    .catch((err: Error) => {
      throw new GithubFetchUserError(name);
    })
    .then(response => response.json())
    .then(json => TypedJSON.parse(json))
    .then(typedJSON => {
      return {
          id: typedJSON.id,
          name: typedJSON.name,
          avatarUrl: typedJSON.avatar_url,
          url: typedJSON.html_url,
      };
    });
};

export class GithubFetchUserError extends Error {
  name: string;

  constructor(name: string) {
    super(`Could not fetch github user details for: ${name}`);
    this.name = name;
  }
}