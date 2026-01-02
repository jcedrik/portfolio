import './StickyFooter.css';

export default function ContactContent() {
  return (
    <div className="contact-content">
      <div className="contact-top">
        <Nav />
      </div>
      <div className="contact-bottom">
        <h1 className="contact-title">Let's Connect</h1>
        <div className="contact-info">
          <p className="copyright">© 2025 Jean-Cédrik Dorélas</p>
        </div>
      </div>
    </div>
  );
}

const Nav = () => {
  return (
    <div className="contact-nav">
      <div className="nav-column">
        <h3 className="nav-heading">Navigation</h3>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
      </div>
      <div className="nav-column">
        <h3 className="nav-heading">Contact</h3>
        <a href="mailto:jcedrik100@gmail.com">jcedrik100@gmail.com</a>
        <a href="tel:+14384029966">+1 438 402 9966</a>
        <a 
          href="https://www.linkedin.com/in/jean-c%C3%A9drik-dor%C3%A9las-71a5a9356" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <div className="nav-column">
        <h3 className="nav-heading">Location</h3>
        <p>Montréal, QC</p>
        <p>Canada</p>
      </div>
    </div>
  );
};