// src/utils/capitalize.js

export const capitalizeWords = (str) => {
    if (!str) return '';
    return str
      .split(/[\s-_]/) // Split by space, hyphen, or underscore
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  