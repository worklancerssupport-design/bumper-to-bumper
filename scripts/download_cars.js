import fs from 'fs';
import path from 'path';
import https from 'https';

const business = JSON.parse(
  fs.readFileSync(new URL('../src/data/business.json', import.meta.url), 'utf-8')
);

const destDir = path.resolve('public/images/cars');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy existing Tata Sierra
const existingTata = path.resolve('public/images/hero/hero-car-tata-sierra.jpg');
if (fs.existsSync(existingTata)) {
  fs.copyFileSync(existingTata, path.join(destDir, 'tata_sierra.jpg'));
  console.log('Copied tata_sierra.jpg');
}

const urls = {
  'jeep_compass.jpg': 'https://upload.wikimedia.org/wikipedia/commons/8/83/Jeep-compass-2018-petrol-at-limited-india-front.jpg',
  'mg_hector.png': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/2019_MG_Hector_at_the_MG_Motor_India_manufacturing_plant_in_Halol%2C_Gujarat.png',
  'new_kia_seltos.jpg': 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Kia_Seltos_SP2_PE_Snow_White_Pearl_%2817%29_%28cropped%29.jpg',
  'volkswagen_taigun.jpg': 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Volkswagen_Taigun_front_20230528.jpg',
  'skoda_kushaq.png': 'https://upload.wikimedia.org/wikipedia/commons/2/29/2021_%C5%A0koda_Kushaq_%28India%29_front_view.png'
};

function download(filename, url) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(destDir, filename));
    const options = new URL(url);
    const headers = {
      'User-Agent': `${business.shortName.replace(/\s+/g, '')}App/1.0 (${business.siteUrl}; ${business.email}) Node/${process.versions.node.split('.')[0]}`
    };

    const req = https.get({
      hostname: options.hostname,
      path: options.pathname + options.search,
      headers: headers
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = `https://${options.hostname}${redirectUrl}`;
        }
        return download(filename, redirectUrl).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed ${filename}: status ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(path.join(destDir, filename));
        console.log(`Saved ${filename} (${stats.size} bytes)`);
        resolve();
      });
    });

    req.on('error', (err) => {
      fs.unlink(path.join(destDir, filename), () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const [filename, url] of Object.entries(urls)) {
    try {
      await download(filename, url);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }
}

run();
