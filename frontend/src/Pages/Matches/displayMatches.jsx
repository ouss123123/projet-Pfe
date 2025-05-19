import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import dayjs from "dayjs";

const DisplayMatches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const groupMatchesByDate = (matchesArr) => {
        const groups = {};
        matchesArr.forEach((match) => {
            const date = dayjs(match.date).format("dddd, MMMM DD");
            if (!groups[date]) groups[date] = [];
            groups[date].push(match);
        });
        return groups;
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        const getMatches = async () => {
            try {
                const response = await axiosInstance.get(`/matches?limit=10&page=${page}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Fetched matches:", response.data);
                setMatches(response.data);
                setTotalPages(Math.ceil(response.data.total / 10) || 1);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching matches:", error);
                setLoading(false);
            }
        };
        getMatches();
    }, [token, navigate, page]);

    if (loading) return <div>Loading matches...</div>;
    if (!matches.data || matches.data.length === 0) return <div>No matches found.</div>;
    

    const grouped = groupMatchesByDate(matches.data);

    return (
      <div className="container mx-auto mt-24">
        {Object.entries(grouped).map(([date, matchesOnDate]) => (
          <div key={date} className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              {date === dayjs().format("dddd, MMMM DD") ? "Today" : date}
            </h2>
            <div className="bg-white rounded-xl shadow-lg divide-y">
              {matchesOnDate.map((match) => (
                <div
                  key={match._id}
                  className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 transition"
                >
                  <div className="w-20 text-right pr-4">
                    <div className="text-lg font-bold">
                      {match.time
                        ? new Date(
                            `1970-01-01T${match.time}`
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--:--"}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base truncate">
                        {match.title}
                      </span>
                      {match.tags &&
                        match.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-300 text-xs rounded px-2 py-0.5 ml-1"
                          >
                            #{tag}
                          </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-green-600 text-sm">⚽</span>
                      <span className="text-xs text-gray-600">
                        {match.type || "Football"} in{" "}
                        {match.location || "Unknown"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end min-w-[70px]">
                    <div className="font-bold text-base">
                      {match.price ? `£${match.price}` : "£0.00"}
                    </div>
                    <div className="text-xs text-gray-600">
                      {match.players?.length || 0}/{match.maxPlayers || 0}
                    </div>
                  </div>
                  <button
                    className="ml-4 bg-green-500 text-white px-3 py-1 rounded-md text-xs hover:bg-green-600"
                    onClick={() => navigate(`/matches/${match._id}`)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    );
};

export default DisplayMatches;