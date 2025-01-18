'use client';

import { createContext, useState } from 'react';

type NavigationContextType = {
  isMobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
};

export const NavigationContext = createContext<NavigationContextType>({
  isMobileNavOpen: false,
  openMobileNav: () => {},
  closeMobileNav: () => {},
});

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const openMobileNav = () => setIsMobileNavOpen(true);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <NavigationContext
      value={{
        isMobileNavOpen,
        openMobileNav,
        closeMobileNav,
      }}
    >
      {children}
    </NavigationContext>
  );
};
