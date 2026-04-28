export type Product = { id: string; name: string; basePrice: number }
// import type { Client } from "../mock/api"


export type QuoteItem ={
  product: Product | null,
  quantity: number,
  unitPrice: number,
  discount: number,
  totalPrice: number,
}

 export type Client = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  status: "active" | "blocked";
};


export type FormValues = {
  client: Client | null;
  clientEmail: string;
  clientContactPerson: string;
  currency: "RUB" | "USD" | "EUR";
  validUntil: Date;
  paymentTerms: "prepaid" | "split" | "postpaid" | "installment";
  installmentMonths?: number;
  items: QuoteItem[]
};


