import { login } from '../server/auth.js';
import { toVercel } from '../server/http.js';

export default toVercel(login);
