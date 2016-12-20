// @flow
import type { JSON } from './json.js';
import { TypedJSON } from './json.js';
import { MapPropertyChecker } from './type-checkers.js';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_ACCEPT_HEADER = 'application/vnd.github.v3+json';
const GITHUB_ACCESS_TOKEN = 'ACCESS_TOKEN_GOES_HERE';
const REGEX_OK_STATUS = /^2\d{2}$/;

export type GithubUser = {|
  id: number,
  name: ?string,
  avatar_url: string,
  html_url: string
|};

export function fetchUser(name: string): Promise<?GithubUser> {
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

  const userTypeChecker: MapPropertyChecker<GithubUser> = new MapPropertyChecker();

  return fetch(url, options)
    .catch((err: Error) => {
      throw new GithubFetchUserError(name);
    })
    .then((response: Response) => {
      if (!REGEX_OK_STATUS.test(String(response.status))) {
        return null;
      }

      return response.json();
    })
    .then((json: mixed) => TypedJSON.parse(json))
    .then(typedJSON => {
      if (typedJSON instanceof Map) {
        return {
            id: userTypeChecker.requireNumber(typedJSON, 'id'),
            name: userTypeChecker.optionalString(typedJSON, 'name'),
            avatar_url: userTypeChecker.requireString(typedJSON, 'avatar_url'),
            html_url: userTypeChecker.requireString(typedJSON, 'html_url'),
        };
      } else if (typedJSON === null) {
        return null;
      }

      throw new Error(`Could not parse response from github API for ${name}`);
    });
};

export class GithubFetchUserError extends Error {
  name: string;

  constructor(name: string) {
    super(`Could not fetch github user details for: ${name}`);
    this.name = name;
  }
}
