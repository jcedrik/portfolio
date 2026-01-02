import './StickyFooter.css';
import Magnetic from './Magnetic';

export default function StickyFooter() {
  return (
    <div className="footer-container" id="contact">
      <div className="footer-sticky-wrapper">
        <div className="footer-content">
          {/* Top Section - Navigation Links + Contact Buttons */}
          <div className="footer-top">
            <div className="footer-nav">
              <div className="nav-column">
                <h3 className="nav-heading">Menu</h3>
                <a href="#about">About</a>
                <a href="#journey">My Journey</a>
                <a href="#projects">Projects</a>
                <a href="#skills">Skills</a>
              </div>
            </div>

            {/* Contact Buttons - Top Right like Aziz */}
            <div className="footer-contact-buttons">
              <a 
                href="tel:+14384029966" 
                className="contact-btn"
              >
                +1 438 402 9966
              </a>
              <a 
                href="mailto:jcedrik100@gmail.com" 
                className="contact-btn"
              >
                jcedrik100@gmail.com
              </a>
            </div>
          </div>

          {/* Bottom Section - Title & Social Icons */}
          <div className="footer-bottom">
            <h1 className="footer-title">Let's Connect</h1>
            
            <div className="footer-right">
              <div className="footer-social">
                {/* LinkedIn with Magnetic effect */}
                <Magnetic>
                  <a 
                    href="https://www.linkedin.com/in/jean-c%C3%A9drik-dor%C3%A9las-71a5a9356" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="LinkedIn"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </Magnetic>

                {/* Download CV */}
                <a 
                  href="/Jean-Cedrik_Dorelas_CV_EN.pdf" 
                  download="Jean-Cedrik_Dorelas_CV_EN.pdf"
                  className="cv-download-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Download CV</span>
                </a>
              </div>

              <p className="footer-location">Based in Montréal, QC, Canada</p>
              <p className="footer-copyright">© 2025 Jean-Cédrik Dorélas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}