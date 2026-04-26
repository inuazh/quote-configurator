import "./App.css";
import { useForm } from "react-hook-form";

type FormValues = {
  client: { id: string; name: string } | null;
  clientEmail: string;
  clientContactPerson: string;
  currency: "RUB" | "USD" | "EUR";
  validUntil: Date;
  paymentTerms: "prepaid" | "split" | "postpaid" | "installment";
  installmentMonths?: number;
};

const defaultValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

function App() {
  const {
    register,
    handleSubmit,
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
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("clientContactPerson", { required: "Введите ФИО" })}
        />
        {errors.clientContactPerson && (
          <span> {errors.clientContactPerson.message}</span>
        )}
        <input
          type="email"
          {...register("clientEmail", {
            required: "Введите email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Некорректный email",
            },
          })}
        />
        {errors.clientEmail && <span> {errors.clientEmail.message}</span>}
        <button type="submit">sub</button>
      </form>
    </>
  );
}

export default App;
