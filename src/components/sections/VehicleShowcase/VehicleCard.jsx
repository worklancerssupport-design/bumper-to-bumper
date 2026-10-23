import { renderHeadingWithRed } from '../../../utils/textUtils';

export default function VehicleCard({ vehicle }) {
  if (!vehicle) return null;

  return (
    <article className="btb-vehicle-card" aria-label={`Showcase vehicle: ${vehicle.name}`}>
      <div className="btb-vehicle-card__media">
        <img
          src={vehicle.image}
          alt={vehicle.alt || `${vehicle.name} exterior`}
          loading="lazy"
          className="btb-vehicle-card__img"
          onError={(e) => {
            // Clean fallback in case of loading error
            e.target.style.display = 'none';
          }}
        />
      </div>
      <div className="btb-vehicle-card__body">
        <h3 className="btb-vehicle-card__name">{renderHeadingWithRed(vehicle.name)}</h3>
        <span className="btb-vehicle-card__badge">OEM Fitment</span>
      </div>
    </article>
  );
}
