import { Category, LearningItem, QuickScene, SubSceneData, ListeningContent } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'life',
    title: 'Life Enlightenment',
    chineseTitle: '生活启蒙',
    description: 'Daily routines, eating, and health.',
    icon: 'Utensils',
    color: 'bg-orange-50 border-orange-200 text-orange-700',
  },
  {
    id: 'play',
    title: 'Play & Growth',
    chineseTitle: '游戏成长',
    description: 'Indoor/outdoor play and cognitive development.',
    icon: 'Gamepad2',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
  },
  {
    id: 'emotion',
    title: 'Emotion & Social',
    chineseTitle: '情感社交',
    description: 'Emotions, family, and manners.',
    icon: 'Heart',
    color: 'bg-pink-50 border-pink-200 text-pink-700',
  },
  {
    id: 'explore',
    title: 'Explore World',
    chineseTitle: '探索世界',
    description: 'Nature, animals, and festivals.',
    icon: 'Palmtree',
    color: 'bg-green-50 border-green-200 text-green-700',
  },
];

export const CORE_ITEMS: LearningItem[] = [
  {
    id: 'apple',
    categoryId: 'life',
    subCategory: '好好吃饭',
    title: 'Apple',
    chineseTitle: '苹果',
    icon: 'Apple',
    tags: ['fruit', 'eating', 'red'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Apple',
        chinese: '苹果',
        phonetic: '/ˈæp.əl/',
        imagePrompt: 'A single red apple, close up, clean bright background, highlighting shape and color, cute cartoon style',
        audioText: 'Apple',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Red apple',
        chinese: '红苹果',
        imagePrompt: 'A vibrant red apple, cute cartoon style',
        audioText: 'Red apple',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'This is an apple.',
        chinese: '这是一个苹果。',
        imagePrompt: 'A baby pointing at a big red apple on a table, happy expression, cute cartoon style',
        audioText: 'This is an apple.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'I like apples!',
        chinese: '我喜欢苹果！',
        imagePrompt: 'A happy baby holding an apple and smiling, cute cartoon style',
        audioText: 'I like apples!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['重点练习/æ/音，口型夸张示范', '结尾/l/音要轻轻带出'],
      },
      tips: {
        intro: '拿出真实苹果 "Look, an apple!"',
        repeat: '每次吃苹果时都重复 "apple"',
        expand: '从颜色、大小、味道等多角度描述',
      },
      activities: {
        title: '水果找一找',
        instruction: '把苹果藏在房间某处，问 "Can you find the apple?"',
        expansion: '找到后鼓励 "You found the apple! Good job!"',
      },
      scenarios: [
        '超市购物时指认苹果',
        '切苹果时说 "Cut the apple"',
        '分享时说 "Share the apple with mommy"',
      ],
      resources: {
        song: 'Apple Round, Apple Red',
        book: 'Ten Apples Up On Top',
        craft: '用红色颜料画苹果',
      },
    },
  },
  {
    id: 'mom',
    categoryId: 'emotion',
    subCategory: '我的家人',
    title: 'Mom',
    chineseTitle: '妈妈',
    icon: 'Heart',
    tags: ['family', 'people'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Mom',
        chinese: '妈妈',
        phonetic: '/mɑːm/',
        imagePrompt: 'A warm, smiling cartoon mother face, gentle expression, soft colors',
        audioText: 'Mom',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'My mom',
        chinese: '我的妈妈',
        imagePrompt: 'A baby hugging mom, warm scene, cute cartoon style',
        audioText: 'My mom',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'I love mom.',
        chinese: '我爱妈妈。',
        imagePrompt: 'A baby kissing mom on the cheek, hearts in background, cute cartoon style',
        audioText: 'I love mom.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Mom, hug please.',
        chinese: '妈妈，抱抱。',
        imagePrompt: 'A baby reaching out arms to mom, cute cartoon style',
        audioText: 'Mom, hug please.',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['双唇闭合发/m/音', '发音要饱满、亲切'],
      },
      tips: {
        intro: '指着自己说 "I am Mom."',
        repeat: '在日常互动中多自称 "Mommy"',
        expand: '描述妈妈正在做的事情，如 "Mom is cooking."',
      },
      activities: {
        title: '妈妈在哪里？',
        instruction: '玩躲猫猫，问 "Where is Mom?"',
        expansion: '出现时说 "Peek-a-boo! Here is Mom!"',
      },
      scenarios: [
        '早起问候 "Good morning, Mom."',
        '需要帮助时引导宝宝叫 "Mom"',
        '看照片时指认 "This is Mom."',
      ],
      resources: {
        song: 'I Love My Mommy',
        book: 'Are You My Mother?',
        craft: '给妈妈画一张爱心卡片',
      },
    },
  },
  {
    id: 'dad',
    categoryId: 'emotion',
    subCategory: '我的家人',
    title: 'Dad',
    chineseTitle: '爸爸',
    icon: 'Users',
    tags: ['family', 'people'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Dad',
        chinese: '爸爸',
        phonetic: '/dæd/',
        imagePrompt: 'A warm, smiling cartoon father face, gentle expression, soft colors',
        audioText: 'Dad',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'My dad',
        chinese: '我的爸爸',
        imagePrompt: 'A baby hugging dad, warm scene, cute cartoon style',
        audioText: 'My dad',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'I love dad.',
        chinese: '我爱爸爸。',
        imagePrompt: 'A baby kissing dad on the cheek, cute cartoon style',
        audioText: 'I love dad.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Dad, play please.',
        chinese: '爸爸，玩。',
        imagePrompt: 'A baby pulling dad\'s hand to play, cute cartoon style',
        audioText: 'Dad, play please.',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/æ/音要张大嘴', '结尾/d/音要轻快'],
      },
      tips: {
        intro: '指着爸爸说 "Look, here is Dad."',
        repeat: '在日常互动中多自称 "Daddy"',
        expand: '描述爸爸正在做的事情，如 "Dad is working."',
      },
      activities: {
        title: '爸爸的大手',
        instruction: '宝宝的小手放在爸爸的大手上，说 "Big hand, small hand."',
        expansion: '击掌说 "High five, Dad!"',
      },
      scenarios: [
        '爸爸下班回家时问候 "Welcome home, Dad."',
        '需要举高高时引导宝宝叫 "Dad"',
        '看照片时指认 "This is Dad."',
      ],
      resources: {
        song: 'Daddy Finger',
        book: 'My Dad',
        craft: '给爸爸做一个领带折纸',
      },
    },
  },
  {
    id: 'baby',
    categoryId: 'emotion',
    subCategory: '我的家人',
    title: 'Baby',
    chineseTitle: '宝宝',
    icon: 'Baby',
    tags: ['family', 'people'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Baby',
        chinese: '宝宝',
        phonetic: '/ˈbeɪ.bi/',
        imagePrompt: 'A cute, smiling cartoon baby face, big eyes, soft colors',
        audioText: 'Baby',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Cute baby',
        chinese: '可爱的宝宝',
        imagePrompt: 'A baby smiling at the camera, cute cartoon style',
        audioText: 'Cute baby',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'I am a baby.',
        chinese: '我是一个宝宝。',
        imagePrompt: 'A baby pointing at themselves in a mirror, cute cartoon style',
        audioText: 'I am a baby.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Happy baby!',
        chinese: '开心的宝宝！',
        imagePrompt: 'A baby laughing and clapping hands, cute cartoon style',
        audioText: 'Happy baby!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['双唇闭合发/b/音', '注意双元音/eɪ/的滑动'],
      },
      tips: {
        intro: '指着宝宝说 "You are a baby."',
        repeat: '在镜子面前指着宝宝说 "Look at the baby."',
        expand: '描述宝宝的特征，如 "Soft baby skin."',
      },
      activities: {
        title: '镜子里的宝宝',
        instruction: '和宝宝一起照镜子，指着宝宝说 "Where is the baby?"',
        expansion: '宝宝指认后说 "Yes, there is the baby!"',
      },
      scenarios: [
        '洗澡时说 "Clean baby"',
        '睡觉时说 "Sleepy baby"',
        '穿衣时说 "Pretty baby"',
      ],
      resources: {
        song: 'Baby Shark',
        book: 'Baby Happy, Baby Sad',
        craft: '给宝宝做一个手印画',
      },
    },
  },
  {
    id: 'milk',
    categoryId: 'life',
    subCategory: '好好吃饭',
    title: 'Milk',
    chineseTitle: '牛奶',
    icon: 'Coffee',
    tags: ['drink', 'eating', 'white'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Milk',
        chinese: '牛奶',
        phonetic: '/mɪlk/',
        imagePrompt: 'A glass of white milk, cute cartoon style, clean background',
        audioText: 'Milk',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Drink milk',
        chinese: '喝牛奶',
        imagePrompt: 'A baby holding a bottle/cup of milk, cute cartoon style',
        audioText: 'Drink milk',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The milk is yummy.',
        chinese: '牛奶很好喝。',
        imagePrompt: 'A baby with a milk mustache, smiling, cute cartoon style',
        audioText: 'The milk is yummy.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'More milk, please.',
        chinese: '请再给我一点牛奶。',
        imagePrompt: 'A baby holding an empty cup towards mom, cute cartoon style',
        audioText: 'More milk, please.',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/ɪ/音要短促', '结尾/k/音要清晰但轻柔'],
      },
      tips: {
        intro: '冲奶粉时说 "Look, white milk."',
        repeat: '每次喝奶前问 "Do you want milk?"',
        expand: '描述牛奶的状态，如 "Warm milk."',
      },
      activities: {
        title: '干杯游戏',
        instruction: '和宝宝一起拿杯子说 "Cheers! Drink milk."',
        expansion: '喝完后说 "All gone! Yummy milk."',
      },
      scenarios: [
        '早餐时间喝牛奶',
        '睡前喝奶 "Bedtime milk"',
        '在超市看到牛奶盒时指认',
      ],
      resources: {
        song: 'Milk Song',
        book: 'The Milkman',
        craft: '用空牛奶盒做小手工',
      },
    },
  },
  {
    id: 'banana',
    categoryId: 'life',
    subCategory: '好好吃饭',
    title: 'Banana',
    chineseTitle: '香蕉',
    icon: 'Apple',
    tags: ['fruit', 'eating', 'yellow'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Banana',
        chinese: '香蕉',
        phonetic: '/bəˈnæn.ə/',
        imagePrompt: 'A bright yellow banana, cute cartoon style, clean background',
        audioText: 'Banana',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Yellow banana',
        chinese: '黄香蕉',
        imagePrompt: 'A bunch of yellow bananas, cute cartoon style',
        audioText: 'Yellow banana',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Peel the banana.',
        chinese: '剥香蕉。',
        imagePrompt: 'A hand peeling a yellow banana, cute cartoon style',
        audioText: 'Peel the banana.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Sweet banana!',
        chinese: '甜甜的香蕉！',
        imagePrompt: 'A baby eating a piece of banana, happy face, cute cartoon style',
        audioText: 'Sweet banana!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['重音在第二个音节/næn/', '注意鼻音/n/的清晰度'],
      },
      tips: {
        intro: '剥香蕉时说 "Look, I peel the banana."',
        repeat: '每次吃香蕉时重复 "banana"',
        expand: '描述香蕉的形状，如 "Long banana."',
      },
      activities: {
        title: '香蕉电话',
        instruction: '拿香蕉当电话说 "Hello? Is this the banana?"',
        expansion: '递给宝宝说 "Your turn! Talk to the banana."',
      },
      scenarios: [
        '吃点心时说 "Time for banana"',
        '在水果摊指认香蕉',
        '做香蕉泥时说 "Mash the banana"',
      ],
      resources: {
        song: 'Banana Song',
        book: 'Counting Bananas',
        craft: '用黄色纸剪一个香蕉形状',
      },
    },
  },
  {
    id: 'hi',
    categoryId: 'emotion',
    subCategory: '礼貌用语',
    title: 'Hi',
    chineseTitle: '你好',
    icon: 'Smile',
    tags: ['greeting', 'social'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Hi',
        chinese: '你好',
        phonetic: '/haɪ/',
        imagePrompt: 'A baby waving hand, smiling face, cute cartoon style',
        audioText: 'Hi',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Say hi',
        chinese: '打招呼',
        imagePrompt: 'A baby waving to a friend, cute cartoon style',
        audioText: 'Say hi',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Hi, Mommy!',
        chinese: '你好，妈妈！',
        imagePrompt: 'A baby waving to mom, happy scene, cute cartoon style',
        audioText: 'Hi, Mommy!',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Hi there!',
        chinese: '你好呀！',
        imagePrompt: 'A baby waving to a cute puppy, cute cartoon style',
        audioText: 'Hi there!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意双元音/aɪ/的滑动', '发音要响亮、亲切'],
      },
      tips: {
        intro: '见到熟人时先示范 "Hi!"',
        repeat: '每次进家门时说 "Hi, I am home!"',
        expand: '结合人称，如 "Hi, Daddy!"',
      },
      activities: {
        title: '招招手游戏',
        instruction: '和宝宝面对面，一边招手一边说 "Hi, baby!"',
        expansion: '引导宝宝也招手说 "Hi!"',
      },
      scenarios: [
        '早上起床打招呼',
        '见到邻居时引导说 "Hi"',
        '玩玩偶时让玩偶互相说 "Hi"',
      ],
      resources: {
        song: 'Hello Song',
        book: 'Say Hello!',
        craft: '做一个招手的小纸人',
      },
    },
  },
  {
    id: 'bye',
    categoryId: 'emotion',
    subCategory: '礼貌用语',
    title: 'Bye',
    chineseTitle: '再见',
    icon: 'Hand',
    tags: ['greeting', 'social'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Bye',
        chinese: '再见',
        phonetic: '/baɪ/',
        imagePrompt: 'A baby waving goodbye, cute cartoon style',
        audioText: 'Bye',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Say bye-bye',
        chinese: '说再见',
        imagePrompt: 'A baby waving to someone leaving, cute cartoon style',
        audioText: 'Say bye-bye',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Bye, Daddy!',
        chinese: '再见，爸爸！',
        imagePrompt: 'A baby waving to dad at the door, cute cartoon style',
        audioText: 'Bye, Daddy!',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'See you later!',
        chinese: '回头见！',
        imagePrompt: 'A baby waving and smiling, cute cartoon style',
        audioText: 'See you later!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/b/音的爆破', '双元音/aɪ/要发完整'],
      },
      tips: {
        intro: '出门时大声说 "Bye-bye!"',
        repeat: '每次有人离开时引导宝宝招手',
        expand: '结合动作，如 "Wave bye-bye."',
      },
      activities: {
        title: '再见小手',
        instruction: '和宝宝玩躲猫猫，消失时说 "Bye-bye!"',
        expansion: '出现时说 "Hi!"，消失时说 "Bye!"',
      },
      scenarios: [
        '爸爸上班时说 "Bye"',
        '离开公园时说 "Bye-bye park"',
        '玩偶坐车离开时说 "Bye"',
      ],
      resources: {
        song: 'Goodbye Song',
        book: 'Bye-Bye Time',
        craft: '画一个彩色的小手印',
      },
    },
  },
  {
    id: 'hug',
    categoryId: 'emotion',
    subCategory: '情感社交',
    title: 'Hug',
    chineseTitle: '抱抱',
    icon: 'Heart',
    tags: ['love', 'action'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Hug',
        chinese: '抱抱',
        phonetic: '/hʌɡ/',
        imagePrompt: 'A baby reaching out for a hug, cute cartoon style',
        audioText: 'Hug',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Big hug',
        chinese: '大大的拥抱',
        imagePrompt: 'A baby giving a big hug to a teddy bear, cute cartoon style',
        audioText: 'Big hug',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Give me a hug.',
        chinese: '给我一个抱抱。',
        imagePrompt: 'Mom reaching out to hug baby, cute cartoon style',
        audioText: 'Give me a hug.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'I love hugs!',
        chinese: '我喜欢抱抱！',
        imagePrompt: 'A happy baby being hugged, cute cartoon style',
        audioText: 'I love hugs!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/h/音是气流声', '结尾/ɡ/音要轻'],
      },
      tips: {
        intro: '张开双臂说 "Hug?"',
        repeat: '每次抱宝宝时都说 "Big hug!"',
        expand: '描述感觉，如 "Warm hug."',
      },
      activities: {
        title: '抱抱接力',
        instruction: '抱抱宝宝，然后让宝宝抱抱玩具',
        expansion: '说 "Hug the bear, hug the doll."',
      },
      scenarios: [
        '宝宝哭闹需要安慰时',
        '久别重逢时',
        '睡觉前温馨时刻',
      ],
      resources: {
        song: 'The Hug Song',
        book: 'Hug',
        craft: '做一个长手臂的纸偶',
      },
    },
  },
  {
    id: 'water',
    categoryId: 'life',
    subCategory: '饮食起居',
    title: 'Water',
    chineseTitle: '水',
    icon: 'Droplets',
    tags: ['drink', 'life'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Water',
        chinese: '水',
        phonetic: '/ˈwɔː.tər/',
        imagePrompt: 'A glass of clear water, cute cartoon style',
        audioText: 'Water',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Drink water',
        chinese: '喝水',
        imagePrompt: 'A baby drinking from a sippy cup, cute cartoon style',
        audioText: 'Drink water',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'I want water.',
        chinese: '我要喝水。',
        imagePrompt: 'A baby pointing to a water bottle, cute cartoon style',
        audioText: 'I want water.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Fresh water!',
        chinese: '清凉的水！',
        imagePrompt: 'A baby smiling after drinking water, cute cartoon style',
        audioText: 'Fresh water!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/w/音的双唇圆润', '中间的/t/在美音中常发成浊音'],
      },
      tips: {
        intro: '倒水时说 "Look, clear water."',
        repeat: '口渴时问 "Do you want some water?"',
        expand: '描述水的温度，如 "Cold water" 或 "Warm water."',
      },
      activities: {
        title: '倒水游戏',
        instruction: '洗澡时玩倒水，说 "Pour the water."',
        expansion: '观察水流，说 "Splash! Water everywhere."',
      },
      scenarios: [
        '口渴时引导宝宝指认水杯',
        '洗手时说 "Wash with water"',
        '给花浇水时说 "Water the flower"',
      ],
      resources: {
        song: 'Water Song',
        book: 'Water',
        craft: '用蓝色纸剪水滴形状',
      },
    },
  },
  {
    id: 'bread',
    categoryId: 'life',
    subCategory: '好好吃饭',
    title: 'Bread',
    chineseTitle: '面包',
    icon: 'Box',
    tags: ['food', 'eating'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Bread',
        chinese: '面包',
        phonetic: '/bred/',
        imagePrompt: 'A loaf of bread, cute cartoon style',
        audioText: 'Bread',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Soft bread',
        chinese: '软软的面包',
        imagePrompt: 'A baby touching a soft piece of bread, cute cartoon style',
        audioText: 'Soft bread',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Eat some bread.',
        chinese: '吃点面包。',
        imagePrompt: 'A baby taking a bite of bread, cute cartoon style',
        audioText: 'Eat some bread.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Yummy bread!',
        chinese: '好吃的面包！',
        imagePrompt: 'A baby smiling with bread in hand, cute cartoon style',
        audioText: 'Yummy bread!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/br/的连读', '结尾/d/音要轻'],
      },
      tips: {
        intro: '涂果酱时说 "Bread and jam."',
        repeat: '早餐时问 "Do you like bread?"',
        expand: '描述面包的质地，如 "Fluffy bread."',
      },
      activities: {
        title: '面包超人',
        instruction: '用面包片摆出笑脸，说 "Happy bread face."',
        expansion: '指认五官 "Eyes, nose, bread mouth."',
      },
      scenarios: [
        '早餐时间吃吐司',
        '在面包店闻到香味时说 "Smell the bread"',
        '喂小鸟时说 "Bread for birds"',
      ],
      resources: {
        song: 'Pat-a-Cake',
        book: 'Bread and Jam for Frances',
        craft: '用粘土捏一个小面包',
      },
    },
  },
  {
    id: 'egg',
    categoryId: 'life',
    subCategory: '好好吃饭',
    title: 'Egg',
    chineseTitle: '鸡蛋',
    icon: 'Egg',
    tags: ['food', 'eating'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Egg',
        chinese: '鸡蛋',
        phonetic: '/eɡ/',
        imagePrompt: 'A white egg, cute cartoon style',
        audioText: 'Egg',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Round egg',
        chinese: '圆圆的蛋',
        imagePrompt: 'A baby holding an egg, cute cartoon style',
        audioText: 'Round egg',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Crack the egg.',
        chinese: '打蛋。',
        imagePrompt: 'A hand cracking an egg into a bowl, cute cartoon style',
        audioText: 'Crack the egg.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'I like eggs!',
        chinese: '我喜欢吃蛋！',
        imagePrompt: 'A baby eating a boiled egg, cute cartoon style',
        audioText: 'I like eggs!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/e/音的开口度', '结尾/ɡ/音要轻'],
      },
      tips: {
        intro: '剥蛋壳时说 "Peel the egg."',
        repeat: '早餐吃蛋时重复 "egg"',
        expand: '描述蛋的形状，如 "Oval egg."',
      },
      activities: {
        title: '滚蛋游戏',
        instruction: '在桌子上轻轻滚熟鸡蛋，说 "Roll the egg."',
        expansion: '停下来时说 "Stop, egg!"',
      },
      scenarios: [
        '早餐吃水煮蛋',
        '做蛋糕需要打蛋时',
        '在绘本里看到母鸡下蛋时',
      ],
      resources: {
        song: 'Humpty Dumpty',
        book: 'An Egg is Quiet',
        craft: '装饰复活节彩蛋',
      },
    },
  },
  {
    id: 'kiss',
    categoryId: 'emotion',
    subCategory: '情绪表达',
    title: 'Kiss',
    chineseTitle: '亲亲',
    icon: 'Heart',
    tags: ['love', 'action'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Kiss',
        chinese: '亲亲',
        phonetic: '/kɪs/',
        imagePrompt: 'A baby blowing a kiss, cute cartoon style',
        audioText: 'Kiss',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Sweet kiss',
        chinese: '甜甜的吻',
        imagePrompt: 'A baby kissing a teddy bear, cute cartoon style',
        audioText: 'Sweet kiss',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Give a kiss.',
        chinese: '亲一个。',
        imagePrompt: 'A baby kissing mom on the cheek, cute cartoon style',
        audioText: 'Give a kiss.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'I love kisses!',
        chinese: '我喜欢亲亲！',
        imagePrompt: 'A baby smiling with kiss marks on face, cute cartoon style',
        audioText: 'I love kisses!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意短元音/ɪ/的发音', '结尾/s/音要清晰'],
      },
      tips: {
        intro: '亲吻宝宝时说 "Mwah! A kiss."',
        repeat: '每次亲亲时都说 "Kiss"',
        expand: '描述亲亲的动作，如 "Blow a kiss."',
      },
      activities: {
        title: '飞吻接力',
        instruction: '对着宝宝吹飞吻说 "Catch the kiss!"',
        expansion: '引导宝宝也吹飞吻说 "Kiss!"',
      },
      scenarios: [
        '早起晚安亲亲',
        '表达爱意时亲亲',
        '宝宝做得很棒时奖励一个亲亲',
      ],
      resources: {
        song: 'The Kiss Song',
        book: 'The Kissing Hand',
        craft: '在纸上印一个唇印',
      },
    },
  },
  {
    id: 'bath',
    categoryId: 'life',
    subCategory: '穿衣洗漱',
    title: 'Bath',
    chineseTitle: '洗澡',
    icon: 'Waves',
    tags: ['cleaning', 'routine'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Bath',
        chinese: '洗澡',
        phonetic: '/bæθ/',
        imagePrompt: 'A bathtub with bubbles and a rubber duck, cute cartoon style',
        audioText: 'Bath',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Take a bath',
        chinese: '洗个澡',
        imagePrompt: 'A baby playing with bubbles in a tub, cute cartoon style',
        audioText: 'Take a bath',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'I love bath time.',
        chinese: '我喜欢洗澡时间。',
        imagePrompt: 'A happy baby splashing water in a tub, cute cartoon style',
        audioText: 'I love bath time.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Splish splash!',
        chinese: '哗啦哗啦！',
        imagePrompt: 'A baby with bubbles on head, laughing, cute cartoon style',
        audioText: 'Splish splash!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/æ/音的发音', '结尾/θ/音要咬舌尖'],
      },
      tips: {
        intro: '放水时说 "Bath time is coming."',
        repeat: '洗澡时多说 "Wash, wash, wash."',
        expand: '描述水的感觉，如 "Warm bath water."',
      },
      activities: {
        title: '小鸭子游泳',
        instruction: '把小鸭子放进水里说 "Look, the duck is taking a bath."',
        expansion: '让宝宝按小鸭子发声说 "Quack quack!"',
      },
      scenarios: [
        '晚上洗澡前提醒',
        '洗手时说 "Small bath for hands"',
        '给玩偶洗澡时说 "Teddy needs a bath"',
      ],
      resources: {
        song: 'The Bath Song',
        book: 'Time for a Bath',
        craft: '用海绵剪一个小形状',
      },
    },
  },
  {
    id: 'sleep',
    categoryId: 'life',
    subCategory: '作息习惯',
    title: 'Sleep',
    chineseTitle: '睡觉',
    icon: 'Moon',
    tags: ['routine', 'night'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Sleep',
        chinese: '睡觉',
        phonetic: '/sliːp/',
        imagePrompt: 'A baby sleeping peacefully in a crib, cute cartoon style',
        audioText: 'Sleep',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Go to sleep',
        chinese: '去睡觉',
        imagePrompt: 'A baby being tucked into bed, cute cartoon style',
        audioText: 'Go to sleep',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Time to sleep.',
        chinese: '该睡觉了。',
        imagePrompt: 'A mom pointing to the moon outside, baby yawning, cute cartoon style',
        audioText: 'Time to sleep.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Good night!',
        chinese: '晚安！',
        imagePrompt: 'A baby waving to the moon, cute cartoon style',
        audioText: 'Good night!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意长元音/iː/的发音', '结尾/p/音要轻发'],
      },
      tips: {
        intro: '关灯时说 "Lights out, time to sleep."',
        repeat: '每次睡觉前都说 "Sleepy time."',
        expand: '描述睡觉的环境，如 "Quiet room, soft bed."',
      },
      activities: {
        title: '晚安仪式',
        instruction: '和宝宝一起对房间里的东西说晚安 "Good night, bear. Good night, moon."',
        expansion: '最后对宝宝说 "Good night, baby."',
      },
      scenarios: [
        '午睡前提醒',
        '晚上入睡仪式',
        '看到小猫睡觉时说 "The cat is sleeping."',
      ],
      resources: {
        song: 'Twinkle Twinkle Little Star',
        book: 'Goodnight Moon',
        craft: '做一个发光的星星挂件',
      },
    },
  },
  {
    id: 'book',
    categoryId: 'play',
    subCategory: '室内游戏',
    title: 'Book',
    chineseTitle: '书',
    icon: 'Book',
    tags: ['learning', 'play'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Book',
        chinese: '书',
        phonetic: '/bʊk/',
        imagePrompt: 'A colorful picture book, cute cartoon style',
        audioText: 'Book',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Read a book',
        chinese: '看书',
        imagePrompt: 'A baby sitting and looking at a book, cute cartoon style',
        audioText: 'Read a book',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Open the book.',
        chinese: '打开书。',
        imagePrompt: 'A baby opening a big book, cute cartoon style',
        audioText: 'Open the book.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'I love books!',
        chinese: '我喜欢书！',
        imagePrompt: 'A baby surrounded by books, happy face, cute cartoon style',
        audioText: 'I love books!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意短元音/ʊ/的发音', '结尾/k/音要清晰'],
      },
      tips: {
        intro: '拿出书说 "Look, a colorful book."',
        repeat: '每次看书前问 "Do you want to read a book?"',
        expand: '描述书里的内容，如 "A book about animals."',
      },
      activities: {
        title: '翻翻看',
        instruction: '让宝宝自己翻页，每翻一页说 "Turn the page."',
        expansion: '指着图片问 "What is this?"',
      },
      scenarios: [
        '睡前故事时间',
        '在图书馆或书店指认',
        '宝宝自己拿书看时鼓励',
      ],
      resources: {
        song: 'The Reading Song',
        book: 'Brown Bear, Brown Bear, What Do You See?',
        craft: '做一个简单的书签',
      },
    },
  },
  {
    id: 'ball',
    categoryId: 'play',
    subCategory: '室内游戏',
    title: 'Ball',
    chineseTitle: '球',
    icon: 'Box',
    tags: ['play', 'toy'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Ball',
        chinese: '球',
        phonetic: '/bɔːl/',
        imagePrompt: 'A colorful bouncy ball, cute cartoon style',
        audioText: 'Ball',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Roll the ball',
        chinese: '滚球',
        imagePrompt: 'A baby rolling a ball on the floor, cute cartoon style',
        audioText: 'Roll the ball',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Throw the ball.',
        chinese: '扔球。',
        imagePrompt: 'A baby throwing a ball, cute cartoon style',
        audioText: 'Throw the ball.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Catch the ball!',
        chinese: '接球！',
        imagePrompt: 'A baby catching a ball, happy face, cute cartoon style',
        audioText: 'Catch the ball!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/ɔː/音的发音', '结尾/l/音要轻轻带出'],
      },
      tips: {
        intro: '拿出球说 "Look, a round ball."',
        repeat: '玩球时多说 "Ball, ball, ball."',
        expand: '描述球的动作，如 "The ball is rolling."',
      },
      activities: {
        title: '滚球传情',
        instruction: '和宝宝面对面坐着，互相滚球，说 "Roll to you, roll to me."',
        expansion: '球滚远了说 "Where is the ball?"',
      },
      scenarios: [
        '在公园玩球',
        '在家里踢球',
        '在玩具箱里找球',
      ],
      resources: {
        song: 'The Ball Song',
        book: 'Ball',
        craft: '用报纸团一个球',
      },
    },
  },
  {
    id: 'cat',
    categoryId: 'explore',
    subCategory: '动物自然',
    title: 'Cat',
    chineseTitle: '猫',
    icon: 'Palmtree',
    tags: ['animal', 'pet'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Cat',
        chinese: '猫',
        phonetic: '/kæt/',
        imagePrompt: 'A cute fluffy cartoon cat, big eyes, soft colors',
        audioText: 'Cat',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Soft cat',
        chinese: '软软的小猫',
        imagePrompt: 'A baby petting a cat, cute cartoon style',
        audioText: 'Soft cat',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The cat says meow.',
        chinese: '小猫喵喵叫。',
        imagePrompt: 'A cat with mouth open, "Meow" text bubble, cute cartoon style',
        audioText: 'The cat says meow.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'I like cats!',
        chinese: '我喜欢小猫！',
        imagePrompt: 'A baby hugging a cat, cute cartoon style',
        audioText: 'I like cats!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/æ/音要张大嘴', '结尾/t/音要轻'],
      },
      tips: {
        intro: '看到猫时说 "Look, a cute cat."',
        repeat: '模仿猫叫 "Meow, meow, cat."',
        expand: '描述猫的动作，如 "The cat is sleeping."',
      },
      activities: {
        title: '学猫叫',
        instruction: '学猫叫并做洗脸的动作，说 "I am a cat. Meow!"',
        expansion: '让宝宝也学猫叫说 "Meow!"',
      },
      scenarios: [
        '在街上看到猫时指认',
        '看动物画册时指认',
        '玩猫咪玩偶时互动',
      ],
      resources: {
        song: 'Soft Kitty',
        book: 'The Cat in the Hat',
        craft: '做一个猫耳朵头饰',
      },
    },
  },
  {
    id: 'dog',
    categoryId: 'explore',
    subCategory: '动物自然',
    title: 'Dog',
    chineseTitle: '狗',
    icon: 'Palmtree',
    tags: ['animal', 'pet'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Dog',
        chinese: '狗',
        phonetic: '/dɔːɡ/',
        imagePrompt: 'A friendly cartoon dog, wagging tail, cute cartoon style',
        audioText: 'Dog',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Happy dog',
        chinese: '开心的狗',
        imagePrompt: 'A dog running and playing, cute cartoon style',
        audioText: 'Happy dog',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The dog says woof.',
        chinese: '小狗汪汪叫。',
        imagePrompt: 'A dog barking, "Woof" text bubble, cute cartoon style',
        audioText: 'The dog says woof.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Good dog!',
        chinese: '好狗狗！',
        imagePrompt: 'A baby petting a dog, cute cartoon style',
        audioText: 'Good dog!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/ɔː/音的发音', '结尾/ɡ/音要轻'],
      },
      tips: {
        intro: '看到狗时说 "Look, a friendly dog."',
        repeat: '模仿狗叫 "Woof, woof, dog."',
        expand: '描述狗的动作，如 "The dog is running."',
      },
      activities: {
        title: '学狗叫',
        instruction: '学狗叫并做摇尾巴的动作，说 "I am a dog. Woof!"',
        expansion: '让宝宝也学狗叫说 "Woof!"',
      },
      scenarios: [
        '在公园看到狗时指认',
        '看动物画册时指认',
        '玩狗狗玩偶时互动',
      ],
      resources: {
        song: 'Bingo',
        book: 'Harry the Dirty Dog',
        craft: '做一个狗骨头形状的卡片',
      },
    },
  },
  {
    id: 'bird',
    categoryId: 'explore',
    subCategory: '动物自然',
    title: 'Bird',
    chineseTitle: '鸟',
    icon: 'Palmtree',
    tags: ['animal', 'nature'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Bird',
        chinese: '鸟',
        phonetic: '/bɜːrd/',
        imagePrompt: 'A small colorful cartoon bird on a branch, cute cartoon style',
        audioText: 'Bird',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Blue bird',
        chinese: '蓝色的鸟',
        imagePrompt: 'A blue bird flying, cute cartoon style',
        audioText: 'Blue bird',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The bird can fly.',
        chinese: '鸟儿会飞。',
        imagePrompt: 'A bird flying in the sky, cute cartoon style',
        audioText: 'The bird can fly.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Tweet tweet!',
        chinese: '叽叽喳喳！',
        imagePrompt: 'A bird singing, music notes in air, cute cartoon style',
        audioText: 'Tweet tweet!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/ɜː/音的发音', '结尾/d/音要轻'],
      },
      tips: {
        intro: '指着窗外的鸟说 "Look, a bird!"',
        repeat: '学鸟叫 "Tweet, tweet, bird."',
        expand: '描述鸟的动作，如 "The bird is flying high."',
      },
      activities: {
        title: '学鸟飞',
        instruction: '张开手臂像翅膀一样扇动，说 "Fly, fly, like a bird."',
        expansion: '引导宝宝也学飞说 "I am a bird."',
      },
      scenarios: [
        '在树林里听鸟叫',
        '在公园看鸟吃食',
        '看动物画册时指认',
      ],
      resources: {
        song: 'Little Bird',
        book: 'Don\'t Let the Pigeon Drive the Bus!',
        craft: '用羽毛做个小手工',
      },
    },
  },
  {
    id: 'fish',
    categoryId: 'explore',
    subCategory: '动物自然',
    title: 'Fish',
    chineseTitle: '鱼',
    icon: 'Palmtree',
    tags: ['animal', 'water'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Fish',
        chinese: '鱼',
        phonetic: '/fɪʃ/',
        imagePrompt: 'A bright orange goldfish, cute cartoon style',
        audioText: 'Fish',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Gold fish',
        chinese: '金鱼',
        imagePrompt: 'A goldfish in a bowl, cute cartoon style',
        audioText: 'Gold fish',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The fish swims.',
        chinese: '鱼儿游。',
        imagePrompt: 'A fish swimming in water, bubbles, cute cartoon style',
        audioText: 'The fish swims.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Swim like a fish!',
        chinese: '像鱼儿一样游！',
        imagePrompt: 'A baby making swimming motions, cute cartoon style',
        audioText: 'Swim like a fish!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/f/音的咬唇', '结尾/ʃ/音要轻'],
      },
      tips: {
        intro: '指着鱼缸里的鱼说 "Look, a swimming fish."',
        repeat: '学鱼吐泡泡 "Blub, blub, fish."',
        expand: '描述鱼的颜色，如 "Orange fish."',
      },
      activities: {
        title: '小鱼游游',
        instruction: '两手合十做鱼游动的样子，说 "Swim, swim, little fish."',
        expansion: '引导宝宝也做动作说 "Swim!"',
      },
      scenarios: [
        '在水族馆看鱼',
        '在超市海鲜区指认',
        '洗澡时玩塑料小鱼玩具',
      ],
      resources: {
        song: 'Five Little Speckled Frogs (or Fish version)',
        book: 'The Rainbow Fish',
        craft: '用纸盘做一个彩虹鱼',
      },
    },
  },
  {
    id: 'car',
    categoryId: 'explore',
    subCategory: '交通工具',
    title: 'Car',
    chineseTitle: '汽车',
    icon: 'Palmtree',
    tags: ['transport', 'play'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Car',
        chinese: '汽车',
        phonetic: '/kɑːr/',
        imagePrompt: 'A bright red cartoon car, cute cartoon style',
        audioText: 'Car',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Red car',
        chinese: '红色的车',
        imagePrompt: 'A red car driving on a road, cute cartoon style',
        audioText: 'Red car',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The car goes beep.',
        chinese: '汽车嘀嘀叫。',
        imagePrompt: 'A car with "Beep" text bubble, cute cartoon style',
        audioText: 'The car goes beep.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Fast car!',
        chinese: '快车！',
        imagePrompt: 'A car driving fast, speed lines, cute cartoon style',
        audioText: 'Fast car!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/ɑː/音的发音', '结尾/r/音要卷舌'],
      },
      tips: {
        intro: '指着路上的车说 "Look, a red car."',
        repeat: '学汽车喇叭声 "Beep, beep, car."',
        expand: '描述车的颜色和大小，如 "Big blue car."',
      },
      activities: {
        title: '小司机',
        instruction: '拿个圆盘当方向盘，说 "I am driving a car. Beep beep!"',
        expansion: '让宝宝也当小司机说 "Drive, drive!"',
      },
      scenarios: [
        '在街上看到车时指认',
        '坐车出门时说 "In the car"',
        '玩玩具车时互动',
      ],
      resources: {
        song: 'The Wheels on the Bus (or Car version)',
        book: 'Cars and Trucks and Things That Go',
        craft: '用纸箱做一个小汽车',
      },
    },
  },
  {
    id: 'bus',
    categoryId: 'explore',
    subCategory: '交通工具',
    title: 'Bus',
    chineseTitle: '公共汽车',
    icon: 'Palmtree',
    tags: ['transport', 'play'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Bus',
        chinese: '公共汽车',
        phonetic: '/bʌs/',
        imagePrompt: 'A big yellow school bus, cute cartoon style',
        audioText: 'Bus',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Yellow bus',
        chinese: '黄色的公共汽车',
        imagePrompt: 'A yellow bus with kids inside, cute cartoon style',
        audioText: 'Yellow bus',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The wheels on the bus go round.',
        chinese: '公共汽车的轮子转呀转。',
        imagePrompt: 'A bus with spinning wheels, cute cartoon style',
        audioText: 'The wheels on the bus go round.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Let\'s ride the bus!',
        chinese: '我们去坐公共汽车吧！',
        imagePrompt: 'A baby and mom waiting for a bus, cute cartoon style',
        audioText: 'Let\'s ride the bus!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意短元音/ʌ/的发音', '结尾/s/音要清晰'],
      },
      tips: {
        intro: '看到大巴车时说 "Look, a big bus!"',
        repeat: '模仿大巴车的声音 "Vroom, vroom, bus."',
        expand: '描述大巴车的特征，如 "Long yellow bus."',
      },
      activities: {
        title: '大巴车司机',
        instruction: '和宝宝一起排排坐，假装在坐大巴，唱 "The Wheels on the Bus"',
        expansion: '到站了说 "Stop! Everyone get off."',
      },
      scenarios: [
        '在路上看到校车时指认',
        '坐公交车出门时说 "On the bus"',
        '玩玩具大巴车时互动',
      ],
      resources: {
        song: 'The Wheels on the Bus',
        book: 'Don\'t Let the Pigeon Drive the Bus!',
        craft: '用纸盒做一个大巴车',
      },
    },
  },
  {
    id: 'plane',
    categoryId: 'explore',
    subCategory: '交通工具',
    title: 'Plane',
    chineseTitle: '飞机',
    icon: 'Palmtree',
    tags: ['transport', 'play'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Plane',
        chinese: '飞机',
        phonetic: '/pleɪn/',
        imagePrompt: 'A cute cartoon airplane in the sky, clouds, soft colors',
        audioText: 'Plane',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Fly high',
        chinese: '飞得高',
        imagePrompt: 'An airplane flying high above clouds, cute cartoon style',
        audioText: 'Fly high',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The plane is in the sky.',
        chinese: '飞机在天空中。',
        imagePrompt: 'A baby pointing to a plane in the sky, cute cartoon style',
        audioText: 'The plane is in the sky.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Zoom zoom!',
        chinese: '嗖嗖！',
        imagePrompt: 'An airplane flying fast, speed lines, cute cartoon style',
        audioText: 'Zoom zoom!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意双元音/eɪ/的发音', '结尾/n/音要清晰'],
      },
      tips: {
        intro: '指着天上的飞机说 "Look, a plane flying high!"',
        repeat: '模仿飞机的声音 "Whoosh, plane."',
        expand: '描述飞机的颜色，如 "White plane."',
      },
      activities: {
        title: '小飞机飞呀飞',
        instruction: '抱起宝宝举高高，说 "You are a plane! Zoom zoom!"',
        expansion: '让宝宝张开双臂说 "I am flying!"',
      },
      scenarios: [
        '在户外看到飞机云时指认',
        '去机场接人时指认',
        '玩玩具飞机时互动',
      ],
      resources: {
        song: 'The Airplane Song',
        book: 'Amazing Airplanes',
        craft: '折一个纸飞机',
      },
    },
  },
  {
    id: 'sun',
    categoryId: 'explore',
    subCategory: '动物自然',
    title: 'Sun',
    chineseTitle: '太阳',
    icon: 'Sun',
    tags: ['nature', 'sky'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Sun',
        chinese: '太阳',
        phonetic: '/sʌn/',
        imagePrompt: 'A happy smiling yellow sun, cute cartoon style',
        audioText: 'Sun',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Bright sun',
        chinese: '明亮的太阳',
        imagePrompt: 'Sun shining brightly over a green field, cute cartoon style',
        audioText: 'Bright sun',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The sun is hot.',
        chinese: '太阳很热。',
        imagePrompt: 'A baby wiping sweat, sun in the background, cute cartoon style',
        audioText: 'The sun is hot.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Hello, Mr. Sun!',
        chinese: '你好，太阳公公！',
        imagePrompt: 'A baby waving to the sun, cute cartoon style',
        audioText: 'Hello, Mr. Sun!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意短元音/ʌ/的发音', '结尾/n/音要清晰'],
      },
      tips: {
        intro: '早上拉开窗帘说 "Look, the sun is up!"',
        repeat: '晴天出门时说 "Sunny day, sun is out."',
        expand: '描述太阳的感觉，如 "Warm sun."',
      },
      activities: {
        title: '找太阳',
        instruction: '指着窗外或画册里的太阳问 "Where is the sun?"',
        expansion: '引导宝宝指认并说 "Sun!"',
      },
      scenarios: [
        '早起看到阳光时',
        '在户外晒太阳时',
        '看天气预报时指认',
      ],
      resources: {
        song: 'Mr. Sun',
        book: 'The Sun is My Favorite Star',
        craft: '用黄色纸盘做一个太阳',
      },
    },
  },
  {
    id: 'moon',
    categoryId: 'explore',
    subCategory: '动物自然',
    title: 'Moon',
    chineseTitle: '月亮',
    icon: 'Moon',
    tags: ['nature', 'sky', 'night'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Moon',
        chinese: '月亮',
        phonetic: '/muːn/',
        imagePrompt: 'A smiling crescent moon in a starry night sky, cute cartoon style',
        audioText: 'Moon',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'White moon',
        chinese: '白色的月亮',
        imagePrompt: 'A full moon shining in the night sky, cute cartoon style',
        audioText: 'White moon',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The moon is high.',
        chinese: '月亮挂得高。',
        imagePrompt: 'A baby looking up at the moon, cute cartoon style',
        audioText: 'The moon is high.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Good night, moon!',
        chinese: '晚安，月亮！',
        imagePrompt: 'A baby waving to the moon from a window, cute cartoon style',
        audioText: 'Good night, moon!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意长元音/uː/的发音', '结尾/n/音要清晰'],
      },
      tips: {
        intro: '晚上指着月亮说 "Look, the moon is out."',
        repeat: '睡前仪式中加入 "Good night, moon."',
        expand: '描述月亮的形状，如 "Round moon" 或 "Crescent moon."',
      },
      activities: {
        title: '月亮躲猫猫',
        instruction: '用手遮住月亮图画说 "Where is the moon?" 然后移开手说 "There it is!"',
        expansion: '让宝宝也来玩躲猫猫',
      },
      scenarios: [
        '晚上散步时指认',
        '睡前讲故事时指认',
        '看到月亮形状的饼干时说 "Like a moon"',
      ],
      resources: {
        song: 'I See the Moon',
        book: 'Goodnight Moon',
        craft: '用锡纸剪一个亮晶晶的月亮',
      },
    },
  },
  {
    id: 'star',
    categoryId: 'explore',
    subCategory: '动物自然',
    title: 'Star',
    chineseTitle: '星星',
    icon: 'Sun',
    tags: ['nature', 'sky', 'night'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Star',
        chinese: '星星',
        phonetic: '/stɑːr/',
        imagePrompt: 'A bright yellow twinkling star, cute cartoon style',
        audioText: 'Star',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Twinkle star',
        chinese: '闪烁的星星',
        imagePrompt: 'Many stars twinkling in the night sky, cute cartoon style',
        audioText: 'Twinkle star',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The star is bright.',
        chinese: '星星很亮。',
        imagePrompt: 'A baby pointing to a bright star, cute cartoon style',
        audioText: 'The star is bright.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Twinkle, twinkle!',
        chinese: '闪呀闪！',
        imagePrompt: 'A baby making twinkling hand motions, cute cartoon style',
        audioText: 'Twinkle, twinkle!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/st/连读', '结尾/r/音要卷舌'],
      },
      tips: {
        intro: '晚上看星星说 "Look at the twinkling stars."',
        repeat: '唱 "Twinkle Twinkle Little Star" 时强调 "star"',
        expand: '描述星星的数量，如 "Many stars."',
      },
      activities: {
        title: '小手闪闪',
        instruction: '一边唱星星歌一边做抓手动作，说 "Twinkle, twinkle, little star."',
        expansion: '让宝宝模仿动作并说 "Star!"',
      },
      scenarios: [
        '晚上看夜空时',
        '睡前唱儿歌时',
        '看到星星形状的贴纸时',
      ],
      resources: {
        song: 'Twinkle Twinkle Little Star',
        book: 'How to Catch a Star',
        craft: '在黑纸上贴星星贴纸',
      },
    },
  },
  {
    id: 'flower',
    categoryId: 'explore',
    subCategory: '动物自然',
    title: 'Flower',
    chineseTitle: '花',
    icon: 'Flower2',
    tags: ['nature', 'plant'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Flower',
        chinese: '花',
        phonetic: '/ˈflaʊ.ər/',
        imagePrompt: 'A beautiful red flower with a green stem, cute cartoon style',
        audioText: 'Flower',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Pretty flower',
        chinese: '漂亮的花',
        imagePrompt: 'A baby smelling a flower, cute cartoon style',
        audioText: 'Pretty flower',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The flower is red.',
        chinese: '花是红色的。',
        imagePrompt: 'A bright red flower in a garden, cute cartoon style',
        audioText: 'The flower is red.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Smell the flower.',
        chinese: '闻闻花香。',
        imagePrompt: 'A baby leaning in to smell a flower, cute cartoon style',
        audioText: 'Smell the flower.',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意双元音/aʊ/的发音', '结尾/r/音要卷舌'],
      },
      tips: {
        intro: '在花园里指着花说 "Look, a pretty flower."',
        repeat: '闻花时说 "Mmm, smells like a flower."',
        expand: '描述花的颜色，如 "Yellow flower."',
      },
      activities: {
        title: '闻花香游戏',
        instruction: '假装闻花并发出 "Ahhh" 的声音，说 "Smell the flower."',
        expansion: '引导宝宝也来闻闻看',
      },
      scenarios: [
        '在公园散步时',
        '在家里插花时',
        '看植物画册时指认',
      ],
      resources: {
        song: 'The Flower Song',
        book: 'The Tiny Seed',
        craft: '用彩纸做一个简单的纸花',
      },
    },
  },
  {
    id: 'tree',
    categoryId: 'explore',
    subCategory: '动物自然',
    title: 'Tree',
    chineseTitle: '树',
    icon: 'TreePine',
    tags: ['nature', 'plant'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Tree',
        chinese: '树',
        phonetic: '/triː/',
        imagePrompt: 'A big green tree with a brown trunk, cute cartoon style',
        audioText: 'Tree',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Green tree',
        chinese: '绿色的树',
        imagePrompt: 'A lush green tree in a park, cute cartoon style',
        audioText: 'Green tree',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The tree is big.',
        chinese: '树很大。',
        imagePrompt: 'A baby standing next to a giant tree, cute cartoon style',
        audioText: 'The tree is big.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Touch the tree.',
        chinese: '摸摸大树。',
        imagePrompt: 'A baby touching the bark of a tree, cute cartoon style',
        audioText: 'Touch the tree.',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/tr/连读', '长元音/iː/要发足'],
      },
      tips: {
        intro: '指着窗外的大树说 "Look at the big green tree."',
        repeat: '在树下乘凉时说 "Under the tree."',
        expand: '描述树上的东西，如 "Leaves on the tree."',
      },
      activities: {
        title: '大树抱抱',
        instruction: '和宝宝一起抱抱树干，说 "Hug the big tree."',
        expansion: '感受树皮的纹理说 "Rough tree."',
      },
      scenarios: [
        '在公园玩耍时',
        '在路边走过时',
        '看风景画时指认',
      ],
      resources: {
        song: 'The Tree Song',
        book: 'The Giving Tree',
        craft: '用手掌印画一棵树',
      },
    },
  },
  {
    id: 'rain',
    categoryId: 'explore',
    subCategory: '动物自然',
    title: 'Rain',
    chineseTitle: '雨',
    icon: 'Waves',
    tags: ['nature', 'weather'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Rain',
        chinese: '雨',
        phonetic: '/reɪn/',
        imagePrompt: 'Raindrops falling from a gray cloud, cute cartoon style',
        audioText: 'Rain',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Falling rain',
        chinese: '落下的雨',
        imagePrompt: 'Rain falling on a window, cute cartoon style',
        audioText: 'Falling rain',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'I like the rain.',
        chinese: '我喜欢下雨。',
        imagePrompt: 'A baby with an umbrella in the rain, cute cartoon style',
        audioText: 'I like the rain.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Pitter patter!',
        chinese: '啪嗒啪嗒！',
        imagePrompt: 'Raindrops hitting the ground, cute cartoon style',
        audioText: 'Pitter patter!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意双元音/eɪ/的发音', '结尾/n/音要清晰'],
      },
      tips: {
        intro: '下雨时指着窗外说 "Look, it is raining."',
        repeat: '听雨声说 "Listen to the rain, pitter patter."',
        expand: '描述雨具，如 "Yellow raincoat."',
      },
      activities: {
        title: '小雨点啪嗒',
        instruction: '用手指在桌上或宝宝身上轻轻敲，说 "Pitter patter, rain is falling."',
        expansion: '引导宝宝也来模仿雨声',
      },
      scenarios: [
        '下雨天在窗边看雨',
        '穿雨衣雨鞋出门时',
        '看天气预报时指认',
      ],
      resources: {
        song: 'Rain Rain Go Away',
        book: 'The Rain Came Down',
        craft: '用棉球做云朵，蓝纸条做雨滴',
      },
    },
  },
  {
    id: 'hat',
    categoryId: 'life',
    subCategory: '穿衣洗漱',
    title: 'Hat',
    chineseTitle: '帽子',
    icon: 'Smile',
    tags: ['clothing', 'outfit'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Hat',
        chinese: '帽子',
        phonetic: '/hæt/',
        imagePrompt: 'A cute colorful sun hat, cute cartoon style',
        audioText: 'Hat',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Put on your hat',
        chinese: '戴上帽子',
        imagePrompt: 'A baby putting on a hat, cute cartoon style',
        audioText: 'Put on your hat',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'I have a hat.',
        chinese: '我有一顶帽子。',
        imagePrompt: 'A baby wearing a hat and smiling, cute cartoon style',
        audioText: 'I have a hat.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'My pretty hat!',
        chinese: '我漂亮的帽子！',
        imagePrompt: 'A baby looking in a mirror with a hat, cute cartoon style',
        audioText: 'My pretty hat!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/æ/音要张大嘴', '结尾/t/音要轻'],
      },
      tips: {
        intro: '出门前拿帽子说 "Let\'s put on your hat."',
        repeat: '戴好后夸奖说 "Cute hat!"',
        expand: '描述帽子的颜色，如 "Blue hat."',
      },
      activities: {
        title: '帽子躲猫猫',
        instruction: '用帽子遮住脸说 "Where is Mommy?" 然后移开说 "Peek-a-boo!"',
        expansion: '让宝宝也戴上帽子玩',
      },
      scenarios: [
        '出门晒太阳前戴帽子',
        '冬天戴毛线帽时',
        '在衣柜里找帽子时',
      ],
      resources: {
        song: 'The Hat Song',
        book: 'Caps for Sale',
        craft: '用纸盘装饰一个聚会帽',
      },
    },
  },
  {
    id: 'shoes',
    categoryId: 'life',
    subCategory: '穿衣洗漱',
    title: 'Shoes',
    chineseTitle: '鞋子',
    icon: 'Smile',
    tags: ['clothing', 'outfit'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Shoes',
        chinese: '鞋子',
        phonetic: '/ʃuːz/',
        imagePrompt: 'A pair of small cute baby shoes, cute cartoon style',
        audioText: 'Shoes',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Put on shoes',
        chinese: '穿鞋',
        imagePrompt: 'A baby trying to put on shoes, cute cartoon style',
        audioText: 'Put on shoes',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'My shoes are small.',
        chinese: '我的鞋子很小。',
        imagePrompt: 'A baby looking at their shoes, cute cartoon style',
        audioText: 'My shoes are small.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Step, step, step!',
        chinese: '走，走，走！',
        imagePrompt: 'A baby walking in shoes, cute cartoon style',
        audioText: 'Step, step, step!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/ʃ/音的发音', '结尾/z/音要带点震动'],
      },
      tips: {
        intro: '穿鞋时说 "Time to put on your shoes."',
        repeat: '走路时说 "Your shoes go step, step."',
        expand: '描述鞋子的颜色，如 "Red shoes."',
      },
      activities: {
        title: '小脚丫踏步',
        instruction: '穿好鞋后和宝宝一起原地踏步，说 "Left foot, right foot, shoes!"',
        expansion: '跳一跳说 "Jump in your shoes!"',
      },
      scenarios: [
        '出门前穿鞋时',
        '回家脱鞋时说 "Take off shoes"',
        '在鞋柜指认家人的鞋子',
      ],
      resources: {
        song: 'The Shoe Song',
        book: 'Whose Shoes?',
        craft: '给纸剪的鞋子涂色',
      },
    },
  },
  {
    id: 'steamed-cake',
    categoryId: 'life',
    subCategory: '饮食起居',
    title: 'Steamed Cake',
    chineseTitle: '蒸糕',
    icon: 'Box',
    tags: ['food', 'breakfast', 'snack'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Cake',
        chinese: '蒸糕',
        phonetic: '/keɪk/',
        imagePrompt: 'A soft, fluffy steamed cake on a small plate, cute cartoon style',
        audioText: 'Cake',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Soft cake',
        chinese: '软软的蒸糕',
        imagePrompt: 'A baby touching a soft steamed cake, cute cartoon style',
        audioText: 'Soft cake',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The cake is soft.',
        chinese: '蒸糕很软。',
        imagePrompt: 'A steamed cake being broken in half, showing soft texture, cute cartoon style',
        audioText: 'The cake is soft.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Eat the cake.',
        chinese: '吃蒸糕。',
        imagePrompt: 'A baby eating a piece of steamed cake, cute cartoon style',
        audioText: 'Eat the cake.',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/k/的发音要清晰', '元音/eɪ/要发饱满'],
      },
      tips: {
        intro: '给宝宝吃蒸糕时说 "Here is your cake."',
        repeat: '描述口感时重复 "Soft cake, soft cake."',
        expand: '描述颜色，如 "Yellow cake."',
      },
      activities: {
        title: '捏捏看',
        instruction: '洗干净手，带宝宝捏捏蒸糕感受柔软，说 "Soft cake."',
        expansion: '引导宝宝模仿发音 "Cake!"',
      },
      scenarios: [
        '吃早餐或加餐时',
        '在厨房准备蒸糕时',
        '在绘本里看到蛋糕时',
      ],
      resources: {
        song: 'Pat-a-Cake',
        book: 'The Very Hungry Caterpillar',
        craft: '用橡皮泥捏一个蒸糕',
      },
    },
  },
  {
    id: 'steamed-bun',
    categoryId: 'life',
    subCategory: '饮食起居',
    title: 'Steamed Bun',
    chineseTitle: '馒头',
    icon: 'Smile',
    tags: ['food', 'breakfast', 'staple'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Bun',
        chinese: '馒头',
        phonetic: '/bʌn/',
        imagePrompt: 'A white, round steamed bun in a bamboo steamer, cute cartoon style',
        audioText: 'Bun',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'White bun',
        chinese: '白馒头',
        imagePrompt: 'A baby holding a small white steamed bun, cute cartoon style',
        audioText: 'White bun',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'I like buns.',
        chinese: '我喜欢吃馒头。',
        imagePrompt: 'A happy baby eating a steamed bun, cute cartoon style',
        audioText: 'I like buns.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Yummy bun!',
        chinese: '好吃的馒头！',
        imagePrompt: 'A baby giving a thumbs up while eating a bun, cute cartoon style',
        audioText: 'Yummy bun!',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['/b/是双唇音', '元音/ʌ/发音短促'],
      },
      tips: {
        intro: '指着馒头说 "Look, a white bun."',
        repeat: '宝宝咬一口时说 "Yummy bun."',
        expand: '描述形状，如 "Round bun."',
      },
      activities: {
        title: '馒头变变变',
        instruction: '把馒头掰成小块，说 "One piece, two pieces."',
        expansion: '让宝宝指认大馒头和小块馒头',
      },
      scenarios: [
        '全家吃早餐时',
        '在超市看到馒头时',
        '玩过家家游戏时',
      ],
      resources: {
        song: 'Hot Cross Buns',
        book: 'Dim Sum for Everyone!',
        craft: '用白纸团成球当馒头',
      },
    },
  },
  {
    id: 'puffs',
    categoryId: 'life',
    subCategory: '饮食起居',
    title: 'Puffs',
    chineseTitle: '泡芙',
    icon: 'Waves',
    tags: ['food', 'snack', 'baby-food'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Puffs',
        chinese: '泡芙',
        phonetic: '/pʌfs/',
        imagePrompt: 'Small, colorful star-shaped baby puffs in a bowl, cute cartoon style',
        audioText: 'Puffs',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Small puffs',
        chinese: '小泡芙',
        imagePrompt: 'A baby picking up a small puff with fingers, cute cartoon style',
        audioText: 'Small puffs',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Pick up a puff.',
        chinese: '拿一个泡芙。',
        imagePrompt: 'A close up of a baby\'s hand picking up a star puff, cute cartoon style',
        audioText: 'Pick up a puff.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'One more puff?',
        chinese: '再来一个泡芙吗？',
        imagePrompt: 'A parent offering a puff to a baby, cute cartoon style',
        audioText: 'One more puff?',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/p/的送气音', '结尾/fs/要发清晰'],
      },
      tips: {
        intro: '给宝宝零食时说 "Time for puffs!"',
        repeat: '宝宝每吃一个就说一次 "Puff."',
        expand: '练习精细动作时说 "Pick it up."',
      },
      activities: {
        title: '泡芙计数',
        instruction: '在桌上放几个泡芙，边数边让宝宝吃，说 "One puff, two puffs."',
        expansion: '引导宝宝用食指和大拇指捏起泡芙',
      },
      scenarios: [
        '下午点心时间',
        '出门在外安抚宝宝时',
        '练习抓握动作时',
      ],
      resources: {
        song: 'Finger Family',
        book: 'Eating the Alphabet',
        craft: '把泡芙贴在纸上做装饰画',
      },
    },
  },
  {
    id: 'teething-stick',
    categoryId: 'life',
    subCategory: '饮食起居',
    title: 'Teething Stick',
    chineseTitle: '磨牙棒',
    icon: 'Box',
    tags: ['food', 'snack', 'teething'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Stick',
        chinese: '磨牙棒',
        phonetic: '/stɪk/',
        imagePrompt: 'A long, hard teething biscuit stick, cute cartoon style',
        audioText: 'Stick',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Hard stick',
        chinese: '硬硬的棒棒',
        imagePrompt: 'A baby biting a teething stick, cute cartoon style',
        audioText: 'Hard stick',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Bite the stick.',
        chinese: '咬咬磨牙棒。',
        imagePrompt: 'A baby happily chewing on a teething stick, cute cartoon style',
        audioText: 'Bite the stick.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'It feels good.',
        chinese: '咬着很舒服。',
        imagePrompt: 'A baby looking relieved while chewing, cute cartoon style',
        audioText: 'It feels good.',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['注意/st/连读', '结尾/k/音要清晰'],
      },
      tips: {
        intro: '宝宝出牙不适时说 "Here is a teething stick."',
        repeat: '宝宝咬的时候说 "Bite, bite, bite."',
        expand: '描述感觉，如 "Hard and crunchy."',
      },
      activities: {
        title: '磨牙时间',
        instruction: '把磨牙棒递给宝宝，引导他自己拿着咬，说 "Hold the stick."',
        expansion: '模仿宝宝咬的动作并发出 "Crunch" 的声音',
      },
      scenarios: [
        '宝宝流口水、想咬东西时',
        '坐车或推车出门时',
        '餐后磨牙时间',
      ],
      resources: {
        song: 'Brush Your Teeth',
        book: 'Teeth Are Not for Biting',
        craft: '用纸卷一个长条当磨牙棒',
      },
    },
  },
  {
    id: 'snack',
    categoryId: 'life',
    subCategory: '饮食起居',
    title: 'Snack',
    chineseTitle: '零食',
    icon: 'Smile',
    tags: ['food', 'snack', 'time'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Snack',
        chinese: '零食',
        phonetic: '/snæk/',
        imagePrompt: 'A variety of healthy baby snacks in a colorful container, cute cartoon style',
        audioText: 'Snack',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Snack time',
        chinese: '零食时间',
        imagePrompt: 'A clock showing snack time with a bowl of snacks, cute cartoon style',
        audioText: 'Snack time',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'I want a snack.',
        chinese: '我想吃零食。',
        imagePrompt: 'A baby pointing to a snack bowl, cute cartoon style',
        audioText: 'I want a snack.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Share the snack.',
        chinese: '分享零食。',
        imagePrompt: 'Two babies sharing snacks, cute cartoon style',
        audioText: 'Share the snack.',
      },
    ],
    parentGuide: {
      pronunciation: {
        points: ['/sn/连读要顺滑', '元音/æ/要张大嘴'],
      },
      tips: {
        intro: '准备给零食时说 "It\'s snack time!"',
        repeat: '宝宝吃完后问 "More snack?"',
        expand: '描述零食，如 "Healthy snack."',
      },
      activities: {
        title: '零食分享',
        instruction: '引导宝宝把零食分享给家长或玩具，说 "Share with Mommy."',
        expansion: '教宝宝说 "Thank you" 收到零食后',
      },
      scenarios: [
        '下午三四点加餐时',
        '在公园野餐时',
        '在绘本里看到小动物吃东西时',
      ],
      resources: {
        song: 'The Muffin Man',
        book: 'Llama Llama Time to Share',
        craft: '装饰一个专属的零食盒',
      },
    },
  },
  {
    id: 'umbrella',
    categoryId: 'explore',
    subCategory: '自然天气',
    title: 'Umbrella',
    chineseTitle: '雨伞',
    icon: 'Umbrella',
    tags: ['weather', 'rain', 'object'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Umbrella',
        chinese: '雨伞',
        phonetic: '/ʌmˈbrel.ə/',
        imagePrompt: 'A colorful open umbrella, raindrops falling around it, cute cartoon style',
        audioText: 'Umbrella',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Open the umbrella',
        chinese: '打开雨伞',
        imagePrompt: 'A baby holding a big colorful umbrella in the rain, cute cartoon style',
        audioText: 'Open the umbrella',
      }
    ],
    parentGuide: {
      pronunciation: { points: ['注意/ʌ/音的发音', '重音在第二个音节'] },
      tips: { intro: '下雨天指着伞说 "Look, an umbrella."', repeat: '每次用伞时都重复 "umbrella"', expand: '描述伞的颜色' },
      activities: { title: '室内撑伞游戏', instruction: '在家里假装下雨，一起撑伞', expansion: '唱 "Rain, Rain, Go Away"' },
      scenarios: ['下雨出门时', '在超市看到伞时'],
      resources: { song: 'Rain, Rain, Go Away', book: 'The Yellow Umbrella' }
    }
  },
  {
    id: 'moon',
    categoryId: 'explore',
    subCategory: '自然天气',
    title: 'Moon',
    chineseTitle: '月亮',
    icon: 'Moon',
    tags: ['weather', 'night', 'sky'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Moon',
        chinese: '月亮',
        phonetic: '/muːn/',
        imagePrompt: 'A bright yellow crescent moon in a starry night sky, smiling face, cute cartoon style',
        audioText: 'Moon',
      }
    ],
    parentGuide: {
      pronunciation: { points: ['长元音/uː/要发到位'] },
      tips: { intro: '晚上指着窗外说 "Look at the moon."', repeat: '睡前故事里经常指认', expand: '描述月亮的形状' },
      activities: { title: '找月亮', instruction: '晚上在阳台找月亮', expansion: '唱 "Twinkle Twinkle Little Star"' },
      scenarios: ['睡前', '晚间散步'],
      resources: { song: 'Twinkle Twinkle Little Star', book: 'Goodnight Moon' }
    }
  },
  {
    id: 'gift',
    categoryId: 'explore',
    subCategory: '节日庆典',
    title: 'Gift',
    chineseTitle: '礼物',
    icon: 'Gift',
    tags: ['holiday', 'object', 'happy'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Gift',
        chinese: '礼物',
        phonetic: '/ɡɪft/',
        imagePrompt: 'A beautifully wrapped gift box with a big red ribbon, cute cartoon style',
        audioText: 'Gift',
      }
    ],
    parentGuide: {
      pronunciation: { points: ['结尾/t/音要轻发'] },
      tips: { intro: '递给宝宝东西时说 "A gift for you!"', repeat: '生日或节日时多用', expand: '猜猜里面是什么' },
      activities: { title: '拆礼物', instruction: '用报纸包一个小玩具让宝宝拆', expansion: '说 "Open the gift!"' },
      scenarios: ['生日会', '圣诞节', '奖励时刻'],
      resources: { song: 'Happy Birthday', book: 'The Birthday Box' }
    }
  },
  {
    id: 'socks',
    categoryId: 'life',
    subCategory: '穿衣洗漱',
    title: 'Socks',
    chineseTitle: '袜子',
    icon: 'Footprints',
    tags: ['clothing', 'daily_wear'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Socks',
        chinese: '袜子',
        phonetic: '/sɒks/',
        imagePrompt: 'A pair of colorful striped socks, cute cartoon style',
        audioText: 'Socks',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Put on your socks',
        chinese: '穿上袜子',
        imagePrompt: 'A baby putting on socks, cute cartoon style',
        audioText: 'Put on your socks',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'These socks are soft.',
        chinese: '这些袜子很柔软。',
        imagePrompt: 'A baby feeling soft socks, cute cartoon style',
        audioText: 'These socks are soft.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Where are my socks?',
        chinese: '我的袜子在哪里？',
        imagePrompt: 'A baby looking for socks, cute cartoon style',
        audioText: 'Where are my socks?',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意/s/音要清晰', '结尾/ks/要利落'] },
      tips: { intro: '穿袜子时说 "Time for socks!"', repeat: '每天穿脱时都重复', expand: '数数有几只袜子' },
      activities: { title: '袜子配对', instruction: '让宝宝帮妈妈找相同的袜子', expansion: '说 "Find the same socks!"' },
      scenarios: ['起床穿衣', '出门前', '洗完澡'],
      resources: { song: 'Put on Your Socks', book: 'Socks for Supper' }
    }
  },
  {
    id: 'toothbrush',
    categoryId: 'life',
    subCategory: '穿衣洗漱',
    title: 'Toothbrush',
    chineseTitle: '牙刷',
    icon: 'Eraser',
    tags: ['cleaning', 'routine'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Toothbrush',
        chinese: '牙刷',
        phonetic: '/ˈtuːθ.brʌʃ/',
        imagePrompt: 'A small colorful baby toothbrush, cute cartoon style',
        audioText: 'Toothbrush',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'My toothbrush',
        chinese: '我的牙刷',
        imagePrompt: 'A baby holding a toothbrush, cute cartoon style',
        audioText: 'My toothbrush',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Brush your teeth.',
        chinese: '刷刷牙。',
        imagePrompt: 'A baby brushing teeth in front of mirror, cute cartoon style',
        audioText: 'Brush your teeth.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Open wide!',
        chinese: '张大嘴！',
        imagePrompt: 'A baby opening mouth for brushing, cute cartoon style',
        audioText: 'Open wide!',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意/θ/音要咬舌尖', 'sh发音要圆润'] },
      tips: { intro: '刷牙时说 "Brush, brush, brush!"', repeat: '早晚各一次', expand: '牙齿白亮亮' },
      activities: { title: '给小熊刷牙', instruction: '让宝宝模仿给玩偶刷牙', expansion: '说 "Brush the bear\'s teeth."' },
      scenarios: ['早起', '睡前'],
      resources: { song: 'Brush Your Teeth', book: 'Ready, Set, Brush!' }
    }
  },
  {
    id: 'soap',
    categoryId: 'life',
    subCategory: '穿衣洗漱',
    title: 'Soap',
    chineseTitle: '肥皂',
    icon: 'Square',
    tags: ['cleaning', 'bath'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Soap',
        chinese: '肥皂',
        phonetic: '/səʊp/',
        imagePrompt: 'A bar of soap with bubbles, cute cartoon style',
        audioText: 'Soap',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Wash with soap',
        chinese: '用肥皂洗',
        imagePrompt: 'A baby washing hands with soap, cute cartoon style',
        audioText: 'Wash with soap',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The soap is slippery.',
        chinese: '肥皂滑溜溜。',
        imagePrompt: 'A baby trying to catch a slippery soap, cute cartoon style',
        audioText: 'The soap is slippery.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Lots of bubbles!',
        chinese: '好多泡泡！',
        imagePrompt: 'A baby playing with soap bubbles, cute cartoon style',
        audioText: 'Lots of bubbles!',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意双元音/əʊ/的滑动'] },
      tips: { intro: '洗手时说 "Get some soap."', repeat: '洗澡洗手时多用', expand: '肥皂香喷喷' },
      activities: { title: '泡泡派对', instruction: '吹泡泡让宝宝抓', expansion: '说 "Catch the bubbles!"' },
      scenarios: ['洗手', '洗澡'],
      resources: { song: 'The Soap Song', book: 'Soap! Soap! Soap!' }
    }
  },
  {
    id: 'happy',
    categoryId: 'emotion',
    subCategory: '认识情绪',
    title: 'Happy',
    chineseTitle: '开心',
    icon: 'Smile',
    tags: ['emotion', 'positive'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Happy',
        chinese: '开心',
        phonetic: '/ˈhæp.i/',
        imagePrompt: 'A big smiling cartoon face, bright yellow, cute style',
        audioText: 'Happy',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'A happy baby',
        chinese: '一个开心的宝宝',
        imagePrompt: 'A happy baby laughing, cute cartoon style',
        audioText: 'A happy baby',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'I am so happy today!',
        chinese: '我今天好开心！',
        imagePrompt: 'A baby jumping with joy, cute cartoon style',
        audioText: 'I am so happy today!',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Give me a big smile!',
        chinese: '给我一个大大的微笑！',
        imagePrompt: 'A baby smiling widely, cute cartoon style',
        audioText: 'Give me a big smile!',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意/æ/音要张大嘴'] },
      tips: { intro: '宝宝笑时说 "You look happy!"', repeat: '开心时刻多强调', expand: '什么让你开心？' },
      activities: { title: '开心舞', instruction: '放欢快的音乐一起跳舞', expansion: '说 "We are happy! Let\'s dance!"' },
      scenarios: ['玩耍时', '得到夸奖时'],
      resources: { song: 'If You\'re Happy and You Know It', book: 'The Happy Book' }
    }
  },
  {
    id: 'sad',
    categoryId: 'emotion',
    subCategory: '认识情绪',
    title: 'Sad',
    chineseTitle: '难过',
    icon: 'Frown',
    tags: ['emotion', 'negative'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Sad',
        chinese: '难过',
        phonetic: '/sæd/',
        imagePrompt: 'A sad cartoon face with a small tear, cute style',
        audioText: 'Sad',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Don\'t be sad',
        chinese: '别难过',
        imagePrompt: 'A baby being comforted, cute cartoon style',
        audioText: 'Don\'t be sad',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'It\'s okay to be sad.',
        chinese: '难过也没关系。',
        imagePrompt: 'A baby sitting quietly, looking thoughtful, cute cartoon style',
        audioText: 'It\'s okay to be sad.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Need a hug?',
        chinese: '需要抱抱吗？',
        imagePrompt: 'A baby reaching for a hug, cute cartoon style',
        audioText: 'Need a hug?',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意/æ/音', '结尾/d/音要轻'] },
      tips: { intro: '宝宝哭时说 "Are you sad?"', repeat: '共情时刻使用', expand: '抱抱就不难过了' },
      activities: { title: '情绪小脸', instruction: '画出不同的表情让宝宝认', expansion: '指着难过的小脸说 "This is sad."' },
      scenarios: ['摔倒时', '玩具坏了时'],
      resources: { song: 'The Sad Song', book: 'When I Feel Sad' }
    }
  },
  {
    id: 'angry',
    categoryId: 'emotion',
    subCategory: '认识情绪',
    title: 'Angry',
    chineseTitle: '生气',
    icon: 'Angry',
    tags: ['emotion', 'negative'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Angry',
        chinese: '生气',
        phonetic: '/ˈæŋ.ɡri/',
        imagePrompt: 'An angry cartoon face, red cheeks, cute style',
        audioText: 'Angry',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Feeling angry',
        chinese: '感觉生气',
        imagePrompt: 'A baby with a pouting face, cute cartoon style',
        audioText: 'Feeling angry',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Take a deep breath.',
        chinese: '深呼吸。',
        imagePrompt: 'A baby taking a deep breath to calm down, cute cartoon style',
        audioText: 'Take a deep breath.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Use your words.',
        chinese: '用语言表达。',
        imagePrompt: 'A baby talking to mom, cute cartoon style',
        audioText: 'Use your words.',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意/ŋ/音的发音位置'] },
      tips: { intro: '宝宝发脾气时说 "I see you are angry."', repeat: '引导情绪管理', expand: '慢慢冷静下来' },
      activities: { title: '深呼吸练习', instruction: '教宝宝学小狗喘气或深呼吸', expansion: '说 "Breathe in, breathe out."' },
      scenarios: ['争抢玩具时', '不被满足时'],
      resources: { song: 'The Angry Song', book: 'When I Am Angry' }
    }
  },
  {
    id: 'swing',
    categoryId: 'play',
    subCategory: '户外游戏',
    title: 'Swing',
    chineseTitle: '秋千',
    icon: 'Wind',
    tags: ['park', 'outdoor'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Swing',
        chinese: '秋千',
        phonetic: '/swɪŋ/',
        imagePrompt: 'A colorful park swing, cute cartoon style',
        audioText: 'Swing',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Push the swing',
        chinese: '推秋千',
        imagePrompt: 'A parent pushing a baby on a swing, cute cartoon style',
        audioText: 'Push the swing',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'I like to swing.',
        chinese: '我喜欢荡秋千。',
        imagePrompt: 'A baby swinging high, laughing, cute cartoon style',
        audioText: 'I like to swing.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Higher, please!',
        chinese: '请再高一点！',
        imagePrompt: 'A baby looking back at parent while swinging, cute cartoon style',
        audioText: 'Higher, please!',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意/sw/的连读', '结尾/ŋ/音要到位'] },
      tips: { intro: '看到秋千说 "Look, a swing!"', repeat: '在公园玩时多用', expand: '荡来荡去真好玩' },
      activities: { title: '荡秋千比赛', instruction: '轻轻推宝宝，数 "One, two, three!"', expansion: '说 "Swing, swing, swing!"' },
      scenarios: ['公园玩耍', '游乐场'],
      resources: { song: 'The Swing Song', book: 'The Swing' }
    }
  },
  {
    id: 'ball',
    categoryId: 'play',
    subCategory: '户外游戏',
    title: 'Ball',
    chineseTitle: '球',
    icon: 'Circle',
    tags: ['play', 'outdoor', 'ball_game'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Ball',
        chinese: '球',
        phonetic: '/bɔːl/',
        imagePrompt: 'A bright colorful ball, cute cartoon style',
        audioText: 'Ball',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Kick the ball',
        chinese: '踢球',
        imagePrompt: 'A baby kicking a ball, cute cartoon style',
        audioText: 'Kick the ball',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Roll the ball to me.',
        chinese: '把球滚给我。',
        imagePrompt: 'A baby rolling a ball to parent, cute cartoon style',
        audioText: 'Roll the ball to me.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Catch it!',
        chinese: '接住它！',
        imagePrompt: 'A baby trying to catch a ball, cute cartoon style',
        audioText: 'Catch it!',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意/ɔː/音要圆润', '结尾/l/音要轻轻带出'] },
      tips: { intro: '拿出球说 "Here is a ball."', repeat: '玩球时多重复', expand: '球是圆圆的' },
      activities: { title: '滚球游戏', instruction: '和宝宝面对面坐着滚球', expansion: '说 "Roll, roll, roll the ball."' },
      scenarios: ['草地玩耍', '室内活动'],
      resources: { song: 'The Ball Song', book: 'Bounce!' }
    }
  },
  {
    id: 'slide',
    categoryId: 'play',
    subCategory: '户外游戏',
    title: 'Slide',
    chineseTitle: '滑梯',
    icon: 'TrendingDown',
    tags: ['park', 'outdoor'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Slide',
        chinese: '滑梯',
        phonetic: '/slaɪd/',
        imagePrompt: 'A bright colorful park slide, cute cartoon style',
        audioText: 'Slide',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Go down the slide',
        chinese: '滑下溜滑梯',
        imagePrompt: 'A baby sliding down, cute cartoon style',
        audioText: 'Go down the slide',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'It is a big slide.',
        chinese: '这是一个大滑梯。',
        imagePrompt: 'A baby standing next to a big slide, cute cartoon style',
        audioText: 'It is a big slide.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Ready, set, go!',
        chinese: '准备，开始！',
        imagePrompt: 'A baby at the top of the slide, ready to go, cute cartoon style',
        audioText: 'Ready, set, go!',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意/sl/的连读', '结尾/d/音要轻'] },
      tips: { intro: '看到滑梯说 "Look, a slide!"', repeat: '在公园玩时多用', expand: '滑下来真快' },
      activities: { title: '滑梯小勇士', instruction: '鼓励宝宝自己爬上滑梯', expansion: '说 "Climb up, slide down!"' },
      scenarios: ['公园玩耍', '游乐场'],
      resources: { song: 'The Slide Song', book: 'Up and Down' }
    }
  },
  {
    id: 'sun',
    categoryId: 'explore',
    subCategory: '天气变化',
    title: 'Sun',
    chineseTitle: '太阳',
    icon: 'Sun',
    tags: ['weather', 'nature'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Sun',
        chinese: '太阳',
        phonetic: '/sʌn/',
        imagePrompt: 'A bright smiling cartoon sun, yellow rays, cute style',
        audioText: 'Sun',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Bright sun',
        chinese: '明亮的太阳',
        imagePrompt: 'A sunny day scene, cute cartoon style',
        audioText: 'Bright sun',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'It\'s sunny!',
        chinese: '天气晴朗！',
        imagePrompt: 'A baby wearing sunglasses on a sunny day, cute cartoon style',
        audioText: 'It\'s sunny!',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'The sun is warm.',
        chinese: '太阳暖洋洋的。',
        imagePrompt: 'A baby feeling the sunlight, cute cartoon style',
        audioText: 'The sun is warm.',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意/ʌ/音要短促', '结尾/n/音要到位'] },
      tips: { intro: '出太阳时说 "Look at the sun!"', repeat: '晴天时多强调', expand: '太阳公公出来了' },
      activities: { title: '影子游戏', instruction: '在阳光下看自己的影子', expansion: '说 "Look at your shadow!"' },
      scenarios: ['户外散步', '窗边观察'],
      resources: { song: 'Mr. Sun', book: 'The Sun is My Favorite Star' }
    }
  },
  {
    id: 'rain',
    categoryId: 'explore',
    subCategory: '天气变化',
    title: 'Rain',
    chineseTitle: '雨',
    icon: 'CloudRain',
    tags: ['weather', 'nature'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Rain',
        chinese: '雨',
        phonetic: '/reɪn/',
        imagePrompt: 'Cartoon raindrops falling from a cloud, cute style',
        audioText: 'Rain',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Rainy day',
        chinese: '下雨天',
        imagePrompt: 'A rainy day scene, cute cartoon style',
        audioText: 'Rainy day',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Rain, rain, go away.',
        chinese: '雨，雨，快走开。',
        imagePrompt: 'A baby looking out the window at rain, cute cartoon style',
        audioText: 'Rain, rain, go away.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Pitter-patter, rain.',
        chinese: '哗啦啦，下雨了。',
        imagePrompt: 'A baby listening to the rain, cute cartoon style',
        audioText: 'Pitter-patter, rain.',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意双元音/eɪ/的滑动', '结尾/n/音要到位'] },
      tips: { intro: '下雨时说 "It\'s raining!"', repeat: '雨天时多强调', expand: '小雨点滴答滴' },
      activities: { title: '听雨声', instruction: '带宝宝在窗边听雨声', expansion: '说 "Listen to the rain."' },
      scenarios: ['雨天观察', '室内玩耍'],
      resources: { song: 'Rain, Rain, Go Away', book: 'The Rainy Day' }
    }
  },
  {
    id: 'cloud',
    categoryId: 'explore',
    subCategory: '天气变化',
    title: 'Cloud',
    chineseTitle: '云',
    icon: 'Cloud',
    tags: ['weather', 'nature'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Cloud',
        chinese: '云',
        phonetic: '/klaʊd/',
        imagePrompt: 'A fluffy white cartoon cloud, cute style',
        audioText: 'Cloud',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'White cloud',
        chinese: '白云',
        imagePrompt: 'A blue sky with white clouds, cute cartoon style',
        audioText: 'White cloud',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'Look at the clouds.',
        chinese: '看那些云。',
        imagePrompt: 'A baby pointing at clouds in the sky, cute cartoon style',
        audioText: 'Look at the clouds.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Soft like a cloud.',
        chinese: '像云朵一样柔软。',
        imagePrompt: 'A baby touching a fluffy pillow, cute cartoon style',
        audioText: 'Soft like a cloud.',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意双元音/aʊ/的口型变化', '结尾/d/音要轻'] },
      tips: { intro: '抬头看天说 "See the clouds!"', repeat: '户外活动时多用', expand: '云朵像什么？' },
      activities: { title: '云朵想象', instruction: '指着云问宝宝像什么动物', expansion: '说 "That cloud looks like a rabbit!"' },
      scenarios: ['户外散步', '乘车途中'],
      resources: { song: 'The Cloud Song', book: 'Little Cloud' }
    }
  },
  {
    id: 'umbrella',
    categoryId: 'life',
    subCategory: '应对物品',
    title: 'Umbrella',
    chineseTitle: '雨伞',
    icon: 'Umbrella',
    tags: ['weather', 'daily_wear', 'object'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Umbrella',
        chinese: '雨伞',
        phonetic: '/ʌmˈbrel.ə/',
        imagePrompt: 'A bright colorful baby umbrella, cute cartoon style',
        audioText: 'Umbrella',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Open the umbrella',
        chinese: '打开雨伞',
        imagePrompt: 'A baby opening an umbrella, cute cartoon style',
        audioText: 'Open the umbrella',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'I have an umbrella.',
        chinese: '我有一把雨伞。',
        imagePrompt: 'A baby holding a small umbrella, cute cartoon style',
        audioText: 'I have an umbrella.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Stay dry!',
        chinese: '别淋湿了！',
        imagePrompt: 'A baby under an umbrella in the rain, cute cartoon style',
        audioText: 'Stay dry!',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意重音在第二个音节', '结尾/ə/音要轻'] },
      tips: { intro: '下雨拿伞时说 "Get the umbrella."', repeat: '雨天出门时多用', expand: '大伞小伞' },
      activities: { title: '室内撑伞', instruction: '在室内练习开伞关伞', expansion: '说 "Open, close, open, close."' },
      scenarios: ['雨天出门', '整理物品'],
      resources: { song: 'The Umbrella Song', book: 'The Yellow Umbrella' }
    }
  },
  {
    id: 'wind',
    categoryId: 'explore',
    subCategory: '天气变化',
    title: 'Wind',
    chineseTitle: '风',
    icon: 'Wind',
    tags: ['weather', 'nature'],
    babyMaterials: [
      {
        level: 'L1',
        title: 'Word Recognition',
        english: 'Wind',
        chinese: '风',
        phonetic: '/wɪnd/',
        imagePrompt: 'Swirly cartoon wind lines, leaves blowing, cute style',
        audioText: 'Wind',
      },
      {
        level: 'L2',
        title: 'Basic Phrases',
        english: 'Listen to the wind',
        chinese: '听风声',
        imagePrompt: 'A baby listening to the wind, cute cartoon style',
        audioText: 'Listen to the wind',
      },
      {
        level: 'L3',
        title: 'Core Sentences',
        english: 'The wind is blowing.',
        chinese: '风在吹。',
        imagePrompt: 'A baby\'s hair blowing in the wind, cute cartoon style',
        audioText: 'The wind is blowing.',
      },
      {
        level: 'L4',
        title: 'Life Expression',
        english: 'Whoosh, goes the wind!',
        chinese: '呼呼，刮风了！',
        imagePrompt: 'A baby imitating the sound of wind, cute cartoon style',
        audioText: 'Whoosh, goes the wind!',
      },
    ],
    parentGuide: {
      pronunciation: { points: ['注意/w/音的发音', '结尾/nd/要清晰'] },
      tips: { intro: '刮风时说 "Can you feel the wind?"', repeat: '起风时多强调', expand: '风儿呼呼吹' },
      activities: { title: '吹纸条', instruction: '对着纸条吹气模仿风', expansion: '说 "I am the wind! Whoosh!"' },
      scenarios: ['户外散步', '起风时'],
      resources: { song: 'The Wind Song', book: 'The Wind Blew' }
    }
  },
];

