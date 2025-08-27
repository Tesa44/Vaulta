import { useEffect, useState } from "react";
import UsersList from "./UsersList";
import UserSearchForm from "./UserSearchForm";
import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";
import SectionHeader from "../../ui/SectionHeader";

const BASE_URL = "http://localhost:8000";

function Users() {
  const [filters, setFilters] = useState({
    query: "",
    sortBy: "alphabet-asc",
  });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/users`);

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  useEffect(
    function () {
      if (!users) return;

      const filteredUsers = users
        .filter((u) =>
          `${u.name} ${u.surname}`
            .toLowerCase()
            .includes(filters.query.toLowerCase())
        )
        .sort((a, b) => {
          switch (filters.sortBy) {
            case "alphabet-asc":
              return `${a.name} ${a.surname}` > `${b.name} ${b.surname}`;
            case "alphabet-desc":
              return `${a.name} ${a.surname}` < `${b.name} ${b.surname}`;
          }
        });
      setFilteredUsers(filteredUsers);
    },
    [users, filters.query, filters.sortBy]
  );

  return (
    <>
      <SectionHeader title="Select receiver" />
      <UserSearchForm onChange={setFilters} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <UsersList users={filteredUsers} />
    </>
  );
}

export default Users;
