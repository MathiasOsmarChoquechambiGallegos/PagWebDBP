import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./siri.css";

export default function FormularioBusqueda({ setAtraccion, setProvincia }) {
  const [abierto, setAbierto] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const toggleAsistente = () => setAbierto(!abierto);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pregunta = input.trim();
    if (!pregunta) return;

    console.log("🧠 Pregunta enviada:", pregunta);

    try {
      const res = await fetch("http://localhost:80/api/atracciones/recomendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta }),
      });

      const data = await res.json();

      if (data.status === 1) {
        const lugarSeleccionado = data.recomendacion;
        console.log("✅ Atracción recomendada:", lugarSeleccionado);

        // Guarda la atracción recomendada
        setAtraccion(lugarSeleccionado);

        // Si tiene provincia, la obtiene desde el backend
        if (lugarSeleccionado.provincia_id) {
          const provinciaRes = await fetch(
            `http://localhost:80/api/provincia/${lugarSeleccionado.provincia_id}`
          );
          const provinciaData = await provinciaRes.json();

          if (provinciaData.status === 1) {
            setProvincia(provinciaData.provincia);
          }
        }

        // Navega a la vista de resultados
        navigate(
          `/atraccion/search?nombre=${encodeURIComponent(
            lugarSeleccionado.atraccion_nombre
          )}`
        );
      } else {
        console.error("⚠️ No se encontró una atracción:", data.message);
      }
    } catch (err) {
      console.error("🚨 Error en la consulta:", err);
    }

    setInput("");
  };

  return (
    <div className="asistente-container">
      {!abierto ? (
        <div className="burbuja-siri" onClick={toggleAsistente}>
          <div className="onda"></div>
          <div className="onda retraso1"></div>
          <div className="onda retraso2"></div>
        </div>
      ) : (
        <div className="ventana-asistente">
          <button className="cerrar-btn" onClick={toggleAsistente}>
            ✖
          </button>
          <h3>Asistente Turístico 🌈</h3>
          <p>
            ¿A dónde quieres ir?
            <br />
            También podemos darte una recomendación en Arequipa ciudad,
            <br /> o dinos en qué provincia estás.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="pregunta"
              placeholder="Escribe aquí..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Buscar</button>
          </form>
        </div>
      )}
    </div>
  );
}
