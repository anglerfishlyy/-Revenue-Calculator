import React from 'react';

const RevenueSummary = ({ total, averageGrowth, onDownload }) => {
  return (
    <div className="revenue-summary">
        <h2>Summary</h2>
      <div className="summary-item">
         <label>Total Revenue:</label>
         <span>${total.toFixed(2)}</span>
      </div>

      <div className="summary-item">
          <label>Average Annual Growth:</label>
         <span>{averageGrowth.toFixed(2)}%</span>
      </div>

      <button onClick={onDownload} className="download-btn">
        Download CSV
      </button>
      
    </div>
  );
};

export default RevenueSummary;