export const SUB_SCENES: SubSceneData[] = [
  {
    id: 'dressing_washing',
    title: 'Dressing & Washing',
    chineseTitle: '穿衣洗漱',
    icon: 'Bath',
    color: 'bg-blue-500',
    topSentences: [
      { english: 'Arms in!', chinese: '胳膊伸进来！', audioText: 'Arms in!' },
      { english: "Let's wash your face.", chinese: '来洗洗脸', audioText: "Let's wash your face." },
      { english: 'Good job!', chinese: '真棒！', audioText: 'Good job!' }
    ],
    coreTrinityCards: ['socks', 'toothbrush', 'soap'],
    bottomCategories: [
      { label: '衣物', tag: 'clothing' },
      { label: '洗漱用品', tag: 'cleaning' },
      { label: '洗澡玩具', tag: 'bath' }
    ]
  },
  {
    id: 'outdoor_play',
    title: 'Outdoor Play',
    chineseTitle: '户外游戏',
    icon: 'Trees',
    color: 'bg-green-500',
    topSentences: [
      { english: "Let's run!", chinese: '跑起来！', audioText: "Let's run!" },
      { english: 'Push the swing!', chinese: '推秋千！', audioText: 'Push the swing!' },
      { english: 'Be careful!', chinese: '小心点！', audioText: 'Be careful!' }
    ],
    coreTrinityCards: ['swing', 'ball', 'slide'],
    bottomCategories: [
      { label: '公园设施', tag: 'park' },
      { label: '球类运动', tag: 'ball_game' },
      { label: '自然探索', tag: 'nature' }
    ]
  },
  {
    id: 'recognizing_emotions',
    title: 'Recognizing Emotions',
    chineseTitle: '认识情绪',
    icon: 'Heart',
    color: 'bg-pink-500',
    topSentences: [
      { english: 'Are you happy?', chinese: '你开心吗？', audioText: 'Are you happy?' },
      { english: "It's okay to be sad.", chinese: '难过也没关系', audioText: "It's okay to be sad." },
      { english: 'Big hug!', chinese: '大大的拥抱！', audioText: 'Big hug!' }
    ],
    coreTrinityCards: ['happy', 'sad', 'angry'],
    bottomCategories: [
      { label: '正面情绪', tag: 'positive' },
      { label: '负面情绪', tag: 'negative' },
      { label: '安抚动作', tag: 'comfort' }
    ]
  },
  {
    id: 'weather_changes',
    title: 'Weather Changes',
    chineseTitle: '天气变化',
    icon: 'CloudSun',
    color: 'bg-indigo-500',
    topSentences: [
      { english: "It's sunny!", chinese: '天气晴朗！', audioText: "It's sunny!" },
      { english: 'Rain, rain, go away.', chinese: '雨，雨，快走开', audioText: 'Rain, rain, go away.' },
      { english: 'Listen to the wind.', chinese: '听风声', audioText: 'Listen to the wind.' }
    ],
    coreTrinityCards: ['sun', 'rain', 'wind'],
    bottomCategories: [
      { label: '天气现象', tag: 'weather' },
      { label: '应对物品', tag: 'object' }
    ]
  }
];

