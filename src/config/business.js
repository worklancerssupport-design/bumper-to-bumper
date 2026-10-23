import data from '../data/business.json';

const digits = (value = '') => String(value).replace(/\D/g, '');

const formatWhatsApp = (number) => {
  const d = digits(number);
  return d.startsWith('91') && d.length === 12 ? `+91 ${d.slice(2, 7)} ${d.slice(7)}` : `+${d}`;
};

const hoursWeekdays = `${data.hours.weekdays.days}: ${data.hours.weekdays.open} – ${data.hours.weekdays.close}`;
const hoursSunday = `${data.hours.sunday.days}: ${data.hours.sunday.open} – ${data.hours.sunday.close}`;

// "10:00 AM" -> "10:00", "09:30 PM" -> "21:30" (schema.org format)
export const to24h = (time = '') => {
  const match = String(time).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return time;
  let [, h, m, meridiem] = match;
  let hour = Number(h);
  if (meridiem) {
    const pm = meridiem.toUpperCase() === 'PM';
    if (pm && hour !== 12) hour += 12;
    if (!pm && hour === 12) hour = 0;
  }
  return `${String(hour).padStart(2, '0')}:${m}`;
};

export const business = {
  ...data,
  callHref: `tel:+${digits(data.phone)}`,
  callHref2: data.phone2 ? `tel:+${digits(data.phone2)}` : null,
  whatsappDisplay: formatWhatsApp(data.whatsapp),
  hoursWeekdays,
  hoursSunday,
};

const tokens = {
  name: business.name,
  shortName: business.shortName,
  phone: business.phone,
  phone2: business.phone2 || '',
  email: business.email,
  address: business.address,
  landmark: business.landmark,
  city: business.city,
  state: business.state,
  location: business.location,
  years: business.stats.yearsExperience,
  clients: business.stats.clientsServed.toLocaleString('en-IN'),
  hoursWeekdays,
  hoursSunday,
};

export const fillTokens = (text = '') =>
  text.replace(/\{\{(\w+)\}\}/g, (match, key) => (key in tokens ? tokens[key] : match));

export default business;
