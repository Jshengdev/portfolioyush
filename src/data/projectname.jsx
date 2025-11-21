/**
 * Project metadata for main projects displayed on /projects page
 * Each project includes id, title, description, and thumbnail image
 *
 * @type {Array<{id: number, title: string, description: string, image: string}>}
 *
 * Used by:
 * - Projects.jsx (main project listing)
 * - NextProject.jsx (navigation between projects)
 * - Individual project pages (for NextProject component)
 *
 * Note: title is used for routing - spaces are removed for URL
 * Example: "The Collection" → /projects/TheCollection
 */
export const projectParty = [

  {
    id: 1,
    title: "Grove",
    description: "AI-Powered Project Matching",
    image: "/assets/GROVE/landingpage wide.png"
  },
  { 
    id: 2,
    title: "Alaina Pamela", 
    description: "Film Internship",
    image: "/assets/AP/AP-thumbnail.png"
  },
  {
    id: 3,
    title: "The Collection",
    description: "My films",
    image: "/assets/C/C-landing.JPG",
  },                  
  { 
    id: 4,
    title: "Ark", 
    description: "Skincare Wearable",
    image: "/assets/ARK/ARK-landing.png"
  },
  {
    id: 5,
    title: "Capsule Machine",
    description: "Interactive Installation",
    image: "/assets/CM/Capsule machine thumbnail.png"
  },
  { 
    id: 6,
    title: "Website Dev", 
    description: "WIP",
    image: "/assets/WD/WD-landing.png"
  },
]
