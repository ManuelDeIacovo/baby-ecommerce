import { useEffect } from "react";

export const useSEO = ({ title, description }) => {
  useEffect(() => {
    document.title = title ? `${title} | Nido di Cotone` : "Nido di Cotone - Creazioni Fatte a Mano";
    
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }
  }, [title, description]);
};
