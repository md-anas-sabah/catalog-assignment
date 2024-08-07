import React from "react";
import {
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

const CustomTooltip = styled.div`
  background-color: #1a2b49;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
`;

interface ChartProps {
  height?: string | number;
  data: Array<{ date: string; price: number; volume?: number }>;
}

export const Chart: React.FC<ChartProps> = ({ height = "100%", data }) => (
  <ResponsiveContainer width="100%" height={height}>
    <ComposedChart
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <XAxis />
      <YAxis
        yAxisId="left"
        domain={["dataMin", "dataMax"]}
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#70757a", fontSize: 12 }}
      />
      <YAxis yAxisId="right" orientation="right" domain={[0, "dataMax"]} hide />
      <Tooltip
        content={({ payload, active }) => {
          if (active && payload && payload.length) {
            return <CustomTooltip>${payload[0]?.value}</CustomTooltip>;
          }
          return null;
        }}
      />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="price"
        stroke="#4c6fff"
        strokeWidth={2}
        dot={false}
        activeDot={{
          r: 8,
          fill: "#4c6fff",
          stroke: "white",
          strokeWidth: 2,
        }}
      />
    </ComposedChart>
  </ResponsiveContainer>
);
