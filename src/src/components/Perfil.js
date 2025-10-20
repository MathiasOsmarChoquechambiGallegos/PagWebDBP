import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './UserPerfil.css';


export default function Perfil({ user, setUser }) {
    const navigate = useNavigate();
    const [visitadas, setVisitadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNoUser, setShowNoUser] = useState(false);

    useEffect(() => {
        if (!user) {
            setShowNoUser(true);
            const timer = setTimeout(() => {
                navigate("/"); // redirige después de 1.5 segundos
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchVisitadas = async () => {
            if (!user?.id) return;

            try {
                const res = await axios.get(`http://localhost:80/api/visitadas/${user.id}`);
                if (res.data && res.data.status === 1 && Array.isArray(res.data.visitadas)) {
                    setVisitadas(res.data.visitadas);
                } else {
                    setVisitadas([]);
                }
            } catch (err) {
                console.error("Error cargando lugares visitados:", err);
                setVisitadas([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVisitadas();
    }, [user]);

    if (showNoUser) return <h2>No user logged in</h2>;

    if (!user) return null; // evita mostrarlo de nuevo en otras páginas

    const handleLogout = () => {
        setUser(null);
        navigate("/");
    };

    return (
        <div className="user-profile">
            <h2>Mi Perfil</h2>

            <div className="profile-card">
                <div className="avatar">👤</div>
                <div className="info">
                <p><strong>Nombre:</strong>{user.name}</p>
                <p><strong>Email:</strong>{user.email}</p>
                <p><strong>Miembro desde:</strong> Septiembre 2025</p>
                </div>
            </div>

            <button onClick={handleLogout}>Logout</button>

            <h2>🏝️ Lugares visitados</h2>

            {loading ? (
                <p>Cargando lugares visitados...</p>
            ) : visitadas.length === 0 ? (
                <p>No has marcado ningún lugar como visitado aún.</p>
            ) : (
                <div className="reel">
                    {visitadas.map((a) => (
                        <div key={a.atraccion_id} className="reel-item">
                            <img
                                src={a.image_url || "/placeholder.jpg"}
                                alt={a.atraccion_nombre}
                                width="150"
                            />
                            <p>{a.atraccion_nombre}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
