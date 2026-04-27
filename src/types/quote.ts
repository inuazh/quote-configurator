export type Product = { id: string; name: string; basePrice: number }


export type QuoteItem ={
  product: Product | null,
  quantity: number,
  unitPrice: number,
  discount: number,
  totalPrice: number,
}


export type FormValues = {
  client: { id: string; name: string } | null;
  clientEmail: string;
  clientContactPerson: string;
  currency: "RUB" | "USD" | "EUR";
  validUntil: Date;
  paymentTerms: "prepaid" | "split" | "postpaid" | "installment";
  installmentMonths?: number;
  items: QuoteItem[]
};


