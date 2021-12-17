import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import ApexChart from "react-apexcharts";
import {
  apexLineChartDefaultOption,
  apexBarChartDefaultOption,
  apexAreaChartDefaultOption,
} from "@common/constants/ChartConstant";
import ReactResizeDetector from "react-resize-detector";

const titleStyle = {
  position: "absolute",
  zIndex: "1",
};

const extraStyle = {
  position: "absolute",
  zIndex: "1",
  right: "0",
  top: "-2px",
};

const getChartTypeDefaultOption = (type: any) => {
  switch (type) {
    case "line":
      return apexLineChartDefaultOption;
    case "bar":
      return apexBarChartDefaultOption;
    case "area":
      return apexAreaChartDefaultOption;
    default:
      return apexLineChartDefaultOption;
  }
};

interface IChartWidget {
  title?: any;
  series?: any;
  xAxis?: any;
  customOptions?: object;
  width?: string | number;
  height?: string | number;
  card?: boolean;
  type?: string;
  extra?: any;
  bodyClass?: string;
  direction: string;
}

const ChartWidget: React.FC<IChartWidget> = ({
  series = [],
  height = 300,
  width = "100%",
  card = true,
  type = "line",
  title,
  xAxis,
  customOptions,
  extra,
  direction,
  bodyClass,
}: any) => {
  let options: any = getChartTypeDefaultOption(type);
  const isMobile = window.innerWidth < 768;
  const setLegendOffset = () => {
    if (chartRef.current) {
      const lengend = chartRef.current.querySelectorAll(
        "div.apexcharts-legend"
      )[0];
      lengend.style.marginRight = `${
        isMobile ? 0 : extraRef.current?.offsetWidth
      }px`;
      if (direction === "ltr") {
        lengend.style.right = "auto";
        lengend.style.left = "0";
      }
      if (isMobile) {
        lengend.style.position = "relative";
        lengend.style.top = 0;
        lengend.style.justifyContent = "start";
        lengend.style.padding = 0;
      }
    }
  };

  useEffect(() => {
    setLegendOffset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const extraRef = useRef<any>(null);
  const chartRef = useRef<any>();

  options.xaxis.categories = xAxis;
  if (customOptions) {
    options = { ...options, ...customOptions };
  }

  const onResize: any = () => {
    setTimeout(() => {
      setLegendOffset();
    }, 600);
  };

  const renderChart = () => (
    <ReactResizeDetector onResize={onResize()}>
      <div
        style={direction === "ltr" ? { direction: "ltr" } : {}}
        className="chartRef"
        ref={chartRef}
      >
        <ApexChart
          options={options}
          type={type}
          series={series}
          width={width}
          height={height}
        />
      </div>
    </ReactResizeDetector>
  );

  return (
    <>
      {card ? (
        <Card>
          <div className={`position-relative ${bodyClass}`}>
            {(
              <div style={!isMobile ? titleStyle : ({} as any)}>{title}</div>
            ) && (
              <h4
                className="font-weight-bold"
                style={!isMobile ? titleStyle : ({} as any)}
              >
                {title}
              </h4>
            )}
            {extra && (
              <div ref={extraRef} style={!isMobile ? extraStyle : ({} as any)}>
                {extra}
              </div>
            )}
            {renderChart()}
          </div>
        </Card>
      ) : (
        renderChart()
      )}
    </>
  );
};

export default ChartWidget;
