export const getLast10Days = () => {
    const dates = [];
    const today = new Date();
  
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();
  
      dates.push(`${day}-${month}-${year}`);
    }
  
    return dates;
  };
  
  
  