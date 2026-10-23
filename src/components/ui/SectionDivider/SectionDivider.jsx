import './SectionDivider.css';

export default function SectionDivider({ num = '01', label = 'SECTION', className = '' }) {
  return (
    <div className={`sec-divider-wrap ${className}`}>
      <div className="sec-divider">
        <span className="sec-divider__num">{num}</span>
        <div className="sec-divider__line" aria-hidden="true" />
        <span className="sec-divider__label">{label}</span>
      </div>
    </div>
  );
}
