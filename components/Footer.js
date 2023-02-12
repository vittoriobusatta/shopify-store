import React, { useState, useEffect } from "react";

function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentYear = new Date().getFullYear();
      if (year !== currentYear) {
        setYear(currentYear);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [year]);
  return (
    <footer>
      <p>© {year} - Décor Ta Kaz | Tous droits réservés</p>
      <p>
        Réalisation par <a href="https://www.vittoriobusatta.fr/">Vittorio</a>
      </p>
    </footer>
  );
}

export default Footer;
