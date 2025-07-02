import React from 'react';
import { Trophy } from 'lucide-react';

/**
 * Header component
 *
 * Displays the site header for NC A&T Intramural Sports.
 * Features:
 * - A trophy icon with the title.
 * - The current academic year, automatically calculated.
 *
 * Usage:
 * Can be placed at the top of the layout to provide consistent branding.
 */
const Header = () => {
  // Calculate the academic year based on the current calendar year
  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}-${currentYear + 1}`;

  return (
    <header className="bg-[#194A8D] text-white p-4 flex justify-between items-center">
      {/* Left: Logo and title */}
      <div className="flex items-center space-x-2">
        <Trophy className="h-6 w-6 text-[#FDB927]" />
        <h1 className="text-lg md:text-xl font-bold">NC A&T Intramural Sports</h1>
      </div>

      {/* Right: Academic year badge */}
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
