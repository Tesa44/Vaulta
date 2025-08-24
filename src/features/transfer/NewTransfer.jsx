import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./NewTransfer.module.css";
import ReceiverInfo from "./ReceiverInfo";
import NewTransferForm from "./NewTransferForm";
import BackButton from "../../ui/BackButton";
import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";

const BASE_URL = "http://localhost:8000";

function NewTransfer() {
  const [user, setUser] = useState({});
  const [userAccounts, setUserAccounts] = useState([]);
  const [toAccount, setToAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(
    function () {
      async function fetchUser() {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(`${BASE_URL}/users?id=${id}`);

          if (!res.ok) {
            throw new Error("Something went wrong with fetching user data");
          }
          const [data] = await res.json();
          setUser(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      fetchUser();
    },
    [id]
  );

  useEffect(
    function () {
      async function fetchAccounts() {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(`${BASE_URL}/accounts?userId=${id}`);

          if (!res.ok) {
            throw new Error("Something went wrong with fetching accounts data");
          }

          const data = await res.json();
          setUserAccounts(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      fetchAccounts();
    },
    [id]
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Fast transfer</h3>
        <BackButton></BackButton>
      </div>
      <div className={styles.main}>
        {loading && <Loader></Loader>}
        {error && <ErrorMessage></ErrorMessage>}
        {!loading && !error && (
          <ReceiverInfo
            user={user}
            accounts={userAccounts}
            onSelect={setToAccount}
            selected={toAccount}
          ></ReceiverInfo>
        )}
        <NewTransferForm
          toAccount={toAccount}
          receiverFullname={`${user?.name} ${user?.surname}`}
        ></NewTransferForm>
      </div>
    </div>
  );
}

export default NewTransfer;
