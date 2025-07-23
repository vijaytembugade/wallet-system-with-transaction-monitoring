import { NAV_TABS } from "@/constants";
import { useState } from "react";

const useActiveNavTab = () => {
  const [activeNavTab, setActiveNavTab] = useState<string>(NAV_TABS.OPERATIONS);
  return { activeNavTab, setActiveNavTab };
};

export default useActiveNavTab;
