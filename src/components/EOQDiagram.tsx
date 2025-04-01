
import React from "react";

interface EOQDiagramProps {
  eoq: number;
  daysBetweenOrders: number;
}

const EOQDiagram: React.FC<EOQDiagramProps> = ({ eoq, daysBetweenOrders }) => {
  return (
    <div className="eco-card overflow-hidden mt-6">
      <h3 className="text-xl font-bold mb-4">EOQ Inventory Level Visualization</h3>
      <div className="relative h-[200px] border-b border-l border-eco-text p-4">
        {/* Y-axis label */}
        <div className="absolute -left-6 top-1/2 -rotate-90 text-sm font-medium text-eco-text">
          Inventory Level
        </div>
        
        {/* X-axis label */}
        <div className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 text-sm font-medium text-eco-text">
          Time (days)
        </div>
        
        {/* EOQ label at the top */}
        <div className="absolute top-[-5px] left-[40px] text-sm font-medium text-eco-primary">
          Max: {eoq} units
        </div>
        
        {/* Time cycle */}
        <div className="absolute bottom-[-25px] right-[40px] text-sm font-medium text-eco-primary">
          {Math.round(daysBetweenOrders)} days
        </div>
        
        {/* Sawtooth pattern */}
        <svg className="w-full h-full">
          {/* Generate sawtooth pattern */}
          <path
            d={`M 0,10 L 100,170 M 100,10 L 200,170 M 200,10 L 300,170 M 300,10 L 400,170`}
            stroke="#245e4f"
            strokeWidth="3"
            fill="none"
          />
          
          {/* Reorder points */}
          <circle cx="100" cy="170" r="5" fill="#e9c46a" />
          <circle cx="200" cy="170" r="5" fill="#e9c46a" />
          <circle cx="300" cy="170" r="5" fill="#e9c46a" />
          
          {/* EOQ delivered arrows */}
          <path d="M 100,45 L 100,10" stroke="#7ac9a7" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M 200,45 L 200,10" stroke="#7ac9a7" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M 300,45 L 300,10" stroke="#7ac9a7" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* Arrow heads */}
          <path d="M 95,20 L 100,10 L 105,20" stroke="#7ac9a7" strokeWidth="2" fill="none" />
          <path d="M 195,20 L 200,10 L 205,20" stroke="#7ac9a7" strokeWidth="2" fill="none" />
          <path d="M 295,20 L 300,10 L 305,20" stroke="#7ac9a7" strokeWidth="2" fill="none" />
        </svg>
        
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/80 p-2 rounded border border-eco-secondary/30 text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-eco-primary"></div>
            <span>Inventory Level</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-eco-accent"></div>
            <span>Reorder Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-eco-secondary"></div>
            <span>Order Delivery</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-eco-text/80 mt-6">
        This diagram shows the sawtooth pattern typical of EOQ inventory management.
        Inventory starts at the EOQ level and decreases at a constant rate until
        it reaches the reorder point, at which time a new order is placed and received
        instantly (for simplification). The cycle then repeats, with each cycle lasting 
        approximately {Math.round(daysBetweenOrders)} days.
      </p>
    </div>
  );
};

export default EOQDiagram;
