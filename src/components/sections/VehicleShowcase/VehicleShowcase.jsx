import VehicleCard from './VehicleCard';
import './VehicleShowcase.css';

const SHOWCASE_VEHICLES = [
  {
    id: 'jeep-compass',
    name: 'Jeep Compass',
    image: '/images/cars/jeep_compass.jpg',
    alt: 'Jeep Compass exterior front view in Chennai',
  },
  {
    id: 'tata-sierra',
    name: 'Tata Sierra',
    image: '/images/cars/tata_sierra.jpg',
    alt: 'Tata Sierra SUV exterior design showcase',
  },
  {
    id: 'mg-hector',
    name: 'MG Hector',
    image: '/images/cars/mg_hector.png',
    alt: 'MG Hector exterior front three-quarters profile',
  },
  {
    id: 'new-kia-seltos',
    name: 'New Kia Seltos',
    image: '/images/cars/new_kia_seltos.jpg',
    alt: 'New Kia Seltos facelift exterior front perspective',
  },
  {
    id: 'volkswagen-taigun',
    name: 'Volkswagen Taigun',
    image: '/images/cars/volkswagen_taigun.jpg',
    alt: 'Volkswagen Taigun exterior front view',
  },
  {
    id: 'skoda-kushaq',
    name: 'Skoda Kushaq',
    image: '/images/cars/skoda_kushaq.png',
    alt: 'Skoda Kushaq exterior front angle view',
  },
];

export default function VehicleShowcase() {
  return (
    <section className="btb-vehicle-showcase" aria-labelledby="showcase-title">
      <div className="container">
        <header className="btb-vehicle-showcase__header">
          <div className="btb-vehicle-showcase__header-left">
            <span className="btb-vehicle-showcase__eyebrow">POPULAR MODELS WE SPECIALIZE IN</span>
            <h2 id="showcase-title" className="btb-vehicle-showcase__title">
              Find Your <span className="text-red">Drive</span>
            </h2>
          </div>
          <p className="btb-vehicle-showcase__subtitle">
            Precision-engineered accessories, bi-LED lighting, Android infotainments, and custom seat covers tailored to fit with <span className="text-red">zero</span> wire cutting.
          </p>
        </header>

        <div className="btb-vehicle-showcase__track" role="region" aria-label="Featured vehicle models">
          {SHOWCASE_VEHICLES.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
