import React, { useEffect, useState } from 'react';
import './Tank.css';
import axios from 'axios';
import { environment } from '../../environment/environment';
const Tank: React.FC<{ percentage: number }> = ({ percentage }) => {
  const waterStyle = {
    height: `${percentage}%`
  };

  return (
    <div className="tank-container">
      <div className="tank">
        <div className="water" style={waterStyle}></div>
      </div>
      <div className="percentage-label">{percentage}%</div>
    </div>
  );
};

const Tanks: React.FC = () => {
  const [waterPercent, setWaterPercent] = useState(0);
  const apiUrl=environment.apiUrl;
  useEffect(() => {
    axios.get(`${apiUrl}/sensor/percentoh`)
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          // Ensure data exists before destructure
          const { waterpercent} = response.data[0];

          setWaterPercent(waterpercent);
        } else {
          console.error('Invalid response format or empty data');
        }
      })
      .catch(error => {
        console.error('Error fetching single value:', error);
      });
  }, []);

  return (
    <div>
      {waterPercent !== null ? (
        <Tank percentage={waterPercent} />
      ) : (
        <p>Loading water level...</p>
      )}
    </div>
  );
};

export default Tanks;

