

export const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  RUB: 92,
} as const;

export const PAYMENT_TERMS_OPTIONS = [
  { value: 'prepaid', label: 'Предоплата 100%' },
  { value: 'split', label: '50/50' },
  { value: 'postpaid', label: 'Постоплата 30 дней' },
  { value: 'installment', label: 'Рассрочка' },
] as const;


export const CURRENCY_OPTIONS = [
  { value: 'RUB', label: '₽ Рубль' },
  { value: 'USD', label: '$ Доллар' },
  { value: 'EUR', label: '€ Евро' },
] as const;