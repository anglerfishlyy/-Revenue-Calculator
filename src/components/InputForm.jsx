import React from 'react';

// InputForm component  handling  inputs 
const InputForm = ({ 
    currentRevenue, 
    growthRate, 
    setCurrentRevenue, 
    setGrowthRate, 
    onCalculate 
}) => {

  return (
    <div className="input-form">
      <h2>Enter Revenue Details</h2>
      {/* Input field for current revenue */}
      <div className="form-group">
        <label htmlFor="currentRevenue">Current Revenue ($)</label>
            <input
            type="number"
            id="currentRevenue"
            value={currentRevenue}
            onChange={(e) => setCurrentRevenue(e.target.value)}
            placeholder="Enter current revenue"
            />
            <input
            type="range"
            min="0"
            max="100"
            value={currentRevenue}
            onChange={(e) => setCurrentRevenue(e.target.value)}
            />
      </div>
      
      {/* Input fields , includes both number and range inputs ...up and down*/}

      <div className="form-group">
        <label htmlFor="growthRate">Annual Growth Rate (%)</label>
            <input
            type="number"
            id="growthRate"
            value={growthRate}
            onChange={(e) => setGrowthRate(e.target.value)}
            placeholder="Enter growth rate"
            />
            <input
            type="range"
            min="0"
            max="100"
            value={growthRate}
            onChange={(e) => setGrowthRate(e.target.value)}
            />
      </div>

      {/* Button for calculation */}
       <button onClick={onCalculate} className="calculate-btn">
          Calculate Projections
        </button>

    </div>
  );
};

export default InputForm;
