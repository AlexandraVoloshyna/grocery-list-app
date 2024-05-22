export interface Grocery {
  id: number;
  name: string;
  category: string;
  price: number;
  bought: boolean;
  amount: number;
}
export interface CartItem extends Grocery {
  customName?: string;
}
