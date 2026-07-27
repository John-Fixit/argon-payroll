/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button } from "@nextui-org/react";
import clsx from "clsx";
import ProductCard from "./ProductCard";
import p1 from "../../../assets/images/p1.png";
import p2 from "../../../assets/images/p2.png";
import p3 from "../../../assets/images/shoe.jpeg";

export default function ProductContainer() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  
  const buttons = [
    "Fashion",
    "Apparel & Accessories",
    "Electronics",
    "Furniture",
    "Groceries",
    "Stationery",
  ];

  const products = [
    {img: p1, name: "Airjordan 1", price: "44,000.00", description: "Air Force 1 Sneakers. Solid color nubuck leather upper. Perforated toe for extra breathability. Color matched flat laces. Tonal logo label sea..."},
    {img: p2, name: "Airjordan 1", price: "44,000.00", description: "Air Force 1 Sneakers. Solid color nubuck leather upper. Perforated toe for extra breathability. Color matched flat laces. Tonal logo label sea..."},
    {img: p3, name: "Airjordan 1", price: "44,000.00", description: "Air Force 1 Sneakers. Solid color nubuck leather upper. Perforated toe for extra breathability. Color matched flat laces. Tonal logo label sea..."},
    {img: p1, name: "Airjordan 1", price: "44,000.00", description: "Air Force 1 Sneakers. Solid color nubuck leather upper. Perforated toe for extra breathability. Color matched flat laces. Tonal logo label sea..."},
    {img: p2, name: "Airjordan 1", price: "44,000.00", description: "Air Force 1 Sneakers. Solid color nubuck leather upper. Perforated toe for extra breathability. Color matched flat laces. Tonal logo label sea..."},
    {img: p1, name: "Airjordan 1", price: "44,000.00", description: "Air Force 1 Sneakers. Solid color nubuck leather upper. Perforated toe for extra breathability. Color matched flat laces. Tonal logo label sea..."},
    {img: p3, name: "Airjordan 1", price: "44,000.00", description: "Air Force 1 Sneakers. Solid color nubuck leather upper. Perforated toe for extra breathability. Color matched flat laces. Tonal logo label sea..."},
    {img: p1, name: "Airjordan 1", price: "44,000.00", description: "Air Force 1 Sneakers. Solid color nubuck leather upper. Perforated toe for extra breathability. Color matched flat laces. Tonal logo label sea..."},
    {img: p2, name: "Airjordan 1", price: "44,000.00", description: "Air Force 1 Sneakers. Solid color nubuck leather upper. Perforated toe for extra breathability. Color matched flat laces. Tonal logo label sea..."},
  ]

  return (
    <>
      <main>
        <div className="flex items-center overflow-x-auto gap-4 my-6">
          {buttons.map((txt, i) => {
            return (
              <Button
                radius="sm"
                className={clsx(
                  selectedCategoryIndex === i
                    ? "bg-[#3F83F8] text-white"
                    : "bg-[#ffff] text-[black]"
                )}
                key={i}
                onClick={() => setSelectedCategoryIndex(i)}
              >
                {txt}
              </Button>
            );
          })}
        </div>
        <section>
          <div className="my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <div key={i} >
                <ProductCard product={product}/>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
