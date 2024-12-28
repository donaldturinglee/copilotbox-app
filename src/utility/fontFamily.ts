import {fontFamilies} from "@/constants/fonts";

export const GetFontFamily = (
    weight?: "normal" | "medium" | "bold",
    isLTR?: boolean,
) => {
    const selectedFontFamily = fontFamilies.POPPINS;
    return selectedFontFamily[weight ?? "normal"];
};
