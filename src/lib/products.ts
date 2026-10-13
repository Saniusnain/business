export type ProductId = "sand" | "chalk";

export type Product = {
  id: ProductId;
  letter: string;
  name: string;
  unit: string;
  price: number;
  tagline: string;
  description: string;
  highlights: string[];
  inTheBox: string;
  // Fill in once the final formulation label is approved.
  ingredients: string | null;
  tile: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "sand",
    letter: "S",
    name: "Sand-inspired alternative",
    unit: "80 g box",
    price: 250,
    tagline: "Engineered around the sensation, not the substance.",
    description:
      "A safe-to-consume, fortified alternative inspired by one of the most commonly craved non-food substances. Designed for individuals experiencing harmful cravings for non-food substances, including conditions such as pica.",
    highlights: [
      "Food-grade, safe-to-consume ingredients",
      "Nutrient-enriched formulation",
      "Visually familiar to the craving",
      "Developed with food science and nutrition research",
    ],
    inTheBox: "1 box · 80 g",
    ingredients: null,
    tile: "border-sage bg-gradient-to-br from-moss to-sage",
  },
  {
    id: "chalk",
    letter: "C",
    name: "Chalk-inspired alternative",
    unit: "Pack of 5",
    price: 250,
    tagline: "Nutrient-enriched, food-grade, visually familiar.",
    description:
      "A fortified, edible alternative inspired by chalk — one of the most commonly craved non-food substances. Designed for individuals experiencing harmful cravings for non-food substances, including conditions such as pica.",
    highlights: [
      "Food-grade, safe-to-consume ingredients",
      "Nutrient-enriched formulation",
      "Visually familiar to the craving",
      "Developed with food science and nutrition research",
    ],
    inTheBox: "1 pack · 5 pieces",
    ingredients: null,
    tile: "border-parchment bg-gradient-to-br from-cream to-parchment",
  },
];

export const MAX_QTY = 20;

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

const pkr = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });
export const formatPKR = (n: number) => `Rs ${pkr.format(n)}`;
