// Mantine Theme Configuration
// Preserves the current dark D&D design with gradients and blur effects

import { createTheme, MantineColorsTuple } from '@mantine/core';

const primaryColors: MantineColorsTuple = [
  '#eef2ff',
  '#e0e7ff',
  '#c7d2fe',
  '#a5b4fc',
  '#818cf8',
  '#6366f1',
  '#4f46e5',
  '#4338ca',
  '#3730a3',
  '#312e81',
];

const accentColors: MantineColorsTuple = [
  '#f5f3ff',
  '#ede9fe',
  '#ddd6fe',
  '#c4b5fd',
  '#a78bfa',
  '#8b5cf6',
  '#7c3aed',
  '#6d28d9',
  '#5b21b6',
  '#4c1d95',
];

export const mantineTheme = createTheme({
  colors: {
    primary: primaryColors,
    accent: accentColors,
  },

  primaryColor: 'primary',
  primaryShade: 5,

  defaultRadius: 'md',

  fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',

  headings: {
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2rem', lineHeight: '1.2' },
      h2: { fontSize: '1.5rem', lineHeight: '1.3' },
      h3: { fontSize: '1.25rem', lineHeight: '1.4' },
    },
  },

  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },

  radius: {
    xs: '0.25rem',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },

  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.3)',
    sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
    md: '0 4px 16px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.3)',
    xl: '0 12px 40px rgba(0, 0, 0, 0.4)',
  },

  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },

    Card: {
      defaultProps: {
        radius: 'xl',
        withBorder: true,
        padding: 'lg',
      },
      styles: {
        root: {
          backgroundColor: 'rgba(20, 24, 32, 0.8)',
          backdropFilter: 'blur(12px)',
          borderColor: '#2a3142',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: '#1e2330',
          },
        },
      },
    },

    Paper: {
      defaultProps: {
        radius: 'lg',
        withBorder: true,
      },
      styles: {
        root: {
          backgroundColor: 'rgba(20, 24, 32, 0.8)',
          backdropFilter: 'blur(12px)',
          borderColor: '#2a3142',
        },
      },
    },

    Input: {
      styles: {
        input: {
          backgroundColor: '#1e2330',
          borderColor: '#2a3142',
          color: '#e8eaed',
          '&:focus': {
            borderColor: '#6366f1',
            boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.15)',
          },
          '&::placeholder': {
            color: '#8b93a7',
          },
        },
      },
    },

    TextInput: {
      styles: {
        input: {
          backgroundColor: '#1e2330',
          borderColor: '#2a3142',
          color: '#e8eaed',
          '&:focus': {
            borderColor: '#6366f1',
            boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.15)',
          },
        },
      },
    },

    Textarea: {
      styles: {
        input: {
          backgroundColor: '#1e2330',
          borderColor: '#2a3142',
          color: '#e8eaed',
          '&:focus': {
            borderColor: '#6366f1',
            boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.15)',
          },
        },
      },
    },

    Select: {
      styles: {
        input: {
          backgroundColor: '#1e2330',
          borderColor: '#2a3142',
          color: '#e8eaed',
          '&:focus': {
            borderColor: '#6366f1',
            boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.15)',
          },
        },
        dropdown: {
          backgroundColor: '#141820',
          borderColor: '#2a3142',
        },
        option: {
          '&[data-selected]': {
            backgroundColor: '#6366f1',
          },
          '&[data-hovered]': {
            backgroundColor: '#1a1f2a',
          },
        },
      },
    },

    Modal: {
      styles: {
        content: {
          backgroundColor: 'rgba(20, 24, 32, 0.95)',
          backdropFilter: 'blur(20px)',
          borderColor: '#2a3142',
        },
        header: {
          backgroundColor: 'transparent',
        },
        body: {
          backgroundColor: 'transparent',
        },
      },
    },

    Tabs: {
      styles: {
        tab: {
          '&[data-active]': {
            borderColor: '#6366f1',
            color: '#6366f1',
          },
          '&:hover': {
            backgroundColor: '#1a1f2a',
          },
        },
      },
    },

    Badge: {
      styles: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
