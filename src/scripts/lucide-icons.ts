import { 
    createIcons, Mail, Phone, Instagram, 
    Facebook, Layers, Sparkles, 
    MapPin,Laptop,Smartphone,MonitorDot,
    ServerCog,BarChart3,MapPinCheck,Workflow,CheckCircle,RefreshCcw,BookOpenText,ArrowRight

 } from "lucide";

// Esperamos a que el DOM esté listo para que los <i data-lucide="..."> ya existan
window.addEventListener("DOMContentLoaded", () => {
  createIcons({
    icons: {
      Mail,
      Phone,
      Instagram,
      Facebook,
      Layers,
      Sparkles,
      MapPin,
      Laptop,
      Smartphone,
      MonitorDot,
      ServerCog,
      BarChart3,
      MapPinCheck,
      Workflow,
      ArrowRight,
      CheckCircle,
      RefreshCcw,
      BookOpenText
    },
  });
});
