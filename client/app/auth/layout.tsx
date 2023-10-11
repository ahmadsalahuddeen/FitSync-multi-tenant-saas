import { Icons } from '@/components/icons';
import { siteConfig } from '@/config/site';
import { Dumbbell } from 'lucide-react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=''>
     
      {children}
    </div>
  );
};

export default AuthLayout;
