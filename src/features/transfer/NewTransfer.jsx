import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./NewTransfer.module.css";
import UserInfo from "./ReceiverInfo";
import NewTransferForm from "./NewTransferForm";
import BackButton from "../../ui/BackButton";

const BASE_URL = "http://localhost:8000";

function NewTransfer() {
  const [user, setUser] = useState({});
  const [userAccounts, setUserAccounts] = useState([]);
  const [toAccount, setToAccount] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(
    function () {
      async function fetchUser() {
        setLoading(true);
        try {
          const res = await fetch(`${BASE_URL}/users?id=${id}`);

          const [data] = await res.json();
          setUser(data);
        } catch (err) {
          console.error(err.message);
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
        try {
          const res = await fetch(`${BASE_URL}/accounts?userId=${id}`);

          const data = await res.json();
          setUserAccounts(data);
        } catch (err) {
          console.error(err.message);
        } finally {
          setLoading(false);
        }
      }
      fetchAccounts();
    },
    [id]
  );

  return (
    <div className={styles.userDetails}>
      <div className={styles.header}>
        <h3>Fast transfer</h3>
        <BackButton></BackButton>
      </div>
      <div className={styles.container}>
        <UserInfo
          user={loading ? "loading..." : user}
          accounts={userAccounts}
          onSelect={setToAccount}
          selected={toAccount}
        ></UserInfo>
        <NewTransferForm
          toAccount={toAccount}
          receiverFullname={`${user?.name} ${user?.surname}`}
        ></NewTransferForm>
      </div>
    </div>
  );
}

export default NewTransfer;
