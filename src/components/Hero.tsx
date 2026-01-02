import TextType from './Texttype';
import './Hero.css';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-title">
          <TextType 
            text={[
              "Jean-Cédrik Dorélas", 
              "Software Developer", 
              "Computer Engineering Student", 
              "Cybersecurity Enthusiast"
            ]}
            typingSpeed={75}
            pauseDuration={2000}
            deletingSpeed={50}
            showCursor={false}
            loop={true}
            className="hero-typing"
          />
        </div>
      </div>
    </div>
  );
}