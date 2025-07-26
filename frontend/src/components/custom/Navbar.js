import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink, } from "@/components/ui/navigation-menu";
import { NAV_TABS } from "@/constants";
import { memo, useCallback } from "react";
function Navbar({ activeNavTab, handleNavTabClick }) {
    const handleClickonMenu = useCallback((tab) => {
        handleNavTabClick(tab);
    }, [handleNavTabClick]);
    return (_jsx(NavigationMenu, { viewport: true, className: "w-full flex justify-end p-4  max-w-full", children: _jsxs(NavigationMenuList, { children: [_jsx(NavigationMenuItem, { children: _jsx(NavigationMenuLink, { className: `cursor-pointer ${activeNavTab === NAV_TABS.OPERATIONS
                            ? "text-blue-500 hover:text-blue-500"
                            : ""}`, onClick: () => handleClickonMenu(NAV_TABS.OPERATIONS), children: "Operations" }) }), _jsx(NavigationMenuItem, { children: _jsx(NavigationMenuLink, { className: `cursor-pointer ${activeNavTab === NAV_TABS.TRANSACTION
                            ? "text-blue-500 hover:text-blue-500"
                            : ""}`, onClick: () => handleClickonMenu(NAV_TABS.TRANSACTION), children: "Transactions" }) })] }) }));
}
export default memo(Navbar);
