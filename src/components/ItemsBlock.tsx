import {
  useFieldArray,
  type Control,
  type UseFormRegister,
  type FieldErrors,
} from "react-hook-form";
import { Box, Button, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { FormValues } from "../types/quote";

type ItemsBlockProps = {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
};

export function ItemsBlock({ control, register, errors }: ItemsBlockProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

//   console.log("fields:", fields);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
      <h2>Позиции КП</h2>

      <Button
        onClick={() =>
          append({
            product: null,
            quantity: 1,
            unitPrice: 0,
            discount: 0,
            totalPrice: 0,
          })
        }
      >
        Добавить позицию
      </Button>

      <div>
        {fields.map((field, index) => (
          <div key={field.id}>позиция{index + 1}</div>
        ))}
      </div>
    </Box>
  );
}
