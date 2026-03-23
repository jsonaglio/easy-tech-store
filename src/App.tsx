/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Smartphone, 
  Search, 
  ChevronRight, 
  ChevronLeft,
  Check, 
  X, 
  MessageCircle,
  Instagram,
  Filter,
  ArrowRight,
  Laptop,
  Tablet,
  Cpu,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Product {
  id: string;
  model: string;
  description: string;
  basePrice: number;
  image: string;
  colors: string[];
  colorImages?: Record<string, string>;
  storage: string[];
  storageImages?: Record<string, string>;
  storagePrices?: Record<string, number>;
  category: 'iPhone' | 'iPad' | 'MacBook' | 'Xiaomi' | 'Consoles';
  note?: string;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    model: 'iPhone 17',
    description: 'O futuro da tecnologia móvel com o chip A19 Bionic.',
    basePrice: 6299.90,
    image: '/Iphone 17/iPhone17-Preto.webp',
    colors: ['Lavanda', 'Sálvia', 'Azul-névoa', 'Branco', 'Preto'],
    colorImages: {
      'Lavanda': '/Iphone 17/iPhone17-Lavanda.webp',
      'Sálvia': '/Iphone 17/iPhone17-Sálvia.webp',
      'Azul-névoa': '/Iphone 17/iPhone17-Azul_nevoa.webp',
      'Branco': '/Iphone 17/iPhone17-Branco.webp',
      'Preto': '/Iphone 17/iPhone17-Preto.webp'
    },
    storage: ['256 GB', '512 GB'],
    storagePrices: {
      '256 GB': 6299.90,
      '512 GB': 7599
    },
    category: 'iPhone',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '22',
    model: 'iPhone 17 Pro',
    description: 'O ápice da performance com o chip A19 Pro e sistema de câmera tripla.',
    basePrice: 8399.90,
    image: '/17PM/17PM-silver.jpg',
    colors: ['Silver', 'Orange', 'Deep Blue'],
    colorImages: {
      'Silver': '/17PM/17PM-silver.jpg',
      'Orange': '/17PM/17PM-Laranja.jpg',
      'Deep Blue': '/17PM/i17PM - Deep Blue.jpg'
    },
    storage: ['256 GB', '512 GB'],
    storagePrices: {
      '256 GB': 8399.90,
      '512 GB': 9699.90
    },
    category: 'iPhone',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '23',
    model: 'iPhone 17 Pro Max',
    description: 'A maior tela e a melhor bateria da linha iPhone 17.',
    basePrice: 9499.90,
    image: '/17PM/17PM-silver.jpg',
    colors: ['Silver', 'Orange', 'Deep Blue'],
    colorImages: {
      'Silver': '/17PM/17PM-silver.jpg',
      'Orange': '/17PM/17PM-Laranja.jpg',
      'Deep Blue': '/17PM/i17PM - Deep Blue.jpg'
    },
    storage: ['256 GB', '512 GB'],
    storagePrices: {
      '256 GB': 9499.90,
      '512 GB': 10999.90
    },
    category: 'iPhone',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '10',
    model: 'PlayStation 5',
    description: 'Experiência de jogo imersiva com SSD ultra-rápido.',
    basePrice: 3599.90,
    image: '/Playstation 5/PS5-digital.jpg',
    colors: ['Branco'],
    colorImages: {
      'Branco': '/Playstation 5/PS5-digital.jpg'
    },
    storage: ['Slim Digital', 'Mídia Física', 'Pro'],
    storageImages: {
      'Slim Digital': '/Playstation 5/PS5-digital.jpg',
      'Mídia Física': '/Playstation 5/Ps5-MidiaFisica.jpg',
      'Pro': '/Playstation 5/PS5-Pro.jpg'
    },
    storagePrices: {
      'Slim Digital': 3599.90,
      'Mídia Física': 3929.90,
      'Pro': 5659.90
    },
    category: 'Consoles',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '2',
    model: 'iPhone 16',
    description: 'Performance excepcional e controle de câmera avançado.',
    basePrice: 4999.90,
    image: '/iphone16/iphone16-Preto.webp',
    colors: ['Ultramarino', 'Verde-acinzentado', 'Rosa', 'Branco', 'Preto'],
    colorImages: {
      'Ultramarino': '/iphone16/iphone16-ultramarine.webp',
      'Verde-acinzentado': '/iphone16/iphone16-verde_acinzentado.webp',
      'Rosa': '/iphone16/iphone16-Rosa.webp',
      'Branco': '/iphone16/iphone16-branco.webp',
      'Preto': '/iphone16/iphone16-Preto.webp'
    },
    storage: ['128 GB', '256 GB'],
    storagePrices: {
      '128 GB': 4999.90,
      '256 GB': 5499.90
    },
    category: 'iPhone',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '12',
    model: 'Nintendo Switch OLED',
    description: 'Cores vibrantes e contraste nítido em qualquer lugar.',
    basePrice: 2979.90,
    image: '/Nintendo switch Oled/Nintendo Switch Oled-Branco.avif',
    colors: ['Branco', 'Neon'],
    colorImages: {
      'Branco': '/Nintendo switch Oled/Nintendo Switch Oled-Branco.avif',
      'Neon': '/Nintendo switch Oled/Nintendo Switch Oled-Neon.avif'
    },
    storage: ['64 GB'],
    category: 'Consoles',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '18',
    model: 'Nintendo Switch',
    description: 'A versatilidade do console híbrido da Nintendo.',
    basePrice: 2129.90,
    image: '/Nintendo switch/Nintendo Switch-Neon.avif',
    colors: ['Neon'],
    colorImages: {
      'Neon': '/Nintendo switch/Nintendo Switch-Neon.avif'
    },
    storage: ['32 GB'],
    category: 'Consoles',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '19',
    model: 'Nintendo Switch 2',
    description: 'A próxima geração de diversão da Nintendo.',
    basePrice: 4329.90,
    image: '/Nintendo Switch 2/Nintendo Switch 2.avif',
    colors: ['Preto'],
    colorImages: {
      'Preto': '/Nintendo Switch 2/Nintendo Switch 2.avif'
    },
    storage: ['128 GB'],
    category: 'Consoles',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '20',
    model: 'Xbox Series S',
    description: 'Performance de nova geração no menor console Xbox de todos os tempos.',
    basePrice: 3099.90,
    image: '/Xbox Series S/XboxSeriesS.jpg',
    colors: ['Branco'],
    colorImages: {
      'Branco': '/Xbox Series S/XboxSeriesS.jpg'
    },
    storage: ['512 GB', '1 TB'],
    storagePrices: {
      '512 GB': 3099.90,
      '1 TB': 3529.90
    },
    category: 'Consoles',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '21',
    model: 'Xbox Series X',
    description: 'O Xbox mais rápido e potente de todos os tempos.',
    basePrice: 4799.90,
    image: '/Xbox Series X/SeriesX- Fisico.jpg',
    colors: ['Preto'],
    colorImages: {
      'Preto': '/Xbox Series X/SeriesX- Fisico.jpg'
    },
    storage: ['Digital 1 TB', 'Mídia Física'],
    storageImages: {
      'Digital 1 TB': '/Xbox Series X/SeriesX-Digital.jpg',
      'Mídia Física': '/Xbox Series X/SeriesX- Fisico.jpg'
    },
    storagePrices: {
      'Digital 1 TB': 4799.90,
      'Mídia Física': 4999.90
    },
    category: 'Consoles',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '3',
    model: 'Apple iPhone 15',
    description: 'Design elegante com Dynamic Island e USB-C.',
    basePrice: 4299.90,
    image: '/iPhone 15/iPhone15-Preto.webp',
    colors: ['Preto', 'Azul', 'Verde', 'Rosa'],
    colorImages: {
      'Preto': '/iPhone 15/iPhone15-Preto.webp',
      'Azul': '/iPhone 15/iPhone15-azul.jpg',
      'Verde': '/iPhone 15/iPhone15-Verde.webp',
      'Rosa': '/iPhone 15/iPhone15-Pink.jpg'
    },
    storage: ['128GB', '256GB'],
    storagePrices: {
      '128GB': 4299.90,
      '256GB': 4999.90
    },
    category: 'iPhone',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '6',
    model: 'Apple iPad 11 A16',
    description: 'Potência e versatilidade com o chip A16 Bionic para todas as suas tarefas.',
    basePrice: 3179.90,
    image: '/Ipad 11/iPad11-Silver.jpg',
    colors: ['Silver', 'Pink', 'Azul', 'Amarelo'],
    colorImages: {
      'Silver': '/Ipad 11/iPad11-Silver.jpg',
      'Pink': '/Ipad 11/iPad11-Pink.jpg',
      'Azul': '/Ipad 11/iPad11-Azul.jpg',
      'Amarelo': '/Ipad 11/iPad11-Amarelo.jpg'
    },
    storage: ['128GB', '256GB'],
    storagePrices: {
      '128GB': 3179.90,
      '256GB': 3899.90
    },
    category: 'iPad',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '9',
    model: 'Redmi 15C',
    description: 'Bateria de longa duração e design moderno.',
    basePrice: 1199.90,
    image: '/Redmi 15C/Redmi15C-Preto.jpg',
    colors: ['Laranja', 'Moonlight Blue', 'Verde', 'Preto'],
    colorImages: {
      'Laranja': '/Redmi 15C/Redmi15C-laranja.jpg',
      'Moonlight Blue': '/Redmi 15C/Redmi15C-MoonlightBlue.jpg',
      'Verde': '/Redmi 15C/Redmi15C-Verde.jpg',
      'Preto': '/Redmi 15C/Redmi15C-Preto.jpg'
    },
    storage: ['256GB/8GB Ram'],
    category: 'Xiaomi',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '13',
    model: 'Redmi Note 15',
    description: 'Equilíbrio perfeito entre performance e preço.',
    basePrice: 1799.90,
    image: '/Redmi note 15/Note15-preto.webp',
    colors: ['Azul', 'Roxo', 'Verde', 'Preto'],
    colorImages: {
      'Azul': '/Redmi note 15/Note15-Azul.jpg',
      'Roxo': '/Redmi note 15/Note15-Roxo.jpg',
      'Verde': '/Redmi note 15/Note15-verde.jpg',
      'Preto': '/Redmi note 15/Note15-preto.webp'
    },
    storage: ['256GB/8GB Ram'],
    category: 'Xiaomi',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '7',
    model: 'Redmi Note 15 Pro',
    description: 'Câmera de alta resolução e tela AMOLED fluida.',
    basePrice: 2399.90,
    image: '/Redmi note 15 pro/Note15Pro-Preto.jpg',
    colors: ['Azul', 'Preto', 'Titanium'],
    colorImages: {
      'Azul': '/Redmi note 15 pro/Note15Pro-Azul.jpg',
      'Preto': '/Redmi note 15 pro/Note15Pro-Preto.jpg',
      'Titanium': '/Redmi note 15 pro/Note15Pro-Titanium.jpg'
    },
    storage: ['256GB/8GB de Ram'],
    category: 'Xiaomi',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '14',
    model: 'Poco X7',
    description: 'Potência gamer com excelente custo-benefício.',
    basePrice: 1899.90,
    image: '/Poco X7/PocoX7-Preto:Amarelo.jpg',
    colors: ['Preto/Amarelo', 'Verde', 'Prata'],
    colorImages: {
      'Preto/Amarelo': '/Poco X7/PocoX7-Preto:Amarelo.jpg',
      'Verde': '/Poco X7/PocoX7-Verde.jpg',
      'Prata': '/Poco X7/PocoX7-Prata.jpg'
    },
    storage: ['256GB/8GB de Ram'],
    category: 'Xiaomi',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '15',
    model: 'Poco X7 Pro',
    description: 'O topo de linha da linha Poco com performance extrema.',
    basePrice: 2099.90,
    image: '/Poco X7 Pro/PocoX7Pro-Preto.jpg',
    colors: ['Preto', 'Amarelo', 'Verde'],
    colorImages: {
      'Preto': '/Poco X7 Pro/PocoX7Pro-Preto.jpg',
      'Amarelo': '/Poco X7 Pro/PocoX7Pro-Amarelo.jpg',
      'Verde': '/Poco X7 Pro/PocoX7Pro-Verde.jpg'
    },
    storage: ['256GB/8GB de Ram', '512GB/12Gb de Ram'],
    storagePrices: {
      '256GB/8GB de Ram': 2399.90,
      '512GB/12Gb de Ram': 2699.90
    },
    category: 'Xiaomi',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '16',
    model: 'MacBook Air M1 (2020) 13,1"',
    description: 'O chip M1 redefine o notebook mais fino e leve da Apple.',
    basePrice: 4899.90,
    image: '/Macbook Air M1/MacbookAirm1-SpaceGray.webp',
    colors: ['Space Gray'],
    colorImages: {
      'Space Gray': '/Macbook Air M1/MacbookAirm1-SpaceGray.webp'
    },
    storage: ['256GB/8GB'],
    category: 'MacBook',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '17',
    model: 'MacBook Air M4 (2025) 13,6"',
    description: 'Performance de última geração com o novo chip M4.',
    basePrice: 7759.90,
    image: '/Macbook Air M4/MacbookAirM4-Midnight.jpg',
    colors: ['SkyBlue', 'Silver', 'Starlight', 'Midnight'],
    colorImages: {
      'SkyBlue': '/Macbook Air M4/MacbookAirM4-SkyBlue.jpg',
      'Silver': '/Macbook Air M4/MacbookAirM4-Silver.jpg',
      'Starlight': '/Macbook Air M4/MacbookAirM4-Starlight.jpg',
      'Midnight': '/Macbook Air M4/MacbookAirM4-Midnight.jpg'
    },
    storage: ['256GB/16GB', '512GB/16GB'],
    storagePrices: {
      '256GB/16GB': 7759.90,
      '512GB/16GB': 8899.90
    },
    category: 'MacBook',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  }
];

