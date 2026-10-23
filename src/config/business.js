import businessData from '../data/business.json';

export const googleReviewsUrl =
  businessData.googleReviewsUrl ||
  'https://www.google.com/maps/search/?api=1&query=Bumper+To+Bumper+Car+Accessories+Adambakkam+Chennai';

export const business = {
  ...businessData,
  googleReviewsUrl,
};

export default business;
