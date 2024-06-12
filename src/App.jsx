// src/App.jsx

import React, { useState } from 'react';
import IconPicker from './IconPicker';
import * as FiIcons from 'react-icons/fi'; // Import all Feather icons

const App = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  return (
    <div style={{}}>
      <IconPicker
        rowsInOnePage={3}
        columnsInOnePage={4}
        iconHeight={40}
        iconWidth={40}
        pickerHeight={400}
        pickerWidth={400}
        onSelectIcon={(icon) => setSelectedIcon(icon)}
      />
      {selectedIcon && (
        <div style={{ marginTop: '20px' }}>
          <p>Selected Icon:</p>
          {React.createElement(FiIcons[selectedIcon], { size: 100 })}
        </div>
      )}
    </div>
  );
};

export default App;
