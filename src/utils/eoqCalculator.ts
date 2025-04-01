
export interface EOQInputs {
  annualDemand: number;
  orderCost: number;
  holdingCost: number;
  unitCost?: number;
}

export interface EOQResults {
  eoq: number;
  totalAnnualCost: number;
  orderCyclesPerYear: number;
  daysBetweenOrders: number;
  annualHoldingCost: number;
  annualOrderCost: number;
  totalInventoryCost: number;
}

/**
 * Calculates the Economic Order Quantity and related metrics
 */
export function calculateEOQ(inputs: EOQInputs): EOQResults {
  const { annualDemand, orderCost, holdingCost, unitCost = 0 } = inputs;
  
  // Basic EOQ formula: sqrt(2 * Annual Demand * Order Cost / Holding Cost)
  const eoq = Math.sqrt((2 * annualDemand * orderCost) / holdingCost);
  
  // Order cycles per year = Annual demand / EOQ
  const orderCyclesPerYear = annualDemand / eoq;
  
  // Days between orders = Working days / Order cycles
  const daysBetweenOrders = 365 / orderCyclesPerYear;
  
  // Annual holding cost = (EOQ / 2) * holding cost
  const annualHoldingCost = (eoq / 2) * holdingCost;
  
  // Annual order cost = Annual demand / EOQ * order cost
  const annualOrderCost = (annualDemand / eoq) * orderCost;
  
  // Total annual cost = Annual holding cost + Annual order cost
  const totalAnnualCost = annualHoldingCost + annualOrderCost;
  
  // Total inventory cost including unit cost
  const totalInventoryCost = totalAnnualCost + (annualDemand * unitCost);
  
  return {
    eoq: Math.round(eoq * 100) / 100,
    totalAnnualCost: Math.round(totalAnnualCost * 100) / 100,
    orderCyclesPerYear: Math.round(orderCyclesPerYear * 100) / 100,
    daysBetweenOrders: Math.round(daysBetweenOrders * 100) / 100,
    annualHoldingCost: Math.round(annualHoldingCost * 100) / 100,
    annualOrderCost: Math.round(annualOrderCost * 100) / 100,
    totalInventoryCost: Math.round(totalInventoryCost * 100) / 100
  };
}

/**
 * Generates cost data points for the EOQ chart
 */
export function generateEOQCostData(inputs: EOQInputs) {
  const { annualDemand, orderCost, holdingCost } = inputs;
  const optimalEOQ = Math.sqrt((2 * annualDemand * orderCost) / holdingCost);
  
  // Generate data points for quantities around the optimal EOQ
  const dataPoints = [];
  const min = Math.max(optimalEOQ * 0.2, 1); // Min 20% of optimal or 1
  const max = optimalEOQ * 2; // Max 200% of optimal
  
  // Create 20 data points
  for (let i = 0; i < 20; i++) {
    const orderQuantity = min + (i * (max - min) / 19);
    
    // Calculate costs for this quantity
    const holdingCostAtQ = (orderQuantity / 2) * holdingCost;
    const orderCostAtQ = (annualDemand / orderQuantity) * orderCost;
    const totalCostAtQ = holdingCostAtQ + orderCostAtQ;
    
    dataPoints.push({
      orderQuantity: Math.round(orderQuantity * 10) / 10,
      holdingCost: Math.round(holdingCostAtQ * 100) / 100,
      orderCost: Math.round(orderCostAtQ * 100) / 100,
      totalCost: Math.round(totalCostAtQ * 100) / 100,
    });
  }
  
  return dataPoints;
}

/**
 * Formats a number as Indian Rupees
 */
export function formatIndianRupees(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
}
