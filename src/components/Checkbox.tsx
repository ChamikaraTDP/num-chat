import CheckIcon from "@assets/icons/check.svg";

type CheckboxProps = {
  checked: boolean;
  toggleChecked: (newCheckedVal: boolean) => void;
};

export default function Checkbox({ checked, toggleChecked }: CheckboxProps) {
  return (
    <div
      onClick={() => toggleChecked(!checked)}
      className={`w-[25px] h-[25px] flex justify-center items-center rounded-[6px] 
      text-white active:outline active:outline-[3px] active:outline-[#2469F61A]
       ${
         checked
           ? "bg-[#2469F6] hover:bg-[#5087F8] active:bg-[#2469F6]"
           : "bg-white hover:text-[#E3E3E3] active:text-[#878787] border border-[#CDCDCD] hover:border-[#BDBDBD]"
       }`}
    >
      <CheckIcon width="17px" height="12px" />
    </div>
  );
}
