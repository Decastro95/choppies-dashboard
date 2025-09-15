import { supabase } from "../supabaseClient";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>
          {p.name} – {p.price}
        </li>
      ))}
    </ul>
  );
}
