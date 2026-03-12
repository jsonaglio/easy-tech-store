/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Smartphone, 
  Search, 
  ChevronRight, 
  Check, 
  X, 
  MessageCircle,
  Filter,
  ArrowRight,
  Laptop,
  Tablet,
  Cpu
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
    basePrice: 5299,
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
      '256 GB': 5299,
      '512 GB': 7599
    },
    category: 'iPhone',
    note: 'Valores para condição de pagamento à vista. Consulte nossa disponibilidade de cores e opções de parcelamento com nossos consultores pelo botão do WhatsApp.'
  },
  {
    id: '10',
    model: 'PlayStation 5',
    description: 'Experiência de jogo imersiva com SSD ultra-rápido.',
    basePrice: 3399.90,
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
      'Slim Digital': 3399.90,
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
      '256GB/8GB de Ram': 2099.90,
      '512GB/12Gb de Ram': 2399.90
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
  const featuredProducts = products.slice(0, 5); // Show first 5 products as featured

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  return (
    <section className="mb-16 relative group">
      <div className="bg-zinc-900 rounded-[3rem] text-white relative overflow-hidden border border-zinc-800 min-h-[450px] md:min-h-[500px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full p-12 md:p-20 relative z-10 flex flex-col md:flex-row items-center gap-12"
          >
            <div className="max-w-2xl flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-vibrant-green/10 border border-vibrant-green/20 rounded-full text-vibrant-green text-[10px] font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 bg-vibrant-green rounded-full animate-pulse"></span>
                Destaque: {featuredProducts[currentIndex].category}
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] font-display tracking-tight">
                {featuredProducts[currentIndex].model}
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl mb-10 max-w-lg line-clamp-2">
                {featuredProducts[currentIndex].description}
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => onSelect(featuredProducts[currentIndex])}
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
                  src={featuredProducts[currentIndex].image} 
                  alt={featuredProducts[currentIndex].model} 
                  className="w-full max-w-sm md:max-w-md h-auto object-contain drop-shadow-[0_0_50px_rgba(0,255,65,0.15)] rounded-3xl" 
                  referrerPolicy="no-referrer"
                />
                {/* Decorative glow behind image */}
                <div className="absolute inset-0 bg-vibrant-green/5 blur-[80px] -z-10 rounded-full"></div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {featuredProducts.map((_, idx) => (
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
        <div className="absolute top-4 right-4 bg-vibrant-green/10 backdrop-blur border border-vibrant-green/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-vibrant-green">
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
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const categories = ['Todos', 'iPhone', 'iPad', 'MacBook', 'Xiaomi', 'Consoles'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen pb-20 bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-40 glass">
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-[95px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logos/Logo.png" 
              alt="Easy Tech" 
              className="h-14 md:h-[85px] w-auto object-contain brightness-110 contrast-110" 
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full w-96">
            <Search size={18} className="text-zinc-500 mr-2" />
            <input 
              type="text" 
              placeholder="O que você procura?" 
              className="bg-transparent border-none focus:ring-0 text-sm w-full text-zinc-100 placeholder:text-zinc-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Shopping bag removed as it is not an e-commerce yet */}
          </div>
        </div>
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
