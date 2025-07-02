import React from 'react';
import { Info } from 'lucide-react';

const TeamStatusLegend: React.FC = () => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg border border-gray-200 flex items-start">
      <Info className="h-5 w-5 text-[#194A8D] mt-0.5 mr-2 flex-shrink-0" />
      <div className="text-sm">
        <p className="font-medium mb-1">Team Status:</p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#194A8D] rounded-full mr-1.5"></div>
            <span>Active Team</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-1.5"></div>
            <span>Inactive Team</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStatusLegend;