import React from 'react';
import { Trophy } from 'lucide-react';

const Header: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}-${currentYear + 1}`;
  
  return (
    <header className="bg-[#194A8D] text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Trophy className="h-6 w-6 text-[#FDB927]" />
        <h1 className="text-lg md:text-xl font-bold">NC A&T Intramural Sports</h1>
      </div>
      <div className="text-sm md:text-base">
        <span className="mr-2">Academic Year:</span>
        <span className="bg-[#FDB927] text-[#194A8D] py-1 px-2 rounded font-medium">
          {academicYear}
        </span>
      </div>
    </header>
  );
};

export default Header;