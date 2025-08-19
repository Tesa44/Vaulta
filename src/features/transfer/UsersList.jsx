import styles from "./UsersList.module.css";
import UserItem from "./UserItem";

function UsersList({ users }) {
  return (
    <div className={styles.box}>
      <ul className={styles.list}>
        {users.map((user) => (
          <UserItem user={user}></UserItem>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
