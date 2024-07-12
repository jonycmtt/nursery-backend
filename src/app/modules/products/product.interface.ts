export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProducts = {
  title: string;
  inventory: TInventory;
  price: number;
  description: string;
  rating: number;
  category: string;
  imageUrl: string;
};
