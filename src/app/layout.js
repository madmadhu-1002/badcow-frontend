
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from "@/app/components/ProductCard";


export const metadata = {
  title: "Clothing life",
  description: "Clothing Lifestyle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      
        {children}
      </body>
    </html>
  );
}
