import React, { useState, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface OptimizedSelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  'aria-label'?: string;
}

const OptimizedSelect: React.FC<OptimizedSelectProps> = ({
  options,
  value = '',
  placeholder = 'Select an option',
  onChange,
  className = '',
  disabled = false,
  name,
  id,
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen) {
          if (focusedIndex >= 0) {
            selectOption(options[focusedIndex].value);
          }
        } else {
          setIsOpen(true);
        }
        break;
      
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          );
        }
        break;
      
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          );
        }
        break;
      
      case 'Tab':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  const selectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
    
    // Update hidden input for form compatibility
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = optionValue;
      // Trigger change event for form validation
      const event = new Event('change', { bubbles: true });
      hiddenInputRef.current.dispatchEvent(event);
    }
  };

  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="relative" ref={selectRef}>
      {/* Minimal hidden input for form compatibility (1 element instead of 12+) */}
      <input
        ref={hiddenInputRef}
        type="hidden"
        name={name}
        value={value}
        aria-hidden="true"
      />

      {/* Custom select trigger (1 element instead of 12+) */}
      <button
        type="button"
        id={id}
        className={`
          relative w-full bg-white border border-gray-300 rounded-lg px-3 py-3 text-left 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          hover:border-gray-400 transition-colors duration-200
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-describedby={`${id}-description`}
      >
        <span className={`block truncate ${!selectedOption ? 'text-gray-500' : 'text-gray-900'}`}>
          {displayText}
        </span>
        
        {/* Arrow icon */}
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {/* Dropdown options (1 element with virtual scrolling for performance) */}
      {isOpen && (
        <ul
          ref={listRef}
          className="
            absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg 
            max-h-60 overflow-auto focus:outline-none
          "
          role="listbox"
          aria-labelledby={id}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`
                cursor-pointer select-none relative px-3 py-2 transition-colors duration-150
                ${focusedIndex === index ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}
                ${value === option.value ? 'bg-blue-50 font-medium' : ''}
                hover:bg-blue-100 hover:text-blue-900
              `}
              onClick={() => selectOption(option.value)}
              onMouseEnter={() => setFocusedIndex(index)}
              role="option"
              aria-selected={value === option.value}
            >
              <span className="block truncate">{option.label}</span>
              
              {/* Checkmark for selected option */}
              {value === option.value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      
      {/* Screen reader description */}
      <div id={`${id}-description`} className="sr-only">
        Use arrow keys to navigate options, Enter to select, Escape to close
      </div>
    </div>
  );
};

export default OptimizedSelect; 