export type FormValues = {
  client: { id: string; name: string } | null;
  clientEmail: string;
  clientContactPerson: string;
  currency: "RUB" | "USD" | "EUR";
  validUntil: Date;
  paymentTerms: "prepaid" | "split" | "postpaid" | "installment";
  installmentMonths?: number;
};