// --- Components ---

const DynamicBanner = ({ products, onSelect }: { products: Product[], onSelect: (p: Product) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredProducts = products.slice(0, 4); // Show first 4 products as featured
  
  // Add Instagram and Services as special slides
  const slides = [
    ...featuredProducts.map(p => ({ type: 'product' as const, data: p })),
    { 
      type: 'services' as const,
      data: {
        title: 'Assistência & Montagem',
        subtitle: 'Serviços Premium',
        description: 'Assistência técnica especializada para Smartphones, PCs e Consoles. Montagem de PCs Gamer e venda de periféricos.',
        items: [
          'Assistência Técnica Premium',
          'Periféricos & Acessórios',
          'Montagem de PCs Especializada'
        ]
      }
    },
    { 
      type: 'instagram' as const, 
      data: {
        title: 'Siga-nos no Instagram',
        handle: '@easytechstorers',
        description: 'Fique por dentro de todas as novidades, unboxings e ofertas exclusivas em tempo real.',
        image: '/logos/Instagram.PNG'
      }
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="mb-16 relative group">
      <div className="bg-zinc-900 rounded-[3rem] text-white relative overflow-hidden border border-zinc-800 min-h-[450px] md:min-h-[550px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full p-8 md:p-20 relative z-10 flex flex-col md:flex-row items-center gap-12"
          >
            {slides[currentIndex].type === 'product' ? (
              <>
                <div className="max-w-2xl flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-vibrant-green/10 border border-vibrant-green/20 rounded-full text-vibrant-green text-[10px] font-bold uppercase tracking-widest mb-6">
                    <span className="w-1.5 h-1.5 bg-vibrant-green rounded-full animate-pulse"></span>
                    Destaque: {(slides[currentIndex].data as Product).category}
                  </div>
                  <h2 className="text-4xl md:text-7xl font-bold mb-6 leading-[1.1] font-display tracking-tight">
                    {(slides[currentIndex].data as Product).model}
                  </h2>
                  <p className="text-zinc-500 text-lg md:text-xl mb-10 max-w-lg line-clamp-2 mx-auto md:mx-0">
                    {(slides[currentIndex].data as Product).description}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <button 
                      onClick={() => onSelect(slides[currentIndex].data as Product)}
                      className="bg-vibrant-green text-black px-8 py-4 rounded-2xl font-bold hover:bg-vibrant-green/80 transition-all flex items-center gap-2 shadow-lg shadow-vibrant-green/10"
                    >
                      Ver Detalhes <ChevronRight size={20} />
                    </button>
                    <button 
                      onClick={() => {
                        const el = document.getElementById('catalog');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-zinc-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-zinc-700 transition-all border border-zinc-700"
                    >
                      Explorar Tudo
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex justify-center items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative"
                  >
                    <img 
                      src={(slides[currentIndex].data as Product).image} 
                      alt={(slides[currentIndex].data as Product).model} 
                      className="w-full max-w-[280px] md:max-w-md h-auto object-contain drop-shadow-[0_0_50px_rgba(0,255,65,0.15)] rounded-3xl" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-vibrant-green/5 blur-[80px] -z-10 rounded-full"></div>
                  </motion.div>
                </div>
              </>
            ) : slides[currentIndex].type === 'services' ? (
              <>
                <div className="max-w-2xl flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Cpu size={12} />
                    {slides[currentIndex].data.subtitle}
                  </div>
                  <h2 className="text-4xl md:text-7xl font-bold mb-6 leading-[1.1] font-display tracking-tight">
                    {slides[currentIndex].data.title}
                  </h2>
                  <p className="text-zinc-500 text-lg md:text-xl mb-10 max-w-lg mx-auto md:mx-0">
                    {slides[currentIndex].data.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {slides[currentIndex].data.items.map((item: string) => (
                      <div key={item} className="flex items-center gap-3 text-zinc-300 text-sm">
                        <div className="w-5 h-5 rounded-full bg-vibrant-green/20 flex items-center justify-center text-vibrant-green">
                          <Check size={12} />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => window.open('https://wa.me/5554991370566?text=Olá! Gostaria de saber mais sobre os serviços de assistência e montagem.', '_blank')}
                    className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl shadow-white/5 mx-auto md:mx-0"
                  >
                    Solicitar Orçamento <MessageCircle size={20} />
                  </button>
                </div>
                <div className="flex-1 flex justify-center items-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative grid grid-cols-2 gap-4"
                  >
                    <div className="space-y-4">
                      <div className="bg-zinc-800/50 p-6 rounded-[2rem] border border-zinc-700/50 backdrop-blur-sm">
                        <Smartphone className="text-vibrant-green mb-4" size={32} />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Smartphones</p>
                      </div>
                      <div className="bg-zinc-800/50 p-6 rounded-[2rem] border border-zinc-700/50 backdrop-blur-sm">
                        <Cpu className="text-blue-400 mb-4" size={32} />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">PC Gamer</p>
                      </div>
                    </div>
                    <div className="pt-8 space-y-4">
                      <div className="bg-zinc-800/50 p-6 rounded-[2rem] border border-zinc-700/50 backdrop-blur-sm">
                        <Laptop className="text-purple-400 mb-4" size={32} />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Notebooks</p>
                      </div>
                      <div className="bg-zinc-800/50 p-6 rounded-[2rem] border border-zinc-700/50 backdrop-blur-sm">
                        <Tablet className="text-orange-400 mb-4" size={32} />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Consoles</p>
                      </div>
                    </div>
                    {/* Decorative glow */}
                    <div className="absolute inset-0 bg-blue-500/5 blur-[100px] -z-10 rounded-full"></div>
                  </motion.div>
                </div>
              </>
            ) : (
              <>
                <div className="max-w-2xl flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Instagram size={12} />
                    Social Media
                  </div>
                  <h2 className="text-4xl md:text-7xl font-bold mb-6 leading-[1.1] font-display tracking-tight">
                    Siga-nos no <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">Instagram</span>
                  </h2>
                  <p className="text-zinc-400 text-xl font-bold mb-2">@easytechstorers</p>
                  <p className="text-zinc-500 text-lg mb-10 max-w-lg mx-auto md:mx-0">
                    {slides[currentIndex].data.description}
                  </p>
                  <button 
                    onClick={() => window.open('https://www.instagram.com/easytechstorers', '_blank')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-xl shadow-pink-500/20 mx-auto md:mx-0"
                  >
                    Seguir Agora <Instagram size={20} />
                  </button>
                </div>
                <div className="flex-1 flex justify-center items-center">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative cursor-pointer group/insta"
                    onClick={() => window.open('https://www.instagram.com/easytechstorers', '_blank')}
                  >
                    {/* Smartphone Frame */}
                    <div className="relative w-[260px] h-[520px] bg-zinc-800 rounded-[3rem] border-[8px] border-zinc-700 shadow-2xl overflow-hidden">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-700 rounded-b-2xl z-20"></div>
                      <img 
                        src={slides[currentIndex].data.image} 
                        alt="Instagram Preview" 
                        className="w-full h-full object-cover group-hover/insta:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/insta/400/800';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover/insta:bg-transparent transition-colors"></div>
                    </div>
                    {/* Decorative glow */}
                    <div className="absolute inset-0 bg-pink-500/10 blur-[100px] -z-10 rounded-full"></div>
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur border border-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-black/40 transition-all z-30 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur border border-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-black/40 transition-all z-30 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === currentIndex ? 'w-8 bg-vibrant-green' : 'w-2 bg-zinc-700 hover:bg-zinc-600'
              }`}
            />
          ))}
        </div>

        {/* Abstract background element */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-vibrant-green/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-zinc-900/50 blur-[150px] rounded-full pointer-events-none"></div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void; key?: string }) => {
  return (
    <motion.div 
      layoutId={`card-${product.id}`}
      onClick={onClick}
      className="group cursor-pointer card-gradient rounded-3xl overflow-hidden"
    >
      <div className="aspect-square overflow-hidden bg-zinc-900 relative">
        <img 
          src={product.image} 
          alt={product.model}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-vibrant-green border border-vibrant-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-black shadow-lg shadow-vibrant-green/20">
          {product.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-zinc-100 mb-1 group-hover:text-vibrant-green transition-colors">{product.model}</h3>
        <p className="text-sm text-zinc-500 line-clamp-2 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-zinc-100">
            <span className="text-[10px] font-normal text-zinc-500 mr-1">À partir de</span>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.basePrice)}
          </span>
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-vibrant-green group-hover:text-black transition-all">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0]);

  const currentPrice = product.storagePrices && product.storagePrices[selectedStorage] 
    ? product.storagePrices[selectedStorage] 
    : product.basePrice;

  const currentImage = (product.storageImages && product.storageImages[selectedStorage]) ||
    (product.colorImages && product.colorImages[selectedColor]) ||
    product.image;

  const handleOrder = () => {
    const message = `Olá Easy Tech! Gostaria de encomendar:\n\n*Produto:* ${product.model}\n*Cor:* ${selectedColor}\n*Armazenamento:* ${selectedStorage}\n*Preço:* ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice)}\n\nEstá disponível?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5554991370566?text=${encodedMessage}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        layoutId={`card-${product.id}`}
        className="bg-zinc-950 w-full max-w-4xl rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:w-1/2 bg-zinc-900 relative">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={currentImage} 
              alt={product.model}
              className="w-full h-full object-contain p-8 opacity-90"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-vibrant-green transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-vibrant-green mb-2 block">
              {product.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">{product.model}</h2>
            <p className="text-zinc-400 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-8">
            {/* Color Selection */}
            <div>
              <h4 className="text-[10px] font-bold text-zinc-500 mb-4 uppercase tracking-[0.2em]">Cor</h4>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      selectedColor === color 
                        ? 'bg-vibrant-green border-vibrant-green text-black shadow-[0_0_20px_rgba(0,255,65,0.2)]' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div>
              <h4 className="text-[10px] font-bold text-zinc-500 mb-4 uppercase tracking-[0.2em]">Capacidade</h4>
              <div className="flex flex-wrap gap-2">
                {product.storage.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedStorage(size)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      selectedStorage === size 
                        ? 'bg-vibrant-green border-vibrant-green text-black shadow-[0_0_20px_rgba(0,255,65,0.2)]' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price and Action */}
            <div className="pt-8 border-t border-zinc-800 space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">Investimento</span>
                  <span className="text-3xl font-bold text-zinc-100">
                    <span className="text-sm font-normal text-zinc-500 mr-2">À partir de</span>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice)}
                  </span>
                </div>
                <button 
                  onClick={handleOrder}
                  className="w-full sm:w-auto bg-vibrant-green hover:bg-vibrant-green/80 text-black px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-vibrant-green/20"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </button>
              </div>

              {product.note && (
                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50">
                  <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                    * {product.note}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = ['Home', 'iPhone', 'iPad', 'MacBook', 'Xiaomi', 'Consoles'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = p.model.toLowerCase().includes(searchLower) || 
                           p.description.toLowerCase().includes(searchLower) ||
                           p.category.toLowerCase().includes(searchLower);
      const matchesCategory = activeCategory === 'Home' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen pb-20 bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-40 glass">
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-[95px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <img 
              src="/logos/Logo.png" 
              alt="Easy Tech" 
              className="h-14 md:h-[85px] w-auto object-contain brightness-110 contrast-110 cursor-pointer" 
              referrerPolicy="no-referrer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            
            {/* Desktop Category Menu */}
            <nav className="hidden lg:flex items-center gap-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-vibrant-green ${
                    activeCategory === cat ? 'text-vibrant-green' : 'text-zinc-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full flex-1 max-w-md">
            <Search size={18} className="text-zinc-500 mr-2" />
            <input 
              type="text" 
              placeholder="O que você procura?" 
              className="bg-transparent border-none focus:ring-0 text-sm w-full text-zinc-100 placeholder:text-zinc-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => window.open('https://www.instagram.com/easytechstorers', '_blank')}
              className="p-2.5 text-zinc-400 hover:text-pink-500 transition-all bg-zinc-900/50 border border-zinc-800 rounded-xl"
              title="Instagram"
            >
              <Instagram size={20} />
            </button>
            <button 
              onClick={() => window.open('https://wa.me/5554991370566', '_blank')}
              className="p-2.5 text-zinc-400 hover:text-vibrant-green transition-all bg-zinc-900/50 border border-zinc-800 rounded-xl"
              title="WhatsApp"
            >
              <MessageCircle size={20} />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2.5 text-zinc-400 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:text-vibrant-green transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-80 bg-zinc-950/80 backdrop-blur-xl border-l border-zinc-800 z-50 p-8 flex flex-col"
              >
                <div className="flex items-center justify-between mb-12">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Menu</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-6">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsMobileMenuOpen(false);
                        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`text-2xl font-bold tracking-tight text-left transition-all ${
                        activeCategory === cat ? 'text-vibrant-green' : 'text-zinc-400 hover:text-zinc-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </nav>

                <div className="mt-auto pt-12 border-t border-zinc-900">
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-6">Redes Sociais</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => window.open('https://www.instagram.com/easytechstorers', '_blank')}
                      className="flex-1 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-pink-500 transition-all"
                    >
                      <Instagram size={24} />
                    </button>
                    <button 
                      onClick={() => window.open('https://wa.me/5554991370566', '_blank')}
                      className="flex-1 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-vibrant-green transition-all"
                    >
                      <MessageCircle size={24} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {/* Dynamic Hero Banner */}
        <DynamicBanner products={PRODUCTS} onSelect={setSelectedProduct} />

        {/* Filters and Search (Mobile) */}
        <section id="catalog" className="mb-12 space-y-6">
          <div className="md:hidden flex items-center bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-2xl">
            <Search size={18} className="text-zinc-500 mr-2" />
            <input 
              type="text" 
              placeholder="Buscar modelos..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full text-zinc-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500">
              <Filter size={18} />
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                    ? 'bg-vibrant-green border-vibrant-green text-black shadow-lg shadow-vibrant-green/20' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold text-zinc-100 font-display">Disponíveis</h3>
              <div className="h-px w-12 bg-zinc-800"></div>
            </div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{filteredProducts.length} itens</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={() => setSelectedProduct(product)} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-zinc-900/50 rounded-[3rem] border border-zinc-800 border-dashed">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-700 border border-zinc-800">
                <Search size={32} />
              </div>
              <h4 className="text-lg font-semibold text-zinc-100">Nenhum item encontrado</h4>
              <p className="text-zinc-500 text-sm">Tente mudar os filtros ou a busca.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer Info */}
      <footer className="mt-32 border-t border-zinc-900 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="/logos/Logo.png" 
                alt="Easy Tech" 
                className="h-12 md:h-16 w-auto object-contain brightness-110" 
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              O melhor do mundo da tecnologia você encontra aqui. Inovação, performance e confiança em cada detalhe.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-zinc-100 uppercase tracking-[0.2em] mb-8">Categorias</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="hover:text-vibrant-green transition-colors cursor-pointer">Apple iPhone</li>
              <li className="hover:text-vibrant-green transition-colors cursor-pointer">Apple MacBook</li>
              <li className="hover:text-vibrant-green transition-colors cursor-pointer">Apple iPad</li>
              <li className="hover:text-vibrant-green transition-colors cursor-pointer">Xiaomi & Redmi</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-zinc-100 uppercase tracking-[0.2em] mb-8">Atendimento</h4>
            <p className="text-zinc-500 text-sm mb-6">Fale com um especialista agora.</p>
            <button 
              onClick={() => window.open('https://wa.me/5554991370566', '_blank')}
              className="flex items-center gap-3 text-vibrant-green font-bold hover:text-vibrant-green/80 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-vibrant-green/10 flex items-center justify-center group-hover:bg-vibrant-green/20">
                <MessageCircle size={20} />
              </div>
              (54) 99137-0566
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-zinc-700 uppercase tracking-widest">© 2026 Easy Tech Store. All rights reserved.</p>
          <div className="flex gap-6">
             <div className="w-1.5 h-1.5 bg-vibrant-green rounded-full"></div>
             <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div>
             <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
