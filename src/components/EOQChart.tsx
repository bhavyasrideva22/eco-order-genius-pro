
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { formatIndianRupees } from "../utils/eoqCalculator";

interface EOQChartProps {
  data: any[];
  eoq: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-eco-secondary rounded shadow-lg">
        <p className="font-medium text-eco-primary">
          Order Quantity: {label} units
        </p>
        <p className="text-eco-primary">
          Total Cost: {formatIndianRupees(payload[0].value)}
        </p>
        <p className="text-eco-secondary">
          Holding Cost: {formatIndianRupees(payload[1].value)}
        </p>
        <p className="text-eco-accent">
          Ordering Cost: {formatIndianRupees(payload[2].value)}
        </p>
      </div>
    );
  }
  return null;
};

const EOQChart: React.FC<EOQChartProps> = ({ data, eoq }) => {
  return (
    <div className="h-[400px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="orderQuantity"
            label={{
              value: "Order Quantity (units)",
              position: "insideBottomRight",
              offset: -10,
            }}
          />
          <YAxis
            label={{
              value: "Cost (₹)",
              angle: -90,
              position: "insideLeft",
            }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine
            x={eoq}
            stroke="#245e4f"
            strokeWidth={2}
            strokeDasharray="3 3"
            label={{
              value: `EOQ: ${eoq}`,
              position: "top",
              fill: "#245e4f",
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="totalCost"
            name="Total Cost"
            stroke="#245e4f"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="holdingCost"
            name="Holding Cost"
            stroke="#7ac9a7"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="orderCost"
            name="Ordering Cost"
            stroke="#e9c46a"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EOQChart;
