import { useState } from 'react';
import business from '../../../data/business.json';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const whatsappNumber = business.whatsapp || '9789550006';
  const whatsappMessage = encodeURIComponent("Hello Bumper To Bumper Car Accessories, I would like to enquire about your car accessories and upgrades.");
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}` : '#';
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`wa-float ${hovered ? 'is-hovered' : ''}`}
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="wa-float__pulse" aria-hidden="true" />
      <span className="wa-float__pulse wa-float__pulse--delay" aria-hidden="true" />
      <span className="wa-float__icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.99 2.722.99.918 0 2.18-.512 2.587-1.39.13-.272.205-.59.205-.93 0-.215-.03-.43-.086-.617-.158-.4-.616-.7-1.06-.844-.188-.06-.392-.1-.573-.1l-.013.013zM16.026 6.002c-5.495 0-9.965 4.47-9.965 9.965 0 1.755.46 3.473 1.332 4.97l-1.41 5.143 5.272-1.382a9.954 9.954 0 004.765 1.215h.006c5.494 0 9.964-4.47 9.964-9.965 0-2.66-1.036-5.16-2.918-7.04a9.91 9.91 0 00-7.04-2.906h-.006zm0 18.244h-.005a8.265 8.265 0 01-4.215-1.155l-.302-.18-3.128.82.836-3.046-.197-.31a8.262 8.262 0 01-1.27-4.408c0-4.567 3.716-8.282 8.284-8.282a8.27 8.27 0 015.86 2.424 8.27 8.27 0 012.42 5.86c-.002 4.567-3.717 8.28-8.283 8.28z" />
        </svg>
      </span>
      <span className="wa-float__tooltip">Chat with us</span>
    </a>
  );
}
