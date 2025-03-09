export interface UserType {
  id: string;
  email: string;
  password: string;
  name: string;
  image?: string;
  phone?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  country?: string;

  // accounts?: Account[];
}

export interface userData {
  id: string;
  email: string;
  //   status: "pending" | "processing" | "success" | "failed";
  name: string;
  role: string;
  createdAt: Date;
}

export interface ProductType {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  order: number;
  basePrice: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  sizeId: string;
  size: {
    id: string;
    name: string;
    price: number;
  };
  extra: {
    id: string;
    name: string;
    price: number;
  }[];
  category: {
    id: string;
    name: string;
  }[];
}

export interface CategoriesType {
  name: string;
  id: string;
  role: string;
  order: number;
  products: ProductType[];
}
