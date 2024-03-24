import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';

const MoodBoard = () => {
  const [selectedColors, setSelectedColors] = useState(['#000000', '#000000', '#000000']);
  const [colorLocked, setColorLocked] = useState([false, false, false]);
  const [colorPickerOpen, setColorPickerOpen] = useState([false, false, false]);

  const handleColorChange = (index, color) => {
    const newColors = [...selectedColors];
    newColors[index] = color.hex;
    setSelectedColors(newColors);
  };

  const handleLockColor = (index) => {
    const newLockState = [...colorLocked];
    newLockState[index] = !newLockState[index];
    setColorLocked(newLockState);
  };

  const handleToggleColorPicker = (index) => {
    if (!colorLocked[index]) {
      const newPickerState = colorPickerOpen.map((value, idx) => idx === index ? !value : false);
      setColorPickerOpen(newPickerState);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.chrome-picker')) {
        setColorPickerOpen([false, false, false]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyColorCode = (color) => {
    navigator.clipboard.writeText(color);
    alert(`Color code "${color}" copied to clipboard!`);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* First Row */}
      <div className="flex-1 text-white flex">
        {/* First Column - Color Picker */}
        <div className="w-full p-4 flex items-center justify-center">
          <div className="flex">
            {[0, 1, 2].map((index) => (
              <div key={index} className="relative">
                <div
                  className="bg-gray-300 w-20 h-20 rounded cursor-pointer mr-4"
                  style={{ backgroundColor: selectedColors[index] }}
                  onClick={() => {
                    if (colorLocked[index]) {
                      handleCopyColorCode(selectedColors[index]);
                    } else {
                      handleToggleColorPicker(index);
                    }
                  }}
                ></div>
                {colorPickerOpen[index] && (
                  <div className="absolute top-0 left-0 mt-8">
                    <ChromePicker color={selectedColors[index]} onChange={(color) => handleColorChange(index, color)} />
                  </div>
                )}
                <button onClick={() => handleLockColor(index)} className={`absolute bottom-0 left-0 bg-${colorLocked[index] ? 'red-900' : 'green'}-500 text-white px-2 py-1 rounded-lg`}>{colorLocked[index] ? '🔒' : '🔓'}</button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-2/3 p-4 flex items-center justify-center">
          First Row Text Content
        </div>
      </div>
      
{/* Second Row */}
<div className="flex-1 text-white flex">
        {/* Photos in Second Row */}
        {[1, 2, 3].map((photo) => (
          <div key={photo} className="flex-1 p-4 flex items-center justify-center">
            <img src={`https://via.placeholder.com/150/FF0000/FFFFFF?text=Photo${photo}`} alt={`Photo ${photo}`} />
          </div>
        ))}
        
      </div>      {/* Continue with your layout as needed */}
    </div>
  );
};

export default MoodBoard;
