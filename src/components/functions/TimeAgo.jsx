export default function timeAgo(dateString) {
    console.log(dateString);
  
    const now = new Date();
    const date = new Date(Date.parse(dateString));
    const diffInMillis = now - date;
  
    const minuteInMillis = 60 * 1000;
    const hourInMillis = 60 * minuteInMillis;
    const dayInMillis = 24 * hourInMillis;
    const weekInMillis = 7 * dayInMillis;
    const monthInMillis = 30 * dayInMillis; // Tomando un mes como aproximadamente 30 días
    const yearInMillis = 365 * dayInMillis; // Tomando un año como aproximadamente 365 días
  
    if (diffInMillis < minuteInMillis) {
      const seconds = Math.floor(diffInMillis / 1000);
      return `Hace ${seconds} ${seconds === 1 ? "segundo" : "segundos"}`;
    } else if (diffInMillis < hourInMillis) {
      const minutes = Math.floor(diffInMillis / minuteInMillis);
      return `Hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
    } else if (diffInMillis < dayInMillis) {
      const hours = Math.floor(diffInMillis / hourInMillis);
      return `Hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
    } else if (diffInMillis < weekInMillis) {
      const days = Math.floor(diffInMillis / dayInMillis);
      return `Hace ${days} ${days === 1 ? "día" : "días"}`;
    } else if (diffInMillis < monthInMillis) {
      const weeks = Math.floor(diffInMillis / weekInMillis);
      return `Hace ${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
    } else if (diffInMillis < yearInMillis) {
      const months = Math.floor(diffInMillis / monthInMillis);
      return `Hace ${months} ${months === 1 ? "mes" : "meses"}`;
    } else {
      const years = Math.floor(diffInMillis / yearInMillis);
      return `Hace ${years} ${years === 1 ? "año" : "años"}`;
    }
  }
  