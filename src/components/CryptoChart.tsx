import React, { useState } from "react";
import styled from "styled-components";
import { CirclePlus, Maximize2, X } from "lucide-react";
import { Chart } from "./Chart";
import { calculatePriceInfo } from "../utils/CalculatePriceInfo";
import chartData from "../data/chartData.json";

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: white;
`;

const PriceDisplay = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #202124;
`;

const Currency = styled.span`
  font-size: 16px;
  color: #70757a;
  margin-left: 5px;
`;

const ChangeDisplay = styled.div`
  font-size: 14px;
  color: #137333;
  margin-top: 5px;
`;

const NavBar = styled.div`
  display: flex;
  margin-top: 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const NavItem = styled.span<{ active?: boolean }>`
  padding: 10px 15px;
  color: ${(props) => (props.active ? "#1a73e8" : "#5f6368")};
  border-bottom: ${(props) => (props.active ? "2px solid #1a73e8" : "none")};
  cursor: pointer;
  font-size: 14px;
`;

const ChartControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #5f6368;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #f1f3f4;
  }
`;

const TimeFrames = styled.div`
  display: flex;
`;

const TimeFrame = styled(Button)<{ active?: boolean }>`
  color: ${(props) => (props.active ? "white" : "#5f6368")};
  background-color: ${(props) => (props.active ? "#4c6fff" : "transparent")};
  border-radius: 4px;
  margin-left: 5px;
`;

const ChartContainer = styled.div`
  height: 400px;
  margin-top: 30px;
`;

const FullscreenDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #5f6368;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e8eaed;
  }
`;

const DialogContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ChartWrapper = styled.div`
  flex: 1;
  min-height: 0;
`;

const CryptoChart: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTimeFrame, setActiveTimeFrame] = useState("1w");

  const getChartData = () => {
    switch (activeTimeFrame) {
      case "1d":
        return chartData.oneDayData;
      case "3d":
        return chartData.threeDayData;
      case "1w":
        return chartData.oneWeekData;
      case "6m":
        return chartData.sixMonthData;
      case "1y":
        return chartData.oneYearData;
      case "max":
        return chartData.maxData;
      default:
        return chartData.oneWeekData;
    }
  };
  const handleTimeFrameClick = (timeFrame: string) => {
    setActiveTimeFrame(timeFrame);
  };

  const newChartData = getChartData();
  const { currentPrice, change, changePercentage } =
    calculatePriceInfo(newChartData);
  const isPositiveChange = parseFloat(change) >= 0;

  return (
    <Container>
      <PriceDisplay>
        {currentPrice}
        <Currency>USD</Currency>
      </PriceDisplay>
      <ChangeDisplay
        style={{ color: isPositiveChange ? "#137333" : "#d93025" }}
      >
        {isPositiveChange ? "+" : ""}
        {change} ({changePercentage}%)
      </ChangeDisplay>
      <NavBar>
        <NavItem>Summary</NavItem>
        <NavItem active>Chart</NavItem>
        <NavItem>Statistics</NavItem>
        <NavItem>Analysis</NavItem>
        <NavItem>Settings</NavItem>
      </NavBar>

      <ChartControls>
        <div className="flex gap-1">
          <Button onClick={() => setIsFullscreen(true)}>
            <Maximize2 size={16} /> Fullscreen
          </Button>
          <Button>
            <CirclePlus size={16} /> Compare
          </Button>
        </div>
        <TimeFrames>
          {["1d", "3d", "1w", "1m", "6m", "1y", "max"].map((timeFrame) => (
            <TimeFrame
              key={timeFrame}
              active={activeTimeFrame === timeFrame}
              onClick={() => handleTimeFrameClick(timeFrame)}
            >
              {timeFrame}
            </TimeFrame>
          ))}
        </TimeFrames>
      </ChartControls>

      <ChartContainer>
        <Chart data={getChartData()} />
      </ChartContainer>

      {isFullscreen && (
        <FullscreenDialog>
          <DialogHeader>
            <CloseButton onClick={() => setIsFullscreen(false)}>
              <X size={24} />
            </CloseButton>
          </DialogHeader>
          <DialogContent>
            <ChartWrapper>
              <Chart data={getChartData()} />
            </ChartWrapper>
          </DialogContent>
        </FullscreenDialog>
      )}
    </Container>
  );
};

export default CryptoChart;
