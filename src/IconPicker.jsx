import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi'; 
import { IconContext } from 'react-icons'; 
import './IconPicker.css'; 

const IconPicker = ({
  rowsInOnePage = 4,
  columnsInOnePage = 5,
  iconHeight = 60, 
  iconWidth = 60,
  pickerHeight = 600, 
  pickerWidth = 600,
  onSelectIcon,
}) => {
  const icons = Object.keys(FiIcons);
  const iconsPerPage = rowsInOnePage * columnsInOnePage;
  const [currentPage, setCurrentPage] = useState(0);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handlePageChange = (direction) => {
    if (direction === 'next' && (currentPage + 1) * iconsPerPage < icons.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    onSelectIcon(icon); 
    setIsPickerOpen(false); 
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-900">
      {}
      <div
        className="icon-trigger w-32 h-32 border-4 border-gray-600 flex justify-center items-center cursor-pointer rounded-lg hover:border-blue-400"
        onClick={() => setIsPickerOpen(!isPickerOpen)}
      >
        {selectedIcon ? React.createElement(FiIcons[selectedIcon], { size: 60, color: 'white' }) : <span className="text-white">Select Icon</span>}
      </div>

      {}
      {isPickerOpen && (
        <div
          className="icon-picker fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-800 border-2 border-gray-700 shadow-lg rounded-lg z-50"
          style={{ width: pickerWidth, height: pickerHeight }}
        >
          <div className="icon-picker-header flex justify-between items-center p-4 border-b-2 border-gray-600 text-white">
            <h4 className="text-xl font-bold">Select an Icon</h4>
            <button onClick={() => setIsPickerOpen(false)} className="text-2xl font-bold">✕</button>
          </div>
          <div
            className="icon-grid grid p-4 gap-4 text-white"
            style={{
              gridTemplateRows: `repeat(${rowsInOnePage}, minmax(0, 1fr))`,
              gridTemplateColumns: `repeat(${columnsInOnePage}, minmax(0, 1fr))`,
            }}
          >
            {icons.slice(currentPage * iconsPerPage, (currentPage + 1) * iconsPerPage).map((icon, index) => {
              const IconComponent = FiIcons[icon];
              return (
                <div
                  key={index}
                  className="icon-item flex justify-center items-center p-2 rounded-lg hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleIconClick(icon)}
                >
                  <IconContext.Provider value={{ size: iconHeight, color: 'white' }}>
                    <IconComponent />
                  </IconContext.Provider>
                </div>
              );
            })}
          </div>
          <div className="icon-picker-footer flex justify-between items-center p-4 border-t-2 border-gray-600 text-white">
            <button
              onClick={() => handlePageChange('prev')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-500"
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <span className="text-sm">
              Page {currentPage + 1} of {Math.ceil(icons.length / iconsPerPage)}
            </span>
            <button
              onClick={() => handlePageChange('next')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-500"
              disabled={(currentPage + 1) * iconsPerPage >= icons.length}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconPicker;
