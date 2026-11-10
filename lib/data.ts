export interface Artwork {
  id: string
  slug: string
  title: string
  description: string
  medium: string
  category: 'fine-art'
  price: number
  image: string
  featured?: boolean
}

export interface Craft {
  id: string
  slug: string
  title: string
  description: string
  medium: string
  category: 'ceremonial-crafts'
  price: number
  image: string
  featured?: boolean
}

export const artworks: Artwork[] = [
  {
    id: 'art-1',
    slug: 'lord-rama',
    title: 'Lord Rama with Bow & Quiver',
    description: 'Devotional acrylic portrait on canvas depicting Maryada Purushottam Lord Rama in his regal form with the divine bow and quiver.',
    medium: 'Acrylic on Canvas',
    category: 'fine-art',
    price: 18500,
    image: '/images/art/lord-rama.jpeg',
    featured: true,
  },
  {
    id: 'art-2',
    slug: 'mukut-motif',
    title: 'Traditional Bengali Shola Topor & Mukut',
    description: 'Ornate white shola filigree craftsmanship on midnight black mount — traditional Bengali wedding headwear artistry.',
    medium: 'White Ink & Acrylic on Dark Sheet',
    category: 'fine-art',
    price: 12800,
    image: '/images/art/mukut-motif.jpeg',
  },
  {
    id: 'art-3',
    slug: 'sacred-jagannath',
    title: 'Lord Jagannath Face (Chita / Jhoti Art)',
    description: 'Sacred iconographic miniature with gold ornamentation, inspired by the ancient Chita and Jhoti traditions of Odisha.',
    medium: 'Chita & Jhoti Inspired Devotional Painting',
    category: 'fine-art',
    price: 15600,
    image: '/images/art/sacred-jagannath.jpeg',
  },
  {
    id: 'art-4',
    slug: 'tiranga-mandala',
    title: 'Tiranga Paisley Mandala (Indian Tricolor)',
    description: 'Intricate patriotic swirl mandala weaving the tricolor into traditional paisley motifs — a celebration of Bharat.',
    medium: 'Acrylic on Sketch Sheet',
    category: 'fine-art',
    price: 9800,
    image: '/images/art/tiranga-mandala.jpeg',
  },
  {
    id: 'art-5',
    slug: 'lotus-mandala',
    title: 'Sacred Floral Lotus Mandala',
    description: 'Concentric traditional white pigment mandala on black art card — the eternal bloom of consciousness.',
    medium: 'White Pigment on Black Ground',
    category: 'fine-art',
    price: 11200,
    image: '/images/art/lotus-mandala.jpeg',
  },
  {
    id: 'art-6',
    slug: 'classical-portraiture',
    title: 'Portrait of a Traditional Indian Woman',
    description: 'Classical watercolor and acrylic study capturing the grace, jewelry, and expression of timeless Indian femininity.',
    medium: 'Mixed Media on Paper',
    category: 'fine-art',
    price: 14300,
    image: '/images/art/classical-portraiture.jpeg',
  },
  {
    id: 'art-7',
    slug: 'maa-durga',
    title: 'Mahishasuramardini Goddess Durga',
    description: 'Dynamic 10-armed Devi portrait in fierce compassion — the divine mother slaying ignorance and evil.',
    medium: 'Acrylic on Board',
    category: 'fine-art',
    price: 22500,
    image: '/images/art/maa-durga.jpeg',
    featured: true,
  },
  {
    id: 'art-8',
    slug: 'panchamukhi-hanuman',
    title: 'Sri Panchamukhi Hanuman',
    description: 'Mythological 5-faced Lord Hanuman depiction — each face a different divine aspect of strength and devotion.',
    medium: 'Devotional Color Palette on Canvas',
    category: 'fine-art',
    price: 19800,
    image: '/images/art/panchamukhi-hanuman.jpeg',
  },
  {
    id: 'art-9',
    slug: 'bal-krishna',
    title: 'Lord Krishna with Mayur Mukut',
    description: 'Divine youthful Krishna portrait adorned with the peacock feather crown — the eternal flute player of Vrindavan.',
    medium: 'Acrylic on Paper',
    category: 'fine-art',
    price: 16700,
    image: '/images/art/bal-krishna.jpeg',
    featured: true,
  },
]

