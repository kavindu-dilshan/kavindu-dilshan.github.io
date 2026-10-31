import arabiersLogo from '../../images/brands/Arabiers.svg';
import ceyMusicLogo from '../../images/brands/CeyMusic.svg';
import mangusLogo from '../../images/brands/Mangus.svg';
import mocxDesignsLogo from '../../images/brands/Mocx Designs.svg';
import rioTShirtsLogo from '../../images/brands/Rio T-Shirts.svg';
import './Services.css';

const services = ['Web Development', 'UI/UX Design', 'Android Development', 'Graphic Design'];

const brands = [
  { name: 'Arabiers', logo: arabiersLogo },
  { name: 'CeyMusic', logo: ceyMusicLogo },
  { name: 'Mangus', logo: mangusLogo, smaller: true },
  { name: 'Mocx Designs', logo: mocxDesignsLogo, smaller: true },
  { name: 'Rio T-Shirts', logo: rioTShirtsLogo },
];

const Services = () => (
  <section id="services" aria-label="Services and brands" className="services-section">
    <div className="services-panels">
      <ol className="services-list">
        {services.map((service, index) => (
          <li key={service}>
            <span className="service-number"><span className="text-primary">#</span>{String(index + 1).padStart(2, '0')}</span>
            <h2 className="service-title">{service}</h2>
          </li>
        ))}
      </ol>
      <div className="brands-panel">
        <h2 className="brands-label">
          Trusted by Brands I’ve<br />Helped Grow
        </h2>
        <div className="brands-marquee min-w-0 flex-1" role="img" aria-label={`Brand logos: ${brands.map(({ name }) => name).join(', ')}`}>
          <div className="brands-marquee__track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div className="brands-marquee__group" key={copy}>
                {brands.map(({ name, logo, smaller }) => (
                  <div className="brand-logo flex shrink-0 items-center" key={name}>
                    <img src={logo} alt={name} className={smaller ? 'brand-logo--smaller' : undefined} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Services;

