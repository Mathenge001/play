(() => {
  const rounds=[];
  const add=(r)=>rounds.push({points:2,seconds:20,difficulty:'medium',requires:{minDevices:1,personal:false,camera:false,tv:false,online:false},...r,requires:{minDevices:1,personal:false,camera:false,tv:false,online:false,...(r.requires||{})}});
  const quiz=(id,pack,category,difficulty,prompt,answer,options,fact,extra={})=>add({id,engine:'quiz',pack,category,difficulty,prompt,answer,options,fact,...extra});
  const learn=(id,level,category,difficulty,prompt,answer,options,explanation,extra={})=>add({id,engine:'learn',pack:'learn',category,difficulty,prompt,answer,options,explanation,learnLevel:level,...extra});
  const puzzle=(id,pack,category,difficulty,prompt,answer,kind,data,extra={})=>add({id,engine:'puzzle',pack,category,difficulty,prompt,answer,puzzle:{kind,...data},...extra});
  const task=(id,pack,category,prompt,seconds,proof='none',extra={})=>add({id,engine:'task',pack,category,difficulty:'mixed',prompt,answer:'Host judges the result',seconds,points:3,task:{proof},...extra});
  const social=(id,pack,category,prompt,extra={})=>add({id,engine:'social',pack,category,difficulty:'mixed',prompt,answer:'Host / group decision',seconds:30,points:2,...extra});
  const visual=(id,pack,category,difficulty,prompt,answer,image,alt,fact,source,extra={})=>add({id,engine:'visual',pack,category,difficulty,prompt,answer,fact,visual:{image,alt,source},requires:{tv:true},...extra});
  const music=(id,pack,category,prompt,answer,artist,query,extra={})=>add({id,engine:'music',pack,category,difficulty:'mixed',prompt,answer,music:{artist,query},seconds:25,points:2,...extra});

  // GENERAL KNOWLEDGE & ENTERTAINMENT
  [
    ['g1','General','easy','What is the capital of Australia?','Canberra',['Sydney','Canberra','Melbourne','Perth'],'Sydney is the largest city, but Canberra is the capital.'],
    ['g2','General','easy','Which planet is known as the Red Planet?','Mars',['Venus','Mars','Jupiter','Mercury'],'Iron minerals in Martian soil give Mars its reddish colour.'],
    ['g3','General','medium','Which language has the most native speakers worldwide?','Mandarin Chinese',['English','Spanish','Mandarin Chinese','Hindi'],'Mandarin Chinese has the largest native-speaker population.'],
    ['g4','General','medium','What is the largest mammal on Earth?','Blue whale',['African elephant','Blue whale','Giraffe','Orca'],'Blue whales are the largest animals known to have existed.'],
    ['g5','Entertainment','easy','Which fictional school is attended by Harry Potter?','Hogwarts',['Nevermore','Hogwarts','Xavier Academy','Hill Valley High'],'Hogwarts School of Witchcraft and Wizardry.'],
    ['g6','Entertainment','easy','Which superhero is also known as the Dark Knight?','Batman',['Iron Man','Batman','Black Panther','Superman'],'Batman is commonly called the Dark Knight.'],
    ['g7','Technology','medium','What does CPU stand for?','Central Processing Unit',['Central Processing Unit','Computer Power Utility','Core Program Unit','Central Protocol User'],'The CPU executes instructions and coordinates much of a computer’s work.'],
    ['g8','Sports','easy','How many players does a football team normally have on the pitch?','11',['9','10','11','12'],'Each side normally fields eleven players.'],
    ['g9','Arts & Culture','medium','Who painted the Mona Lisa?','Leonardo da Vinci',['Michelangelo','Raphael','Leonardo da Vinci','Caravaggio'],'Leonardo painted it during the Italian Renaissance.'],
    ['g10','Food','easy','Which fruit is the main ingredient in guacamole?','Avocado',['Avocado','Mango','Tomato','Lime'],'Avocado forms the base of guacamole.']
  ].forEach(([id,c,d,q,a,o,f])=>quiz(id,'general',c,d,q,a,o,f));

  // HISTORY
  [
    ['h1','easy','In what year did Kenya gain independence?','1963',['1957','1960','1963','1966'],'Kenya became independent on 12 December 1963.'],
    ['h2','easy','Which ancient civilization built the pyramids at Giza?','Ancient Egyptians',['Romans','Ancient Egyptians','Maya','Persians'],'The Giza pyramid complex was built in ancient Egypt.'],
    ['h3','medium','Which event began in Europe in 1939 after Germany invaded Poland?','World War II',['World War I','Cold War','World War II','Crimean War'],'Germany invaded Poland on 1 September 1939.'],
    ['h4','medium','Which empire was ruled by Mansa Musa?','Mali Empire',['Mali Empire','Songhai Empire','Roman Empire','Ottoman Empire'],'Mansa Musa ruled the Mali Empire in the 14th century.'],
    ['h5','medium','What wall fell in 1989, symbolising the end of Cold War divisions in Europe?','Berlin Wall',['Hadrian’s Wall','Berlin Wall','Great Wall','Western Wall'],'The Berlin Wall fell in November 1989.'],
    ['h6','hard','Which 1884–85 meeting formalised European rules for colonising Africa?','Berlin Conference',['Congress of Vienna','Berlin Conference','Yalta Conference','Treaty of Versailles'],'The Berlin Conference set rules for European claims in Africa.'],
    ['h7','hard','Which East African city-state was a major Swahili trading centre on an island off Tanzania?','Kilwa Kisiwani',['Axum','Kilwa Kisiwani','Timbuktu','Gao'],'Kilwa was a major Indian Ocean trading centre.'],
    ['h8','medium','Who became South Africa’s first democratically elected president in 1994?','Nelson Mandela',['Thabo Mbeki','Nelson Mandela','Desmond Tutu','F.W. de Klerk'],'Mandela became president after South Africa’s first fully democratic national election.'],
    ['h9','easy','Which ship famously sank on its maiden voyage in 1912?','Titanic',['Lusitania','Titanic','Britannic','Mayflower'],'RMS Titanic sank in April 1912.'],
    ['h10','hard','Which ancient city was buried by the eruption of Mount Vesuvius in 79 CE?','Pompeii',['Sparta','Pompeii','Carthage','Thebes'],'Pompeii was buried by volcanic material from Vesuvius.']
  ].forEach(([id,d,q,a,o,f])=>quiz(id,'history','History',d,q,a,o,f));

  // GEOGRAPHY & NATURE
  [
    ['geo1','easy','What is the largest ocean on Earth?','Pacific Ocean',['Atlantic Ocean','Indian Ocean','Pacific Ocean','Arctic Ocean'],'The Pacific is Earth’s largest and deepest ocean basin.'],
    ['geo2','easy','Mount Kilimanjaro is in which country?','Tanzania',['Kenya','Tanzania','Uganda','Rwanda'],'Kilimanjaro is in northeastern Tanzania.'],
    ['geo3','medium','Which lake is the largest in Africa by surface area?','Lake Victoria',['Lake Turkana','Lake Tanganyika','Lake Victoria','Lake Malawi'],'Lake Victoria is Africa’s largest lake by area.'],
    ['geo4','medium','The Atacama Desert is mainly in which country?','Chile',['Peru','Chile','Argentina','Bolivia'],'Most of the Atacama lies in northern Chile.'],
    ['geo5','hard','What landscape type forms as soluble limestone dissolves into caves and sinkholes?','Karst',['Delta','Karst','Moraine','Mesa'],'Karst topography is created by dissolution of soluble rocks.'],
    ['geo6','medium','What is a deep, narrow sea inlet carved by glaciers called?','Fjord',['Atoll','Fjord','Delta','Lagoon'],'Fjords form when glacial valleys are flooded by the sea.'],
    ['geo7','easy','What imaginary line lies at 0° latitude?','Equator',['Prime Meridian','Tropic of Cancer','Equator','Date Line'],'The Equator divides Earth into northern and southern hemispheres.'],
    ['geo8','hard','The Himalayas formed mainly from India colliding with which tectonic plate?','Eurasian Plate',['African Plate','Pacific Plate','Eurasian Plate','Arabian Plate'],'The ongoing India–Eurasia collision raised the Himalayas.'],
    ['geo9','medium','Victoria Falls lies on which river?','Zambezi',['Nile','Congo','Zambezi','Limpopo'],'Victoria Falls spans the Zambezi River.'],
    ['geo10','easy','Which is the largest hot desert in the world?','Sahara',['Gobi','Kalahari','Sahara','Atacama'],'The Sahara is the world’s largest hot desert.']
  ].forEach(([id,d,q,a,o,f])=>quiz(id,'geography','Natural Geography',d,q,a,o,f));

  // SCIENCE
  [
    ['s1','easy','What is the chemical symbol for gold?','Au',['Ag','Au','Gd','Go'],'Au comes from the Latin word aurum.'],
    ['s2','easy','Which organ pumps blood around the human body?','Heart',['Liver','Heart','Lung','Kidney'],'The heart pumps blood through the circulatory system.'],
    ['s3','medium','What particle has a negative electric charge?','Electron',['Proton','Neutron','Electron','Photon'],'Electrons carry negative electric charge.'],
    ['s4','medium','What molecule carries most hereditary information in living organisms?','DNA',['ATP','DNA','Glucose','Collagen'],'DNA stores genetic information in most organisms.'],
    ['s5','hard','What boundary around a black hole is the point beyond which light cannot escape?','Event horizon',['Photon ring','Event horizon','Singularity','Accretion disc'],'The event horizon marks the no-return boundary.'],
    ['s6','medium','What is the SI unit of force?','Newton',['Watt','Joule','Newton','Pascal'],'The SI unit of force is the newton (N).'],
    ['s7','easy','What is the nearest star to Earth?','The Sun',['Sirius','The Sun','Proxima Centauri','Betelgeuse'],'The Sun is our local star.'],
    ['s8','hard','What type of molecule speeds up biological reactions without being consumed?','Enzyme',['Lipid','Enzyme','Antibody','Hormone'],'Enzymes act as biological catalysts.'],
    ['s9','medium','Can normal sound waves travel through a perfect vacuum?','No',['Yes','No','Only low notes','Only ultrasonic sound'],'Sound requires a material medium.'],
    ['s10','easy','Water freezes at what temperature on the Celsius scale at standard pressure?','0°C',['-10°C','0°C','10°C','32°C'],'At standard pressure, pure water freezes at 0°C.']
  ].forEach(([id,d,q,a,o,f])=>quiz(id,'science','Science',d,q,a,o,f));

  // KENYAN COCKTAIL
  [
    ['k1','Kenyan History','easy','Who was Kenya’s first president?','Jomo Kenyatta',['Jomo Kenyatta','Daniel arap Moi','Mwai Kibaki','Jaramogi Oginga Odinga'],'Jomo Kenyatta served as Kenya’s first president from 1964.'],
    ['k2','Counties','easy','Nakuru is the headquarters of which county?','Nakuru County',['Baringo','Nakuru','Nyandarua','Kericho'],'Nakuru city is the county headquarters.'],
    ['k3','Geography','medium','Which mountain is Kenya’s highest?','Mount Kenya',['Mount Elgon','Mount Kenya','Mount Longonot','Aberdare Range'],'Mount Kenya reaches 5,199 metres at Batian.'],
    ['k4','Wildlife','easy','Which national park sits directly beside Kenya’s capital city?','Nairobi National Park',['Tsavo East','Amboseli','Nairobi National Park','Meru National Park'],'Nairobi National Park lies immediately south of the city.'],
    ['k5','Food','easy','Which staple is commonly made by cooking maize flour with water into a firm dough?','Ugali',['Chapati','Ugali','Pilau','Mukimo'],'Ugali is a widely eaten maize-meal staple.'],
    ['k6','Sheng','medium','In Kenyan Sheng, “msee” most commonly refers to what?','A person / guy',['Money','A person / guy','Food','Car'],'Usage varies by context, but “msee” commonly means a person or guy.'],
    ['k7','Sport','medium','Which Kenyan athlete became the first person to run a marathon distance in under two hours in a special event?','Eliud Kipchoge',['David Rudisha','Eliud Kipchoge','Paul Tergat','Ferdinand Omanyala'],'Kipchoge ran 1:59:40 in the INEOS 1:59 Challenge in 2019.'],
    ['k8','Places','easy','Which coastal Kenyan city is home to Fort Jesus?','Mombasa',['Malindi','Lamu','Mombasa','Kilifi'],'Fort Jesus stands in Mombasa Old Town.'],
    ['k9','History','medium','Which freedom fighter is commemorated by a statue on Kimathi Street in Nairobi?','Dedan Kimathi',['Tom Mboya','Dedan Kimathi','Pio Gama Pinto','Harry Thuku'],'The Dedan Kimathi statue was unveiled in 2007.'],
    ['k10','Places','medium','Which Kenyan town is famous for Lake Naivasha and nearby Hell’s Gate National Park?','Naivasha',['Naivasha','Embu','Kitale','Voi'],'Naivasha sits beside the freshwater Lake Naivasha.'],
    ['k11','Culture','easy','Which language, alongside English, is an official language of Kenya?','Kiswahili',['Kikuyu','Kiswahili','Luo','Kamba'],'The Constitution recognises Kiswahili and English as official languages.'],
    ['k12','Counties','medium','Maasai Mara National Reserve is primarily in which county?','Narok County',['Kajiado','Narok','Bomet','Kericho'],'The reserve lies in Narok County.'],
    ['k13','Transport','easy','What colourful privately operated minibuses are a famous part of Kenyan urban culture?','Matatus',['Bodas','Matatus','Tuk-tuks','Mikokotenis'],'Matatus are an iconic part of Kenyan public transport culture.'],
    ['k14','Geography','medium','Lake Turkana is mainly found in which part of Kenya?','Northern Kenya',['Coastal Kenya','Northern Kenya','Central Highlands','Western Kenya'],'Lake Turkana lies in Kenya’s arid north.'],
    ['k15','Food','medium','Mukimo is traditionally associated especially with which Kenyan community?','Kikuyu',['Maasai','Kikuyu','Luhya','Somali'],'Mukimo is strongly associated with Kikuyu cuisine, though eaten widely today.']
  ].forEach(([id,c,d,q,a,o,f])=>quiz(id,'kenya',c,d,q,a,o,f));

  // BRAINROT / INTERNET CULTURE (kept generic enough to age gracefully)
  [
    ['b1','Internet Slang','easy','Online, what does “POV” usually stand for?','Point of view',['Part of video','Point of view','Post on viral','Picture of vibe'],'POV means point of view.'],
    ['b2','Internet Slang','easy','What does “IRL” mean?','In real life',['Instant reply link','In real life','Internet reaction loop','I really laughed'],'IRL means in real life.'],
    ['b3','Memes','medium','What does it mean when someone says a post “lives rent free” in their head?','They keep thinking about it',['They own the post','They keep thinking about it','They paid for it','They deleted it'],'The phrase means something stays in your thoughts without effort.'],
    ['b4','Internet Slang','medium','In online slang, “delulu” is derived from which word?','Delusional',['Delicious','Delusional','Delayed','Deluxe'],'“Delulu” is a playful shortening of “delusional.”'],
    ['b5','Trends','medium','What is a “GRWM” video?','Get Ready With Me',['Go React With Me','Get Ready With Me','Great Reel With Music','Group Review With Me'],'GRWM stands for Get Ready With Me.'],
    ['b6','Emoji Decode','easy','Decode this: 👻 + 👻 + 👻 on a group chat after you send a message. What happened?','Everyone ghosted you',['Everyone ghosted you','Halloween started','Your phone broke','The chat was archived'],'“Ghosting” means disappearing or not responding.']
  ].forEach(([id,c,d,q,a,o,f])=>quiz(id,'brainrot',c,d,q,a,o,f));

  // LIVE SPEED / DEVICE-SPECIFIC ROUNDS
  quiz('live1','party','Speed Sprint','easy','Which number is the only even prime?','2',['1','2','3','5'],'2 is the only even prime.',{seconds:10,points:1,requires:{minDevices:2,personal:true,online:true,liveOnly:true}});
  quiz('live2','party','Speed Sprint','easy','Which colour do you get by mixing blue and yellow paint?','Green',['Purple','Orange','Green','Brown'],'Blue and yellow pigment mixtures produce green.',{seconds:10,points:1,requires:{minDevices:2,personal:true,online:true,liveOnly:true}});
  quiz('live3','kenya','Kenyan Speed Sprint','easy','Which city is Kenya’s capital?','Nairobi',['Mombasa','Nairobi','Kisumu','Nakuru'],'Nairobi is Kenya’s capital.',{seconds:10,points:1,requires:{minDevices:2,personal:true,online:true,liveOnly:true}});
  quiz('live4','science','Science Sprint','medium','What is H2O commonly called?','Water',['Hydrogen','Water','Oxygen','Salt'],'H2O is water.',{seconds:8,points:1,requires:{minDevices:2,personal:true,online:true,liveOnly:true}});
  quiz('team1','party','Team Duel','medium','Which continent contains the most countries?','Africa',['Africa','Asia','Europe','South America'],'Africa has the largest number of sovereign states.',{seconds:15,points:2,requires:{minDevices:2,online:true,liveOnly:true,teamMode:true}});
  quiz('team2','kenya','Kenyan Team Duel','medium','Which ocean borders Kenya?','Indian Ocean',['Atlantic Ocean','Pacific Ocean','Indian Ocean','Arctic Ocean'],'Kenya’s coastline lies on the Indian Ocean.',{seconds:15,points:2,requires:{minDevices:2,online:true,liveOnly:true,teamMode:true}});

  // VISUAL DISCOVERY
  visual('v1','kenya','Kenyan Monuments','medium','Name this Nairobi monument.','Dedan Kimathi Statue','https://commons.wikimedia.org/wiki/Special:Redirect/file/Statue%20of%20Dedan%20Kimathi%20Nairobi%2C%20Kenya%20%28cropped%29.jpg?width=1280','Dedan Kimathi statue in Nairobi','The monument honours Kenyan freedom fighter Dedan Kimathi.','Wikimedia Commons — CC0');
  visual('v2','kenya','Kenyan Landmarks','medium','Name this Nairobi monument.','Uhuru Gardens Monument','https://commons.wikimedia.org/wiki/Special:Redirect/file/Uhuru%20Gardens%20Monument.jpg?width=1280','Uhuru Gardens monument in Nairobi','Uhuru Gardens commemorates Kenya’s independence and national history.','Wikimedia Commons');
  visual('v3','kenya','Kenyan Places','easy','Which Kenyan park is shown with Nairobi’s skyline behind it?','Nairobi National Park','https://commons.wikimedia.org/wiki/Special:Redirect/file/Nairobi%20National%20Park%20%28August%202025%29%2C%20Zebra%20and%20city%20skyline.jpg?width=1280','Zebras in Nairobi National Park with city skyline','Nairobi National Park is unusually close to a major capital city.','Wikimedia Commons — CC BY-SA 4.0');
  visual('v4','geography','World Landmarks','easy','Name this landmark.','Eiffel Tower','https://commons.wikimedia.org/wiki/Special:Redirect/file/EiffelTowerParis.jpg?width=1280','Eiffel Tower in Paris','The Eiffel Tower stands in Paris, France.','Wikimedia Commons');
  visual('v5','geography','World Landmarks','easy','Name this monument and the city where it is found.','Taj Mahal — Agra, India','https://commons.wikimedia.org/wiki/Special:Redirect/file/Taj%20Mahal%2C%20Agra%2C%20India-23Feb2007.jpg?width=1280','Taj Mahal in Agra','The Taj Mahal is a marble mausoleum in Agra, India.','Wikimedia Commons');
  visual('v6','geography','World Places','medium','Which city is this skyline?','Nairobi','https://commons.wikimedia.org/wiki/Special:Redirect/file/Nairobi%20City%20County%20Skyline.jpg?width=1280','Nairobi skyline','Nairobi is the capital and largest city of Kenya.','Wikimedia Commons');
  visual('v7','history','Historical Events','easy','Name the historic event or mission represented by this image.','Apollo 11 Moon landing','https://commons.wikimedia.org/wiki/Special:Redirect/file/Aldrin%20Apollo%2011%20original.jpg?width=1280','Astronaut Buzz Aldrin on the Moon during Apollo 11','Apollo 11 landed humans on the Moon in July 1969.','NASA / Wikimedia Commons — public domain',{acceptedAnswers:['Apollo 11','Moon landing','First Moon landing']});

  // PUZZLE LAB
  puzzle('p1','smart','Word Scramble','easy','Unscramble this Kenyan capital: N A I B R O I','NAIROBI','scramble',{scrambled:'N A I B R O I'}, {seconds:25});
  puzzle('p2','smart','Sequence','medium','What number comes next? 2, 6, 12, 20, 30, ?','42','typed',{hint:'Think n × (n + 1).'}, {seconds:30});
  puzzle('p3','smart','Cipher','medium','Decode this Caesar-shift clue: KHOOR','HELLO','typed',{hint:'Each letter has been shifted 3 forward.'}, {seconds:35});
  puzzle('p4','history','Timeline','medium','Put these events from earliest to latest.','World War II ends → Kenya independence → First Moon landing → World Wide Web proposed','order',{items:['First Moon landing','World Wide Web proposed','Kenya independence','World War II ends'],correct:['World War II ends','Kenya independence','First Moon landing','World Wide Web proposed']},{seconds:45,points:3});
  puzzle('p5','kenya','Geography Order','medium','Order these Kenyan places roughly from north to south.','Marsabit → Nairobi → Amboseli → Mombasa','order',{items:['Mombasa','Nairobi','Marsabit','Amboseli'],correct:['Marsabit','Nairobi','Amboseli','Mombasa']},{seconds:45,points:3});
  puzzle('p6','smart','Logic','hard','A farmer has 17 sheep. All but 9 run away. How many remain?','9','typed',{hint:'Read the wording carefully.'},{seconds:25,points:3});
  puzzle('p7','science','Science Pattern','medium','Complete the sequence of planets from the Sun: Mercury, Venus, Earth, Mars, ___','Jupiter','typed',{}, {seconds:20});
  puzzle('p8','brainrot','Emoji Decode','easy','Decode the phrase: 🧠 + 🫠','Brain melt / mind blown','typed',{hint:'Accept any sensible internet-culture interpretation.'},{seconds:20});

  // TASK ARENA — intentionally safe, low-risk tasks
  task('t1','tasks','Photo Hunt','Find something in the room that looks expensive but probably is not. Take a proof photo.',60,'photo',{requires:{camera:true},points:4});
  task('t2','tasks','Creative Build','Build the tallest freestanding structure you can using only safe objects already on the table. Host judges stability and creativity.',120,'photo',{requires:{camera:true},points:5});
  task('t3','tasks','Quick Find','Bring back something that begins with the first letter of your name.',45,'photo',{requires:{camera:true},points:3});
  task('t4','tasks','Impression','Do your best impression of a news anchor announcing something completely ridiculous.',45,'none',{points:3});
  task('t5','tasks','Drawing','Draw a giraffe without lifting your finger/pen from the surface. Best result wins.',60,'photo',{requires:{camera:true},points:3});
  task('t6','kenya','Kenyan Task','Create the most convincing “Kenyan mum is not angry” pose. Take a photo for judging.',45,'photo',{requires:{camera:true},points:3});
  task('t7','party','Memory Task','Look around the room for 10 seconds. Close your eyes. Name five blue items or details you noticed.',25,'none',{points:2});
  task('t8','tasks','Balance','Balance three safe, non-breakable objects on top of one another. Fastest stable stack wins.',60,'photo',{requires:{camera:true},points:4});

  // SOCIAL
  social('so1','party','Most Likely To','Who in this room is most likely to accidentally become famous? Everyone points on 3.',{points:2});
  social('so2','party','Vote','Who would survive longest with no phone, internet or electricity? Vote together.',{points:2});
  social('so3','brainrot','Chronically Online','Choose the person most likely to understand a meme before anyone else in the room.',{points:2});
  social('so4','kenya','Kenyan Social','Who would negotiate the best price in a Kenyan open-air market? Vote.',{points:2});

  // MUSIC — provider/open-local-file model; no bundled copyrighted songs
  music('m1','party','Music','Guess the song from the host’s chosen clip.','Host reveals the selected track','', 'party song');
  music('m2','kenya','Kenyan Music','Host: choose a Kenyan song. Players get up to 20 seconds to name artist + song.','Host reveals song + artist','', 'Kenyan music');
  music('m3','brainrot','Viral Sounds','Host: choose a recent viral sound. Players name the trend, creator or song if they know it.','Host judges acceptable answers','', 'viral TikTok sound');

  // PLAY & LEARN — maths across levels + science/geography
  [
    ['l1','early','Maths','easy','2 + 3 = ?','5',['4','5','6','7'],'Two plus three equals five.'],
    ['l2','early','Maths','easy','Which shape has 3 sides?','Triangle',['Circle','Square','Triangle','Rectangle'],'A triangle has three sides.'],
    ['l3','lower','Maths','easy','7 × 8 = ?','56',['48','54','56','64'],'7 groups of 8 make 56.'],
    ['l4','lower','Maths','medium','A clock shows 3:30. How many minutes past 3 is that?','30',['15','20','30','45'],'Half past means 30 minutes past the hour.'],
    ['l5','upper','Maths','medium','What is 3/4 of 20?','15',['10','12','15','16'],'20 ÷ 4 = 5, then 5 × 3 = 15.'],
    ['l6','upper','Maths','medium','25% of 80 is?','20',['15','20','25','30'],'25% is one quarter; one quarter of 80 is 20.'],
    ['l7','junior','Maths','medium','Solve: 3x + 5 = 20','x = 5',['x = 3','x = 4','x = 5','x = 6'],'Subtract 5 to get 3x = 15, then divide by 3.'],
    ['l8','junior','Maths','hard','What is the area of a triangle with base 10 cm and height 6 cm?','30 cm²',['16 cm²','30 cm²','60 cm²','80 cm²'],'Area = 1/2 × base × height = 30 cm².'],
    ['l9','teen','Maths','hard','If the probability of rain is 0.35, what percentage is that?','35%',['3.5%','25%','35%','65%'],'Multiply a decimal probability by 100 to convert to percent.'],
    ['l10','upper','Science','easy','Which gas do plants take in for photosynthesis?','Carbon dioxide',['Oxygen','Nitrogen','Carbon dioxide','Hydrogen'],'Plants use carbon dioxide and release oxygen during photosynthesis.'],
    ['l11','lower','Geography','easy','Kenya is on which continent?','Africa',['Asia','Europe','Africa','South America'],'Kenya is in East Africa.'],
    ['l12','junior','Science','medium','Which organelle is often called the powerhouse of the cell?','Mitochondria',['Nucleus','Mitochondria','Ribosome','Vacuole'],'Mitochondria generate most cellular ATP.']
    ,['l13','lower','Memory','easy','Memorize this sequence for a moment: APPLE · KEY · STAR · BOOK. Which item was third?','STAR',['APPLE','KEY','STAR','BOOK'],'STAR was the third item in the sequence.']
    ,['l14','upper','Memory','medium','Memorize: 7 · K · BLUE · 4 · MOON. What came immediately after BLUE?','4',['7','K','4','MOON'],'The sequence was 7, K, BLUE, 4, MOON, so 4 came after BLUE.']
  ].forEach(([id,l,c,d,q,a,o,e])=>learn(id,l,c,d,q,a,o,e));

  try {
    const imported=JSON.parse(localStorage.getItem('partyplay.customRounds.v1')||'[]');
    if(Array.isArray(imported)) imported.slice(0,300).forEach((r,i)=>{if(r&&typeof r.prompt==='string'&&typeof r.engine==='string')add({id:`custom-${i}-${String(r.id||'round')}`,pack:'custom-import',category:r.category||'Custom',difficulty:r.difficulty||'mixed',points:Number(r.points)||2,seconds:Number(r.seconds)||20,...r,pack:'custom-import'});});
  } catch {}

  const packs={
    party:{name:'Party Night',icon:'🎉',includes:['party','general','history','geography','science','kenya','brainrot','tasks']},
    kenya:{name:'Kenyan Cocktail',icon:'🇰🇪',includes:['kenya']},
    brainrot:{name:'Brainrot',icon:'😂',includes:['brainrot']},
    smart:{name:'Smart Night',icon:'🧠',includes:['history','geography','science','smart']},
    tasks:{name:'Task Arena',icon:'🏆',includes:['tasks','party']},
    learn:{name:'Play & Learn',icon:'🎓',includes:['learn']},
    custom:{name:'Custom Mix',icon:'🎛',includes:[]}
  };
  const packChoices=[
    ['general','General Knowledge'],['history','History'],['geography','Natural Geography'],['science','Science'],['kenya','Kenya'],['brainrot','Brainrot / Internet'],['tasks','Task Arena'],['party','Social / Party'],['learn','Kids / Learning'],['custom-import','Imported Party Pack']
  ];
  window.PARTYPLAY_CONTENT={rounds,packs,packChoices};
})();
