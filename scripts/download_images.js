import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public/images');

// Curated automotive images from Unsplash
const carImages = {
  // Hero background: dark luxury sports car / showroom
  'hero/hero-car-bg.webp': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&auto=format&fit=crop&q=80',

  // Exterior accessories
  'exterior/fog-light-projector-chennai.webp': 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80',
  'exterior/led-headlight-upgrade-chennai.webp': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
  'exterior/drl-headlight-fog-chennai.webp': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80',
  'exterior/bonnet-letters-damping-chennai.webp': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
  'exterior/anti-rat-machine-mesh-chennai.webp': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
  'exterior/windshield-anti-glare-film-chennai.webp': 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80',
  'exterior/roof-rails-sharkfin-antenna-chennai.webp': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
  'exterior/rear-spoiler-tail-light-chennai.webp': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
  'exterior/front-rear-bumpers-chennai.webp': 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop&q=80',
  'exterior/reverse-camera-sensor-monitor-chennai.webp': 'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=800&auto=format&fit=crop&q=80',
  'exterior/wiper-blades-chennai.webp': 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&auto=format&fit=crop&q=80',
  'exterior/horn-parking-leds-chrome-chennai.webp': 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80',
  'exterior/number-plates-frames-chennai.webp': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80',
  'exterior/door-visors-side-claddings-chennai.webp': 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80',
  'exterior/mud-flaps-chennai.webp': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
  'exterior/heavy-clamp-post-covers-chennai.webp': 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=800&auto=format&fit=crop&q=80',
  'exterior/side-foot-steps-chennai.webp': 'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?w=800&auto=format&fit=crop&q=80',
  'exterior/door-logo-lights-chennai.webp': 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=80',
  'exterior/wiring-kits-cutouts-chennai.webp': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
  'exterior/box-clamp-wheel-cups-chennai.webp': 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=800&auto=format&fit=crop&q=80',
  'exterior/placeholder.webp': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',

  // Interior accessories
  'interior/roof-led-vip-light-chennai.webp': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&auto=format&fit=crop&q=80',
  'interior/steering-covers-controls-chennai.webp': 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80',
  'interior/infotainment-systems-chennai.webp': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&auto=format&fit=crop&q=80',
  'interior/dash-cameras-ai-dongles-chennai.webp': 'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=800&auto=format&fit=crop&q=80',
  'interior/oem-infotainment-chennai.webp': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&auto=format&fit=crop&q=80',
  'interior/car-ambient-light-chennai.webp': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
  'interior/dashboard-door-pad-customization-chennai.webp': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&auto=format&fit=crop&q=80',
  'interior/sun-control-films-chennai.webp': 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80',
  'interior/floor-mats-chennai.webp': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
  'interior/car-speakers-chennai.webp': 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
  'interior/woofers-amplifiers-chennai.webp': 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
  'interior/neck-pillows-seat-cushions-chennai.webp': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
  'interior/mobile-holder-door-foot-lights-chennai.webp': 'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=800&auto=format&fit=crop&q=80',
  'interior/foot-step-patti-chennai.webp': 'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?w=800&auto=format&fit=crop&q=80',
  'interior/parcel-trays-wooden-box-chennai.webp': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&auto=format&fit=crop&q=80',
  'interior/center-seat-arm-rest-chennai.webp': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&auto=format&fit=crop&q=80',
  'interior/curtains-air-fresheners-chennai.webp': 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80',
  'interior/360-car-camera-chennai.webp': 'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=800&auto=format&fit=crop&q=80',
  'interior/seat-organizers-vacuum-cleaners-chennai.webp': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
  'interior/premium-car-seat-cover-chennai.webp': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
  'interior/placeholder.webp': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&auto=format&fit=crop&q=80'
};

async function downloadImage(url, destPath) {
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    console.log(`✓ Downloaded: ${path.relative(publicDir, destPath)} (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`✗ Error downloading ${url}: ${err.message}`);
  }
}

async function main() {
  console.log('Starting image asset download...');
  const entries = Object.entries(carImages);
  for (const [relPath, url] of entries) {
    const dest = path.join(publicDir, relPath);
    if (!fs.existsSync(dest)) {
      await downloadImage(url, dest);
    } else {
      console.log(`- Exists: ${relPath}`);
    }
  }
  console.log('All image assets verified/downloaded.');
}

main();
