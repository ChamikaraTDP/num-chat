import { PropsWithChildren } from "react";

export default function Button({ children }: PropsWithChildren) {
  return (
    <button className="w-[340px] h-10 px-5 py-[10px] rounded bg-[#FFCE22] hover:bg-[#FFD84D] active:bg-[#FFCE22] text-sm leading-[130%]">
      {children}
    </button>
  );
}
