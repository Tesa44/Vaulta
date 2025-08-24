import styles from "./UsersList.module.css";
import UserItem from "./UserItem";

function UsersList({ users }) {
  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <UserItem user={user}></UserItem>
      ))}
    </ul>
  );
}

export default UsersList;
