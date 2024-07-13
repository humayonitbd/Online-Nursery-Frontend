

import { useEffect } from 'react';

const useUnloadPrompt = (cartItem:any[]) => {
  useEffect(() => {
    const handleBeforeUnload = (event:BeforeUnloadEvent) => {
      if (cartItem.length > 0) {
        //  event.preventDefault();
        const message = "You have items in your cart. Do you really want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cartItem]);
};

export default useUnloadPrompt;
