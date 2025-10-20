import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function ReelAtracciones({ provinciaId, onSelectAtraccion }) {
    const [atracciones, setAtracciones] = useState([]); // ✅ siempre inicia como array
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAtracciones = async () => {
            if (!provinciaId) {
                setAtracciones([]); // ✅ limpia si no hay provincia
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:80/api/atracciones/byProvincia/${provinciaId}`);
                
                // ✅ asegúrate que sea array
                if (res.data && res.data.status === 1 && Array.isArray(res.data.atracciones)) {
                    setAtracciones(res.data.atracciones);
                } else {
                    setAtracciones([]);
                }
            } catch (err) {
                console.error("Error cargando atracciones:", err);
                setAtracciones([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAtracciones();
    }, [provinciaId]);

    // ✅ estado intermedio mientras carga
    if (loading) return <p>Cargando atracciones...</p>;

    // ✅ mensaje si no hay resultados
    if (!Array.isArray(atracciones) || atracciones.length === 0)
        return <p>No hay atracciones registradas para esta provincia.</p>;

    // ✅ muestra el reel si hay datos
    return (
        <div className="reel">
            {atracciones.map((a) => (
                <div
                    key={a.atraccion_id}
                    className="reel-item"
                    onClick={() => onSelectAtraccion(a)}
                >
                    <img
                        src={a.image_url || "/placeholder.jpg"}
                        alt={a.atraccion_nombre}
                        width="150"
                    />
                    <p>{a.atraccion_nombre}</p>
                </div>
            ))}
        </div>
    );
}
