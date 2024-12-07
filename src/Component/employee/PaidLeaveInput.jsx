import React, { useState } from "react";

const PaidLeaveInput = ({ totalPaidLeaves, handlePaidLeavesChange }) => {
  const incrementLeave = () => {
    handlePaidLeavesChange(totalPaidLeaves + 0.5);
  };

  const decrementLeave = () => {
    if (totalPaidLeaves > 0) {
      handlePaidLeavesChange(totalPaidLeaves - 0.5);
    }
  };

  return (
    <div className="leave-input d-inline-block">
      <button className="leave-input-btn" onClick={decrementLeave}>-</button>
      <input type="text" className="leave-input-field" value={totalPaidLeaves.toFixed(1)} readOnly />
      <button className="leave-input-btn" onClick={incrementLeave}>+</button>
    </div>
  );
};

export default PaidLeaveInput;
