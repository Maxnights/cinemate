// src/data/snacks.js

/**
 * Массив с категориями закусок. Для простоты здесь
 * будем хранить все позиции в одном списке, но укажем категорию.
 *
 * Поля:
 * - id: уникальный идентификатор (строка)
 * - name: название товара
 * - category: категория (например, 'Popcorn & Nachos', 'Drinks')
 * - sizes: массив с объектами { size: 'Regular', calories: '272 kcal', price: 5.5 }
 * - imageUrl: путь к картинке (в public/images/)
 */

const snacks = [
  {
    id: "popcorn-salted",
    name: "Salted popcorn",
    category: "Popcorn & Nachos",
    sizes: [
      { size: "Regular", calories: "272 kcal", price: 5.5 },
      { size: "Medium", calories: "580 kcal", price: 6.9 },
      { size: "Large", calories: "865 kcal", price: 7.6 },
    ],
    imageUrl: "/images/snacks/salted-popcorn.jpg",
  },
  {
    id: "popcorn-caramel",
    name: "Caramel popcorn",
    category: "Popcorn & Nachos",
    sizes: [
      { size: "Regular", calories: "300 kcal", price: 5.5 },
      { size: "Medium", calories: "650 kcal", price: 6.9 },
      { size: "Large", calories: "900 kcal", price: 7.6 },
    ],
    imageUrl: "/images/snacks/caramel-popcorn.jpg",
  },
  {
    id: "popcorn-cheese",
    name: "Cheese popcorn",
    category: "Popcorn & Nachos",
    sizes: [
      { size: "Regular", calories: "350 kcal", price: 5.5 },
      { size: "Medium", calories: "700 kcal", price: 6.9 },
      { size: "Large", calories: "1000 kcal", price: 7.6 },
    ],
    imageUrl: "/images/snacks/cheese-popcorn.jpg",
  },
  {
    id: "popcorn-vegan",
    name: "Vegan butter popcorn",
    category: "Popcorn & Nachos",
    sizes: [
      { size: "Regular", calories: "260 kcal", price: 5.5 },
      { size: "Medium", calories: "550 kcal", price: 6.9 },
      { size: "Large", calories: "800 kcal", price: 7.6 },
    ],
    imageUrl: "/images/snacks/vegan-popcorn.jpg",
  },
  {
    id: "nachos-cheese",
    name: "Nachos with cheese",
    category: "Popcorn & Nachos",
    sizes: [
      { size: "Regular", calories: "450 kcal", price: 5.5 },
      { size: "Medium", calories: "800 kcal", price: 6.9 },
      { size: "Large", calories: "1200 kcal", price: 7.6 },
    ],
    imageUrl: "/images/snacks/nachos-cheese.jpg",
  },
  {
    id: "nachos-salsa",
    name: "Nachos with salsa",
    category: "Popcorn & Nachos",
    sizes: [
      { size: "Regular", calories: "400 kcal", price: 5.5 },
      { size: "Medium", calories: "750 kcal", price: 6.9 },
      { size: "Large", calories: "1100 kcal", price: 7.6 },
    ],
    imageUrl: "/images/snacks/nachos-salsa.jpg",
  },
  // Переходим к напиткам:
  {
    id: "drink-soft",
    name: "Soft drinks",
    category: "Drinks",
    sizes: [
      { size: "300ml", calories: "140 kcal", price: 2.5 },
      { size: "500ml", calories: "233 kcal", price: 4.0 },
    ],
    imageUrl: "/images/snacks/soft-drinks.jpg",
  },
  {
    id: "drink-fuze",
    name: "Fuze Tea",
    category: "Drinks",
    sizes: [
      { size: "300ml", calories: "90 kcal", price: 2.5 },
      { size: "500ml", calories: "150 kcal", price: 5.5 },
    ],
    imageUrl: "/images/snacks/fuze-tea.jpg",
  },
  {
    id: "drink-water",
    name: "Water",
    category: "Drinks",
    sizes: [
      { size: "300ml", calories: "0 kcal", price: 2.5 },
      { size: "500ml", calories: "0 kcal", price: 3.0 },
    ],
    imageUrl: "/images/snacks/water.jpg",
  },
  // Можно добавить ещё категории (напр., «Warm food», «Sweet treats», «Kids-friendly» и т. д.)
];

export default snacks;
