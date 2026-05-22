export const assetPath = (path) => encodeURI(`/assets/${path}`);

/** Every file from assets.rar — mapped to UI slots */
export const uiAssets = {
  searchIcon: "Layout/Form/input-group/Icon/control/Vector.png",
  headerActions: [
    { label: "Profile", icon: "Layout1/Image/flags/icon.png", to: "/products" },
    { label: "Message", icon: "Layout/Form/input-group/Icon/control/Vector2.png", to: "/products" },
    { label: "Orders", icon: "Layout/alibaba/Image/cloth/Bitmap (2).png", to: "/products" },
    { label: "Cart", icon: "Layout/alibaba/Image/cloth/image 24.png", to: "/cart", showCount: true },
  ],
  userAvatar: "Image/tech/image 33.png",
  supplierAvatar: "Layout/alibaba/Image/tech/image 85.png",
  wishlistIcon: "Layout/Form/input-group/Icon/control/Vector2.png",
  socialIcons: [
    { label: "Facebook", icon: "Layout1/Image/flags/icon.png" },
    { label: "Twitter", icon: "Layout/Misc/Group.png" },
    { label: "LinkedIn", icon: "Layout/Misc/market-button.png" },
    { label: "Instagram", icon: "Layout/Form/input-group/Icon/control/Vector.png" },
  ],
  cartBenefits: [
    {
      title: "Secure payment",
      subtitle: "Have you ever finally just",
      image: "Image/backgrounds/image 107.png",
    },
    {
      title: "Customer support",
      subtitle: "Have you ever finally just",
      image: "Image/backgrounds/image 106.png",
    },
    {
      title: "Free delivery",
      subtitle: "Have you ever finally just",
      image: "Image/backgrounds/Mask group.png",
    },
  ],
  offerCards: [
    {
      text: "Get US $10 off with a new supplier",
      image: "Image/backgrounds/Mask group (1).png",
      tone: "orange",
    },
    {
      text: "Send quotes with supplier preferences",
      image: "Image/backgrounds/image 106.png",
      tone: "teal",
    },
  ],
  paymentMethods: [
    { label: "Visa", icon: "Layout/Misc/Group.png" },
    { label: "Mastercard", icon: "Layout/Misc/market-button.png" },
    { label: "PayPal", icon: "Layout/Form/input-group/Icon/control/Vector2.png" },
  ],
};

export const categories = [
  { name: "Automobiles", icon: "Image/tech/6.png" },
  { name: "Clothes and wear", icon: "Layout/alibaba/Image/cloth/2 1.png" },
  { name: "Home interiors", icon: "Image/interior/1.png" },
  { name: "Computer and tech", icon: "Image/tech/image 34.png" },
  { name: "Tools, equipments", icon: "Image/tech/image 29.png" },
  { name: "Sports and outdoor", icon: "Layout/alibaba/Image/cloth/image 26.png" },
  { name: "Animal and pets", icon: "Image/interior/image 89.png" },
  { name: "Machinery tools", icon: "Image/tech/image 85.png" },
  { name: "More category", icon: "Layout1/Image/flags/icon.png" },
];

export const homeOutdoorItems = [
  { name: "Soft chairs", price: "From USD 19", image: assetPath("Image/interior/1.png") },
  { name: "Sofa and chair", price: "From USD 39", image: assetPath("Image/interior/7.png") },
  { name: "Kitchen dishes", price: "From USD 12", image: assetPath("Image/interior/3.png") },
  { name: "Smart mixer", price: "From USD 29", image: assetPath("Image/interior/9.png") },
  { name: "Blenders", price: "From USD 24", image: assetPath("Image/interior/8.png") },
  { name: "Home appliance", price: "From USD 90", image: assetPath("Image/interior/image 93.png") },
  { name: "Coffee maker", price: "From USD 45", image: assetPath("Image/interior/8.png") },
  { name: "Indoor plant", price: "From USD 10", image: assetPath("Image/interior/image 89.png") },
];

export const electronicsItems = [
  { name: "Smart watches", price: "From USD 19", image: assetPath("Image/tech/8.png") },
  { name: "Cameras", price: "From USD 89", image: assetPath("Image/tech/6.png") },
  { name: "Headphones", price: "From USD 10", image: assetPath("Image/tech/image 86.png") },
  { name: "Gaming set", price: "From USD 35", image: assetPath("Image/tech/image 29.png") },
  { name: "Laptops", price: "From USD 340", image: assetPath("Image/tech/image 34.png") },
  { name: "Smartphones", price: "From USD 199", image: assetPath("Image/tech/image 33.png") },
  { name: "Electric kettle", price: "From USD 20", image: assetPath("Image/tech/image 85.png") },
  { name: "Tablets", price: "From USD 99", image: assetPath("Image/tech/image 32.png") },
];

export const supplierRegions = [
  { country: "Arabic Emirates", domain: "shopname.ae", flag: assetPath("Layout1/Image/flags/AE@2x.png") },
  { country: "Australia", domain: "shopname.com.au", flag: assetPath("Layout1/Image/flags/icon.png") },
  { country: "United States", domain: "shopname.us", flag: assetPath("Layout1/Image/flags/US@2x.png") },
  { country: "Russia", domain: "shopname.ru", flag: assetPath("Layout1/Image/flags/RU@2x.png") },
  { country: "Italy", domain: "shopname.it", flag: assetPath("Layout1/Image/flags/IT@2x.png") },
  { country: "Denmark", domain: "denmark.com.dk", flag: assetPath("Layout1/Image/flags/DK@2x.png") },
  { country: "France", domain: "shopname.fr", flag: assetPath("Layout1/Image/flags/FR@2x.png") },
  { country: "China", domain: "shopname.cn", flag: assetPath("Layout1/Image/flags/CN@2x.png") },
  { country: "Great Britain", domain: "shopname.co.uk", flag: assetPath("Layout1/Image/flags/GB@2x.png") },
  { country: "Germany", domain: "shopname.de", flag: assetPath("Layout1/Image/flags/DE@2x.png") },
];
