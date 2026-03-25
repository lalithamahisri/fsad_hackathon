import { useState, useEffect } from "react";
import axios from "axios";

function MainApp() {

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        status: ""
    });

    const [data, setData] = useState([]);
    const [analytics, setAnalytics] = useState({});
    const [page, setPage] = useState(0);

    // 🔥 FILTER STATES
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // handle input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // submit form
    const submit = async (e) => {
        e.preventDefault();

        if (!form.title || !form.category || !form.status) {
            alert("Please fill all required fields");
            return;
        }

        await axios.post("http://localhost:8080/api/complaints", form);

        setForm({
            title: "",
            description: "",
            category: "",
            status: ""
        });

        setPage(0);
        fetchData();
    };

    // fetch data
    const fetchData = async () => {
        const res = await axios.get(
            `http://localhost:8080/api/complaints?page=${page}&size=5`
        );

        if (res.data.content) {
            setData(res.data.content);
        } else {
            setData(res.data);
        }
    };

    // delete
    const deleteComplaint = async (id) => {
        await axios.delete(`http://localhost:8080/api/complaints/${id}`);
        fetchData();
    };

    // analytics
    const getAnalytics = () => {
        let count = {};
        data.forEach(c => {
            count[c.status] = (count[c.status] || 0) + 1;
        });
        setAnalytics(count);
    };

    // 🔥 FILTER LOGIC
    const filteredData = data.filter((c) => {
        return (
            (categoryFilter === "" || c.category === categoryFilter) &&
            (statusFilter === "" || c.status === statusFilter)
        );
    });

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #020617, #1e293b)",
            color: "white",
            padding: "20px"
        }}>

            <h1 style={{
                textAlign: "center",
                color: "#38bdf8",
                marginBottom: "20px"
            }}>
                Complaint Dashboard
            </h1>

            {/* FORM */}
            <div style={{
                maxWidth: "500px",
                margin: "auto",
                background: "#0f172a",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}>

                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                    <input name="title" placeholder="Title" value={form.title} onChange={handleChange} style={inputStyle} />

                    <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} style={{ ...inputStyle, height: "70px" }} />

                    <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
                        <option value="">Category</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Electricity">Electricity</option>
                        <option value="Sanitation">Sanitation</option>
                    </select>

                    <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
                        <option value="">Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>

                    <button type="submit" style={buttonStyle}>
                        Add Complaint
                    </button>

                </form>
            </div>

            {/* ANALYTICS */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={getAnalytics} style={{ ...buttonStyle, background: "#10b981" }}>
                    Show Analytics
                </button>

                <div style={{ marginTop: "10px" }}>
                    {Object.entries(analytics).map(([k, v]) => (
                        <p key={k}>{k}: {v}</p>
                    ))}
                </div>
            </div>

            {/* 🔥 FILTER UI */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>

                <select onChange={(e) => setCategoryFilter(e.target.value)} style={inputStyle}>
                    <option value="">All Categories</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Sanitation">Sanitation</option>
                </select>

                <select onChange={(e) => setStatusFilter(e.target.value)} style={{ ...inputStyle, marginLeft: "10px" }}>
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>

            </div>

            {/* TABLE */}
            <div style={{ marginTop: "30px", overflowX: "auto" }}>
                <table style={{
                    width: "90%",
                    margin: "auto",
                    borderCollapse: "collapse",
                    background: "#0f172a",
                    borderRadius: "10px"
                }}>

                    <thead style={{ background: "#1e293b" }}>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Title</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(filteredData) && filteredData.map((c) => (
                            <tr key={c.id} style={{ textAlign: "center" }}>
                                <td style={tdStyle}>{c.id}</td>
                                <td style={tdStyle}>{c.title}</td>
                                <td style={tdStyle}>{c.category}</td>

                                <td style={{
                                    ...tdStyle,
                                    color:
                                        c.status === "Pending" ? "#f59e0b" :
                                        c.status === "Resolved" ? "#22c55e" : "#eab308"
                                }}>
                                    {c.status}
                                </td>

                                <td style={tdStyle}>
                                    <button
                                        onClick={() => deleteComplaint(c.id)}
                                        style={{
                                            background: "#ef4444",
                                            border: "none",
                                            color: "white",
                                            padding: "6px 10px",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* PAGINATION */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={() => setPage(page - 1)} disabled={page === 0} style={buttonStyle}>
                    Prev
                </button>

                <button onClick={() => setPage(page + 1)} style={{ ...buttonStyle, marginLeft: "10px" }}>
                    Next
                </button>
            </div>

        </div>
    );
}

/* STYLES */
const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white"
};

const buttonStyle = {
    padding: "10px 15px",
    background: "#3b82f6",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
};

const thStyle = {
    padding: "10px",
    borderBottom: "1px solid #334155"
};

const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #334155"
};

export default MainApp;