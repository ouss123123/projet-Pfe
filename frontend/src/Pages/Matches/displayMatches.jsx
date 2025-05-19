import React, { useEffect, useState } from "react";

const DisplayMatches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMatches("/api/matches")
            .then((res) => res.json())
            .then((data) => {
                setMatches(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch matches:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading matches...</div>;

    if (matches.length === 0) return <div>No matches found.</div>;

    return (
        <div>
            <h2>Created Matches</h2>
            <ul>
                {matches.map((match) => (
                    <li key={match.id}>
                        <strong>{match.name}</strong> - {match.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayMatches;