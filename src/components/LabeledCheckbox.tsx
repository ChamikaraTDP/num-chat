import Checkbox from "./Checkbox";

type LabeledCheckboxProps = {
  label: string;
  checked: boolean;
  toggleChecked: (newCheckedVal: boolean) => void;
}

export default function LabeledCheckbox({ label, checked, toggleChecked }: LabeledCheckboxProps) {
  return (
    <div className="w-full flex justify-between items-center py-2 pl-[7px] pr-[6px]">
      <h4 className="text-sm">{label}</h4>

      <Checkbox checked={checked} toggleChecked={toggleChecked} />
    </div>
  )
}
