import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { NAV_TABS } from "@/constants";
import { memo, useCallback } from "react";

type NavbarProps = {
  activeNavTab: string;
  handleNavTabClick: (tab: string) => void;
};

function Navbar({ activeNavTab, handleNavTabClick }: NavbarProps) {
  const handleClickonMenu = useCallback(
    (tab: (typeof NAV_TABS)[keyof typeof NAV_TABS]) => {
      handleNavTabClick(tab);
    },
    [handleNavTabClick]
  );

  return (
    <NavigationMenu
      viewport={true}
      className="w-full flex justify-end p-4  max-w-full"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={`cursor-pointer ${
              activeNavTab === NAV_TABS.OPERATIONS
                ? "text-blue-500 hover:text-blue-500"
                : ""
            }`}
            onClick={() => handleClickonMenu(NAV_TABS.OPERATIONS)}
          >
            Operations
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={`cursor-pointer ${
              activeNavTab === NAV_TABS.TRANSACTIONS
                ? "text-blue-500 hover:text-blue-500"
                : ""
            }`}
            onClick={() => handleClickonMenu(NAV_TABS.TRANSACTIONS)}
          >
            Transactions
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default memo(Navbar);
