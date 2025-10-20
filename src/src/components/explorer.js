import './explorer.css';
import chicogg from './imagenes_f/arequipa.jpeg';
import arequipa from './imagenes_f/arequipa.jpeg';

const images = [
  {
    url: chicogg, // tu imagen local
    alt: 'Mi Gatito'
  },
  {
    url: arequipa, // tu imagen local
    alt: 'Arequipa'
  }
  ,
  {
    url: arequipa, // tu imagen local
    alt: 'Arequipa'
  },
  {
    url: arequipa, // tu imagen local
    alt: 'Arequipa'
  }
];

export function Explorer() {
  return (
    <section className="explore-section">
      <div className="container">
        <h2>¡Explora el Perú con nosotros!</h2>
        <div className="reel">
          {/* Navegación izquierda */}
 

          {/* Carrusel de imágenes */}
          <div className="image-carousel">
            {images.map((image, index) => (
              <div key={index} className="reel-item">
                <img width="150" src={image.url} alt={image.alt} />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}