export const crafts: Craft[] = [
  {
    id: 'craft-1',
    slug: 'lakshmi-pad',
    title: 'Traditional Bengali Alpona Footprint (Lakshmi Pad)',
    description: 'Red lac-dye (alta) auspicious footprint motif — inviting Goddess Lakshmi into the home during festivals.',
    medium: 'Red Alta on White Ground',
    category: 'ceremonial-crafts',
    price: 3200,
    image: '/images/crafts/lakshmi-pad.jpeg',
    featured: true,
  },
  {
    id: 'craft-2',
    slug: 'matsya-yugala',
    title: 'Sacred Twin Fish (Jora Ilish) Alpona',
    description: 'Auspicious Bengali wedding and festival motif — twin fish symbolizing fertility, abundance, and marital bliss.',
    medium: 'White Rice Paste on Crimson',
    category: 'ceremonial-crafts',
    price: 2800,
    image: '/images/crafts/matsya-yugala.jpeg',
  },
  {
    id: 'craft-3',
    slug: 'shola-trishul',
    title: 'Ornate White Jhoti / Bridal Mandap Crest',
    description: 'Traditional folk chandelier and paisley lattice in white acrylic on charcoal — ceremonial architecture for the sacred union.',
    medium: 'White Acrylic on Charcoal Ground',
    category: 'ceremonial-crafts',
    price: 4500,
    image: '/images/crafts/shola-trishul.jpeg',
  },
  {
    id: 'craft-4',
    slug: 'crimson-thali',
    title: 'Ceremonial Boron Thali & Baati Set (Crimson & White)',
    description: 'Hand-painted ritual plate set with brass bowls — essential for Bengali wedding boron ceremonies.',
    medium: 'Hand-Painted Terracotta & Metal',
    category: 'ceremonial-crafts',
    price: 5800,
    image: '/images/crafts/crimson-thali.jpeg',
  },
  {
    id: 'craft-5',
    slug: 'radiating-thali',
    title: 'Solar Radiance Pooja Thali Set',
    description: 'Starburst floral motifs on crimson glaze with brass bowls — radiant energy for daily worship.',
    medium: 'Crimson Glaze with Brass Bowls',
    category: 'ceremonial-crafts',
    price: 6200,
    image: '/images/crafts/radiating-thali.jpeg',
  },
  {
    id: 'craft-6',
    slug: 'mangal-boron-kula',
    title: 'Handcrafted Wedding Boron Kula (Winnowing Fan)',
    description: 'Traditional bamboo kula painted with auspicious alpona and swastik iconography — symbol of prosperity.',
    medium: 'Hand-Woven Bamboo with Folk Art',
    category: 'ceremonial-crafts',
    price: 3600,
    image: '/images/crafts/mangal-boron-kula.jpeg',
  },
  {
    id: 'craft-7',
    slug: 'artisan-kurta',
    title: 'Designer Hand-Painted Men\'s Kurta',
    description: 'Royal blue cotton kurta featuring white alpona collars and cuffs — wearable heritage for the modern gentleman.',
    medium: 'Hand-Painted Cotton Fabric',
    category: 'ceremonial-crafts',
    price: 4200,
    image: '/images/crafts/artisan-kurta.jpeg',
  },
  {
    id: 'craft-8',
    slug: 'hand-painted-textile',
    title: 'Hand-Painted Festive Shawl / Dupatta',
    description: 'Pure crimson fabric featuring border-to-border traditional owl and lotus mandala motifs — heirloom textile art.',
    medium: 'Hand-Painted Crimson Fabric',
    category: 'ceremonial-crafts',
    price: 4800,
    image: '/images/crafts/hand-painted-textile.jpeg',
    featured: true,
  },
  {
    id: 'craft-9',
    slug: 'suvarna-mayur-thali',
    title: 'Suvarna Mayur Pooja Ensemble',
    description: 'Intricate gold-gilded crimson thali, painted cups and peacock motif — the complete ceremonial offering set.',
    medium: 'Gold-Gilded Crimson with Brass',
    category: 'ceremonial-crafts',
    price: 8500,
    image: '/images/crafts/suvarna-mayur-thali.jpeg',
  },
]

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find(a => a.slug === slug)
}

export function getCraftBySlug(slug: string): Craft | undefined {
  return crafts.find(c => c.slug === slug)
}

export function getAllItems() {
  return [...artworks, ...crafts]
}