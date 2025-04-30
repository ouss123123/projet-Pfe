import { useState, useEffect } from "react";
import axiosInstance from "../axios/axiosInstance";

const useUsers = (url) => {
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url, {
          headers: { Authorization: `Bearer ${token}` },
          signal,
        });
        setUsers(response.data.data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, token]);

  return users;
};

export default useUsers;