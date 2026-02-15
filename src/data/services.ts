export interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  pricePerHour: number;
  features: string[];
  image: string;
  category: string;
}

export const services: Service[] = [
  {
    id: "baby-care",
    title: "Baby Care",
    description: "Expert nurturing for your little ones. Our babysitters are trained in early childhood safety and creative engagement.",
    detailedDescription: "Our Baby Care service provides comprehensive support for parents. Whether you need a few hours of help or a full-time caregiver, our trained professionals are here to help. We focus on safety, learning through play, and emotional development. All our caregivers are CPR and First Aid certified.",
    pricePerHour: 15,
    features: [
      "Newborn care and feeding",
      "Age-appropriate educational play",
      "Toddler supervision and safety",
      "Meal preparation for children",
      "Light housekeeping related to child"
    ],
    image: "/baby_care.png",
    category: "Childcare"
  },
  {
    id: "elderly-care",
    title: "Elderly Service",
    description: "Dignified support for seniors. We assist with daily living, medication management, and provide valuable companionship.",
    detailedDescription: "Our Elderly Care service is designed to help seniors maintain their independence while receiving the support they need. We provide assistance with daily activities, companionship, and emotional support. Our caregivers are patient, empathetic, and specially trained in senior needs.",
    pricePerHour: 20,
    features: [
      "Assistance with personal hygiene",
      "Medication reminders",
      "Mobility assistance",
      "Companionship and emotional support",
      "Light meal preparation and errands"
    ],
    image: "/elderly_care.png",
    category: "Senior Care"
  },
  {
    id: "sick-care",
    title: "Sick People Service",
    description: "Specialized care for those recovering or managing illness. Our caregivers ensure a comfortable healing environment at home.",
    detailedDescription: "Our Sick Care service provides specialized attention for individuals recovering from surgery, managing chronic illnesses, or requiring temporary assistance due to health issues. We work closely with families to ensure a smooth recovery process in the comfort of home.",
    pricePerHour: 25,
    features: [
      "Post-operative care support",
      "Vital signs monitoring",
      "Assistance with medical appointments",
      "Care for chronic conditions",
      "Emotional support during recovery"
    ],
    image: "/hero_caregiver.png",
    category: "Medical Support"
  }
];
