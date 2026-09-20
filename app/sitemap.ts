import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap { const routes=['','ride','ride/schedule','drive','parcel','safety','about','help','contact','download','careers','terms','privacy','cancellation-refund','drivers-riders-agreement','cookies']; return routes.map(route=>({url:`https://torkk.in/${route}`,lastModified:new Date()})) }
