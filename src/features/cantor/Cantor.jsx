import { Outlet } from "react-router-dom";
import SectionHeader from "../../ui/SectionHeader";

export default function CurrencyExchange() {
  return (
    <>
      <SectionHeader title="Cantor" />
      <Outlet />
    </>
  );
}
