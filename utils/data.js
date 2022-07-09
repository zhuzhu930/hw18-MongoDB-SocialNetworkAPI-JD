const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
  'Liam',
  'Olivia',
  'Noah',
  'Emma',
  'Oliver',
  'Charlotte',
  'Elijah',
  'Amelia',
  'James',
  'Ava',
  'William',
  'Sophia',
  'Benjamin',
  'Isabella',
  'Lucas',
  'Mia',
  'Henry',
  'Evelyn',
  'Theodore',
  'Harper',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Davis',
  'Miller',
  'Doherty',
  'Rodriguez',
  'Christianson',
  'Crownover',
  'Felch',
  'Goleman',
  'Hijano',
  'Klish',
  'Malich',
  'Wisener',
  'Kinna'
];

const thoughtDescriptions = [
  'The scream in your head will never be out of breath.',
  'Do fish in water have their hidden life where they go to school, hang out, study, and get married?',
  'If everyone had roller skates instead of feet, would there be cars or would they go rollerblading everywhere?',
  'We will never know what memories we had as children and we will never remember them.',
  'We know our parents for whole our life, while they know us only part of their lives.',
  'Someone was born at this very moment, and someone lost his life at this very moment.',
  'Our brain has never experienced some things, and yet it can tailor a scenario in its head as if it had happened.',
  'If the tomato is a fruit, then ketchup is the jam.',
  'If I were a book, what title would I have?',
  'The hospital where you were born is the only building you left without entering.',
  'Humans invented the sounds produced by dinosaurs.',
  'Maybe it\’s better not to kill the spider, because if I kill him, his family and friends can come to the funeral and in that way, I will summon many more spiders.',
  'Who invented the words and names of certain objects and how did it occur to someone to call a chair just like that “chair”?',
  'Before the camera was invented, no one had seen themselves with their eyes closed.',
  'How can our body feel and experience the scene when we fall off a cliff in a nightmare, if we have never fallen off a cliff before?',
  'What is the purpose of life?',
  'What is a person? Is the person mind or body?',
  'Why do people hurt others if they do not want them to be hurt?',
  'If God created the world, who created God?',
  'What if we go to a parallel universe every time we go to sleep?',
  'The skeleton is not in us. We are the brain. So we\’re in a skeleton.',
  'Each person has a different image of us and tailors a version of us that we do not know.',
  'Children with an imaginary friend are creative, while adults with an imaginary friend are schizophrenics.',
  'Because you\’re blinking, you\’ve never seen the whole movie in your life.',
  'Do animals think we are aliens because we don\’t look like them?',
  'If we were called differently, would we behave like a different person?',
  'It is more valuable to have a few true friends than to be in the company of many fake people.',
  'Friends are the chosen family you love as well as the real family.',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random assignments that we can add to student object.
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughtDescriptions),
      // score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

const getRandomFriends = (int) => {
  let friends = [];
  for (let i = 0; i < int; i++) {
    friends.push({ 
      friends: getRandomName(),
    });
  }
  return friends;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts, getRandomFriends };
