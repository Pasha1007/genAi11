import { format, formatDistance } from 'date-fns';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // Get distance from now
  const distance = formatDistance(date, new Date(), { addSuffix: true });
  
  // Format the date
  const formattedDate = format(date, 'MMM d, yyyy h:mm a');
  
  return `${formattedDate} (${distance})`;
};