import {IsIOS} from "@/utility/platform.ts";

export const fontFamilies = {
    POPPINS: {
        normal: IsIOS() ? "Poppins-Regular" : "PoppinsRegular",
        medium: IsIOS() ? "Poppins-Medium" : "PoppinsMedium",
        bold: IsIOS() ? "Poppins-Bold" : "PoppinsBold",
        boldItalic: IsIOS() ? "Poppins-BoldItalic" : "PoppinsBoldItalic",
        extraBold: IsIOS() ? "Poppins-ExtraBold" : "PoppinsExtraBold",
        extraBoldItalic: IsIOS() ? "Poppins-ExtraBoldItalic" : "PoppinsExtraBoldItalic",
        italic: IsIOS() ? "Poppins-Italic" : "PoppinsItalic",
        light: IsIOS() ? "Poppins-Light" : "PoppinsLight",
        lightItalic: IsIOS() ? "Poppins-LightItalic" : "PoppinsLightItalic",
        semiBold: IsIOS() ? "Poppins-SemiBold" : "PoppinsSemiBold",
        semiBoldItalic: IsIOS() ? "Poppins-SemiBoldItalic" : "PoppinsSemiBoldItalic",
        thin: IsIOS() ? "Poppins-Thin" : "PoppinsThin",
        thinItalic: IsIOS() ? "Poppins-ThinItalic" : "PoppinsThinItalic",
        extraLight: IsIOS() ? "Poppins-ExtraLight" : "PoppinsExtraLight",
        extraLightItalic: IsIOS() ? "Poppins-ExtraLightItalic" : "PoppinsExtraLightItalic",
        mediumItalic: IsIOS() ? "Poppins-MediumItalic" : "PoppinsMediumItalic",
        black: IsIOS() ? "Poppins-Black" : "PoppinsBlack",
        blackItalic: IsIOS() ? "Poppins-BlackItalic" : "PoppinsBlackItalic",
    },
};
