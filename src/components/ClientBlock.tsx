import type { UseFormRegister, Control, FieldErrors } from "react-hook-form";
import type { FormValues } from "../types/quote";

type ClientBlockProps = {
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
};

export function ClientBlock({}: ClientBlockProps) {
  return (
    <div>
      <h2>Клиент и параметры</h2>
    </div>
  );
}
