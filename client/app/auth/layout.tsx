import { Icons } from '@/components/icons';
import { siteConfig } from '@/config/site';
import { Dumbbell } from 'lucide-react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex-row  items-center justify-center h-full'>
      
      {children}
    </div>
  );
};

export default AuthLayout;
