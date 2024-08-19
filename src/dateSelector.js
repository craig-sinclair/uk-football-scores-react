import React, { useState } from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./dateSelector.css";

import ArrowLeftIcon from './components/arrowLeft';
import ArrowRightIcon from './components/arrowRight';
import DropDownIcon from './components/dropDown';

function DateSelector({ onDateChange }) {
    const formatDate = (date) => {
        if (!(date instanceof Date)) {
            date = new Date(date); 
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; 
    };

    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handlePreviousDay = () => {
        const prevDay = new Date(selectedDate); 
        prevDay.setDate(prevDay.getDate() - 1);
        const formattedDate = formatDate(prevDay);
        setSelectedDate(formattedDate);
        onDateChange(formattedDate);
    };

    const handleNextDay = () => {
        const nextDay = new Date(selectedDate); 
        nextDay.setDate(nextDay.getDate() + 1);
        const formattedDate = formatDate(nextDay);
        setSelectedDate(formattedDate);
        onDateChange(formattedDate);
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleDateChange = (date) => {
        if (date) {
            const formattedDate = formatDate(date); 
            setSelectedDate(formattedDate);
            setShowDatePicker(false);
            onDateChange(formattedDate);
        }
    };

    const closeModal = () => {
        setShowDatePicker(false);
    };

    return (
        <div className="date-selector-div">
            <ArrowLeftIcon className="svg-hover" onClick={handlePreviousDay} />
            <div className="center-date-selection-div">
                <h2>{new Date(selectedDate + 'T00:00:00').toDateString()}</h2> {/* Ensures local time is respected */}
                <DropDownIcon className="svg-hover-small-margin" onClick={toggleDatePicker} />
            </div>
            <ArrowRightIcon className="svg-hover" onClick={handleNextDay} />

            {showDatePicker && (
                <div className="modal-background" onClick={closeModal}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <DayPicker
                            mode="single"
                            selected={new Date(selectedDate)} 
                            onSelect={handleDateChange}
                            initialFocus
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DateSelector;
