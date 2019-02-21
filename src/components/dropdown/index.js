import React  from 'react';


export const Dropdown = () => (
  <div class="custom-select" style={{ width: "200px" }}>
    <select>
      <option value="0">Select currency:</option>
      <option value="1">EUR</option>
      <option value="2">BGN</option>
      <option value="3">GBP</option>
    </select>
  </div>
);
