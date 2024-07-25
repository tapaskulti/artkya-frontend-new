import { Input } from "@material-tailwind/react";
 
export function InputComp() {
  return (
    <div className="flex w-72 flex-col items-end gap-6">     
      <Input size="lg" label="Input Large" />
    </div>
  );
}