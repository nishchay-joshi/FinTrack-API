import {
    Wallet,
    PiggyBank,
    Briefcase,
    Shield,
    TrendingUp
} from "lucide-react";

const icons = [
    Wallet,
    PiggyBank,
    Briefcase,
    Shield,
    TrendingUp
];

const colors = [
    "emerald",
    "green",
    "orange",
    "red",
    "purple"
];

export function getWalletIcon(index){
    return icons[index % icons.length];
}

export function getWalletColor(index){
    return colors[index % colors.length];
}