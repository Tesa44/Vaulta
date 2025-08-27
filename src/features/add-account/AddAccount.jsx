import { Outlet } from "react-router-dom";
import SectionHeader from "../../ui/SectionHeader";

function AddAccount() {
  return (
    <>
      <SectionHeader title="Add new account" />
      <Outlet />
    </>
  );
}

export default AddAccount;
