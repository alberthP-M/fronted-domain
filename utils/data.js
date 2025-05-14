const profile = {
  name: "Alberth Paredes",
  email: "orlando.alb77@gmail.com",
  imgUrl: "/alberth.svg",
};
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const categories = {
  broaster: [
    {
      id: 1,
      title: "Cheap Pollo",
      price: 25.99,
      stock: 20,
      img: "/img/grill1.png",
    },
    {
      id: 2,
      title: "Quarter chicken",
      price: 40.99,
      stock: 13,
      img: "/img/dish2.png",
    },
    {
      id: 3,
      title: "Cheap chicken",
      price: 32.99,
      stock: 10,
      img: "/img/grill1.png",
    },
    {
      id: 4,
      title: "Whole chicken",
      price: 45.99,
      stock: 18,
      img: "/img/dish.png",
    },
    {
      id: 1,
      title: "Cheap chicken",
      price: 25.99,
      stock: 20,
      img: "/img/grill1.png",
    },
    {
      id: 2,
      title: "Quarter chicken",
      price: 40.99,
      stock: 13,
      img: "/img/dish2.png",
    },
    {
      id: 3,
      title: "Cheap chicken",
      price: 32.99,
      stock: 10,
      img: "/img/grill1.png",
    },
    {
      id: 4,
      title: "Whole chicken",
      price: 45.99,
      stock: 18,
      img: "/img/dish.png",
    },
  ],
  spit: [
    {
      id: 1,
      title: "Cheap chicken",
      price: 25.0,
      stock: 20,
      img: "/img/dish2.png",
    },
    {
      id: 2,
      title: "Quarter chicken",
      price: 35.0,
      stock: 13,
      img: "/img/grill1.png",
    },
  ],
  soup: [
    {
      id: 1,
      title: "Chicken Soup",
      price: 10.0,
      stock: 17,
      img: "/img/grill1.png",
    },
    {
      id: 2,
      title: "Lamb Soup",
      price: 15.0,
      stock: 15,
      img: "/img/dish2.png",
    },
  ],
  grill: [
    {
      id: 1,
      title: "Grilled Rib",
      price: 30.0,
      stock: 24,
      img: "/img/dish2.png",
    },
    {
      id: 2,
      title: "Grilled Chicken",
      price: 18.0,
      stock: 14,
      img: "/img/grill1.png",
    },
  ],
};

const tables = [
  { name: "Table 1", id: 1, available: true },
  { name: "Table 2", id: 2, available: false },
  { name: "Table 3", id: 3, available: true },
  { name: "Table 4", id: 4, available: false },
  { name: "Table 5", id: 5, available: true },
  { name: "Table 6", id: 6, available: true },
];
const orderTypes = [
  { name: "Dine In", id: 1, available: true },
  { name: "To go", id: 2, available: true },
];

export { profile, userNavigation, categories, tables, orderTypes };
