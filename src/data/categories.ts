export const categoriesWithTypes: Record<string, string[]> = {
  earring: [
    "Stud",
    "Jhumka",
    "Hoops",
    "Drop Earrings",
    "Chandbali",
  ],

  rings: [
    "Adjustable Ring",
    "Stone Ring",
    "Plain Ring",
    "Antique Ring",
    "Couple Ring",
  ],

  necklace: [
    "Choker",
    "Traditional",
    "Long Necklace",
    "Layered Necklace",
    "Bridal Set",
    "Oxidised Necklace",
    "Korean Style",
    "Party Wear",
    "Daily Wear",
    "Ad necklace",
    "Silver Style",
    "Stone",
    "GS Necklace"
  ],

  mangalsutra: [
    "Short Mangalsutra",
    "Long Mangalsutra",
    "Diamond Mangalsutra",
  ],

  payal: [
    "Single Payal",
    "Pair Payal",
    "Beaded Payal",
  ],

  "toe ring": [
    "Adjustable Toe Ring",
    "Stone Toe Ring",
    "Plain Toe Ring",
  ],

  bangles: [
    "Single Kada",
    "Bangle Set",
    "Bridal Bangles",
  ],
  bracelet: [
  "Ad Bracelet",
  "Charm Bracelet",
  "Stone Bracelet",
  "Chain Bracelet",
  "Oxidised Bracelet",
  "Gold Plated Bracelet",
  "Silver Bracelet",
  "Couple Bracelet",
],
  chains: [
    "Gold Plated Chain",
    "Silver Chain",
    "Evil Eye Chain",
    "Rope Chain",
    "Love Chain",
    "Thin Daily Wear Chain",
    "Thick Chain",
    "Butterfly Chain",
    "Mangalsutra Chain",
    "Layered Chain",
  ],

  pendant: [
    "Single Pendant",
    "Pendant Set",
    "Religious Pendant",
    "Diamond Style",
    "Short Chain",
    "Best Friend",
    "Butterfly",
    "Korean Style",
    "Name Pendant",
    "Stone Pendant",
  ],

  "nose ring": [
    "Nath",
    "Stud Nose Ring",
    "Clip Nose Ring",
  ],

  "maang tikka": [
    "Single Maang Tikka",
    "Bridal Maang Tikka",
  ],

};

/* CATEGORY IMAGE MAP */
export const categoryImages: Record<string, string> = {
  "nose ring": "/images/nose.png",
  earring: "/images/ear1.jpeg",
  chains: "/images/15.png",
  rings: "/images/ring1.webp",
  necklace: "/images/necklace.jpeg",
  mangalsutra: "/images/mangalsutra.webp",
  payal: "/images/payal.jpg",
  "toe ring": "/images/toering.webp",
  bangles: "/images/bangle.jpg",
  pendant: "/images/pendant.jpeg",
  "maang tikka": "/images/tikka.webp",
  bracelet: "/images/1.jpg",
};


// Keep category list for dropdown
export const categories = Object.keys(categoriesWithTypes);