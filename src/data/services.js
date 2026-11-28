/**
 * Service catalogue. Names/descriptions live in the locale files under services.items.<id>.
 * The first 9 entries are what visitors see before pressing "Load more".
 * Set photo: true (and add /public/images/services/<id>.jpg) to show a real photo.
 */
export const categories = ['renovation', 'repairs', 'contracting']

export const services = [
  { id: 'villa', icon: 'home', category: 'renovation' },
  { id: 'apartment', icon: 'building', category: 'renovation' },
  { id: 'shops', icon: 'shop', category: 'renovation' },
  { id: 'offices', icon: 'building', category: 'renovation' },
  { id: 'kitchen', icon: 'kitchen', category: 'renovation' },
  { id: 'bathroom', icon: 'bath', category: 'renovation' },
  { id: 'ac', icon: 'ac', category: 'repairs' },
  { id: 'electrical', icon: 'bolt', category: 'repairs' },
  { id: 'plumbing', icon: 'drop', category: 'repairs' },
  { id: 'bedroom', icon: 'bed', category: 'renovation' },
  { id: 'living', icon: 'sofa', category: 'renovation' },
  { id: 'handyman', icon: 'wrench', category: 'repairs' },
  { id: 'painting', icon: 'roller', category: 'repairs' },
  { id: 'carpentry', icon: 'hammer', category: 'repairs' },
  { id: 'tiling', icon: 'tile', category: 'repairs' },
  { id: 'pool', icon: 'pool', category: 'repairs' },
  { id: 'construction', icon: 'hat', category: 'contracting' },
  { id: 'virtual', icon: 'cube', category: 'contracting' },
  { id: 'maintenance', icon: 'cycle', category: 'contracting' },
  { id: 'preconstruction', icon: 'clipboard', category: 'contracting' },
  { id: 'pm', icon: 'kanban', category: 'contracting' },
  { id: 'designbuild', icon: 'pen', category: 'contracting' },
].map((s) => ({ photo: false, ...s }))

export const categoryMeta = {
  renovation: { icon: 'home' },
  repairs: { icon: 'bolt' },
  contracting: { icon: 'clipboard' },
}

/** Quick links shown in the footer "Popular" column. */
export const popularIds = ['villa', 'ac', 'electrical', 'plumbing', 'painting']
