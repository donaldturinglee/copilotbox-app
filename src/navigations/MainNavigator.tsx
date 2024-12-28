import { useEffect, useState } from "react";
import { AuthStackNavigator } from "@/navigations/stack/AuthStackNavigator";
import React from "react";
import { MainStackNavigator } from "@/navigations/stack/MainStackNavigator";

export const MainNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        setIsLoggedIn(true);
    }, [isLoggedIn]);

    return (
        <>
            {isLoggedIn ? <MainStackNavigator /> : <AuthStackNavigator />}
        </>
    );
};
