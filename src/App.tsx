import "./App.css";
import { useForm } from "react-hook-form";
import type { FormValues } from "./types/quote";
import { ClientBlock } from "./components/ClientBlock";
import { Button, Container } from "@mui/material";

const defaultValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

function App() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      client: null,
      clientEmail: "",
      clientContactPerson: "",
      currency: "RUB",
      validUntil: defaultValidUntil,
      paymentTerms: "prepaid",
    },
    mode: "onBlur", 
  });

  const onSubmit = (data: FormValues) => {
    console.log("Форма отправлена:", data);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <h1>Конфигуратор КП</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ClientBlock
          register={register}
          control={control}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />

        {/* todo: Itemsblock позиции КП */}
        {/*  итоги */}

        <Button type="submit" variant="contained" size="large">
          Сохранить КП
        </Button>
      </form>
    </Container>
  );
}

export default App;