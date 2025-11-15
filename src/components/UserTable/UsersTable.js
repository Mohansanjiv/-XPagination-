import React, { useEffect, useState } from "react";
import styles from "./UsersTable.module.css";
import { API_URL } from "../../config/config";

export default function UsersTable() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        fetch(
            API_URL
        )
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then((json) => setData(json))
            .catch(() => alert("Failed to fetch data"));
    }, []);

    const start = (page - 1) * rowsPerPage;
    const paginatedData = data.slice(start, start + rowsPerPage);

    return (
        <div className={styles.container}>
            <h1 style={{ textAlign: 'center' }}>Employee Data Table</h1>
            <table className={styles.table}>
                <thead className="bg-gray-100" style={{ backgroundColor: "18C755" }}>
                    <tr>
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((user) => (
                        <tr key={user.id}>
                            <td className="p-2 border">{user.id}</td>
                            <td className="p-2 border">{user.name}</td>
                            <td className="p-2 border">{user.email}</td>
                            <td className="p-2 border">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="  pagination" style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button style={{ backgroundColor: "#009879", color: "#fff", borderRadius: "5px", cursor: "pointer" }}
                    className="px-3 py-1 border rounded"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                    Previous
                </button>

                <div style={{ display: "flex", gap: "10px" }}>
                    <span className={page === 1 ? "font-bold active" : ""} style={{ backgroundColor: "#009879", color: "#fff", padding: "4px", borderRadius: "5px" }}> 1 </span>
                    <span className={page === 2 ? "font-bold active" : ""} style={{ backgroundColor: "#009879", color: "#fff", padding: "4px", borderRadius: "5px" }}> 2 </span>
                    <span className={page === 3 ? "font-bold active" : ""} style={{ backgroundColor: "#009879", color: "#fff", padding: "4px", borderRadius: "5px" }}> 3 </span>
                </div>

                <button style={{ backgroundColor: "#009879", color: "#fff", borderRadius: "5px", cursor: "pointer" }}
                    className="px-3 py-1 border rounded"
                    onClick={() => setPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
