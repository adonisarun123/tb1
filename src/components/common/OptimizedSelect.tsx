import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface OptimizedSelectProps {
  options: Option[] | string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  'aria-describedby'?: string;
  error?: string;
}

const OptimizedSelect: React.FC<OptimizedSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  id,
  name,
  'aria-describedby': ariaDescribedBy,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Convert string array to Option array
  const normalizedOptions: Option[] = options.map(option => 
    typeof option === 'string' 
      ? { value: option, label: option }
      : option
  );

  const selectedOption = normalizedOptions.find(option => option.value === value);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          const option = normalizedOptions[focusedIndex];
          if (!option.disabled) {
            onChange(option.value);
            setIsOpen(false);
          }
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          const nextIndex = Math.min(focusedIndex + 1, normalizedOptions.length - 1);
          setFocusedIndex(nextIndex);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          const prevIndex = Math.max(focusedIndex - 1, 0);
          setFocusedIndex(prevIndex);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  const handleOptionClick = (option: Option) => {
    if (option.disabled) return;
    onChange(option.value);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(value ? normalizedOptions.findIndex(opt => opt.value === value) : 0);
    }
  };

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

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex, isOpen]);

  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <div className="relative" ref={selectRef}>
      {/* Minimal hidden input for form submission (1 element instead of 12+) */}
      <input
        id={selectId}
        name={name}
        type="hidden"
        value={value}
        aria-hidden="true"
      />

      {/* Custom select trigger */}
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${selectId}-label`}
        aria-describedby={ariaDescribedBy || errorId}
        tabIndex={disabled ? -1 : 0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`
          relative w-full cursor-pointer bg-white border rounded-lg px-4 py-3
          transition-all duration-200 ease-in-out
          ${disabled 
            ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200' 
            : 'hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
          }
          ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
            : 'border-gray-300'
          }
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : ''}
          ${className}
        `}
      >
        <span className={`block truncate ${!selectedOption ? 'text-gray-500' : 'text-gray-900'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <FiChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </span>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby={`${selectId}-label`}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {normalizedOptions.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleOptionClick(option)}
              className={`
                relative cursor-pointer select-none px-4 py-2 transition-colors duration-150
                ${option.disabled 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-900 hover:bg-blue-50'
                }
                ${index === focusedIndex ? 'bg-blue-100' : ''}
                ${option.value === value ? 'bg-blue-50 text-blue-900' : ''}
              `}
            >
              <span className="block truncate">{option.label}</span>
              {option.value === value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-blue-600">
                  <FiCheck className="w-4 h-4" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Error message */}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default OptimizedSelect; 