"use client";

import { useState } from "react";
import Button from "./Button";
import LabeledCheckbox from "./LabeledCheckbox";

const pages = ["Page 1", "Page 2", "Page 3", "Page 4"];

export default function PageSelector() {
  const [pageSelection, setPageSelection] = useState<boolean[]>(
    new Array(pages.length).fill(false)
  );

  const togglePageSelection = (index: number, newCheckedVal: boolean) => {
    setPageSelection((prevSelection) => {
      const newSelection = [...prevSelection];
      newSelection[index] = newCheckedVal;

      return newSelection;
    });
  };

  const toggleAll = () => {
    const allSelected = pageSelection.every((selection) => selection);

    if (allSelected) {
      setPageSelection(new Array(pages.length).fill(false));
    } else {
      setPageSelection(new Array(pages.length).fill(true));
    }
  }

  return (
    <div className="w-[370px] px-[15px] py-[10px] border border-[#EEEEEE] rounded-[6px] shadow-[0_0_4px_0_rgba(14,14,14,0.1),0_8px_15px_0_rgba(14,14,14,0.12)]">
      <LabeledCheckbox label="All Pages" checked={!pageSelection.some((selection) => !selection)} toggleChecked={toggleAll} />

      <hr className="text-[#CDCDCD] my-[10px]" />

      {pages.map((page, index) => (
        <LabeledCheckbox
          key={page}
          label={page}
          checked={pageSelection[index]}
          toggleChecked={(newCheckedVal: boolean) =>
            togglePageSelection(index, newCheckedVal)
          }
        />
      ))}

      <hr className="text-[#CDCDCD] my-[10px]" />

      <div className="py-[10px]">
        <Button>Done</Button>
      </div>
    </div>
  );
}
