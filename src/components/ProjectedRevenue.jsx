import React from 'react';

const ProjectedRevenue = ({ projections }) => {
  const maxGrowth = Math.max(...projections.map(p => p.growthAmount));
  
  // renders table of 4 cols...
  return (
    <div className="projected-revenue">
      <h2>Projected Revenue</h2>
      <table>

        <thead>
          <tr>
            <th>Year</th>
            <th>Revenue ($)</th>
            <th>Growth ($)</th>
            <th>Growth (%)</th>
          </tr>
        </thead>

        <tbody>
          {projections.map((projection) => (
            <tr 
              key={projection.year}
              className={projection.growthAmount === maxGrowth ? 'highlight' : ''}
            >
              <td>{projection.year}</td>
              <td>${projection.revenue.toFixed(2)}</td>
              <td>${projection.growthAmount.toFixed(2)}</td>
              <td>{projection.growthPercentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>

      </table>
      
    </div>
  );
};

export default ProjectedRevenue;
