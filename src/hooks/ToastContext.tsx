import React, { useState, useContext, useCallback } from 'react';

import { Children } from '@/types/types';

type ToastContextState = {
  addToastMessage: (text: string, error?: boolean) => void;
  textsState: {
    text: string;
    show: boolean;
    type: 'success' | 'error';
    timeStamp: number;
  }[];
};
const ToastContext = React.createContext<ToastContextState | undefined>(undefined);

export const ToastProvider: React.FC<Children> = ({ children }) => {
  const [textsState, setTextsState] = useState<
    {
      text: string;
      show: boolean;
      type: 'success' | 'error';
      timeStamp: number;
    }[]
  >([
    {
      text: '',
      show: false,
      type: 'success',
      timeStamp: 0,
    },
    {
      text: '',
      show: false,
      type: 'success',
      timeStamp: 0,
    },
    {
      text: '',
      show: false,
      type: 'success',
      timeStamp: 0,
    },
    {
      text: '',
      show: false,
      type: 'success',
      timeStamp: 0,
    },
    {
      text: '',
      show: false,
      type: 'success',
      timeStamp: 0,
    },
  ]);

  const addToastMessage = useCallback((text: string, error: boolean | undefined) => {
    const timeStamp = new Date().getTime();
    setTextsState((prev) => {
      const updatedState = prev.slice();
      const indexToUpdate = updatedState.findIndex((state) => !state.show);
      if (indexToUpdate !== -1) {
        updatedState[indexToUpdate] = {
          text: text,
          show: true,
          type: error ? 'error' : 'success',
          timeStamp: timeStamp,
        };
      } else {
        updatedState.shift();
        updatedState.push({
          text: text,
          show: true,
          type: error ? 'error' : 'success',
          timeStamp: timeStamp,
        });
      }

      return updatedState;
    });

    const timer = setTimeout(() => {
      setTextsState((prev) => {
        const updatedState = prev.slice();
        const indexToUpdate = updatedState.findIndex((state) => state.timeStamp === timeStamp);
        if (indexToUpdate !== -1) {
          updatedState[indexToUpdate] = {
            ...updatedState[indexToUpdate],
            show: false,
          };
        }

        return updatedState;
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return <ToastContext.Provider value={{ addToastMessage, textsState }}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
