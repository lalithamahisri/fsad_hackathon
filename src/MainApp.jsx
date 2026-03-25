
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

    // fetch data (pagination)
    const fetchData = async () => {
        const res = await axios.get(
            `http://localhost:8080/api/complaints?page=${page}&size=5`
        );

        console.log(res.data);

        // handle BOTH cases (pagination + normal list)
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

    // analytics (simple)
    const getAnalytics = () => {
        let count = {};
        data.forEach(c => {
            count[c.status] = (count[c.status] || 0) + 1;
        });
        setAnalytics(count);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <div style={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#0f172a",
            minHeight: "100vh",
            color: "white"
        }}>

            <h2>Complaint & Grievance System</h2>

            <form onSubmit={submit}>
                <input name="title" placeholder="Title" value={form.title} onChange={handleChange} /><br /><br />

                <input name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br /><br />

                <select name="category" value={form.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Sanitation">Sanitation</option>
                </select><br /><br />

                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select><br /><br />

                <button type="submit">Submit</button>
            </form>

            <br />

            <button onClick={getAnalytics}>Show Analytics</button>

            <h3>Analytics</h3>
            <div>
                {Object.entries(analytics).map(([key, value]) => (
                    <p key={key}>{key}: {value}</p>
                ))}
            </div>

            <h2>All Complaints</h2>

            <p>Page: {page}</p>

            <table border="1" cellPadding="10" style={{ margin: "auto" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(data) && data.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.title}</td>
                            <td>{c.category}</td>
                            <td style={{
                                color:
                                    c.status === "Pending" ? "orange" :
                                        c.status === "Resolved" ? "green" : "yellow"
                            }}>
                                {c.status}
                            </td>
                            <td>
                                <button
                                    style={{ backgroundColor: "teal", color: "white" }}
                                    onClick={() => deleteComplaint(c.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />

            <button onClick={() => setPage(page - 1)} disabled={page === 0}>
                Prev
            </button>

            <button onClick={() => setPage(page + 1)}>
                Next
            </button>

        </div>
    );
}

export default MainApp;