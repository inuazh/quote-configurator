import type {Product, Client} from './../types/quote'



export const MOCK_CLIENTS: Client[] = [
  {
    id: "1",
    name: "ROGA&COPYTA`S+ LLC",
    contactPerson: "Иван Петров",
    email: "ivan@roga.ru",
    status: "active",
  },
  {
    id: "2",
    name: "ЗАО МММ",
    contactPerson: "Мария Моковна",
    email: "maria@maria.com",
    status: "active",
  },
  {
    id: "3",
    name: "ООО ЫЫЫ",
    contactPerson: "Петр Смирнов",
    email: "petr@garbage.ru",
    status: "blocked",
  },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "WMS система Базовая", basePrice: 5000 },
  { id: "2", name: "WMS система Профессиональная", basePrice: 12000 },
  { id: "3", name: "Внедрение и конфигурация", basePrice: 3000 },
  { id: "4", name: "Обучение персонала (день)", basePrice: 500 },
  { id: "5", name: "Техническая поддержка (месяц)", basePrice: 1000 },
  { id: "6", name: "Интеграция с 1С", basePrice: 2000 },
];

export const searchProducts = (query: string): Promise<Product[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        MOCK_PRODUCTS.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }, 300);
  });

export const searchClients = (query: string): Promise<Client[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        MOCK_CLIENTS.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }, 300);
  });

