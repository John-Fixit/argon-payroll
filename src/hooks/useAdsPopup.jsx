import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

// Zustand store for managing popup state
const useAdPopupStore = create(persist((set, get) => ({
  // State
  showPopup: false,
  visitCount: 0,
  hasShownOnLogin: false,
  isInitialized: false, // Prevent double initialization
  
  // Actions
  setShowPopup: (show) => set({ showPopup: show }),
  
  handleHomePageVisit: () => {
    const { hasShownOnLogin, visitCount, isInitialized, showPopup } = get();
    
    // Prevent double execution in React Strict Mode
    if (isInitialized) {
    //   console.log('Already initialized this session, skipping...');
      return;
    }
    
    // If popup is already showing (from login), don't interfere
    if (showPopup) {
    //   console.log('🚫 Popup already showing (from login), not counting this visit');
      set({ isInitialized: true });
      return;
    }
    
    const newCount = visitCount + 1;
    // console.log(`Visit count updated: ${visitCount} → ${newCount}`);
    // console.log(`Has shown login popup: ${hasShownOnLogin}`);
    
    // Check if should show popup (every 4th visit after login)
    const shouldShow = hasShownOnLogin && newCount % 4 === 0;
    
    if (shouldShow) {
      console.log('✅ Showing popup on visit', newCount);
    } else if (!hasShownOnLogin) {
    //   console.log('❌ No popup - user hasn\'t logged in yet');
    } else {
    //   console.log(`❌ No popup - need ${4 - (newCount % 4)} more visits`);
    }
    
    set({ 
      visitCount: newCount ,
      showPopup: shouldShow,
      isInitialized: true
    });
  },
  
  resetInitialization: () => {
    set({ isInitialized: false });
  },
  
  handleLogin: () => {
    console.log('🔑 Login triggered - showing popup and resetting count');
    set({ 
      showPopup: true, 
      hasShownOnLogin: true,
      visitCount: 0,
      isInitialized: false
    });
  },
  
  handleLogout: () => {
    console.log('🚪 Logout triggered - resetting all state');
    set({ 
      visitCount: 0,
      hasShownOnLogin: false,
      showPopup: false,
      isInitialized: false
    });
  },
  
  closePopup: () => {
    console.log('❌ Popup closed - resetting visit count to 0');
    set({ 
      showPopup: false, 
      visitCount: 0,
      isInitialized: false // Allow new counting cycle
    });
  }
}) ,
    {
      name: 'communeety-440-ads',
      storage: createJSONStorage(() => localStorage), 
    },

));


export default useAdPopupStore