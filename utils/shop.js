export function getShopRoute(shop) {
  return `${shop.city || "_"}/${shop.name}/${shop.street || "_"}`
    .split(" ")
    .join("-");
}

export function getShopLogo(logo) {
  if (!logo) {
    return "/images/shop/default-logo.jpg";
  }

  if (logo.startsWith(process.env.NEXT_PUBLIC_BACK_END_URL)) {
    return logo;
  }

  return `${process.env.NEXT_PUBLIC_BACK_END_URL}/${logo}`;
}
