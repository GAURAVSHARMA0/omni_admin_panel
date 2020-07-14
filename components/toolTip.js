
import React, { useState } from "react";
import { Button, Tooltip } from "reactstrap";

const ToolTipCom = (props) => {
  const {placement, target, text} = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
      <Tooltip placement={placement} isOpen={tooltipOpen} autohide={false} target={target} toggle={toggle}>
       {text}
      </Tooltip>
  );
}

export default ToolTipCom;