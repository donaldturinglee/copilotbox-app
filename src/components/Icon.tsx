import Chat from "@/assets/icons/outline/message-circle.svg";
import Edit from "@/assets/icons/outline/edit.svg";
import Menu from "@/assets/icons/outline/menu-2.svg";
import Close from "@/assets/icons/outline/x.svg";
import Send from "@/assets/icons/outline/arrow-up.svg";
import Tool from "@/assets/icons/tool.svg";
import Search from "@/assets/icons/outline/search.svg";
import Dots from "@/assets/icons/outline/dots.svg";
import Google from "@/assets/icons/outline/brand-google.svg";
import Mail from "@/assets/icons/outline/mail.svg";
import DataBase from "@/assets/icons/outline/database.svg";
import World from "@/assets/icons/outline/world.svg";
import ArrowRight from "@/assets/icons/outline/arrow-right.svg";
import ChevronRight from "@/assets/icons/outline/chevron-right.svg";
import Help from "@/assets/icons/outline/help-square-rounded.svg";
import Lock from "@/assets/icons/outline/lock-square-rounded.svg";
import SignOut from "@/assets/icons/outline/logout.svg";
import About from "@/assets/icons/outline/info-square-rounded.svg";
import LightTheme from "@/assets/icons/outline/brightness-2.svg";
import DarkTheme from "@/assets/icons/outline/brightness-half.svg";
import Wallet from "@/assets/icons/outline/wallet.svg";
import Coins from "@/assets/icons/outline/coins.svg";
import ChevronLeft from "@/assets/icons/outline/chevron-left.svg";
import Check from "@/assets/icons/outline/check.svg";
import Copilot from "@/assets/icons/outline/brand-github-copilot.svg";
import Github from "@/assets/icons/outline/brand-github.svg";
import Git from "@/assets/icons/outline/brand-git.svg";
import MailBox from "@/assets/icons/outline/mailbox.svg";
import Stars from "@/assets/icons/outline/stars.svg";
import Home from "@/assets/icons/outline/home.svg";
import Twitter from "@/assets/icons/outline/brand-twitter.svg";
import Discord from "@/assets/icons/outline/brand-discord.svg";
import OpenAI from "@/assets/icons/outline/brand-openai.svg";
import ArrowUp from "@/assets/icons/outline/arrow-up.svg";
import ArrowDown from "@/assets/icons/outline/arrow-down.svg";
import ChevronUp from "@/assets/icons/outline/chevron-up.svg";
import ChevronDown from "@/assets/icons/outline/chevron-down.svg";
import CircleCheck from "@/assets/icons/outline/circle-check.svg";
import DataBaseConfig from "@/assets/icons/outline/database-cog.svg";
import Restore from "@/assets/icons/outline/restore.svg";
import Eye from "@/assets/icons/outline/eye.svg";
import EyeClosed from "@/assets/icons/outline/eye-closed.svg";

import { StyleProp, ViewStyle } from "react-native";
import { GestureResponderEvent, View } from "react-native";


interface IconProps {
    style?: StyleProp<ViewStyle>;
    onPress?: ((event: GestureResponderEvent) => void);
    size?: number;
    color?: string;
}

export default {
    ChatIcon: ({style, onPress, size = 24, color}: IconProps) => 
        <View style={style} onTouchEnd={onPress}>
                <Chat color={color} width={size} height={size} />
        </View>,
    EditIcon: ({style, onPress, size = 24, color}: IconProps) => 
        <View style={style} onTouchEnd={onPress}>
                <Edit color={color} width={size} height={size} />
        </View>,
    MenuIcon: ({style, onPress, size = 24, color}: IconProps) => 
        <View style={style} onTouchEnd={onPress}>
                <Menu color={color} width={size} height={size} />
        </View>,
    CloseIcon: ({style, onPress, size = 24, color}: IconProps) => 
        <View style={style} onTouchEnd={onPress}>
                <Close color={color} width={size} height={size} />
        </View>,
    SendIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <Send color={color} width={size} height={size} />
        </View>,
    ToolIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <Tool color={color} width={size} height={size} />
        </View>,
    SearchIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <Search color={color} width={size} height={size} />
        </View>,
    DotsIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <Dots color={color} width={size} height={size} />
        </View>,
    GoogleIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <Google color={color} width={size} height={size} />
        </View>,
    MailIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <Mail color={color} width={size} height={size} />
        </View>,
    DatabaseIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <DataBase color={color} width={size} height={size} />
        </View>,
    WorldIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <World color={color} width={size} height={size} />
        </View>,
    ArrowRightIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <ArrowRight color={color} width={size} height={size} />
        </View>,
    HelpIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <Help color={color} width={size} height={size} />
        </View>,
    LockIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <Lock color={color} width={size} height={size} />
        </View>,
    SignOutIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <SignOut color={color} width={size} height={size} />
        </View>,
    AboutIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <About color={color} width={size} height={size} />
        </View>,
    ThemeIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <LightTheme color={color} width={size} height={size} />
        </View>,
    ChevronRightIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <ChevronRight color={color} width={size} height={size} />
        </View>,
    WalletIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
                <Wallet color={color} width={size} height={size} />
        </View>,
    CoinsIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <Coins color={color} width={size} height={size} />
        </View>,
    ChevronLeftIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <ChevronLeft color={color} width={size} height={size} />
        </View>,
    CheckIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <Check color={color} width={size} height={size} />
        </View>,
    CopilotIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <Copilot color={color} width={size} height={size} />
        </View>,
    GithubIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <Github color={color} width={size} height={size} />
        </View>,
    GitIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <Git color={color} width={size} height={size} />
        </View>,
    MailBoxIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <MailBox color={color} width={size} height={size} />
        </View>,
    StarsIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <Stars color={color} width={size} height={size} />
        </View>,
    HomeIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <Home color={color} width={size} height={size} />
        </View>,
    TwitterIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <Twitter color={color} width={size} height={size} />
        </View>,
    DiscordIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <Discord color={color} width={size} height={size} />
        </View>,
    OpenAIIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <OpenAI color={color} width={size} height={size} />
        </View>,
    ArrowUpIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <ArrowUp color={color} width={size} height={size} />
        </View>,
    ArrowDownIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <ArrowDown color={color} width={size} height={size} />
        </View>,
    ChevronUpIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <ChevronUp color={color} width={size} height={size} />
        </View>,
    ChevronDownIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <ChevronDown color={color} width={size} height={size} />
        </View>,
    CircleCheckIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <CircleCheck color={color} width={size} height={size} />
        </View>,
    DataBaseConfigIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <DataBaseConfig color={color} width={size} height={size} />
        </View>,
    RestoreIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <Restore color={color} width={size} height={size} />
        </View>,
    EyeIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <Eye color={color} width={size} height={size} />
        </View>,
    EyeClosedIcon: ({style, onPress, size = 24, color}: IconProps) =>
        <View style={style} onTouchEnd={onPress}>
            <EyeClosed color={color} width={size} height={size} />
        </View>,
    
}