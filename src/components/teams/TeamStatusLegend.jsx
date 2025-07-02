import React from 'react';
import { Info } from 'lucide-react';

/**
 * TeamStatusLegend component
 *
 * Displays a legend explaining the meaning of team status indicators (active/inactive).
 * Includes:
 * - An icon for visual context.
 * - Labels and colored dots describing team states.
 *
 * Usage:
 * Can be placed anywhere in the UI where users need clarity about team status indicators.
 */
const TeamStatusLegend = () => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg border border-gray-200 flex items-start">
      {/* Info icon */}
      <Info className="h-5 w-5 text-[#194A8D] mt-0.5 mr-2 flex-shrink-0" />

      {/* Legend description */}
      <div className="text-sm">
        <p className="font-medium mb-1">Team Status:</p>

        {/* Status indicators */}
        <div className="flex items-center space-x-4">
          {/* Active Team */}
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#194A8D] rounded-full mr-1.5"></div>
            <span>Active Team</span>
          </div>

          {/* Inactive Team */}
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
