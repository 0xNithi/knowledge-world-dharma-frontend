import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

// General
export { default as Button } from './components/Button';
export * from './components/Icon';

// Data Input
export { default as Input } from './components/Input';

// Overlay
export { default as Modal } from './components/Modal';

// Context
export * from './context/ThemeProvider';

// Hook
export { default as useTheme } from './hooks/useTheme';
