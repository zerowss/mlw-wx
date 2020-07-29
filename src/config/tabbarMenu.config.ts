interface TabbarMenu {
    pagePath: string;
    iconPath: string;
    selectedIconPath: string;
    text: string;
    navigator: string;
}

const tabbarMenu: Array<TabbarMenu> = [
    {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: require("@/static/images/tabbar/icon_home@3x.png"),
        selectedIconPath: require("@/static/images/tabbar/icon_home_selected@3x.png"),
        navigator: "switchTab",
    },
    {
        pagePath: "/pages/customizedHousing/index",
        text: "定制房源",
        iconPath: require("@/static/images/tabbar/icon_dingzhifangyuan@3x.png"),
        selectedIconPath:
        require("@/static/images/tabbar/icon_dingzhifangyuan_selected@3x.png"),
        navigator: "switchTab",
    },
    {
        pagePath: "/pages/landlordJoining/index",
        text: "房东加盟",
        iconPath: require("@/static/images/tabbar/icon_fangdongjiameng@3x.png"),
        selectedIconPath:
        require("@/static/images/tabbar/icon_fangdongjiameng_selected@3x.png"),
        navigator: "switchTab",
    },
    {
        pagePath: "/pages/mine/index",
        text: "我的",
        iconPath: require("@/static/images/tabbar/icon_wode@3x.png"),
        selectedIconPath: require("@/static/images/tabbar/icon_wode_selected@3x.png"),
        navigator: "switchTab",
    }
];

export default tabbarMenu;
