import { NavigationContext } from '@/lib/NavigationProvider';
import { useRouter } from 'next/navigation';
import { use } from 'react';

const Sidebar = () => {
  const router = useRouter();
  const { closeMobileNav, isMobileNavOpen } = use(NavigationContext);

  return <div>Sidebar</div>;
};

export default Sidebar;
