import React, { useState, useRef, useEffect, ComponentType } from 'react';
import { Category, CustomSelectProps } from '../../types/types.d';
import './custom.select.scss';

type IconComponentType = ComponentType<{ className?: string }> | undefined;

const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    disabled = false,
    width = '300px'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        if (!disabled) setIsOpen(!isOpen);
    };

    const handleSelect = (option: Category) => {
        onChange(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderIcon = (IconComponent: IconComponentType) => {
        if (!IconComponent) return null;
        return <IconComponent className="select-icon" />;
    };

    return (
        <div className="custom-select" style={{ width }} ref={selectRef}>
            <div
                className={`custom-select__header ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
                onClick={handleToggle}
            >
                {value ? (
                    <div className="custom-select__selected">
                        <span className="custom-select__selected-icon">
                            {renderIcon(value.icon as IconComponentType)}
                        </span>
                        <span className="custom-select__selected-text">{value.name}</span>
                    </div>
                ) : (
                    <span className="custom-select__placeholder">{placeholder}</span>
                )}
                <span className="custom-select__arrow">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="#2E7DF6" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </span>
            </div>
            {isOpen && (
                <div className="custom-select__options">
                    {options.map(option => (
                        <div
                            key={option.id}
                            className={`custom-select__option ${value?.id === option.id ? 'selected' : ''}`}
                            onClick={() => handleSelect(option)}
                        >

                            <span className="custom-select__option-text">{option.name}</span>
                            <span className="custom-select__option-icon">
                                {renderIcon(option.icon as IconComponentType)}
                            </span>
                            {value?.id === option.id && (
                                <span className="custom-select__tick">
                                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                        <path d="M1 5L4 8L11 1" stroke="#2E7DF6" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;