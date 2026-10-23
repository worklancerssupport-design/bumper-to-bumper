import { githubFile } from '../server/github.js';
import { toVercel } from '../server/http.js';

export default toVercel(githubFile);
