import { useState, useEffect } from "react";
import axios from "axios";
import './resena.css'

export default function ReseñasSection({ user, atraccion }) {
    const [reseñas, setReseñas] = useState([]);
    const [texto, setTexto] = useState("");
    const [estrellas, setEstrellas] = useState(5);

    // 🔹 Cargar reseñas cuando cambia la atracción
    useEffect(() => {
        if (!atraccion || !atraccion.atraccion_id) return; // 👈 evita llamadas vacías

        console.log("🔎 Cargando reseñas para atracción:", atraccion.atraccion_id);
        console.log("📡 URL solicitada:", `http://localhost:80/api/resenas/${atraccion.atraccion_id}`);
        axios
            .get(`http://localhost:80/api/resenas/${atraccion.atraccion_id}`)
            .then((res) => {
                console.log("📥 Reseñas recibidas:", res.data);
                if (Array.isArray(res.data)) setReseñas(res.data);
                else setReseñas([]);
            })
            .catch((err) => console.error("Error cargando reseñas:", err));
    }, [atraccion]); // 👈 se actualiza solo cuando cambia toda la atracción

    // 🔹 Enviar nueva reseña
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) return alert("Inicia sesión para dejar una reseña");
        if (!texto.trim()) return;

        axios
            .post("http://localhost:80/api/resenas", {
                usuario_id: user.id,
                atraccion_id: atraccion.atraccion_id,
                reseña: texto,
                estrellas,
            })
            .then((res) => {
                console.log("🆕 Reseña enviada:", res.data);
                if (res.data && res.data.id) {
                    // Inserta la nueva reseña al principio de la lista
                    setReseñas([res.data, ...reseñas]);
                    setTexto("");
                    setEstrellas(5);
                } else {
                    // Si la API devuelve algo distinto (como status), recargar la lista
                    axios
                        .get(`http://localhost:80/api/resenas/${atraccion.atraccion_id}`)
                        .then((r) => setReseñas(Array.isArray(r.data) ? r.data : []));
                }
            })
            .catch((err) => console.error("Error enviando reseña:", err));
    };

    return (
        <div>
              {/* 🔹 Formulario (solo si el usuario está logueado) */}               
                {user && atraccion?.atraccion_id && (
                <div className="reseña-form-container"> 
                <form onSubmit={handleSubmit} className="reseña-form">
                <label>Tu calificación:</label>
                <div className="star-selector">
                    {Array.from({ length: 5 }).map((_, i) => (
                    <span
                        key={i}
                        className={
                        i < estrellas ? "star filled clickable" : "star clickable"
                        }
                        onMouseEnter={() => setEstrellas(i + 1)}
                        onClick={() => setEstrellas(i + 1)}
                    >
                        ★
                    </span>
                    ))}
                </div>

                <textarea
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Escribe tu reseña..."
                    rows="4"
                />

                <button type="submit">Enviar reseña</button>
                </form>
                </div>
            )}
            <h3>Reseñas de otros usuarios</h3>

            {/* 🔹 Mostrar reseñas existentes */}
            <div className="reseñas-container">
            {reseñas.length > 0 ? (
                reseñas.map((r) => (
                <div key={r.id} className="reseña-card">
                    <div className="reseña-header">
                    <strong>{r.user_nombre || "Usuario anónimo"}</strong>
                    <div className="reseña-stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                        <span
                            key={i}
                            className={i < r.estrellas ? "star filled" : "star"}
                        >
                            ★
                        </span>
                        ))}
                    </div>
                    </div>
                    <p className="reseña-texto">{r.reseña}</p>
                    <small className="reseña-fecha">
                    {new Date(r.fecha).toLocaleString()}
                    </small>
                </div>
                ))
            ) : (
                <p className="reseña-vacia">No hay reseñas todavía.</p>
            )}
            </div>
        </div>
    );
}

