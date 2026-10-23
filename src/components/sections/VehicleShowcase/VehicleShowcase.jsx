import VehicleCard from './VehicleCard';
import catalog from '../../../data/catalog.json';
import './VehicleShowcase.css';

const SHOWCASE_VEHICLES = catalog.showcaseVehicles;

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
