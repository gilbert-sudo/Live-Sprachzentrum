export const LEVEL_COLORS = {
  A1: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-700',
    badge: 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-sm',
  },
  A2: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    gradient: 'from-green-500 to-green-700',
    badge: 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-sm',
  },
  B1: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    gradient: 'from-yellow-500 to-yellow-700',
    badge: 'bg-gradient-to-r from-yellow-500 to-yellow-700 text-white shadow-sm',
  },
  B2: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-200',
    gradient: 'from-orange-500 to-orange-700',
    badge: 'bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-sm',
  },
  C1: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    gradient: 'from-red-500 to-red-700',
    badge: 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-sm',
  },
  C2: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-200',
    gradient: 'from-purple-500 to-purple-700',
    badge: 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-sm',
  },
  Alle: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
    gradient: 'from-gray-500 to-gray-700',
    badge: 'bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-sm',
  }
};

export const getLevelColor = (level) => {
  return LEVEL_COLORS[level] || LEVEL_COLORS['Alle'];
};
