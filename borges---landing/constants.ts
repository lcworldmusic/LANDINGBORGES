import { Beat } from './types';

export const ASSETS = {
  BANNER: 'https://i.postimg.cc/1t61Pk1n/BANNER-OP-2.png',
  LOGO: 'https://i.postimg.cc/WzkCLKC9/VARIANTES-2.png',
};

export const PORTFOLIO_LINKS = {
  PLAYLISTS: [
    { name: 'El Sonido de Borges - YouTube', url: 'https://www.youtube.com/watch?v=T5Vwg0_IntM&list=PLiZKeUhgmHw3UVRre1-Qfwl57gxl1JCht', image: 'https://i.postimg.cc/5NXkGnkC/PORTADA-PLAYLIST-BORGES.png', keepColor: true },
    { name: 'El Sonido de Borges - Spotify', url: 'https://open.spotify.com/playlist/0HPE8sflIW4zHv99dT464E?si=33a39e58a3a74fa7', image: 'https://i.postimg.cc/5NXkGnkC/PORTADA-PLAYLIST-BORGES.png', keepColor: true },
  ],
  PORTFOLIO: [
    { name: 'TREASON', url: 'https://open.spotify.com/intl-es/track/7G75ixv4JTizeXAd9RBxeT?si=9840fedbb4f3409e', image: 'https://i.postimg.cc/fknRMnbJ/PORTADA-TREASON.png' },
    { name: 'UBÍCATE, LILA', url: 'https://linktr.ee/UBICATELILA', image: 'https://i.postimg.cc/sxV0BXNW/1.png' },
    { name: 'RABIA', url: 'https://linktr.ee/BORGESRABIA', image: 'https://i.postimg.cc/Wz2fD3H0/2.png' },
    { name: 'INTENCIÓN', url: 'https://linktr.ee/INTENCIONBORGES', image: 'https://i.postimg.cc/wM6btvGk/5.png' },
    { name: 'SOLO A VECES ME JODE', url: 'https://linktr.ee/SOLOAVECESMEJODE', image: 'https://i.postimg.cc/sxwH5rkW/8.png' },
    { name: 'GUARDIAN', url: 'https://linktr.ee/GUARDIANBORGESFTLILRUIZ', image: 'https://i.postimg.cc/kGnhV4pc/6.png' },
    { name: 'BLR', url: 'https://linktr.ee/BLRBorgesftLilRuiz', image: 'https://i.postimg.cc/7hmtSkF3/9.png' },
    { name: 'TENDENCIA', url: 'https://linktr.ee/TENDENCIABORGES', image: 'https://i.postimg.cc/1XJ7DQkN/7.png' },
    { name: 'DESORDEN', url: 'https://linktr.ee/DESORDEN_BORGES_E.PDES', image: 'https://i.postimg.cc/pr219T6f/3.png' },
    { name: 'DESPERDICIO', url: 'https://linktr.ee/DESPERDICIO_BORGES_EPDES', image: 'https://i.postimg.cc/pr219T6f/3.png' },
    { name: 'DESGASTE', url: 'https://linktr.ee/DESGASTE_BORGES_EPDES', image: 'https://i.postimg.cc/pr219T6f/3.png' },
    { name: 'DESPEJANDO', url: 'https://linktr.ee/DESPEJANDO', image: 'https://i.postimg.cc/pr219T6f/3.png' },
    { name: 'DESHIELO', url: 'https://linktr.ee/DESHIELO', image: 'https://i.postimg.cc/pr219T6f/3.png' },
    { name: 'DESPIERTA', url: 'https://linktr.ee/DESPIERTA_BORGES', image: 'https://i.postimg.cc/pr219T6f/3.png' },
    { name: 'QUERER', url: 'https://linktr.ee/QUERERBORGES', image: 'https://i.postimg.cc/8c1nF50M/4.png' },
  ]
};

// Mock data for beats
export const BEATS: Beat[] = [
  {
    id: '1',
    title: 'MIDNIGHT DRIVE',
    bpm: 140,
    key: 'Cm',
    price: 29.99,
    tags: ['Trap', 'Dark', 'Night'],
    coverUrl: 'https://picsum.photos/300/300?random=1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    producer: 'LC MUSIC WORLD'
  },
  {
    id: '2',
    title: 'SUMMER VIBES',
    bpm: 95,
    key: 'G Maj',
    price: 29.99,
    tags: ['Reggaeton', 'Chill', 'Happy'],
    coverUrl: 'https://picsum.photos/300/300?random=2',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    producer: 'LC MUSIC WORLD'
  },
  {
    id: '3',
    title: 'WAR ZONE',
    bpm: 130,
    key: 'Fm',
    price: 29.99,
    tags: ['Drill', 'Aggressive', 'Hard'],
    coverUrl: 'https://picsum.photos/300/300?random=3',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    producer: 'LC MUSIC WORLD'
  },
  {
    id: '4',
    title: 'BROKEN HEART',
    bpm: 85,
    key: 'Am',
    price: 29.99,
    tags: ['R&B', 'Sad', 'Piano'],
    coverUrl: 'https://picsum.photos/300/300?random=4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    producer: 'LC MUSIC WORLD'
  },
  {
    id: '5',
    title: 'SKY HIGH',
    bpm: 150,
    key: 'D#m',
    price: 29.99,
    tags: ['Hyperpop', 'Fast', 'Synth'],
    coverUrl: 'https://picsum.photos/300/300?random=5',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    producer: 'LC MUSIC WORLD'
  },
  {
    id: '6',
    title: 'OLD SCHOOL FLOW',
    bpm: 90,
    key: 'Em',
    price: 29.99,
    tags: ['Boom Bap', 'Classic', 'Jazz'],
    coverUrl: 'https://picsum.photos/300/300?random=6',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    producer: 'LC MUSIC WORLD'
  }
];