import { useEffect, useState } from "react";
import styles from "./Users.module.css";
import BackButton from "../../ui/BackButton";
import UsersList from "./UsersList";
import UserSearchForm from "./UserSearchForm";
import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Users</h3>
        <BackButton></BackButton>
      </div>
      <UserSearchForm onChange={setFilters}></UserSearchForm>
      {loading && <Loader></Loader>}
      {error && <ErrorMessage message={error}></ErrorMessage>}
      <UsersList users={filteredUsers}></UsersList>
    </div>
  );
}

export default Users;