export const QUICK_SCENES: QuickScene[] = [
  {
    id: 'park',
    title: 'Playing in the Park',
    chineseTitle: '在公园玩',
    icon: 'TreePine',
    tags: ['nature', 'plant', 'outdoor', 'park'],
    description: 'Running, looking at flowers, and exploring nature.',
    color: 'bg-green-500',
  },
  {
    id: 'meal',
    title: 'Mealtime',
    chineseTitle: '吃饭时间',
    icon: 'Utensils',
    tags: ['eating', 'food', 'fruit', 'drink', 'breakfast', 'snack'],
    description: 'Eating healthy food and enjoying snacks.',
    color: 'bg-orange-500',
  },
  {
    id: 'bath',
    title: 'Bath Time',
    chineseTitle: '洗澡时间',
    icon: 'Droplets',
    tags: ['cleaning', 'routine', 'water'],
    description: 'Splashing in the water and getting clean.',
    color: 'bg-blue-500',
  },
  {
    id: 'reading',
    title: 'Reading Books',
    chineseTitle: '读绘本',
    icon: 'BookOpen',
    tags: ['learning', 'play', 'story'],
    description: 'Discovering new stories and learning words.',
    color: 'bg-purple-500',
  },
  {
    id: 'travel',
    title: 'On the Go',
    chineseTitle: '坐车出行',
    icon: 'Car',
    tags: ['transport', 'travel', 'bus', 'plane'],
    description: 'Seeing cars, buses, and planes on the road.',
    color: 'bg-indigo-500',
  },
];

