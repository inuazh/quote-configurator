import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";


import {
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
} from "@mui/material";



import {searchClients} from "../mocks/api"
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import type { FormValues, Client } from "../types/quote";
import { CURRENCY_OPTIONS, PAYMENT_TERMS_OPTIONS } from "../constants/quote";


type ClientBlockProps = {
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
};

export function ClientBlock({
  register,
  control,
  errors,
  setValue,
  watch,
}: ClientBlockProps) {

  const [clientOptions, setClientOptions] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchClients = async () => {
      setLoading(true);
      const result = await searchClients(searchQuery);
      if (active) {
        setClientOptions(result);
        setLoading(false);
      }
    };

    fetchClients();

    return () => {
      active = false;
    };
  }, [searchQuery]);


  const paymentTerms = watch("paymentTerms");


  useEffect(() => {
    if (paymentTerms !== "installment") {
      setValue("installmentMonths", undefined);
    }
  }, [paymentTerms, setValue]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
      <h2>Клиент и общие параметры</h2>

      <Controller
        name="client"
        control={control}
        rules={{ required: "Выберите клиента" }}
        render={({ field, fieldState }) => (
          <Autocomplete
            value={field.value}
            onChange={(_, newValue) => {
              field.onChange(newValue);
              if (newValue) {
                setValue("clientContactPerson", newValue.contactPerson);
                setValue("clientEmail", newValue.email);
              } else {
                setValue("clientContactPerson", "");
                setValue("clientEmail", "");
                
              }
            }}
            onInputChange={(_, newInput) => setSearchQuery(newInput)}
            options={clientOptions}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            getOptionLabel={(option) => option.name}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Клиент"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        )}
      />


      <TextField
        label="Контактное лицо"
        {...register("clientContactPerson", {
          required: "Введите ФИО",
        })}
        error={!!errors.clientContactPerson}
        helperText={errors.clientContactPerson?.message}
        slotProps = {{inputLabel: {shrink: true}}}
      />


      <TextField
        label="Email"
        type="email"
        {...register("clientEmail", {
          required: "Введите email",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Некорректный email",
          },
        })}
        error={!!errors.clientEmail}
        helperText={errors.clientEmail?.message}
        slotProps= {{inputLabel: {shrink: true}}}
      />

      <Controller
        name="currency"
        control={control}
        rules={{ required: "Выберите валюту" }}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error}>
            <InputLabel>Валюта</InputLabel>
            <Select {...field} label="Валюта">
              {CURRENCY_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />


      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="validUntil"
          control={control}
          rules={{
            required: "Укажите дату",
            validate: (value) => {
              if (!value) return "Укажите дату";
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return value > today || "Дата должна быть в будущем";
            },
          }}
          render={({ field, fieldState }) => (
            <DatePicker
              label="Действительно до"
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) =>
                field.onChange(newValue ? newValue.toDate() : null)
              }
              slotProps={{
                textField: {
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                },
              }}
            />
          )}
        />
      </LocalizationProvider>

      <Controller
        name="paymentTerms"
        control={control}
        rules={{ required: "Выберите условия оплаты" }}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error}>
            <InputLabel>Условия оплаты</InputLabel>
            <Select {...field} label="Условия оплаты">
              {PAYMENT_TERMS_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      {paymentTerms === "installment" && (
        <TextField
          label="Количество месяцев рассрочки"
          type="number"
          {...register("installmentMonths", {
            required: "Укажите кол-во месяцев",
            min: { value: 3, message: "От 3 до 24 месяцев" },
            max: { value: 24, message: "От 3 до 24 месяцев" },
            valueAsNumber: true,
          })}
          error={!!errors.installmentMonths}
          helperText={errors.installmentMonths?.message}
        />
      )}
    </Box>
  );
}
