import { Link } from 'react-router-dom';
import './AboutUs.css';
import arequipa from './imagenes_f/principal.jpeg';
import chicogg from './imagenes_f/arequipa.jpeg';
import FormularioBusqueda from './FormularioBusqueda';
import { Explorer } from './explorer';

export default function ListUser({ setAtraccion, setProvincia }) {
    
    return (
        <main>
            <>
                <div className="hero">
                    <h1>¡Explora el Perú con nosotros!</h1>
                    <p>Anímate a descubrir los lugares más hermosos que el Perú te puede ofrecer y vive una experiencia única en tu travesía.</p>
                    <Link to="/atraccion/provincia" className="explore-btn">Explorar</Link>
                </div>
                
                <Explorer />
            
                <div className="content-section">
                    <h2>Explora Arequipa!</h2>
                    <img src={arequipa} alt="Imagen turística de Arequipa"/><br></br>
                </div>
                                <div className="about-section" id="about">
                    <div className="about-image">
                    <img src={arequipa} alt="Paisaje arequipai"/>
                    </div>
                    <div className="about-text">
                        <h2>Sobre Nosotros</h2>
                        <p>
                        Bienvenido a <strong>Wild Roots</strong>, un espacio donde exploramos la
                        conexión entre la naturaleza y el bienestar. Nuestro objetivo es crear
                        experiencias únicas que fortalezcan el vínculo con nuestras raíces
                        naturales.
                        </p>
                        <p>
                        Creemos que regresar a lo esencial es la clave para una vida más
                        equilibrada, saludable y consciente.
                        </p>
                    </div>
                </div>
                <div className="experience-section" id="experience">
                    <div className="experience-image">
                        <img src={chicogg} alt="Usuario compartiendo su experiencia"/>
                    </div>
                    <div className="content-section">
                        <h2>Comparte tu experiencia!</h2>
                        <div className="comment-box">
                        <p>
                            "Mi viaje con <strong>Wild Roots</strong> fue increíble. Descubrí lugares
                            mágicos y me conecté con la naturaleza como nunca antes. ¡Recomendado
                            al 100%!"
                        </p>
                        <span>- Usuario Viajero</span>
                        </div>
                        <button className="blog-btn">Entrar al Blog</button>
                    </div>
                </div>
                <FormularioBusqueda setAtraccion={setAtraccion} setProvincia={setProvincia} />
            </>
        </main>
        
    )
}