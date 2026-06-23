import { Product } from './types';

export const products: Product[] = [
  {
    id: 'aquavibe',
    name: 'Aquavibe 1.2L Set',
    description: 'Elevate your daily hydration with the Aquavibe Set. Engineered for clarity and durability, these 1.2L bottles feature a time-marking scale to keep your wellness goals on track.',
    category: 'Hydration',
    price: 42.00,
    originalPrice: 55.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1U26AkUnAGz9Ei1lkLvTQWRWtDBLMDe_i4nkEhSaVQYSowEG8mP5Qxg7Vg0plw_Pd63ZuOVl38qSp-IS3aUegv_h6VeqXW_LovHCdPPAWHKr-ab9OSitjRfD8ScTmeKGpkVfocdI8FdD9GGGgCukzjkODHA0PwMCuAeVMPzj5-bt62imC506V7Gi4ZIckifSoNU_oP8URjCIQlSV1-a5PJvoar4pF1lF5Xoql5GBevqgbZiBZt9sKPfcXw6bhOGb3Emcgj5QK',
    ratings: 4.8,
    reviewsCount: 124,
    isBpaFree: true,
    tags: ['BPA FREE', 'BEST SELLER'],
    specs: {
      capacity: '1.2 Liters / 28 oz',
      material: 'BPA-Free ECO+ Resin',
      dimensions: '28cm x 9cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'modular-spice',
    name: 'Modular Spice Shakers',
    description: 'Keep your spices perfectly organized, dry, and fresh with these modular plastic shakers. Features dual-sided lids for dynamic sprinkling or measuring.',
    category: 'Conservation',
    price: 11.50,
    originalPrice: 15.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr6ZO5wcRz5awPjQRXnTSEh38Zyw0OFhDanY0nV9GvGp8uphN0X6yrxsWVSADdpY_Gu-HfFpzyJ11yKY7ZeP0sjUg-gZ4rI4oE0vy7zcwbocXjN6xXLSKDlpqUZnGNjP-aSv00amGVTy9dNgsnMFf4Su-0MOYJ-qJdXq6QrO2RxCnopVIodwd2k599vNWO4h7pw0RjWW95Gi-M9MMBvFY12PbT7FF4QAuev6UG2ekoUbqRSmM26T1huKB_E2hMPZyraswNfV_0',
    ratings: 4.6,
    reviewsCount: 42,
    isBpaFree: true,
    specs: {
      capacity: '250ml each',
      material: 'BPA-Free Acrylic',
      dimensions: '10cm x 5cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'air-fryer',
    name: 'Air Fryer 3L Black',
    description: 'High-end kitchen appliance product shot of a black Tupperware Air Fryer. The lighting is sophisticated, with subtle highlights on the matte black finish.',
    category: 'Cookware',
    price: 120.00,
    originalPrice: 150.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW1x1dNJAWLKr7sbwZ2zzHfvpswSz-Aedg4jUhnviC7kgU3NyQeYu9tKL1-5GMBNSIicO7ZWQ6KHa5fey9snaFOAvKhXmxrU7jpdRJFt88DG2mZLohPEvpxzeZr2SPQE3ilwA2ZubNv8XLXfWYiQQt51Hdq8YXt4twPPt4KxNpMVwWtlFh0f-DpgtqwdNBgnSAgFk_90bEZJforBuKKsjp1lq71muTVvMZgeyIENocxP1Eh2wevs75z_u4qV6MNLro3aoRksdd',
    ratings: 4.9,
    reviewsCount: 89,
    isBpaFree: true,
    specs: {
      capacity: '3 Liters',
      material: 'High-Temperature Premium Polymer & Steel',
      dimensions: '32cm x 28cm x 28cm',
      dishwasherSafe: false
    }
  },
  {
    id: 'ultra-clear-oval',
    name: 'Ultra Clear Oval',
    description: 'Transparent, glass-like clarity but made of premium durable material. Showing them filled with pasta and grains, perfectly stacked inside your pantry.',
    category: 'Conservation',
    price: 22.00,
    originalPrice: 28.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz6c80dovyGHdlT989krTdBJQJEyx8vnCEbA6oJWJW-kss5BVFeDFRFKxdaJTp8nn87sehbx79rbIpTLb7qVhNWO0_Lkhe3_jMRM7b7-jnKVfyNAnJNlWmN9K1Q8m-IInIlE2LvFCOrP5YctxSVj7_WXV77Qk3Qi1-XRq-96WeN-O15siZIMJlPH83pHn7Jr3UeHy-Za2Lb7t9XQDEZHjqF0apW-k7yA6MzhznkduCdOsrR1SNqUsJiFa_5D87ATBR1xa3hMnr',
    ratings: 4.7,
    reviewsCount: 64,
    isBpaFree: true,
    specs: {
      capacity: '1.5 Liters',
      material: 'Premium Durable Tritan Plastic',
      dimensions: '22cm x 10cm x 15cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'aquasafe-500',
    name: 'Aquasafe 500ml',
    description: 'Best seller for everyday hydration. Simple, clean, and modern. Perfectly sized for school, office, or small fridge shelves.',
    category: 'Hydration',
    price: 9.99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8je6gtVSaBS57RTlfmnhxdTs9mp01wUjKyGgLuJvbO9VjGlnfpdllsb9pbuzjswgBsbv0Fl7MczzC-SZl01OIJ0AfylcnNT4v81yz9g2yMisBWe2NvBXsjTY5D8J2H2xDLw8mKpZ_0AiWWP1epGnrX8kCCUYYSGuQYRRWtDYusXDql8jzVQUrcBJSLZa9Heq6RScjq5dArxIYWSy5BYFxXTS0Bz58LXmiUQAF6vO_e-CrQRUONfICyq1z0_bx2-t-iV7c1A6L',
    ratings: 4.5,
    reviewsCount: 231,
    isBpaFree: true,
    specs: {
      capacity: '500ml',
      material: 'BPA-Free ECO+ Resin',
      dimensions: '19cm x 6.5cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'eco-brush',
    name: 'Eco Bottle Brush',
    description: 'Minimalist product shot of a bottle brush. The brush features a sleek white handle and soft gray bristles, photographed in a bright, clean kitchen environment.',
    category: 'Accessories',
    price: 12.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn4CPwcPb8iNfEFBebQw_TixrNlPQnV2byC4W4uUyDBCpEairTjcbFEWQgyIn4jL80hTy1MRmy1X5uILr85NjMfz7xQw3xq_CAMwEhuTl7L-sRDN6YOtr__p8NjednSYa1BtaEJoghnLbiSA02VHYeFtmMhMkF0SkPignbtikqZqqE4TQu75SmfUbe_u51LNeHPwfYtcvQ6mZXuHm1RSAdkwJoK-SxWT9Haf3GTdG6-CRjWvcCqNIlvO5EvSsLbrXV279ZUkB0',
    ratings: 4.4,
    reviewsCount: 54,
    isBpaFree: true,
    specs: {
      capacity: 'N/A',
      material: 'Recycled Polypropylene & Nylon Bristles',
      dimensions: '35cm x 5cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'silicone-straws',
    name: 'Silicone Straws (2pk)',
    description: 'A pair of reusable silicone straws in a soft mint green color. They are lying on a textured linen surface with soft diffused daylight highlighting their flexible premium material.',
    category: 'Accessories',
    price: 8.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3ddwqQdOrd9ichot0-X_BCsMAHGNQdsmc0uE5OQYtZD8_Y3tNp8XNLiQ105YTeUdFXcRDWrnja-CZ8fhNXWln08yICUAj6lmCAwzkuBNj8qNAdBkKKAVmnSiHmpfb_ThagUm72a20XsTCosRS0HBrKSCFMUaH2Mhr23tp-F8DBFUmD28sFBfnKbR1za7mNErSYGeFLtJ21GUcQtvlFj0hwVLcDd5OS55HLv-sVDvlRlpRTmnSgc9N43gQowllgRYD93s-Mhzv',
    ratings: 4.8,
    reviewsCount: 78,
    isBpaFree: true,
    specs: {
      capacity: '2 straws per pack',
      material: 'Medical-Grade Premium Silicone',
      dimensions: '22cm length',
      dishwasherSafe: true
    }
  },
  {
    id: 'eco-bottle-750',
    name: 'Eco Bottle 750ml',
    description: 'A clean product shot of a Tupperware Eco Bottle in a soft, mint green color. The bottle sits against a minimalist Japandi background with warm sand tones and soft diffused lighting.',
    category: 'Hydration',
    price: 12.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSZHjc4XKb2xdhdzCbvB6GKH6469e0Z8Y9DBq5aTg9Zo-uwTSLD7p0QIWqqaO3bqLA6BA2Va7cthBZMeUjlT1daneHwdQMFtyccx3zaCkYuNhXImY_NMhkS_e0UbD8BVCJEwO6hvuk5e5NmeqzoNTj6uQFVY2i9MPZXyKFlBt1nM1XyekuJi0asX0g2ZLjh3CUZYiBqKdz1XBZ_4zDJ_ZhwZUHTeVTiGCjBm3vpp94sCIZ6qFqz2Nk6eoy7TtjAAuxQ5LftVVq',
    ratings: 4.7,
    reviewsCount: 165,
    isBpaFree: true,
    specs: {
      capacity: '750ml',
      material: 'BPA-Free ECO+ Resin',
      dimensions: '24cm x 7.5cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'modular-mates',
    name: 'Modular Mates Set',
    description: 'A premium set of Tupperware modular mates containers for dry food storage. Clear body with vibrant red lids, organized neatly on light wood pantry shelves.',
    category: 'Conservation',
    price: 45.00,
    originalPrice: 54.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJhbWm0NQsY-KcXD8vMMHMhs--tB0mYejnWZ7ndHh9ok16Y5-YpniIDnQ71VOmPUdyPZ8cBvgg2r4LQaI1qAo3UR7RkH1LLtfhw7a083LsMxIp7TjV0x8TSEj3H5eVViZjNPso6Wx9ssmwSQzANscrr92g4MbC1EcxS_LvIeAEP6nIecBuCrsHFW8onHSCVg1HfMz8non8ilby44PhVILmcoWuEdyUiRYoR6e4Cugt7M4ArEOxc5OfMTKxPn38EtDYvY_viQiZ',
    ratings: 4.9,
    reviewsCount: 341,
    isBpaFree: true,
    specs: {
      capacity: 'Set of 4 (Various Sizes)',
      material: 'High-Density BPA-Free Acrylic',
      dimensions: 'Modular Stackable',
      dishwasherSafe: true
    }
  },
  {
    id: 'bottle-brush-basic',
    name: 'Bottle Brush',
    description: 'Eco Bottle Brushes with natural bristles and sustainable handles, photographed against a clean soft off-white background with subtle shadows.',
    category: 'Accessories',
    price: 4.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt2iPNw-704KVC54Tf9oUcEM_7Je4KsE4axOdbq979DUw005QyW8_OhCJ-lJ1hpn9_r23_cvO2JPpcNU1NdRjUsHJt2QiFFn-cpQO0vaVC7xdBdlPmV5htX5KIIQdQs63GArVSZmfMchNg3G8l2CZ8AiQMMjhydXa0zRNCFxFyuG5eeEOBkSBl_cygRE3hhZ1Zw10Ireca9NUonJWhPZYKaL4f67whYpl9ZsmyWDYzjNdAsBiU_mrZQUM9HoCVXwY1WilbomzQ',
    ratings: 4.5,
    reviewsCount: 22,
    isBpaFree: true,
    specs: {
      capacity: 'N/A',
      material: 'Sustainably Source Beechwood & Agave Fiber',
      dimensions: '30cm x 4cm',
      dishwasherSafe: false
    }
  },
  {
    id: 'silicone-divider',
    name: 'Silicone Divider',
    description: 'Vibrant dividers to separate food in bento boxes. Soft silicone, highly responsive fit, and dishwasher safe.',
    category: 'Accessories',
    price: 8.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOIUoxYDiDW5P1x4SpTDql6DQzI5pfGUFt_NyuDhP1uelzeNRXMZ3uw83DU-ifU2_QnLAo6sKN9YFGKP03XcD-Y74d2LbZZDEwFdE-3ynxoE2A10gf9-QHGqKaaJkyXnT99pW9vaXdVATPIPsVJT5IkJ1c498V2TbxBIb0uNDo5AH3RfU6m-zWHgCIpLo2heOPJF8L0TFHEcG03hCz_1AW8IMHDGOQ02n8FZOlDgrCnVApV_YuvAGm_RsGFWlcYSiaPocJCZ50',
    ratings: 4.6,
    reviewsCount: 30,
    isBpaFree: true,
    specs: {
      capacity: 'Set of 3 dividers',
      material: 'Medical-Grade Premium Silicone',
      dimensions: '6cm x 6cm x 4cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'eco-togo-set',
    name: 'Eco+ To-Go Set',
    description: 'A minimalist overhead studio shot of a vibrant red Tupperware Eco Bottle and a matching sandwich keeper, set against a warm sand background.',
    category: 'Lunch',
    price: 24.99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoqJZYhoPlWZO5PJpmHNvHWLTX9yo0SqaCL-kHIkKo4hFnduoIyn1zxMFlm7PlHe-wphIPQvNoHiEr3NOdWTSaFWHMpXB46Dey3wsVa3UDCdPcoM12RamZdVZ6_pQhZtXcWIqjoOeKosSsvr9a6mkgz16pw1tfbvb0CJE9c19FT0MG7w9dip4MYoIBGIWPIMM__syOTbm47X1EQlsWwq5yQp_LnCzUACMnz5urLgka5xNAa__AWY8ij3zX6r9BM2TwpJfsvqnG',
    ratings: 4.8,
    reviewsCount: 92,
    isBpaFree: true,
    specs: {
      capacity: 'Sandwich box + 500ml Bottle',
      material: 'BPA-Free ECO+ Resin',
      dimensions: 'Compact travel size',
      dishwasherSafe: true
    }
  },
  {
    id: 'eco-fresh-container',
    name: 'Eco+ Fresh Container',
    description: 'translucent Tupperware food containers with bright red lids, arranged neatly on a light oak wooden kitchen counter. The lighting is soft and natural.',
    category: 'Conservation',
    price: 24.00,
    originalPrice: 32.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn9S-4xGo_4t0Ow2BEWQFEb3ZkIMDeU7_-GzJcTMAWFv7Vy1xmzItxP1V3EzkuseggMGNj5xJxa4P4bFx417bUfuA0x54qNBGBDdVf_B7GoI4X2l1G79c7PTrhzhLvpRP8Kv5kcPJb2xlXw7aPiWICy4MwOb0uZOhTejVXscRy1Uq8ocDKQ5HqRTRQbFUYeii5Vo55h1SixZ4RFhWfIGhnmJ8yuQtBqzgAIs0NgFALwNZK9qLL7P5VhTDL3U5YDuKAzJRf3qbA',
    ratings: 4.7,
    reviewsCount: 110,
    isBpaFree: true,
    specs: {
      capacity: '1 Liter',
      material: 'BPA-Free ECO+ Resilience Polycarbonate',
      dimensions: '18cm x 12cm x 8cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'modular-mates-oval',
    name: 'Modular Mates Oval',
    description: 'Large circular Tupperware salad bowl with a vibrant green base and a semi-transparent lid. SIT in modern Japandi breakfast nook environment.',
    category: 'Conservation',
    price: 18.50,
    originalPrice: 22.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvlyuJ1DFiIfhBBD8cKVA0w4NvxF2ffkI0OfARGjUgQVGvWRTNitm78t1TMBcqRt21c_oYtYDCxDEe80CjSd7R2XrzuPA6KCw3EZHGFCn8jWZGC1drksyPgzpoJxjXqta-tz8XA4-jFAvZYdFBXSGuQSbXyJPi20xt5O40KtV7XxNxqUXqjC_BluD5SJxyBlro09SJZHtr89OMaTO4oWa2X4ZAv70rOj3umMzmxQQb9DGKidNNF8K4zMqDDVIZ1ERBhWRW2SN3',
    ratings: 4.5,
    reviewsCount: 75,
    isBpaFree: true,
    specs: {
      capacity: '2.3 Liters',
      material: 'BPA-Free ECO+ Resin',
      dimensions: '22cm x 22cm x 12cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'snack-reusable',
    name: 'Snack Reusable Set',
    description: 'Set of four small, stackable Tupperware snack containers in soft pastel colors like mint and sand positioned on white marble surface.',
    category: 'Conservation',
    price: 15.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy4ERf6awVkPR3wbbkVPg43RNQRxw6_Q9m_Nnzimg6MlIZOJPN14LKuYsK4ukZxTmpL5zxcp_irMZtUUrZeJ0N184CvsSd51FfiUwSjq1dTN8wb6gkRqHJmLqRYGoPrkWaGTodDygF3WMEQaNKRHL3FIe0aqf3fFxBRsMpaTNied1Ws9-q_gTf2nNBaQC_NMpY4mauiU_A2g_qVJbc-lSjSrfRVFjhslAHcSTRJhzye5T2lBy1-KOpclySti9ngnmG_tc9RF2Q',
    ratings: 4.8,
    reviewsCount: 94,
    isBpaFree: true,
    specs: {
      capacity: '300ml each (Set of 4)',
      material: 'BPA-Free Recyclable Polypropylene',
      dimensions: '8cm x 8cm x 6cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'fridgesmart-large',
    name: 'FridgeSmart Large',
    description: 'A large, clear Tupperware storage container filled with fresh berries, placed inside a modern clean refrigerator, highlighting venting freshness system.',
    category: 'Conservation',
    price: 36.00,
    originalPrice: 45.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJKAmiBf-5D7dmjDxYne4ZKO8ZBs7wRdYe8WGLM7K44dptMHgXd0PX6NkXBZt1dgqZ562x9Bu0kK3tt7IVz4ZKz-zhochjDMDVm5hpnCamp3WYbHN3lTVxOWyfaYVZERbeWRYrZn2qkPpuqIe78EIC5nXYbbzFK0eRBE4qRYJFfArHZmFG9sXB5VtWtGTg-F_axnRLZG85gHuFGKCeHuNb0YBG5rsKyHMuCZDwNONOok4TtxtVfQNQ-e-ZpCMmTn82q50SCVM-',
    ratings: 4.9,
    reviewsCount: 180,
    isBpaFree: true,
    specs: {
      capacity: '4.6 Liters',
      material: 'High-clarity durable BPA-free Acrylic',
      dimensions: '38cm x 19cm x 14cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'crystalwave-pitcher',
    name: 'CrystalWave Pitcher',
    description: 'Elegant Tupperware wine and beverage pitcher with sleek minimalist handle design filled with infused water and cucumber slices.',
    category: 'Conservation',
    price: 28.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQE3ztlNT1LDNs2QLd8GIi_TXv2AI2ErxytZhn2GqaIS5-CiGtv6roHJ7AjvMJDJVKNdeADQQoR735V4FlFrwoqfEy661IwLzyX6rsUfSOnah8GjtDkTfMrGm4MIqumXzgO4cjNg20MHipOJsKZw8WMzzyeIxo3FNwRtp6oQGdQeFaRaI0FyOxXGTPtywQ_NDK0KDPz9eU2e2Cfwo1Pm-n-vuE-Bfw4EZhEf6-d6J8Abo3DCSh3-V857qYwe_l7I6fCbD05wAx',
    ratings: 4.7,
    reviewsCount: 52,
    isBpaFree: true,
    specs: {
      capacity: '1.8 Liters',
      material: 'Premium Scratch-Resistant Copolymer',
      dimensions: '24cm x 12cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'onthego-bento',
    name: 'On-the-Go Bento',
    description: 'Minimalist Tupperware lunch box set with multiple compartments in charcoal grey and soft cream. Revels fresh healthy food.',
    category: 'Lunch',
    price: 19.99,
    originalPrice: 24.99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-3i6P1hp5HSHOoZjUuUJcibIuJ4DFfRmUwd_f_uG4g7awgj8sJ00webgIMJNp5XzI2YcJppfi4vqtfrCgwXHKB2dKTPVt3uH1xrnVSX-ZcP9fhnPqQeRM29zzKpLsDcivH4VFId_nhpBkiv2fpucFUId05Zg7WXELwRmYYIzfBPfJbEjFQ5kyA9KdOJfFsQfBNL-zM1vkutoErDSNsA7U3Y1jhvYngc-oKIPOztDd0_Ycvn_si7wQICGblUl0TUDeFmi4U4xT',
    ratings: 4.6,
    reviewsCount: 112,
    isBpaFree: true,
    specs: {
      capacity: '1.2 Liters with compartments',
      material: 'Durable Spill-proof ECO+ Resilience',
      dimensions: '22cm x 16cm x 6cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'eco-water-bottle-teal',
    name: 'Eco+ Water Bottle',
    description: 'A premium Tupperware Eco+ Water Bottle in soft teal color. Beautifully presented in a minimalist high-key studio setting with delicate shadows.',
    category: 'Hydration',
    price: 19.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ3D_E5Yiu89hbgPFsiS_tDzJVmv6D8UBMNfLLfP3_iwW55sNu3fdwZEc_pF7jTrdFPmCu9KCQRP9FOiswER-48OvfsM-EFenDdI8pzPLC03k-Hsc3lbETjkFWu5z97lQl4nVBsKv1VoOtwG3cKIvO0xoWuQtRsA_MMHVUebs7GIoCWrQJ-N0dyrohlPgitb8xvQYkwxNe4__k__LgWsN2U7EJR82g_y6Y2z82NcjpPuqvDW42ZtfD2Uhz1x3sNla8Nm9hJace',
    ratings: 4.8,
    reviewsCount: 88,
    isBpaFree: true,
    isServing: true,
    specs: {
      capacity: '750ml',
      material: 'BPA-Free ECO+ Resin',
      dimensions: '24cm x 7.5cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'ventsmart-small-high',
    name: 'VentSmart Small High',
    description: 'A set of minimalist Tupperware VentSmart containers. Varying sizes with clear bodies and soft grey lid system, organized on light wood.',
    category: 'Conservation',
    price: 24.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU8NfgdbxhBTxVv7sg7zMGWHUT8Lpk1Ofngh8DeWvBQaWJUqaTyxzAyh3HLKOUte_a45Cw51xAGA3NmVaahODrmSIvotqBCayI63qxFO0LK2kda2iNlbqQwBo9HGI-0bquw9gqE4OFHgwrL16BUz7asMiicbOJeipyv3l6UjXKpAf7Tqs72Hx0o0LK1xu8_q9k-2D1M2MLY2xyqmD1MvGGT5jmhxi518x993z11EGkk8dH_0X54TvG9Eu-FizOdSmiYV38qu3X',
    ratings: 4.7,
    reviewsCount: 66,
    isBpaFree: true,
    isFridgeSafe: true,
    specs: {
      capacity: '1.6 Liters',
      material: 'Tritan BPA-Free plastic',
      dimensions: '14cm x 14cm x 16cm',
      dishwasherSafe: true
    }
  },
  {
    id: 'clear-bowl',
    name: 'Clear Collection Bowl',
    description: 'Sleek Tupperware Clear Collection bowl featuring sophisticated crystal-clear finish filled with fresh vibrant greens.',
    category: 'Conservation',
    price: 32.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH2HTwcg84BUl-v8SU9hkBlHiVDXLooslgB5w4QWooLDNS2dim-Nf4hu_nz66QaLrlJHZ1hz1frBZiXI7wFiKN13LP-MINH-W7_gQow5W7eYrmgbwma3hDqIH4lA9tlU9KOxPRP_V00e_M_DC02V2f6GAt7feLX2t5o8Sl4pr82HiKe7K4lYYvRZ-WzTQWOe6hhZjOO-KezYgcWt6CnoTC4aEA1wUE9jHZ0YUWRi4-VorEk63UdeRqHvDdWRjBY-vmScNmBlJ5',
    ratings: 4.9,
    reviewsCount: 104,
    isBpaFree: true,
    isServing: true,
    specs: {
      capacity: '2.4 Liters',
      material: 'Glass-like Premium Acrylic',
      dimensions: '24cm diameter x 10cm',
      dishwasherSafe: true
    }
  }
];

export const userProfile = {
  name: 'Sarah Chen',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK5FI8AzjU0riA1rSbpKcwG6pwVPC5U8Rv8PTliFoCANTpVubvFMg1MDtPV_6Jmp5wHLuAuYOM8WEfNSxR1Cjdh0q02NY0Z6VU2y1jv0Rj72hOUhipV__TD7EuVeFGPuUaX_Z-unqS-eexYacb81_dtX4_TqOJJ-kBbmV63Kj9orxQT_Y8tVtvgRpEwRzabXotXlbQj9cq0gQ_LFsCELSDc3TNdcY1L_CNrcmT9OtGU1N4BgbFdfTxOGVmqxz_BFrUvzjffUY-',
  memberSince: '2022',
  plasticSavedBottles: 42
};

export const mapsImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6ArRYlZDGHcDJ1p28My5TSX7jR47FhgdcsCS7OeXe3kZxg_U_e7iqHhLb33cYBcAuXKMipR8nXmOLBMmahbQbS85rLmO8oTbzUqP2f9Yv_uN2E-pn85vVzk0GZ3r769bMyRE_JqsklTM2bO0bUAliTKZHrl4LYNPPKA64t-gjBGPq-LLhxjdK_6y9O4cayRu-9ICia7Kn9YkXuWP084Q7_lu5jocozumWY7t0T5JvYcrxwFgQ_BicgZENqsNbmbRkHsNmhiQY';
export const pantryImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJJemp2QGw-uerswyKE-YYX28Vp7GpkrZRJ5KE_a93M3FFFDAP-w2hSP0nVFIz1Ei5bq_wAeu_IiFVnEaExR8ea0vwz3aOKn6d656zDre-JRe7eJDVl0u2BeaaecpN1I9ozAZIEBfEFUloXzX6Ui6S0EswhkmZCRuLbDd2hIFKavE7i12I24-m7eZ3PfvqOzxG31JKzaCXsNXWQIuci4d2aqjil2W8ApJzcn20CRlXNEfaBBq6yjJXihT3KgdDsBR_JATbSNyu';
export const heroImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkEl4qnls5OAvPjUfcobv6AS0zr8EAgfKZ9Hk38zAKSwNUtcTm_zh7khVXxUcyC0qFaZdGsqq_eABsi_eW7kq2EyhK6VQZTIUcqAKPr_4lv6avXoCJx6j2b9qFFxFhKnZzuE82TJsw0ZFRGAhItcZiuDdyXko256aejqcrTURoQ-7EhYw02DV1-gHsBh6t4VPJsVX83i51g9gVYKKsQMR_Qft-YNOGyTUea8QpfoAvl_-0x0kzbgdvCgeMgy-nwmgTBGBTGZJz';
export const starterSetBannerImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYIPtrgNkTh1JBVAMr0OLnWiHEc8Rb_Ta36uvuQb0hE7fZ3YLbQy77J4sWkPFJRvzQv5HE9YZEt85iqRIblur8YRhqfckTPn3LfK4mLhVTVNbcSPphPHeNu2_gjQUzj7Xd2HtrymMZ2K89QKZHN1724l2v6YGMYew7ZpKCubX34azTf85ZXU-ld9FYNeFOKF5ppQh5KsPq1vnEM1dODAMKNL8Xjlk5ax8G519DYg6DEaPgIg-QyGLSxMpzvjw3ciEHzlEXl5HP';
export const pinkCuratedStarterSetImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcsfwar2cX98GWKdZ-VdNpk8SF6MeWt2WRUhdFFzU5GGQO7WH5RMz2ghEFsBH9OxmW9T7tfZRvtxKWms3YUQPdqXuhjbf9d8Q44iOTkYEd704zoscxSTU3tvAWTEU1Ww6MWsklnbw_tApw8ZTEIcnMio4h1jWoO49rI91ht0PyhP--U83EXMIH3cN3HjneEooWH4pk89LE6kvbu-yvEmXOS2_5p5rkx7wuOxGOVTUE3BqcSOYR-61Sb2RCZtoPTWv_caTdBdkW';

export const seenInKitchenGallery = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMfmxaPtmxTU25ucHaldPZLlHhLetVU2I0OP12QZtnN_fKlsoBbMERLjzsUabDCJkn2ShxG7zW3vRjh9EDRYcCdcBI7lX_poTTHOhfX7QGqMIccI3dKx9qquZRwHw6xI5hWpYlCf7h46nRyzC-f3C0HcJy9Yk6CDPAGIiSki3zf4H5I9_TRH6qhxg9-5aVQS6k36s6ud451e5OSx_S5wputPO8ANmA69F8w1hD8ZtEs21Hd4e_FXB6N60H8G2E1rFdKnwlWxEo',
    rating: 5,
    quote: '"Literally changed my pantry game. So clean!"',
    author: '@modern_home'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApFIbT80VKHHmej4-49NncCwvaF0xN345zsSuw57Zb2g90cyGvJ7TBUdBXIlFIMeTFGBZY8gp_e2Uuz7eK-qSZhJjM7wV2KVP_QFTJir9zwbwnkiKslU_GWwDCrlJiOQFzanPXq6vwvPpsmUsYyotYSdwiUVuT16Exr0563k_0GZQSaO6ZJuf5W7A4wraTcm_Jul_hmJqPYZjgYZHVNgCIk0c0wNxnfU_nocmxCevnx3nenr3M7LNJtzLnqwFmZFZLY9C-tucu',
    rating: 5,
    quote: '"Finally found bottles that don\'t leak in my gym bag."',
    author: '@fitness_junkie'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmOwRNG25XBOR5qvF6H_s8nTrq2bO5WBPexEVf3YRG5xsyPcdpX87CoVeSTu2RUELP85ba7qM28zc9ukQHnynAItqzKj01fidNDHSg0AVHJMM4VcfEF2GWPInvQSUmjejzORhbUnuUwp45Pps0auijahyXfVQQV2vZoYPJag7mGf54ylVMd8US4LuL6Z3ondrSQdr8vc9t7cCGXw08BAU05FH4xF5JfiAdfx4H5HPsKAFPCRqmtdpXy760-16NnSD8tTTpwgjr',
    rating: 5,
    quote: '"Best investment for a waste-free kitchen!"',
    author: '@green_life'
  }
];
