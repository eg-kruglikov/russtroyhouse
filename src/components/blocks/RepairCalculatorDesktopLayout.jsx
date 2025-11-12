import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const RepairCalculatorDesktopLayout = forwardRef(
  (
    {
      labels,
      sections,
      squareSlider,
      priceBlock,
      containerStyle,
      columnStyle,
      labelStyle,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
          ...containerStyle,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "24px",
            alignItems: "flex-start",
          }}
        >
          {sections.map((section, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ ...labelStyle }}>{labels[index]}</div>
              <div
                style={{
                  height: "1px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  margin: "12px 0",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  ...columnStyle,
                }}
              >
                {section}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "24px",
          }}
        >
          <div>{squareSlider}</div>
          <div>{priceBlock}</div>
        </div>
      </div>
    );
  }
);

RepairCalculatorDesktopLayout.displayName = "RepairCalculatorDesktopLayout";

RepairCalculatorDesktopLayout.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.node).isRequired,
  sections: PropTypes.arrayOf(PropTypes.node).isRequired,
  squareSlider: PropTypes.node.isRequired,
  priceBlock: PropTypes.node.isRequired,
  containerStyle: PropTypes.object,
  columnStyle: PropTypes.object,
  labelStyle: PropTypes.object,
};

RepairCalculatorDesktopLayout.defaultProps = {
  containerStyle: {},
  columnStyle: {},
  labelStyle: {},
};

export default RepairCalculatorDesktopLayout;
