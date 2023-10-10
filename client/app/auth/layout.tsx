import { Icons } from '@/components/icons';
import { siteConfig } from '@/config/site';
import { Dumbbell } from 'lucide-react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex-row  items-center justify-center h-full'>
      <div className=" flex items-center   justify-center pt-6 pb-5  shadow-sm  ">
        <Dumbbell className="w-8 h-8 mr-2  rotate-90 text-lime-600" />
        <h1 className=" font-sans font-semibold text-3xl">{siteConfig.name}</h1>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
