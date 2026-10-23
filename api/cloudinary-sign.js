import { cloudinarySign } from '../server/cloudinary.js';
import { toVercel } from '../server/http.js';

export default toVercel(cloudinarySign);
