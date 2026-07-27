import { useCallback } from "react";





 const useRemoveLastStaffId = () => {
    const removeLastStaffId = useCallback((url) => {
      // Pattern to match &STAFF_ID=X where X is one or more digits
      const pattern = /&STAFF_ID=\d+/g;
      
      // Find all occurrences of the pattern
      const matches = Array.from(url.matchAll(pattern));
      
      if (matches.length > 0) {
        // Get the last match
        const lastMatch = matches[matches.length - 1];
        
        // Remove the last occurrence
        return url.slice(0, lastMatch.index) + url.slice(lastMatch.index + lastMatch[0].length);
      }
      
      // If no match found, return the original string
      return url;
    }, []);
  
    return removeLastStaffId;
  };

  export default useRemoveLastStaffId