export const LISTENING_CONTENTS: ListeningContent[] = [
  {
    id: 'wheels_on_the_bus',
    type: 'rhyme',
    title: 'The Wheels on the Bus',
    chineseTitle: '巴士轮子转呀转',
    coverImage: 'https://picsum.photos/seed/bus/800/600',
    audioText: 'The wheels on the bus go round and round, round and round, round and round. The wheels on the bus go round and round, all through the town.',
    content: `The wheels on the bus go round and round,
round and round,
round and round.
The wheels on the bus go round and round,
all through the town.

The wipers on the bus go swish, swish, swish,
swish, swish, swish,
swish, swish, swish.
The wipers on the bus go swish, swish, swish,
all through the town.

The horn on the bus goes beep, beep, beep,
beep, beep, beep,
beep, beep, beep.
The horn on the bus goes beep, beep, beep,
all through the town.

The people on the bus go up and down,
up and down,
up and down.
The people on the bus go up and down,
all through the town.

The babies on the bus go "Wah, wah, wah",
"Wah, wah, wah",
"Wah, wah, wah".
The babies on the bus go "Wah, wah, wah",
all through the town.

The mommies on the bus go "Shh, shh, shh",
"Shh, shh, shh",
"Shh, shh, shh".
The mommies on the bus go "Shh, shh, shh",
all through the town.`,
    chineseContent: `巴士上的轮子转呀转，
转呀转，
转呀转。
巴士上的轮子转呀转，
穿过整座小镇。

巴士上的雨刷器刷呀刷，
刷呀刷，
刷呀刷。
巴士上的雨刷器刷呀刷，
穿过整座小镇。

巴士上的喇叭嘀嘀嘀，
嘀嘀嘀，
嘀嘀嘀。
巴士上的喇叭嘀嘀嘀，
穿过整座小镇。

巴士上的人们起起伏伏，
起起伏伏，
起起伏伏。
巴士上的人们起起伏伏，
穿过整座小镇。

巴士上的宝宝哇哇哇，
哇哇哇，
哇哇哇。
巴士上的宝宝哇哇哇，
穿过整座小镇。

巴士上的妈妈嘘嘘嘘，
嘘嘘嘘，
嘘嘘嘘。
巴士上的妈妈嘘嘘嘘，
穿过整座小镇。`,
    coreSentence: 'round and round',
    keywords: ['bus', 'wheels', 'round', 'town'],
    interactionTips: [
      '跟着节奏用手臂做圆圈动作 (Make circles with arms)',
      '模仿雨刷器左右摆动 (Swing arms like wipers)',
      '模仿按喇叭的动作 (Mimic honking the horn)'
    ]
  },
  {
    id: 'twinkle_twinkle',
    type: 'rhyme',
    title: 'Twinkle Twinkle Little Star',
    chineseTitle: '小星星',
    coverImage: 'https://picsum.photos/seed/star/800/600',
    audioText: 'Twinkle, twinkle, little star, how I wonder what you are. Up above the world so high, like a diamond in the sky.',
    content: `Twinkle, twinkle, little star,
How I wonder what you are!
Up above the world so high,
Like a diamond in the sky.

Twinkle, twinkle, little star,
How I wonder what you are!

When the blazing sun is gone,
When he nothing shines upon,
Then you show your little light,
Twinkle, twinkle, all the night.

Twinkle, twinkle, little star,
How I wonder what you are!`,
    chineseContent: `一闪一闪亮晶晶，
我想知道你是什么！
高高挂在世界之上，
就像天空中的钻石。

一闪一闪亮晶晶，
我想知道你是什么！

当炽热的太阳消失，
当它不再照耀万物，
你就展现出微弱的光芒，
一闪一闪亮整夜。

一闪一闪亮晶晶，
我想知道你是什么！`,
    coreSentence: 'Twinkle, twinkle',
    keywords: ['star', 'sky', 'diamond', 'high'],
    interactionTips: [
      '用手指模仿星星闪烁 (Twinkle fingers like stars)',
      '指向天空 (Point to the sky)',
      '双手抱在一起做睡觉状 (Pretend to sleep)'
    ]
  },
  {
    id: 'baby_shark',
    type: 'rhyme',
    title: 'Baby Shark',
    chineseTitle: '鲨鱼宝宝',
    coverImage: 'https://picsum.photos/seed/shark/800/600',
    audioText: 'Baby shark, doo doo doo doo doo doo. Baby shark, doo doo doo doo doo doo. Baby shark, doo doo doo doo doo doo. Baby shark!',
    content: `Baby shark, doo doo doo doo doo doo
Baby shark, doo doo doo doo doo doo
Baby shark, doo doo doo doo doo doo
Baby shark!

Mommy shark, doo doo doo doo doo doo
Mommy shark, doo doo doo doo doo doo
Mommy shark, doo doo doo doo doo doo
Mommy shark!

Daddy shark, doo doo doo doo doo doo
Daddy shark, doo doo doo doo doo doo
Daddy shark, doo doo doo doo doo doo
Daddy shark!

Grandma shark, doo doo doo doo doo doo
Grandma shark, doo doo doo doo doo doo
Grandma shark, doo doo doo doo doo doo
Grandma shark!

Grandpa shark, doo doo doo doo doo doo
Grandpa shark, doo doo doo doo doo doo
Grandpa shark, doo doo doo doo doo doo
Grandpa shark!`,
    chineseContent: `鲨鱼宝宝，嘟嘟嘟嘟嘟嘟
鲨鱼宝宝，嘟嘟嘟嘟嘟嘟
鲨鱼宝宝，嘟嘟嘟嘟嘟嘟
鲨鱼宝宝！

鲨鱼妈妈，嘟嘟嘟嘟嘟嘟
鲨鱼妈妈，嘟嘟嘟嘟嘟嘟
鲨鱼妈妈，嘟嘟嘟嘟嘟嘟
鲨鱼妈妈！

鲨鱼爸爸，嘟嘟嘟嘟嘟嘟
鲨鱼爸爸，嘟嘟嘟嘟嘟嘟
鲨鱼爸爸，嘟嘟嘟嘟嘟嘟
鲨鱼爸爸！

鲨鱼奶奶，嘟嘟嘟嘟嘟嘟
鲨鱼奶奶，嘟嘟嘟嘟嘟嘟
鲨鱼奶奶，嘟嘟嘟嘟嘟嘟
鲨鱼奶奶！

鲨鱼爷爷，嘟嘟嘟嘟嘟嘟
鲨鱼爷爷，嘟嘟嘟嘟嘟嘟
鲨鱼爷爷，嘟嘟嘟嘟嘟嘟
鲨鱼爷爷！`,
    coreSentence: 'doo doo doo',
    keywords: ['shark', 'baby', 'mommy', 'daddy'],
    interactionTips: [
      '用手指做小鲨鱼嘴巴 (Small shark mouth with fingers)',
      '用手臂做大鲨鱼嘴巴 (Big shark mouth with arms)',
      '模仿游泳的动作 (Mimic swimming)'
    ]
  },
  {
    id: 'old_macdonald',
    type: 'rhyme',
    title: 'Old MacDonald Had a Farm',
    chineseTitle: '王老先生有块地',
    coverImage: 'https://picsum.photos/seed/farm/800/600',
    audioText: 'Old MacDonald had a farm, E-I-E-I-O! And on that farm he had a cow, E-I-E-I-O!',
    content: `Old MacDonald had a farm, E-I-E-I-O!
And on that farm he had a cow, E-I-E-I-O!
With a moo-moo here,
And a moo-moo there,
Here a moo, there a moo,
Everywhere a moo-moo,
Old MacDonald had a farm, E-I-E-I-O!

Old MacDonald had a farm, E-I-E-I-O!
And on that farm he had a pig, E-I-E-I-O!
With an oink-oink here,
And an oink-oink there,
Here an oink, there an oink,
Everywhere an oink-oink,
Old MacDonald had a farm, E-I-E-I-O!

Old MacDonald had a farm, E-I-E-I-O!
And on that farm he had a duck, E-I-E-I-O!
With a quack-quack here,
And a quack-quack there,
Here a quack, there a quack,
Everywhere a quack-quack,
Old MacDonald had a farm, E-I-E-I-O!`,
    chineseContent: `王老先生有块地，咿呀咿呀哟！
他在田里养头牛，咿呀咿呀哟！
这里哞哞叫，
那里哞哞叫，
这里哞，那里哞，
到处都在哞哞叫。
王老先生有块地，咿呀咿呀哟！

王老先生有块地，咿呀咿呀哟！
他在田里养只猪，咿呀咿呀哟！
这里哼哼叫，
那里哼哼叫，
这里哼，那里哼，
到处都在哼哼叫。
王老先生有块地，咿呀咿呀哟！

王老先生有块地，咿呀咿呀哟！
他在田里养只鸭，咿呀咿呀哟！
这里嘎嘎叫，
那里嘎嘎叫，
这里嘎，那里嘎，
到处都在嘎嘎叫。
王老先生有块地，咿呀咿呀哟！`,
    coreSentence: 'E-I-E-I-O',
    keywords: ['farm', 'cow', 'pig', 'duck'],
    interactionTips: [
      '模仿动物的叫声 (Imitate animal sounds)',
      '模仿王老先生走路的样子 (Walk like Old MacDonald)',
      '指认书本上的小动物 (Point to animals in a book)'
    ]
  },
  {
    id: 'if_youre_happy',
    type: 'rhyme',
    title: "If You're Happy and You Know It",
    chineseTitle: '如果你感到快乐',
    coverImage: 'https://picsum.photos/seed/happy/800/600',
    audioText: "If you're happy and you know it, clap your hands. If you're happy and you know it, clap your hands.",
    content: `If you're happy and you know it, clap your hands (clap clap)
If you're happy and you know it, clap your hands (clap clap)
If you're happy and you know it, then your face will surely show it
If you're happy and you know it, clap your hands (clap clap)

If you're happy and you know it, stomp your feet (stomp stomp)
If you're happy and you know it, stomp your feet (stomp stomp)
If you're happy and you know it, then your face will surely show it
If you're happy and you know it, stomp your feet (stomp stomp)

If you're happy and you know it, shout "Hurray!" (Hurray!)
If you're happy and you know it, shout "Hurray!" (Hurray!)
If you're happy and you know it, then your face will surely show it
If you're happy and you know it, shout "Hurray!" (Hurray!)`,
    chineseContent: `如果你感到快乐并知道它，就拍拍手（拍拍）
如果你感到快乐并知道它，就拍拍手（拍拍）
如果你感到快乐并知道它，你的脸一定会表现出来
如果你感到快乐并知道它，就拍拍手（拍拍）

如果你感到快乐并知道它，就跺跺脚（跺跺）
如果你感到快乐并知道它，就跺跺脚（跺跺）
如果你感到快乐并知道它，你的脸一定会表现出来
如果你感到快乐并知道它，就跺跺脚（跺跺）

如果你感到快乐并知道它，就大喊“万岁！”（万岁！）
如果你感到快乐并知道它，就大喊“万岁！”（万岁！）
如果你感到快乐并知道它，你的脸一定会表现出来
如果你感到快乐并知道它，就大喊“万岁！”（万岁！）`,
    coreSentence: 'clap your hands',
    keywords: ['happy', 'clap', 'stomp', 'shout'],
    interactionTips: [
      '跟着歌词拍拍手 (Clap hands)',
      '跟着歌词跺跺脚 (Stomp feet)',
      '大声喊出 "Hurray!" (Shout Hurray!)'
    ]
  },
  {
    id: 'rain_rain_go_away',
    type: 'rhyme',
    title: 'Rain Rain Go Away',
    chineseTitle: '小雨小雨快走开',
    coverImage: 'https://picsum.photos/seed/rain/800/600',
    audioText: 'Rain, rain, go away. Come again another day. Daddy wants to play. Rain, rain, go away.',
    content: `Rain, rain, go away
Come again another day
Daddy wants to play
Rain, rain, go away

Rain, rain, go away
Come again another day
Mommy wants to play
Rain, rain, go away

Rain, rain, go away
Come again another day
Brother wants to play
Rain, rain, go away`,
    chineseContent: `小雨，小雨，快走开
改天再来
爸爸想玩耍
小雨，小雨，快走开

小雨，小雨，快走开
改天再来
妈妈想玩耍
小雨，小雨，快走开

小雨，小雨，快走开
改天再来
哥哥想玩耍
小雨，小雨，快走开`,
    coreSentence: 'go away',
    keywords: ['rain', 'play', 'daddy', 'mommy'],
    interactionTips: [
      '用手指模仿下雨的样子 (Mimic rain with fingers)',
      '挥手做“走开”的动作 (Wave "go away")',
      '指向窗外 (Point out the window)'
    ]
  },
  {
    id: 'head_shoulders',
    type: 'rhyme',
    title: 'Head, Shoulders, Knees, and Toes',
    chineseTitle: '头肩膝脚趾',
    coverImage: 'https://picsum.photos/seed/body/800/600',
    audioText: 'Head, shoulders, knees, and toes, knees and toes. Head, shoulders, knees, and toes, knees and toes. And eyes and ears and mouth and nose.',
    content: `Head, shoulders, knees, and toes,
Knees and toes.
Head, shoulders, knees, and toes,
Knees and toes.
And eyes and ears and mouth and nose.
Head, shoulders, knees, and toes,
Knees and toes.`,
    chineseContent: `头、肩膀、膝盖和脚趾，
膝盖和脚趾。
头、肩膀、膝盖和脚趾，
膝盖和脚趾。
还有眼睛、耳朵、嘴巴和鼻子。
头、肩膀、膝盖和脚趾，
膝盖和脚趾。`,
    coreSentence: 'Head, shoulders',
    keywords: ['head', 'shoulders', 'knees', 'toes'],
    interactionTips: [
      '跟着歌词触摸身体部位 (Touch body parts)',
      '逐渐加快速度 (Speed up gradually)',
      '闭上眼睛尝试 (Try with eyes closed)'
    ]
  },
  {
    id: 'one_little_finger',
    type: 'rhyme',
    title: 'One Little Finger',
    chineseTitle: '一只小手指',
    coverImage: 'https://picsum.photos/seed/finger/800/600',
    audioText: 'One little finger, one little finger, one little finger. Tap tap tap. Point your finger up. Point your finger down. Put it on your head.',
    content: `One little finger, one little finger, one little finger.
Tap tap tap.
Point your finger up.
Point your finger down.
Put it on your head. Head!

One little finger, one little finger, one little finger.
Tap tap tap.
Point your finger up.
Point your finger down.
Put it on your nose. Nose!

One little finger, one little finger, one little finger.
Tap tap tap.
Point your finger up.
Point your finger down.
Put it on your chin. Chin!`,
    chineseContent: `一只小手指，一只小手指，一只小手指。
点，点，点。
手指向上指。
手向下指。
把它放在你的头上。头！

一只小手指，一只小手指，一只小手指。
点，点，点。
手指向上指。
手向下指。
把它放在你的鼻子上。鼻子！

一只小手指，一只小手指，一只小手指。
点，点，点。
手指向上指。
手向下指。
把它放在你的下巴上。下巴！`,
    coreSentence: 'Tap tap tap',
    keywords: ['finger', 'tap', 'point', 'head'],
    interactionTips: [
      '伸出一只手指跟着节奏点点点 (Point one finger)',
      '跟着歌词指向上方和下方 (Point up and down)',
      '把手指放在对应的身体部位 (Put finger on body parts)'
    ]
  },
  {
    id: 'walking_in_the_jungle',
    type: 'rhyme',
    title: 'Walking In The Jungle',
    chineseTitle: '在丛林里走呀走',
    coverImage: 'https://picsum.photos/seed/jungle/800/600',
    audioText: 'Walking in the jungle. Walking in the jungle. We’re not afraid. We’re not afraid.',
    content: `Walking in the jungle.
Walking in the jungle.
We’re not afraid.
We’re not afraid.
One step. Two steps. Three steps forward.
One step. Two steps. Three steps back.

Stop. Listen. What’s that?
It’s a frog!
We’re not afraid of frogs.
Let’s hop like a frog!`,
    chineseContent: `在丛林里走呀走。
在丛林里走呀走。
我们不害怕。
我们不害怕。
一步。两步。向前走三步。
一步。两步。向后退三步。

停下。听。那是什么？
是一只青蛙！
我们不害怕青蛙。
让我们像青蛙一样跳吧！`,
    coreSentence: 'Walking in the jungle',
    keywords: ['jungle', 'walking', 'afraid', 'frog'],
    interactionTips: [
      '原地踏步模仿走路 (Walk in place)',
      '模仿青蛙跳 (Hop like a frog)',
      '做出“听”的动作 (Gesture listening)'
    ]
  },
  {
    id: 'open_shut_them',
    type: 'rhyme',
    title: 'Open Shut Them',
    chineseTitle: '张开合上',
    coverImage: 'https://picsum.photos/seed/hands/800/600',
    audioText: 'Open shut them, open shut them. Give a little clap, clap, clap. Open shut them, open shut them. Put them in your lap, lap, lap.',
    content: `Open shut them, open shut them.
Give a little clap, clap, clap.
Open shut them, open shut them.
Put them in your lap, lap, lap.

Big and small, big and small.
Big, big, big, big, small, small, small.
Big and small, big and small.
Big, big, big, big, small, small, small.

Loud and quiet, loud and quiet.
Loud, loud, loud, loud, quiet, quiet, quiet.
Loud and quiet, loud and quiet.
Loud, loud, loud, loud, quiet, quiet, quiet.`,
    chineseContent: `张开合上，张开合上。
拍拍手，拍，拍，拍。
张开合上，张开合上。
放在你的腿上，腿，腿，腿。

大和小，大和小。
大，大，大，大，小，小，小。
大和小，大和小。
大，大，大，大，小，小，小。

大声和小声，大声和小声。
大声，大声，大声，大声，小声，小声，小声。
大声和小声，大声和小声。
大声，大声，大声，大声，小声，小声，小声。`,
    coreSentence: 'Open shut them',
    keywords: ['open', 'shut', 'clap', 'lap'],
    interactionTips: [
      '张开和合上手掌 (Open and shut hands)',
      '演示大和小 (Show big and small)',
      '演示大声和小声 (Show loud and quiet)'
    ]
  },
  {
    id: 'seven_steps',
    type: 'rhyme',
    title: 'Seven Steps',
    chineseTitle: '七步歌',
    coverImage: 'https://picsum.photos/seed/steps/800/600',
    audioText: '1, 2, 3, 4, 5, 6, 7. 1, 2, 3, 4, 5, 6, 7. 1, 2, 3. 1, 2, 3. 1, 2, 3, 4, 5, 6, 7.',
    content: `1, 2, 3, 4, 5, 6, 7.
1, 2, 3, 4, 5, 6, 7.
1, 2, 3.
1, 2, 3.
1, 2, 3, 4, 5, 6, 7.

Now let's go backwards!
7, 6, 5, 4, 3, 2, 1.
7, 6, 5, 4, 3, 2, 1.
7, 6, 5.
4, 3, 2.
1!`,
    chineseContent: `1, 2, 3, 4, 5, 6, 7.
1, 2, 3, 4, 5, 6, 7.
1, 2, 3.
1, 2, 3.
1, 2, 3, 4, 5, 6, 7.

现在让我们倒着数！
7, 6, 5, 4, 3, 2, 1.
7, 6, 5, 4, 3, 2, 1.
7, 6, 5.
4, 3, 2.
1!`,
    coreSentence: '1, 2, 3, 4, 5, 6, 7',
    keywords: ['numbers', 'steps', 'count', 'backwards'],
    interactionTips: [
      '跟着数字踏步 (Step with numbers)',
      '伸出手指计数 (Count with fingers)',
      '尝试倒着走 (Try walking backwards)'
    ]
  },
  {
    id: 'ten_in_the_bed',
    type: 'rhyme',
    title: 'Ten In The Bed',
    chineseTitle: '十个在床上',
    coverImage: 'https://picsum.photos/seed/bed/800/600',
    audioText: 'There were ten in the bed and the little one said, "Roll over! Roll over!" So they all rolled over and one fell out.',
    content: `There were ten in the bed
And the little one said, "Roll over! Roll over!"
So they all rolled over
And one fell out.

There were nine in the bed
And the little one said, "Roll over! Roll over!"
So they all rolled over
And one fell out.

(Repeat down to one...)

There was one in the bed
And the little one said, "Good night!"`,
    chineseContent: `床上有十个，
那个小的说，“翻滚吧！翻滚吧！”
于是他们都翻滚了，
一个掉下去了。

床上有九个，
那个小的说，“翻滚吧！翻滚吧！”
于是他们都翻滚了，
一个掉下去了。

（重复直到剩下一个...）

床上有一个，
那个小的说，“晚安！”`,
    coreSentence: 'Roll over',
    keywords: ['bed', 'ten', 'roll', 'night'],
    interactionTips: [
      '模仿翻滚的动作 (Mimic rolling)',
      '用手指表示剩余的数量 (Show remaining numbers with fingers)',
      '最后闭上眼睛说 "Good night" (Say "Good night")'
    ]
  },
  {
    id: 'hickory_dickory',
    type: 'rhyme',
    title: 'Hickory Dickory Dock',
    chineseTitle: '滴答滴答钟响了',
    coverImage: 'https://picsum.photos/seed/clock/800/600',
    audioText: 'Hickory dickory dock. The mouse ran up the clock. The clock struck one, the mouse ran down. Hickory dickory dock.',
    content: `Hickory dickory dock.
The mouse ran up the clock.
The clock struck one,
The mouse ran down.
Hickory dickory dock.

Hickory dickory dock.
The mouse ran up the clock.
The clock struck two,
The mouse said "Boo!"
Hickory dickory dock.`,
    chineseContent: `滴答滴答钟响了。
小老鼠爬上了钟。
钟敲了一下，
小老鼠跑了下来。
滴答滴答钟响了。

滴答滴答钟响了。
小老鼠爬上了钟。
钟敲了两下，
小老鼠说“哈！”
滴答滴答钟响了。`,
    coreSentence: 'Hickory dickory dock',
    keywords: ['clock', 'mouse', 'struck', 'down'],
    interactionTips: [
      '用手臂模仿钟摆晃动 (Swing arms like a pendulum)',
      '用手指模仿小老鼠往上爬 (Mimic mouse climbing)',
      '拍一下手表示钟响 (Clap for the clock strike)'
    ]
  },
  {
    id: 'bingo',
    type: 'rhyme',
    title: 'BINGO',
    chineseTitle: '宾果',
    coverImage: 'https://picsum.photos/seed/dog/800/600',
    audioText: 'There was a farmer had a dog, and Bingo was his name-o. B-I-N-G-O, B-I-N-G-O, B-I-N-G-O, and Bingo was his name-o.',
    content: `There was a farmer had a dog,
And Bingo was his name-o.
B-I-N-G-O, B-I-N-G-O, B-I-N-G-O,
And Bingo was his name-o.

There was a farmer had a dog,
And Bingo was his name-o.
(clap)-I-N-G-O, (clap)-I-N-G-O, (clap)-I-N-G-O,
And Bingo was his name-o.`,
    chineseContent: `有个农夫养了条狗，
宾果是它的名字。
B-I-N-G-O, B-I-N-G-O, B-I-N-G-O,
宾果是它的名字。

有个农夫养了条狗，
宾果是它的名字。
（拍手）-I-N-G-O, （拍手）-I-N-G-O, （拍手）-I-N-G-O,
宾果是它的名字。`,
    coreSentence: 'B-I-N-G-O',
    keywords: ['farmer', 'dog', 'name', 'bingo'],
    interactionTips: [
      '拼读字母时拍手 (Clap for letters)',
      '模仿小狗的叫声 (Bark like a dog)',
      '跟着节奏晃动身体 (Sway with the rhythm)'
    ]
  },
  {
    id: 'five_little_ducks',
    type: 'rhyme',
    title: 'Five Little Ducks',
    chineseTitle: '五只小鸭子',
    coverImage: 'https://picsum.photos/seed/ducks/800/600',
    audioText: 'Five little ducks went out one day, over the hill and far away. Mother duck said, "Quack, quack, quack, quack." But only four little ducks came back.',
    content: `Five little ducks went out one day,
Over the hill and far away.
Mother duck said, "Quack, quack, quack, quack."
But only four little ducks came back.

Four little ducks went out one day...
(Repeat down to zero...)

Sad mother duck went out one day,
Over the hill and far away.
Mother duck said, "Quack, quack, quack, quack."
And all of the five little ducks came back!`,
    chineseContent: `五只小鸭出去玩，
翻过山岗到远方。
鸭妈妈说，“嘎，嘎，嘎，嘎。”
但只有四只小鸭回来了。

四只小鸭出去玩...
（重复直到零只...）

伤心的鸭妈妈出去玩，
翻过山岗到远方。
鸭妈妈说，“嘎，嘎，嘎，嘎。”
所有的五只小鸭都回来了！`,
    coreSentence: 'Quack, quack',
    keywords: ['ducks', 'hill', 'mother', 'back'],
    interactionTips: [
      '用手做鸭子嘴巴的动作 (Duck mouth with hand)',
      '用手指表示鸭子的数量 (Show number of ducks)',
      '最后表现出开心的样子 (Show a happy face at the end)'
    ]
  },
  {
    id: 'alphabet_song',
    type: 'rhyme',
    title: 'The Alphabet Song',
    chineseTitle: '字母歌',
    coverImage: 'https://picsum.photos/seed/abc/800/600',
    audioText: 'A B C D E F G, H I J K L M N O P, Q R S, T U V, W X, Y and Z. Now I know my ABCs, next time won’t you sing with me.',
    content: `A B C D E F G,
H I J K L M N O P,
Q R S, T U V,
W X, Y and Z.
Now I know my ABCs,
Next time won’t you sing with me.`,
    chineseContent: `A B C D E F G,
H I J K L M N O P,
Q R S, T U V,
W X, Y and Z.
现在我知道了我的 ABC，
下次你愿意和我一起唱吗。`,
    coreSentence: 'A B C D',
    keywords: ['alphabet', 'letters', 'sing', 'know'],
    interactionTips: [
      '指认字母表上的字母 (Point to letters)',
      '跟着节奏拍手 (Clap with the rhythm)',
      '最后给自己鼓掌 (Applaud at the end)'
    ]
  },
  {
    id: 'row_row_boat',
    type: 'rhyme',
    title: 'Row Row Row Your Boat',
    chineseTitle: '划小船',
    coverImage: 'https://picsum.photos/seed/boat/800/600',
    audioText: 'Row, row, row your boat, gently down the stream. Merrily, merrily, merrily, merrily, life is but a dream.',
    content: `Row, row, row your boat,
Gently down the stream.
Merrily, merrily, merrily, merrily,
Life is but a dream.

Row, row, row your boat,
Gently down the stream.
If you see a crocodile,
Don't forget to scream! (AHHH!)`,
    chineseContent: `划，划，划你的船，
轻轻地顺流而下。
快乐地，快乐地，快乐地，快乐地，
生活不过是一场梦。

划，划，划你的船，
轻轻地顺流而下。
如果你看到一只鳄鱼，
别忘了尖叫！（啊！）`,
    coreSentence: 'Row your boat',
    keywords: ['boat', 'stream', 'merrily', 'dream'],
    interactionTips: [
      '面对面坐着模仿划船 (Sit face-to-face and row)',
      '模仿鳄鱼张嘴 (Mimic crocodile mouth)',
      '最后大声尖叫 (Scream at the end)'
    ]
  },
  {
    id: 'are_you_sleeping',
    type: 'rhyme',
    title: 'Are You Sleeping?',
    chineseTitle: '你还在睡吗？',
    coverImage: 'https://picsum.photos/seed/sleep/800/600',
    audioText: 'Are you sleeping, are you sleeping, Brother John, Brother John? Morning bells are ringing, morning bells are ringing. Ding, dang, dong. Ding, dang, dong.',
    content: `Are you sleeping,
Are you sleeping,
Brother John,
Brother John?
Morning bells are ringing,
Morning bells are ringing.
Ding, dang, dong.
Ding, dang, dong.`,
    chineseContent: `你还在睡吗，
你还在睡吗，
约翰兄弟，
约翰兄弟？
晨钟正在敲响，
晨钟正在敲响。
叮，当，咚。
叮，当，咚。`,
    coreSentence: 'Are you sleeping',
    keywords: ['sleeping', 'morning', 'bells', 'ringing'],
    interactionTips: [
      '闭上眼睛假装睡觉 (Pretend to sleep)',
      '模仿摇铃铛的动作 (Mimic ringing a bell)',
      '小声唱歌然后逐渐变大声 (Sing softly then louder)'
    ]
  },
  {
    id: 'mary_lamb',
    type: 'rhyme',
    title: 'Mary Had a Little Lamb',
    chineseTitle: '玛丽有只小绵羊',
    coverImage: 'https://picsum.photos/seed/lamb/800/600',
    audioText: 'Mary had a little lamb, little lamb, little lamb. Mary had a little lamb, its fleece was white as snow.',
    content: `Mary had a little lamb,
Little lamb, little lamb.
Mary had a little lamb,
Its fleece was white as snow.

And everywhere that Mary went,
Mary went, Mary went,
Everywhere that Mary went,
The lamb was sure to go.`,
    chineseContent: `玛丽有一只小绵羊，
小绵羊，小绵羊。
玛丽有一只小绵羊，
它的毛像雪一样白。

无论玛丽去哪里，
玛丽去哪里，玛丽去哪里，
无论玛丽去哪里，
小羊一定会跟着去。`,
    coreSentence: 'little lamb',
    keywords: ['mary', 'lamb', 'white', 'snow'],
    interactionTips: [
      '模仿小羊走路 (Walk like a lamb)',
      '指认白色的东西 (Point to white objects)',
      '跟着节奏轻拍大腿 (Pat thighs with the rhythm)'
    ]
  },
  {
    id: 'london_bridge',
    type: 'rhyme',
    title: 'London Bridge Is Falling Down',
    chineseTitle: '伦敦大桥倒下来',
    coverImage: 'https://picsum.photos/seed/bridge/800/600',
    audioText: 'London Bridge is falling down, falling down, falling down. London Bridge is falling down, my fair lady.',
    content: `London Bridge is falling down,
Falling down, falling down.
London Bridge is falling down,
My fair lady.

Build it up with silver and gold,
Silver and gold, silver and gold.
Build it up with silver and gold,
My fair lady.`,
    chineseContent: `伦敦大桥倒下来，
倒下来，倒下来。
伦敦大桥倒下来，
我美丽的女士。

用金和银把它盖起来，
金和银，金和银。
用金和银把它盖起来，
我美丽的女士。`,
    coreSentence: 'falling down',
    keywords: ['bridge', 'falling', 'silver', 'gold'],
    interactionTips: [
      '用双手搭成拱桥 (Make a bridge with hands)',
      '模仿桥塌下来的样子 (Mimic the bridge falling)',
      '两人一组玩“抓小鱼”游戏 (Play the bridge game with two people)'
    ]
  },
  {
    id: 'humpty_dumpty',
    type: 'rhyme',
    title: 'Humpty Dumpty',
    chineseTitle: '矮胖子',
    coverImage: 'https://picsum.photos/seed/wall/800/600',
    audioText: 'Humpty Dumpty sat on a wall. Humpty Dumpty had a great fall. All the king’s horses and all the king’s men couldn’t put Humpty together again.',
    content: `Humpty Dumpty sat on a wall,
Humpty Dumpty had a great fall.
All the king’s horses and all the king’s men
Couldn’t put Humpty together again.`,
    chineseContent: `矮胖子坐在墙头上，
矮胖子重重地摔了下来。
国王所有的马和所有的士兵，
都不能把矮胖子再拼起来。`,
    coreSentence: 'sat on a wall',
    keywords: ['wall', 'fall', 'horses', 'men'],
    interactionTips: [
      '模仿坐在墙上的样子 (Sit like on a wall)',
      '模仿摔倒的动作 (Mimic falling)',
      '尝试拼图游戏 (Try a puzzle game)'
    ]
  },
  {
    id: 'itsy_bitsy_spider',
    type: 'rhyme',
    title: 'Itsy Bitsy Spider',
    chineseTitle: '小蜘蛛',
    coverImage: 'https://picsum.photos/seed/spider/800/600',
    audioText: 'The itsy bitsy spider climbed up the waterspout. Down came the rain and washed the spider out. Out came the sun and dried up all the rain. And the itsy bitsy spider climbed up the spout again.',
    content: `The itsy bitsy spider climbed up the waterspout.
Down came the rain and washed the spider out.
Out came the sun and dried up all the rain.
And the itsy bitsy spider climbed up the spout again.`,
    chineseContent: `小小蜘蛛爬上了排水管。
下雨了，把蜘蛛冲了出来。
太阳出来了，晒干了所有的雨。
小小蜘蛛又爬上了排水管。`,
    coreSentence: 'climbed up',
    keywords: ['spider', 'rain', 'sun', 'climb'],
    interactionTips: [
      '用手指模仿蜘蛛爬行 (Spider crawl with fingers)',
      '模仿下雨和太阳出来 (Mimic rain and sun)',
      '向上指和向下指 (Point up and down)'
    ]
  },
  {
    id: 'muffin_man',
    type: 'rhyme',
    title: 'The Muffin Man',
    chineseTitle: '玛芬人',
    coverImage: 'https://picsum.photos/seed/muffin/800/600',
    audioText: 'Do you know the muffin man, the muffin man, the muffin man? Do you know the muffin man who lives on Drury Lane?',
    content: `Do you know the muffin man,
The muffin man, the muffin man?
Do you know the muffin man
Who lives on Drury Lane?

Yes, I know the muffin man,
The muffin man, the muffin man.
Yes, I know the muffin man
Who lives on Drury Lane.`,
    chineseContent: `你认识那个玛芬人吗，
那个玛芬人，那个玛芬人？
你认识那个玛芬人吗，
他就住在德鲁里巷？

是的，我认识那个玛芬人，
那个玛芬人，那个玛芬人。
是的，我认识那个玛芬人，
他就住在德鲁里巷。`,
    coreSentence: 'Do you know',
    keywords: ['muffin', 'man', 'know', 'lane'],
    interactionTips: [
      '模仿做蛋糕的动作 (Mimic baking)',
      '互相询问 "Do you know...?" (Ask each other)',
      '指认好吃的点心 (Point to snacks)'
    ]
  },
  {
    id: 'my_breakfast',
    type: 'story',
    title: 'My Breakfast',
    chineseTitle: '我的早餐',
    coverImage: 'https://picsum.photos/seed/breakfast/800/600',
    audioText: 'I have milk for breakfast. I have bread for breakfast. I have an egg for breakfast. Yummy!',
    content: `I have milk for breakfast.
I have bread for breakfast.
I have an egg for breakfast.
I have an apple for breakfast.
Yummy! Yummy!
I like my breakfast.`,
    chineseContent: `我早餐喝牛奶。
我早餐吃面包。
我早餐吃一个鸡蛋。
我早餐吃一个苹果。
美味！美味！
我喜欢我的早餐。`,
    coreSentence: 'I have',
    keywords: ['milk', 'bread', 'egg', 'breakfast'],
    interactionTips: [
      '在吃早餐时指认食物 (Point to food during breakfast)',
      '模仿吃东西的动作 (Mimic eating)',
      '说 "Yummy" 并摸摸肚子 (Say "Yummy" and rub tummy)'
    ]
  }
];
