import { useState } from "react";

function Login({ setLoggedIn }) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const handleLogin = () => {
        if (user === "admin" && pass === "1234") {
            setLoggedIn(true);
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #0f172a, #1e293b)"
        }}>

            <div style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                padding: "35px",
                borderRadius: "16px",
                width: "320px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.1)"
            }}>

                <h2 style={{
                    marginBottom: "20px",
                    color: "#38bdf8",
                    fontWeight: "600"
                }}>
                    Complaint System
                </h2>

                <input
                    placeholder="Username"
                    onChange={(e) => setUser(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "none",
                        outline: "none",
                        background: "#1e293b",
                        color: "white"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPass(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: "none",
                        outline: "none",
                        background: "#1e293b",
                        color: "white"
                    }}
                />

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                    onMouseOver={e => e.target.style.opacity = "0.8"}
                    onMouseOut={e => e.target.style.opacity = "1"}
                >
                    Login
                </button>

                <p style={{
                    marginTop: "15px",
                    fontSize: "12px",
                    color: "#94a3b8"
                }}>
                    demo: admin / 1234
                </p>

            </div>
        </div>
    );
}

export default Login;