import React, { useState } from 'react';
import InputForm from './InputForm';
import ProjectedRevenue from './ProjectedRevenue';
import RevenueSummary from './RevenueSummary';
import Chart from './Chart';


const RevenueCalculator = () => {
    const [currentRevenue, setCurrentRevenue] = useState('');
    const [growthRate, setGrowthRate] = useState('');
    const [projections, setProjections] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

  const calculateProjections = () => {
    setError('');
    setSuccess('');

    // will check if all inputs are filled
    if (!currentRevenue || !growthRate) {
      setError('Please fill in all fields');
      return;
    }

    const revenue = parseFloat(currentRevenue);
    const growth = parseFloat(growthRate);

    if (revenue <= 0 || growth < 0) {
      setError('Please enter valid positive numbers');
      return;
    }

    // Calculating projections on yearly basiss
    const yearlyProjections = [];
    let currentYear = new Date().getFullYear();
    let previousRevenue = revenue;
    let totalRevenue = revenue;
    let totalGrowth = 0;

   //looping through 5 years
    for (let i = 1; i <= 5; i++) {
      const projectedRevenue = previousRevenue * (1 + growth / 100);
      const yearGrowth = ((projectedRevenue - previousRevenue) / previousRevenue) * 100;
      
      yearlyProjections.push({
        year: currentYear + i,
        revenue: projectedRevenue,
        growthAmount: projectedRevenue - previousRevenue,
        growthPercentage: yearGrowth
       });

           totalRevenue += projectedRevenue;
           totalGrowth += yearGrowth;
           previousRevenue = projectedRevenue;
    }

    const averageGrowth = totalGrowth / 5;

    setProjections({
        yearly: yearlyProjections,
        total: totalRevenue,
        averageGrowth: averageGrowth
    });

    setSuccess('Calculations completed successfully!');
  };

    const downloadCSV = () => {
   if (!projections) return;

     const headers = ['Year,Revenue,Growth Amount,Growth Percentage\n'];
     const rows = projections.yearly.map(p => 
      `${p.year},${p.revenue.toFixed(2)},${p.growthAmount.toFixed(2)},${p.growthPercentage.toFixed(2)}%\n`
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + headers.concat(rows).join('');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'revenue_projections.csv');
     document.body.appendChild(link);
    link.click();
     document.body.removeChild(link);
  };

   return (
    <div className="calculator-container">
            <h1>Revenue Calculator</h1>
      
      <div className="bento-grid">
           <div className="bento-item input-section">
          <InputForm 
            currentRevenue={currentRevenue}
            growthRate={growthRate}
            setCurrentRevenue={setCurrentRevenue}
            setGrowthRate={setGrowthRate}
            onCalculate={calculateProjections}
          />
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </div>

        {projections && (
          <>
            <div className="bento-item projections-section">
              <ProjectedRevenue projections={projections.yearly} />
            </div>

            <div className="bento-item summary-section">
              <RevenueSummary 
                total={projections.total} 
                averageGrowth={projections.averageGrowth} 
                onDownload={downloadCSV}
              />
            </div>

            <div className="bento-item chart-section">
              <Chart projections={projections.yearly} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RevenueCalculator;
