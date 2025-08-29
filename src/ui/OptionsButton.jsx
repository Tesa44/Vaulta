import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import Button from "./Button";

function OptionsButton({ onClick, size = 32 }) {
  return (
    <Button type="options" onClick={onClick}>
      <DotsThreeVerticalIcon size={size} />
    </Button>
  );
}

export default OptionsButton;
