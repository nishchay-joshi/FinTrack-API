import {
    Car,
    GraduationCap,
    HeartPulse,
    House,
    Plane,
    Receipt,
    ShoppingBag,
    Tag,
    UtensilsCrossed,
} from "lucide-react";

export const CATEGORY_ICONS = {
    Tag,
    Car,
    House,
    HeartPulse,
    GraduationCap,
    Plane,
    Receipt,
    ShoppingBag,
    UtensilsCrossed,
};

export const CATEGORY_ICON_OPTIONS = Object.keys(CATEGORY_ICONS);

export const CATEGORY_COLORS = [
    "orange",
    "blue",
    "green",
    "purple",
    "red",
    "yellow",
    "pink",
    "gray",
];

export function getCategoryIcon(iconName) {
    return CATEGORY_ICONS[iconName] ?? Tag;
}