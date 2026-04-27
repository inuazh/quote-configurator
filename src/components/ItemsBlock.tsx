import {
  useFieldArray,
  type Control,
  type UseFormRegister,
  type FieldErrors,
} from "react-hook-form";
import { Box, Button, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { FormValues } from "../types/quote";
import React from "react";

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
          <React.Fragment key={field.id}>
            <TextField
              label="Количество"
              {...register(`items.${index}.quantity`, {
                required: "Обязательно",
                min: { value: 1, message: "Больше 0" },
                valueAsNumber: true,
              })}
              error={!!errors.items?.[index]?.quantity}
              helperText={errors.items?.[index]?.quantity?.message}
            />
            <TextField
              label="цена"
              {...register(`items.${index}.unitPrice`, {
                required: "Обязательно",
                min: { value: 0.01, message: "цена не может быть 0" },
                valueAsNumber: true,
              })}
              error={!!errors.items?.[index]?.unitPrice}
              helperText={errors.items?.[index]?.unitPrice?.message}
            />
            <TextField
              label="Скидка"
              {...register(`items.${index}.discount`, {
                min: { value: 0, message: "Не меньше 0" },
                max: { value: 30, message: "До 30%" },
                valueAsNumber: true,
              })}
              error={!!errors.items?.[index]?.discount}
              helperText={errors.items?.[index]?.discount?.message}
            />
            <div>позиция{index + 1}</div>
          </React.Fragment>
        ))}
      </div>
    </Box>
  );
}
