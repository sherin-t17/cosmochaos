/* ============================================================
   COSMOCHAOS V3.0 — Clean. Chaotic. Gen-Z. Funny. Crazy.
   ============================================================ */

// ─── DOM ─────────────────────────────────────────────────────
const page1=document.getElementById("page1")
const page2=document.getElementById("page2")
const page3=document.getElementById("page3")
const startBtn=document.getElementById("startBtn")
const calcBtn=document.getElementById("calcBtn")
const dobInput=document.getElementById("dob")
const userName=document.getElementById("userName")
const warning=document.getElementById("warning")
const ageYears=document.getElementById("ageYears")
const ageDays=document.getElementById("ageDays")
const message=document.getElementById("message")
const warp=document.getElementById("warp")
const toast=document.getElementById("toast")
const userBadge=document.getElementById("userBadge")

// ─── GREETING ────────────────────────────────────────────────
const greetings=[
  "Welcome, cosmic traveler ✨",
  "The universe noticed you 🌌",
  "Reality check incoming 🚨",
  "Stars aligned for your arrival 💫",
  "Cosmic data retrieval in progress 🛸",
  "Loading your existence... 🌀",
  "No cap, the cosmos waited for you 🌠",
  "It's giving main character energy 🚀",
  "The stars called. You answered 🌟",
  "Your vibe is being scanned 👾"
]
document.getElementById("greeting").innerText=pick(greetings)

// ─── FLATPICKR ───────────────────────────────────────────────
let selectedDOB=null
flatpickr(dobInput,{
  dateFormat:"d/m/Y",maxDate:"today",disableMobile:false,
  onChange:function(dates){
    if(dates.length>0){selectedDOB=dates[0];calcBtn.classList.remove("hidden");warning.innerText=""}
  }
})

// ─── RIPPLE ──────────────────────────────────────────────────
document.querySelectorAll(".ripple").forEach(btn=>{
  btn.addEventListener("click",function(e){
    const r=document.createElement("span"),rect=this.getBoundingClientRect(),size=Math.max(rect.width,rect.height)
    r.className="ripple-effect"
    r.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`
    this.appendChild(r);setTimeout(()=>r.remove(),600)
  })
})

// ─── SOUND ───────────────────────────────────────────────────
const AudioCtx=window.AudioContext||window.webkitAudioContext
let audioCtx=null
function getCtx(){if(!audioCtx)audioCtx=new AudioCtx();return audioCtx}
function playClick(){try{const c=getCtx(),o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type="sine";o.frequency.setValueAtTime(880,c.currentTime);o.frequency.exponentialRampToValueAtTime(440,c.currentTime+0.08);g.gain.setValueAtTime(0.12,c.currentTime);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+0.1);o.start();o.stop(c.currentTime+0.1)}catch(e){}}
function playWarp(){try{const c=getCtx(),t=c.currentTime;for(let i=0;i<4;i++){const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type="sawtooth";o.frequency.setValueAtTime(150+i*120,t+i*0.1);o.frequency.exponentialRampToValueAtTime(2500+i*500,t+0.7+i*0.1);g.gain.setValueAtTime(0.05,t+i*0.1);g.gain.exponentialRampToValueAtTime(0.001,t+0.8+i*0.1);o.start(t+i*0.1);o.stop(t+1+i*0.1)}}catch(e){}}
function playReveal(){try{const c=getCtx();[523,659,784,1047,1319].forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type="sine";o.frequency.value=f;g.gain.setValueAtTime(0.09,c.currentTime+i*0.09);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+i*0.09+0.35);o.start(c.currentTime+i*0.09);o.stop(c.currentTime+i*0.09+0.4)})}catch(e){}}
document.querySelectorAll("button").forEach(b=>b.addEventListener("click",playClick,{passive:true}))

// ─── MUSIC ───────────────────────────────────────────────────
let musicPlaying=false,musicNodes=null
const musicBtn=document.getElementById("musicBtn")
function buildMusic(){
  if(musicNodes)return
  try{
    const c=getCtx(),master=c.createGain();master.gain.value=0;master.connect(c.destination)
    const bass=c.createOscillator(),bassG=c.createGain();bass.type="sine";bass.frequency.value=55;bassG.gain.value=0.18;bass.connect(bassG);bassG.connect(master);bass.start()
    const lfo=c.createOscillator(),lfoG=c.createGain();lfo.frequency.value=0.2;lfoG.gain.value=8;lfo.connect(lfoG);lfoG.connect(bass.frequency);lfo.start()
    ;[110,165,220,275].forEach(f=>{const o=c.createOscillator(),g=c.createGain();o.type="triangle";o.frequency.value=f;g.gain.value=0.04;o.connect(g);g.connect(master);o.start()})
    const arp=[220,277,330,415,330,277];let ai=0
    function pa(){if(!musicPlaying)return;try{const o=c.createOscillator(),g=c.createGain();o.type="sine";o.frequency.value=arp[ai++%arp.length];g.gain.setValueAtTime(0.07,c.currentTime);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+0.6);o.connect(g);g.connect(master);o.start();o.stop(c.currentTime+0.65)}catch(e){}setTimeout(pa,700+Math.random()*300)}
    setTimeout(pa,800);musicNodes={master,c}
  }catch(e){}
}
function fadeMusic(to,dur=1.5){if(!musicNodes)return;const{master,c}=musicNodes;master.gain.cancelScheduledValues(c.currentTime);master.gain.setValueAtTime(master.gain.value,c.currentTime);master.gain.linearRampToValueAtTime(to,c.currentTime+dur)}
musicBtn.addEventListener("click",()=>{
  if(!musicPlaying){buildMusic();fadeMusic(1,2);musicPlaying=true;musicBtn.innerText="🎵";showToast("🎵 Cosmic music on!")}
  else{fadeMusic(0,1.5);musicPlaying=false;musicBtn.innerText="🔇";showToast("🔇 Music off")}
})

// ─── THEME ───────────────────────────────────────────────────
const themeBtn=document.getElementById("themeBtn")
const themePanel=document.getElementById("themePanel")
let themePanelOpen=false,currentTheme="default"
const themeNames={default:"🟣 Default",solar:"🔴 Solar Flare",nebula:"🟢 Nebula Green",pink:"🩷 Galaxy Pink",ocean:"🔵 Deep Ocean"}
themeBtn.addEventListener("click",e=>{e.stopPropagation();themePanelOpen=!themePanelOpen;themePanel.classList.toggle("hidden",!themePanelOpen)})
document.addEventListener("click",()=>{themePanelOpen=false;themePanel.classList.add("hidden")})
themePanel.addEventListener("click",e=>e.stopPropagation())
document.querySelectorAll(".theme-option").forEach(opt=>{
  opt.addEventListener("click",()=>{
    currentTheme=opt.dataset.theme;document.body.setAttribute("data-theme",currentTheme)
    document.querySelectorAll(".theme-option").forEach(o=>o.classList.remove("active"));opt.classList.add("active")
    themePanelOpen=false;themePanel.classList.add("hidden");showToast("Theme: "+themeNames[currentTheme])
  })
})

// ─── WARP ────────────────────────────────────────────────────
const warpCanvas=document.getElementById("warpCanvas"),wCtx=warpCanvas.getContext("2d")
let warpAnimId=null,warpProgress=0
function resizeWC(){warpCanvas.width=window.innerWidth;warpCanvas.height=window.innerHeight}
resizeWC()
function drawWarp(p){
  const w=warpCanvas.width,h=warpCanvas.height,cx=w/2,cy=h/2
  wCtx.clearRect(0,0,w,h);wCtx.fillStyle=`rgba(2,4,15,${Math.min(p*1.8,0.97)})`;wCtx.fillRect(0,0,w,h)
  for(let i=0;i<150;i++){const a=(i/150)*Math.PI*2,len=80+p*900,sr=15+p*50,al=Math.min(p*2.5,0.9),hue=200+(i/150)*160+p*60;wCtx.beginPath();wCtx.moveTo(cx+Math.cos(a)*sr,cy+Math.sin(a)*sr);wCtx.lineTo(cx+Math.cos(a)*(sr+len),cy+Math.sin(a)*(sr+len));wCtx.strokeStyle=`hsla(${hue},100%,75%,${al})`;wCtx.lineWidth=1+p*2;wCtx.stroke()}
  if(p>0.65){const fa=(p-0.65)/0.35,gr=wCtx.createRadialGradient(cx,cy,0,cx,cy,250);gr.addColorStop(0,`rgba(210,245,255,${fa*0.95})`);gr.addColorStop(1,"transparent");wCtx.fillStyle=gr;wCtx.fillRect(0,0,w,h)}
}
function warpJump(next){
  playWarp();warp.classList.add("active");warpProgress=0
  if(warpAnimId)cancelAnimationFrame(warpAnimId)
  function go(){warpProgress+=0.025;drawWarp(Math.min(warpProgress,1));if(warpProgress<0.88){warpAnimId=requestAnimationFrame(go)}else{document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));next.classList.remove("hidden");setTimeout(()=>{warp.classList.remove("active");warpProgress=0;wCtx.clearRect(0,0,warpCanvas.width,warpCanvas.height)},320)}}
  go()
}

// ─── PARTICLE BURST ──────────────────────────────────────────
const burstCanvas=document.getElementById("burstCanvas"),bCtx=burstCanvas.getContext("2d")
burstCanvas.width=window.innerWidth;burstCanvas.height=window.innerHeight
let particles=[]
function spawnBurst(x,y){for(let i=0;i<70;i++){const a=Math.random()*Math.PI*2,s=2+Math.random()*7;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,decay:0.018+Math.random()*0.025,size:2+Math.random()*5,hue:180+Math.random()*140})}}
function drawBurst(){bCtx.clearRect(0,0,burstCanvas.width,burstCanvas.height);particles=particles.filter(p=>p.life>0);particles.forEach(p=>{bCtx.beginPath();bCtx.arc(p.x,p.y,p.size*p.life,0,Math.PI*2);bCtx.fillStyle=`hsla(${p.hue},100%,70%,${p.life})`;bCtx.fill();p.x+=p.vx;p.y+=p.vy;p.vy+=0.1;p.life-=p.decay;p.size*=0.97});requestAnimationFrame(drawBurst)}
drawBurst()

// ─── GLOBAL DATA ─────────────────────────────────────────────
let globalData={}

// ─── PAGE FLOW ───────────────────────────────────────────────
startBtn.onclick=()=>warpJump(page2)

calcBtn.onclick=()=>{
  if(!selectedDOB){warning.innerText="⚠️ Pick your birth date, traveler";return}
  const birth=selectedDOB,today=new Date()
  if(birth>today){warning.innerText="⚠️ Future dates aren't in the database yet";return}
  const years=calcAge(birth),days=Math.floor((today-birth)/86400000)
  const name=userName.value.trim(),displayName=name?name.toUpperCase():"COSMIC TRAVELER"
  const birthYear=birth.getFullYear(),month=birth.getMonth()+1,day=birth.getDate()
  globalData={years,days,name:displayName,birth,birthYear,month,day,msgText:""}

  userBadge.innerText=`🌌 ${displayName}'S GALAXY BRIEF`
  warpJump(page3)

  setTimeout(()=>{
    playReveal()
    spawnBurst(window.innerWidth/2,window.innerHeight/3)
    animateNum(ageYears,years,"")
    animateNum(ageDays,days,"")
    const msg=generateMsg(years,birth)
    message.innerText=msg
    globalData.msgText=msg

    // Zodiac
    const z=getZodiac(month,day)
    document.getElementById("zodiacIcon").innerText=z.symbol
    document.getElementById("zodiacLabel").innerText=z.name
    document.getElementById("zodiacLine").innerText=z.oneliner

    // Personality
    const per=getPersonality(month,years)
    document.getElementById("personalityLabel").innerText=per.type
    document.getElementById("personalityLine").innerText=per.oneliner

    // Cosmic Twin
    document.getElementById("twinLine").innerText=getCosmicTwin(birthYear)

    // Birthday countdown
    document.getElementById("bdayLine").innerText=getBdayCountdown(birth)

    // Birth year facts
    document.getElementById("factsLabel").innerText=`BORN IN ${birthYear}`
    const facts=getBirthYearFacts(birthYear)
    const fl=document.getElementById("factsList");fl.innerHTML=""
    facts.slice(0,3).forEach(f=>{const d=document.createElement("div");d.className="fact-line";d.innerText=f;fl.appendChild(d)})
  },600)
}

document.getElementById("retryBtn").onclick=()=>warpJump(page1)

// ─── AGE CALC ────────────────────────────────────────────────
function calcAge(birth){const today=new Date();let y=today.getFullYear()-birth.getFullYear();const m=today.getMonth()-birth.getMonth();if(m<0||(m===0&&today.getDate()<birth.getDate()))y--;return y}

// ─── COUNT UP ────────────────────────────────────────────────
function animateNum(el,target,suffix){const dur=1400,start=performance.now();function step(now){const p=Math.min((now-start)/dur,1),e=1-Math.pow(1-p,3);el.innerText=Math.floor(e*target).toLocaleString()+suffix;if(p<1)requestAnimationFrame(step);else el.innerText=target.toLocaleString()+suffix}requestAnimationFrame(step)}

// ─── BIRTHDAY COUNTDOWN ──────────────────────────────────────
function getBdayCountdown(birth){
  const today=new Date(),y=today.getFullYear()
  let next=new Date(y,birth.getMonth(),birth.getDate())
  if(next<=today)next=new Date(y+1,birth.getMonth(),birth.getDate())
  const diff=Math.ceil((next-today)/86400000)
  if(diff===0)return "Today. The cosmos throws a party 🎉"
  if(diff===1)return "Tomorrow. Get ready 🎂"
  return `${diff} days away. Cosmos is counting 🎂`
}

// ─── ZODIAC ──────────────────────────────────────────────────
function getZodiac(month,day){
  const signs=[
    {name:"CAPRICORN",symbol:"♑",range:[[12,22],[1,19]],oneliner:"Ambitious. Disciplined. Unbothered. 🐐"},
    {name:"AQUARIUS", symbol:"♒",range:[[1,20],[2,18]], oneliner:"Ahead of their time. Always. 🌊"},
    {name:"PISCES",   symbol:"♓",range:[[2,19],[3,20]], oneliner:"Feels everything. Pretends not to. 🐟"},
    {name:"ARIES",    symbol:"♈",range:[[3,21],[4,19]], oneliner:"First. Always first. No regrets. 🔥"},
    {name:"TAURUS",   symbol:"♉",range:[[4,20],[5,20]], oneliner:"Unbothered. Moisturized. Winning. 🌸"},
    {name:"GEMINI",   symbol:"♊",range:[[5,21],[6,20]], oneliner:"Two faces. Both iconic. Sorry not sorry. 💀"},
    {name:"CANCER",   symbol:"♋",range:[[6,21],[7,22]], oneliner:"Soft heart. Iron boundaries. 🌙"},
    {name:"LEO",      symbol:"♌",range:[[7,23],[8,22]], oneliner:"Main character. No auditions needed. 🦁"},
    {name:"VIRGO",    symbol:"♍",range:[[8,23],[9,22]], oneliner:"Already noticed 3 errors in this. ✨"},
    {name:"LIBRA",    symbol:"♎",range:[[9,23],[10,22]],oneliner:"Still deciding. Since 2019. ⚖️"},
    {name:"SCORPIO",  symbol:"♏",range:[[10,23],[11,21]],oneliner:"Intense. Mysterious. Unstoppable. 🦂"},
    {name:"SAGITTARIUS",symbol:"♐",range:[[11,22],[12,21]],oneliner:"Booked a one-way ticket. Called it growth. 🏹"}
  ]
  for(const s of signs){const[start,end]=s.range;if((month===start[0]&&day>=start[1])||(month===end[0]&&day<=end[1]))return s}
  return signs[0]
}

// ─── PERSONALITY ─────────────────────────────────────────────
function getPersonality(month,age){
  const types=[
    {type:"CHAOS ARCHITECT",   months:[1,5,9], oneliner:"Designs chaos. Somehow it works. 🏗️"},
    {type:"STAR WANDERER",     months:[2,6,10],oneliner:"Always between destinations. Collecting vibes. 🌠"},
    {type:"VOID GUARDIAN",     months:[3,7,11],oneliner:"Thrives in the deep end. Takes notes. 🌑"},
    {type:"NEBULA DREAMER",    months:[4,8,12],oneliner:"Ideas three dimensions ahead. 💭"},
    {type:"COSMIC DISRUPTOR",  months:[5,9,1], oneliner:"Rules? Suggestions. 💥"},
    {type:"ORBIT KEEPER",      months:[6,10,2],oneliner:"Everyone gravitates toward you. Facts. 🪐"},
    {type:"SUPERNOVA SOUL",    months:[7,11,3],oneliner:"Burns bright. Leaves a mark. Always. ⭐"},
    {type:"QUANTUM THINKER",   months:[8,12,4],oneliner:"Sees patterns nobody else sees. 🔬"}
  ]
  const t=types.find(t=>t.months.includes(month))||types[month%types.length]
  return t
}

// ─── COSMIC TWIN ─────────────────────────────────────────────
function getCosmicTwin(year){
  const twins={
    1924:"Marlon Brando. Main character from birth.",1925:"Malcolm X. Born to make history.",
    1926:"Queen Elizabeth II. Royalty recognizes royalty.",1927:"Marilyn Monroe. Iconic from day one.",
    1928:"Andy Warhol. Saw the world differently.",1929:"Anne Frank. Left a mark on history.",
    1930:"Clint Eastwood. Legend confirmed.",1931:"James Dean. Born iconic. No instructions needed.",
    1932:"Elizabeth Taylor. Diamond-level energy.",1933:"Yoko Ono. Artists only.",
    1934:"Sophia Loren. The cosmos was creating icons.",1935:"Elvis Presley. The King was born. And so were you.",
    1936:"Dalai Lama. Big wisdom energy.",1937:"Dustin Hoffman. Deep, unforgettable.",
    1938:"Natalie Wood. Stars were literally born that year.",1939:"Tina Turner. Simply the best. No cap.",
    1940:"John Lennon. Imagine being born same year as a legend.",1941:"Bob Dylan. Poets and prophets together.",
    1942:"Paul McCartney. Cosmic playlist year.",1943:"Mick Jagger. Rock stars activated.",
    1944:"Diana Ross. Born to shine.",1945:"Bob Marley. One love from birth.",
    1946:"Dolly Parton & Clinton. Maximum range.",1947:"Elton John & Bowie. Legends only.",
    1948:"Ozzy Osbourne. Chaos and royalty.",1949:"Meryl Streep. Excellence was the standard.",
    1950:"Stevie Wonder. Music and magic.",1951:"Sting. Cool, mysterious, iconic.",
    1952:"Mr. T & Aykroyd. The universe had range.",1953:"Hulk Hogan. Born strong.",
    1954:"Oprah Winfrey. Born in a year of pure power.",1955:"Bill Gates & Steve Jobs. Built the future.",
    1956:"Carrie Fisher. May the force be with you.",1957:"Spike Lee. Visionaries only.",
    1958:"Madonna & Michael Jackson. Icons were built this year.",1959:"Magic Johnson. Born winners.",
    1960:"Bono & Maradona. Legends across every field.",1961:"Barack Obama. Leaders were born this year.",
    1962:"Tom Cruise. Born for the big screen.",1963:"Brad Pitt. History book face confirmed.",
    1964:"Keanu Reeves. He is breathtaking. And so are you.",1965:"Robert Downey Jr. Iron Man from birth.",
    1966:"Adam Sandler. Underestimated and incredible.",1967:"Elon Musk. Maximum chaos energy.",
    1968:"Will Smith. Born to be fresh.",1969:"Jennifer Lopez. Born to slay. No other option.",
    1970:"Mariah Carey. Legendary range.",1971:"Tupac. A poet born too soon.",
    1972:"Shaq & Cameron Diaz. Legends.",1973:"Tyra Banks & Dave Chappelle. Icons only.",
    1974:"DiCaprio & Joaquin Phoenix. Acting gods.",1975:"Tiger Woods & Angelina Jolie. Destined.",
    1976:"Reese Witherspoon. Ambition was the dress code.",1977:"Kanye West & Shakira. Creativity maxed.",
    1978:"Kobe Bryant. Mamba mentality from birth. RIP legend.",1979:"Chris Rock & Pink. Comedy and rebellion.",
    1980:"Kim K & Justin Timberlake. Pop culture incarnate.",1981:"Beyoncé. Born in the year of the queen.",
    1982:"Eminem. Rap god from the jump.",1983:"Nicki Minaj & Bruno Mars. Stars aligned literally.",
    1984:"LeBron James. GOAT energy from day one.",1985:"Cristiano Ronaldo. Built for greatness.",
    1986:"Adele. Hello from the other side of iconic.",1987:"Messi. The greatest. Same year as you.",
    1988:"Rihanna. Born bad and boujee. Slay.",1989:"Taylor Swift. Born in a legendary era.",
    1990:"Dua Lipa. Iconic from the jump.",1991:"Ed Sheeran. Shape of you was born that year.",
    1992:"Doja Cat & Harry Styles. Icons incoming.",1993:"Ariana Grande. Thank u, next.",
    1994:"Justin Bieber & Selena Gomez. Internet's favorites.",1995:"Billie Eilish (almost). Gen-Z royalty.",
    1996:"Zendaya. Born same year as actual royalty.",1997:"Timothée Chalamet. Building the future.",
    1998:"Shawn Mendes. Talent was maxed.",1999:"Olivia Rodrigo. Lore heavy era.",
    2000:"Millennium babies only. Historic.",2001:"Billie Eilish. Born different, changed everything.",
    2002:"Gen-Z stars in the making. Watch this space.",2003:"Current Gen-Z icons. That's you.",
    2004:"You're literally the future. Cosmos says so.",2005:"Universe still designing your plot arc.",
    2006:"Gen-Alpha energy. Built for a world that doesn't exist yet.",2007:"Grew up alongside the iPhone. Iconic timing.",
    2008:"Obama got elected your birth year. Historic energy from day one.",2009:"Bitcoin was invented this year. Revolutionary era.",
    2010:"Instagram launched your birth year. The cosmos knew.",2011:"Snapchat was born same year. Chaos from the start.",
    2012:"Next-level humans born this year. Evidence: you.",2013:"BTS debuted this year. Legendary arrivals only.",
    2014:"Iconic year. Quietly building legends.",2015:"Born the year Back to the Future predicted. Living in the future.",
    2016:"Pokémon GO launched your birth year. Chaotic entry.",2017:"Bitcoin peaked then crashed. Dramatic entrance.",
    2018:"Thanos snapped. You survived the timeline.",2019:"Avengers Endgame year. Final chapter, new beginning.",
    2020:"Born in the pandemic. Ultimate main character origin story.",2021:"Born in the recovery era. World needed you.",
    2022:"ChatGPT launched this year. You and AI entered together.",2023:"Born in the AI era. The future is your birth year.",
    2024:"So fresh the universe is still processing your arrival."
  }
  return twins[year]||`Born in ${year}. Lore still being written. Stay tuned.`
}

// ─── BIRTH YEAR FACTS ────────────────────────────────────────
const byFacts={
  1924:["First Winter Olympics held.","IBM was founded.","Lenin died."],
  1925:["The Great Gatsby published.","First TV broadcast happened.","Hitler published Mein Kampf."],
  1926:["Winnie-the-Pooh published.","TV demonstrated publicly.","Route 66 established."],
  1927:["Lindbergh flew solo across Atlantic.","First talkie film released.","BBC established."],
  1928:["Mickey Mouse debuted.","Penicillin discovered.","First colour TV demonstrated."],
  1929:["Great Depression began.","Vatican became independent state.","Popeye appeared."],
  1930:["Pluto discovered.","First World Cup held.","Twinkies invented."],
  1931:["Empire State Building opened.","Star-Spangled Banner became US anthem.","Dracula film released."],
  1932:["Amelia Earhart flew solo across Atlantic.","Sydney Harbour Bridge opened.","Zippo lighters invented."],
  1933:["Hitler became Chancellor.","First drive-in cinema opened.","Prohibition ended in USA."],
  1934:["Bonnie and Clyde killed.","Flash Gordon created.","Donald Duck debuted."],
  1935:["Monopoly officially released.","Penguin Books founded.","Nylon invented."],
  1936:["Berlin Olympics held.","BBC began world's first TV service.","Gone with the Wind published."],
  1937:["Hindenburg disaster.","Snow White — Disney's first feature film.","Golden Gate Bridge opened."],
  1938:["Superman debuted in comics.","War of the Worlds radio panic.","Teflon accidentally invented."],
  1939:["WWII began.","Wizard of Oz premiered.","Batman first appeared."],
  1940:["Dunkirk evacuation.","McDonald's first restaurant opened.","Tom and Jerry debuted."],
  1941:["Pearl Harbor attack.","Captain America debuted.","Cheerios introduced."],
  1942:["Manhattan Project began.","Casablanca filmed.","Stalingrad — bloodiest battle."],
  1943:["Pentagon completed.","Penicillin first used on patient.","ENIAC computer being built."],
  1944:["D-Day — Normandy landings.","First kidney dialysis used.","Bretton Woods system established."],
  1945:["WWII ended.","United Nations founded.","Atomic bombs dropped on Japan."],
  1946:["ENIAC computer unveiled.","Churchill's Iron Curtain speech.","Baby boom began."],
  1947:["India gained independence.","Cold War began.","Transistor invented at Bell Labs."],
  1948:["Israel established.","NASCAR founded.","McDonald's opened in California."],
  1949:["NATO established.","Soviet Union tested nuclear weapon.","1984 published by Orwell."],
  1950:["Korean War began.","First credit card introduced.","Peanuts comic strip debuted."],
  1951:["Colour TV introduced in USA.","First commercial computer delivered.","First nuclear electricity reactor tested."],
  1952:["Elizabeth II became Queen.","Hydrogen bomb tested.","Tetracycline discovered."],
  1953:["Everest was summited.","DNA double helix discovered.","Korean War ended."],
  1954:["Sub-4-minute mile run.","Nuclear submarine launched.","Lord of the Rings Vol.1 published."],
  1955:["Disneyland opened.","Rosa Parks refused to move.","McDonald's incorporated."],
  1956:["Elvis released Heartbreak Hotel.","Transatlantic phone cable laid.","Velcro patented."],
  1957:["Sputnik launched into space.","Laika the dog went to space.","European Economic Community created."],
  1958:["NASA established.","Hula Hoop craze.","LEGO received its patent."],
  1959:["Barbie doll introduced.","First microchip developed.","Hawaii and Alaska became US states."],
  1960:["Contraceptive pill approved.","First weather satellite launched.","Psycho released."],
  1961:["Gagarin went to space.","Berlin Wall built.","Peace Corps launched."],
  1962:["Cuban Missile Crisis.","First James Bond film.","Walmart founded."],
  1963:["JFK assassinated.","I Have a Dream speech.","Beatles released first album."],
  1964:["Civil Rights Act signed.","Ford Mustang introduced.","Muhammad Ali became champion."],
  1965:["US troops entered Vietnam.","Mini skirt became a thing.","Beatles played Shea Stadium."],
  1966:["Star Trek first aired.","England won World Cup.","Miranda Rights established."],
  1967:["First Super Bowl played.","First ATM installed.","Sgt. Pepper's released."],
  1968:["MLK assassinated.","First 911 number established.","2001: A Space Odyssey released."],
  1969:["Moon landing happened.","Woodstock festival.","Internet predecessor ARPANET created."],
  1970:["Beatles broke up.","First Earth Day.","Floppy disks introduced."],
  1971:["Intel released first microprocessor.","Walt Disney World opened.","Email invented."],
  1972:["Pong — first arcade game.","Munich Olympics massacre.","Atari founded."],
  1973:["Sears Tower completed.","Dark Side of the Moon released.","Roe v. Wade decided."],
  1974:["Nixon resigned.","Rubik's Cube invented.","ABBA won Eurovision."],
  1975:["Vietnam War ended.","Microsoft founded.","Saturday Night Live premiered."],
  1976:["Apple founded.","Concorde flights began.","Ramones released debut album."],
  1977:["Star Wars released.","Apple II introduced.","Elvis died."],
  1978:["First test tube baby born.","First spam email sent.","Space Invaders released."],
  1979:["Walkman introduced by Sony.","Thatcher became UK PM.","Iranian Revolution."],
  1980:["Mount St. Helens erupted.","John Lennon murdered.","CNN launched."],
  1981:["MTV launched.","IBM PC introduced.","First Space Shuttle launched."],
  1982:["Thriller released by MJ.","First CD player released.","TCP/IP internet protocol established."],
  1983:["Internet born with TCP/IP.","First mobile phone by Motorola.","Return of the Jedi released."],
  1984:["Mac computer launched.","LA Olympics held.","Tetris created."],
  1985:["Back to the Future released.","First .com domain registered.","New Coke flopped."],
  1986:["Chernobyl disaster.","Pixar founded.","Windows released."],
  1987:["First disposable camera.","Black Monday stock crash.","U2 released The Joshua Tree."],
  1988:["First internet worm virus.","Die Hard released.","Pixar won first Oscar."],
  1989:["Berlin Wall fell.","World Wide Web invented.","Game Boy released."],
  1990:["Hubble Telescope launched.","WWW went public.","Mandela released from prison."],
  1991:["Soviet Union collapsed.","Nirvana released Nevermind.","Gulf War ended."],
  1992:["First text message sent.","Euro Disney opened.","Clinton elected President."],
  1993:["WWW opened to public.","Jurassic Park released.","Mosaic browser launched."],
  1994:["PlayStation released in Japan.","Amazon founded.","Mandela became President."],
  1995:["Windows 95 launched.","Toy Story — first CGI film.","eBay launched."],
  1996:["Pokémon launched in Japan.","Dolly the sheep cloned.","Spice Girls released Wannabe."],
  1997:["Harry Potter published.","Titanic dominated box office.","Google prototype launched."],
  1998:["Google founded.","iMac G3 launched.","First MP3 player released."],
  1999:["The Matrix released.","Napster disrupted music.","Euro currency introduced."],
  2000:["Y2K came and went.","The Sims released.","First ISS crew arrived."],
  2001:["Wikipedia launched.","iPod released.","9/11 changed the world."],
  2002:["Euro currency launched.","Spider-Man released.","Friendster launched."],
  2003:["MySpace launched.","Human Genome Project completed.","Finding Nemo released."],
  2004:["Facebook launched at Harvard.","Gmail introduced.","Indian Ocean tsunami."],
  2005:["YouTube founded.","Katrina devastated New Orleans.","Reddit launched."],
  2006:["Twitter launched.","Nintendo Wii released.","Pluto demoted."],
  2007:["First iPhone released.","Kindle launched.","Great Recession began."],
  2008:["Obama became first Black US President.","Global financial crisis hit.","Large Hadron Collider activated."],
  2009:["Bitcoin created.","WhatsApp founded.","Avatar became biggest film ever."],
  2010:["Instagram launched.","iPad introduced.","Deepwater Horizon disaster."],
  2011:["Snapchat founded.","Bin Laden killed.","Steve Jobs died."],
  2012:["SpaceX docked with ISS.","Gangnam Style hit 1B views.","Higgs Boson discovered."],
  2013:["BTS debuted. Legends entered the chat.","Snowden leaked NSA secrets.","Selfie became word of the year."],
  2014:["Ice Bucket Challenge went viral.","Ebola outbreak.","Apple Watch announced."],
  2015:["First image of Pluto captured.","Same-sex marriage legalised in USA.","Back to the Future Day celebrated."],
  2016:["Pokémon GO took over the world.","Bowie and Prince both died.","Brexit shocked everyone."],
  2017:["Bitcoin hit $10,000.","MeToo movement went global.","Fidget spinners happened."],
  2018:["Fortnite dominated the planet.","First black hole image captured.","Infinity War broke records."],
  2019:["First black hole photo revealed.","Avengers Endgame smashed records.","Area 51 raid meme happened."],
  2020:["COVID-19 pandemic began.","Zoom calls became life.","Among Us took over."],
  2021:["COVID vaccines rolled out.","NFTs went trillion-dollar.","Squid Game took over Netflix."],
  2022:["ChatGPT launched. Everything changed.","Russia invaded Ukraine.","Queen Elizabeth II died."],
  2023:["AI went fully mainstream.","Barbie film dominated box office.","Twitter became X."],
  2024:["AI became part of daily life.","Paris Olympics held.","SpaceX Starship nailed orbital flight."]
}
function getBirthYearFacts(year){
  if(byFacts[year])return byFacts[year].sort(()=>0.5-Math.random()).slice(0,3)
  const closest=Object.keys(byFacts).map(Number).reduce((p,c)=>Math.abs(c-year)<Math.abs(p-year)?c:p)
  return getBirthYearFacts(closest)
}

// ─── MESSAGE DATABASE ─────────────────────────────────────────
// Special milestone messages
const milestones={
  1:"Year 1 done. You showed up and decided to stay. Respect.",
  5:"Five years. Earth did 5 laps just for you. Loyalty.",
  10:"A whole decade. The universe took notes.",
  13:"Teenager unlocked. Parents are already nervous. 😅",
  16:"Sweet 16. You can legally drive now. Society fumbled. 💀",
  18:"Adult mode activated. No tutorial. No manual. Good luck. 🎉",
  21:"Level 21. Universe ran out of training levels. Freeplay now.",
  25:"Halfway to 50. Bro, time is not playing. ⏳",
  30:"Thirty. Either thriving or crying. No in between. 💀",
  40:"40s hit different. You're not lost. Scenic route. 🛣️",
  50:"Half a century. You've seen THINGS, bestie. THINGS. 👀",
  60:"60 trips. You watched trends die and return 3 times. 💅",
  70:"Seven decades. The cosmos respects the commitment. 🙏",
  75:"75 years. Veteran status confirmed. Legendary. 🏆",
  80:"80 years. Plot twist nobody predicted. Still here. 👑",
  90:"90 years. You're a historical event still in progress. 📜",
  100:"Bro enter YOUR age. Not your ancestor's. 💀💀💀"
}

// Pre-2000 bonus
const pre2000=[
  "Did you see the dinosaurs bro? 👀 Pre-2000 detected.",
  "You existed before Google. How did you find anything? 💀",
  "Born before Wi-Fi. Survived anyway. Elite status. 📡",
  "You remember dial-up internet. Ancient and powerful. 🔌",
  "Pre-2000 arrival confirmed. Two centuries. That's range. 📅",
  "You remember a world without smartphones. Unmatched. 📵"
]

// Age range pools — short, punchy, Gen-Z, pop culture mixed
const pools={
  under13:[
    "Still in beta. Update pending. 🔄",
    "Early access human. Already impressive. 🎮",
    "Tutorial still running. Already beating optional challenges. 🕹️",
    "Origin story arc: active. Cosmos is watching. 📺",
    "More future than anyone in the room. That's the flex. 💪",
    "Like Naruto in episode 1. The journey just started. 🍃",
    "Mini human detected. Potential: uncharted. 🌟",
    "You're literally a new DLC drop. Fresh. Exciting. 🎯",
    "Chapter 1 vibes. The best is coming. Trust. 📖",
    "The universe just spawned you. Respawn point: unlocked. 🎮"
  ],
  teen:[
    "Teenager detected. Parents are nervous. 😭",
    "Running on minimal sleep and maximum chaos. Iconic. ⚡",
    "Every emotion is a final boss. You've survived all of them. 🎮",
    "Not a side character. Never was. Never will be. 🌟",
    "Like Zuko's character arc — your era is coming. 🔥",
    "Social battery: 2%. Creativity: 100%. You're fine. 💀",
    "BTS said it best — you were born to shine. 💜",
    "Teen years = where the real lore gets written. 📖",
    "Chaotic. Tired. Unstoppable. That's the vibe. 🌪️",
    "Attack on Titan taught you — keep moving forward. ⚔️",
    "Your playlist knows more about you than people do. 🎵",
    "The glow-up is loading. ETA: imminent. ⏳",
    "One Piece energy — still searching, still winning. ⚓",
    "Hogwarts letter delayed. Potential: still legendary. 🧙",
    "Blackpink said how you like that — and you said yes. 💅"
  ],
  youngAdult:[
    "Adult unlocked. No cheat codes included. 🎮",
    "Tutorial ended. Making your own rules now. 📜",
    "Running on ambition and a concerning sleep schedule. ☕",
    "I am the one who knocks. And I've been knocking. 🚪",
    "Old enough to dream. Still young enough to build it. 🏗️",
    "Could this age BE any more iconic? 🛋️",
    "Your generation walked in and the system had to update. 💻",
    "Stranger Things era — the upside down can't stop you. 🔦",
    "Understood the assignment before they explained it. ✅",
    "One good idea away from changing everything. 💡",
    "Minecraft hardcore mode. No deaths. Still going. ⛏️",
    "The comeback started before anyone noticed it was needed. 🔄",
    "BLACKPINK in your area. Main character confirmed. 🎤",
    "You're in your Spider-Man era. Great power incoming. 🕷️",
    "Built different. No factory settings available. 🏭"
  ],
  midlife25:[
    "Old vibe detected. You good though. 😭",
    "You remember life before TikTok. Veteran status. 📱",
    "Quarter-life crisis? Nah. Character development. 📈",
    "You know the rules AND when to break them. Based. 😎",
    "Refined chaos. Still chaotic. Just with better taste. 🍷",
    "Back pain DLC loading... Wisdom already installed. 💊",
    "Breaking Bad era — you are the one who thrives. 🟢",
    "Game of Thrones taught you — expect plot twists. 🐉",
    "You've survived enough to have opinions. And you keep them. 💪",
    "Unbothered. Moisturized. In your lane. Winning. 🛣️",
    "The era of 'I don't explain myself anymore' has begun. 🤐",
    "Old enough to know better. Doing it anyway. Classic. 🎭",
    "You watched trends die. You are what outlasts trends. 👑",
    "Squid Game logic — you survived every round so far. 🟢",
    "House of Cards era — strategic, calm, unstoppable. ♠️"
  ],
  fortyPlus:[
    "Old vibe secured. Absolutely thriving though. 🔒",
    "You've seen trends come and go three times. You ARE the trend. 💅",
    "40+ and unbothered. That's the whole flex. 😌",
    "Seen more plot twists than Game of Thrones. Still standing. ⚔️",
    "You remember a world before Google. Ancient and powerful. 🔍",
    "Elder chaos energy. There is no higher rank. 👑",
    "Breaking Bad era — the transformation is complete. 🧪",
    "You've outlasted phones, trends, and everyone's doubts. 💪",
    "Not old. Vintage. Limited edition. Premium features. 🏆",
    "The 40s are the main event. Everything else was warmup. 🎬",
    "You've survived: fashion disasters, tech revolutions, everything. 🌍",
    "Stopped explaining yourself. Started simply being. Upgrade complete. ⬆️",
    "Like Tony Soprano — you run the room without trying. 🤌",
    "Suits era — experienced, sharp, and done with nonsense. 👔",
    "You walked in and the entire vibe shifted. Just physics. 🌊"
  ],
  senior:[
    "60+. You're a historical figure still making history. 📜",
    "You've outlasted trends, tech, and everyone who doubted you. 💪",
    "Running the long game. Winning was never in question. 🏆",
    "The universe put you through everything. You're STILL HERE. 🌟",
    "Senior chaos energy. Maximum respect. No notes. 👑",
    "You ARE the wisdom others are desperately searching for. 📚",
    "Watched the world change completely. Adapted every time. 🌍",
    "You remember when this was all fields. Powerful. 🌾",
    "Outlived phones, presidents, and pessimists. Elite. 📱",
    "Like Dumbledore — wise, calm, and lowkey the most powerful. 🧙"
  ],
  century:[
    "Bro enter YOUR age. Not your ancestor's. 💀💀",
    "100+ years. The simulation did not plan for this. 🖥️",
    "Century mode unlocked. The universe is taking notes. 📝",
    "You broke the scale. The cosmos is impressed and confused. 🌌",
    "You ARE the lore. Other people reference you. 📖",
    "One hundred years. Earth has been loyal to you specifically. 🌍",
    "The system cannot believe you're still running. Based. 💻",
    "You've outlived the odds, the doctors, and the pessimists. 👑",
    "At this point you're a verified historical event. 🏛️",
    "Gandalf energy. You shall not pass... away. 🧙"
  ],
  rare:[
    "Cosmic rarity detected. One in a million. Universe flagged this. 🌌",
    "Reality glitch confirmed. You broke the algorithm. 💻",
    "Hidden timeline discovered. How? Nobody knows. 🔍",
    "Universe RNG: critical hit. Your timeline is blessed. 🎲",
    "Error 404: normal outcome not found. You are different. ⚠️",
    "Secret achievement unlocked: Cosmic Anomaly. 🏆",
    "The system spent extra time on your result. Still has questions. 🤔",
    "Simulation devs are taking notes on your playthrough specifically. 🎮"
  ],
  popCulture:[
    "Naruto ran so you could walk. Now you sprint. 🍃",
    "Survived more plot twists than Shonda Rhimes writes. 💀",
    "BTS said you were born to shine. The cosmos agrees. 💜",
    "Like Luffy — you gathered your crew and kept going. ⚓",
    "Could this age BE any more iconic? We think not. 🛋️",
    "Genshin Impact loading screen: your life. Just keep exploring. 🗺️",
    "You've got more lore than a Marvel series. No cap. 🦸",
    "Squid Game survivor status: confirmed. 🟢",
    "Attack on Titan taught you — the rumbling was life. ⚔️",
    "Breaking Bad era — transformation complete. You are the danger. 🧪",
    "BLACKPINK said how you like that. Answer: very much. 💅",
    "Like Ted Lasso — you believed and it worked. 🏆",
    "Stranger Things energy — weird things happen, you handle it. 🔦",
    "One Piece energy — still on the journey, still winning. ⚓",
    "The Mandalorian said this is the way. You found your own. 🪐"
  ]
}

function generateMsg(age,birth){
  // Exact milestone
  if(milestones[age])return milestones[age]

  // 100+
  if(age>100)return pick(pools.century)

  // Rare Easter egg — 1%
  if(Math.random()<0.01)return pick(pools.rare)

  // Pop culture Easter egg — 15%
  if(Math.random()<0.15)return pick(pools.popCulture)

  // Pre-2000 — always show for 20+
  const pre=birth&&birth.getFullYear()<2000
  if(pre&&age>=20&&Math.random()<0.4)return pick(pre2000)

  // Age ranges
  if(age<13)  return pick(pools.under13)
  if(age<18)  return pick(pools.teen)
  if(age<25)  return pick(pools.youngAdult)
  if(age<40)  return pick(pools.midlife25)
  if(age<65)  return pick(pools.fortyPlus)
  return pick(pools.senior)
}

function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}

// ─── FEEDBACK ────────────────────────────────────────────────
let selectedStars=0
const stars=document.querySelectorAll(".star")
stars.forEach(s=>{
  s.addEventListener("click",()=>{
    selectedStars=parseInt(s.dataset.val)
    stars.forEach((st,i)=>{st.classList.toggle("active",i<selectedStars);st.innerText=i<selectedStars?"★":"☆"})
    document.getElementById("feedbackMsgWrap").classList.remove("hidden")
  })
  s.addEventListener("mouseenter",()=>{const v=parseInt(s.dataset.val);stars.forEach((st,i)=>{if(!st.classList.contains("active")){st.style.color=i<v?"#FFD700":"";st.style.transform=i<v?"scale(1.15)":""}})})
  s.addEventListener("mouseleave",()=>{stars.forEach(st=>{if(!st.classList.contains("active")){st.style.color="";st.style.transform=""}})})
})
document.getElementById("sendFeedbackBtn").onclick=async()=>{
  if(selectedStars===0){showToast("⭐ Pick at least one star!");return}
  const msg=document.getElementById("feedbackMsg").value.trim()
  const btn=document.getElementById("sendFeedbackBtn")
  btn.innerText="🌌 SENDING...";btn.disabled=true

  try {
    const res=await fetch("https://formspree.io/f/mbdplwlq",{
      method:"POST",
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify({
        "👤 Name":          globalData.name||"Anonymous",
        "⭐ Rating":        "⭐".repeat(selectedStars)+" ("+selectedStars+"/5)",
        "💬 Message":       msg||"(no message)",
        "🌀 Age":           globalData.years+" trips around the sun",
        "📅 Days":          globalData.days?.toLocaleString()+" days orbiting Earth",
        "🌍 Birth Year":    globalData.birthYear,
        "📅 Submitted":     new Date().toLocaleString()
      })
    })

    if(res.ok){
      const confirms=["Feedback received by the universe 🌌","The cosmos noted your rating ⭐","Message sent to the stars 🚀","Universe updated. Thank you traveler ✨","Cosmic log: updated 🛸"]
      const el=document.getElementById("feedbackConfirm")
      el.innerText=pick(confirms);el.classList.remove("hidden")
      document.getElementById("feedbackMsgWrap").classList.add("hidden")
      showToast("🌌 Feedback sent to the universe!")
    } else {
      showToast("⚠️ Something went wrong. Try again!")
      btn.innerText="🌌 SEND TO UNIVERSE";btn.disabled=false
    }
  } catch(err){
    showToast("⚠️ No connection. Try again!")
    btn.innerText="🌌 SEND TO UNIVERSE";btn.disabled=false
  }
}

// ─── SHARE ───────────────────────────────────────────────────
document.getElementById("shareBtn").onclick=async()=>{
  const text=`🚨 Reality check just dropped...\n\n🌀 I've made ${ageYears.innerText} TRIPS AROUND THE SUN\n📅 That's ${ageDays.innerText} DAYS ORBITING EARTH\n\n${globalData.msgText}\n\n🌌 Find out yours 👇\n${window.location.href}`
  if(navigator.share){try{await navigator.share({title:"COSMOCHAOS",text,url:window.location.href})}catch(e){}}
  else window.open("https://wa.me/?text="+encodeURIComponent(text))
}
document.getElementById("copyBtn").onclick=()=>{
  navigator.clipboard.writeText(window.location.href).then(()=>showToast("🔗 Link copied! Spread the chaos")).catch(()=>{const el=document.createElement("textarea");el.value=window.location.href;document.body.appendChild(el);el.select();document.execCommand("copy");document.body.removeChild(el);showToast("🔗 Link copied!")})
}
function showToast(msg){toast.innerText=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2800)}

// ─── CARD MODAL ──────────────────────────────────────────────
let selectedCardTheme="default"
const cardModal=document.getElementById("cardModal")
document.getElementById("downloadBtn").onclick=()=>{
  selectedCardTheme=currentTheme
  document.querySelectorAll(".card-theme-dot").forEach(d=>d.classList.toggle("active",d.dataset.ctheme===selectedCardTheme))
  renderPreview(selectedCardTheme);cardModal.classList.remove("hidden")
}
document.querySelectorAll(".card-theme-dot").forEach(dot=>{
  dot.addEventListener("click",()=>{
    selectedCardTheme=dot.dataset.ctheme
    document.querySelectorAll(".card-theme-dot").forEach(d=>d.classList.toggle("active",d.dataset.ctheme===selectedCardTheme))
    renderPreview(selectedCardTheme)
  })
})
document.getElementById("closeModalBtn").onclick=()=>cardModal.classList.add("hidden")
cardModal.addEventListener("click",e=>{if(e.target===cardModal)cardModal.classList.add("hidden")})
document.getElementById("downloadFinalBtn").onclick=async()=>{
  try {
    showToast("⏳ Building your card...")
    // Wait for fonts to be ready before drawing
    await document.fonts.ready
    const c=buildCard(selectedCardTheme,1080,1080)
    const dataURL=c.toDataURL("image/png")
    if(!dataURL||dataURL==="data:,"){
      showToast("⚠️ Card failed — try again");return
    }
    const a=document.createElement("a")
    a.href=dataURL
    a.download="cosmochaos_galaxy_brief.png"
    document.body.appendChild(a)
    a.click()
    setTimeout(()=>document.body.removeChild(a),100)
    showToast("📸 Galaxy Brief saved! Go slay 🚀")
  } catch(err){
    console.error("Card error:",err)
    showToast("⚠️ Card failed — try again")
  }
}
function renderPreview(theme){
  const c=buildCard(theme,540,540),pc=document.getElementById("previewCanvas")
  pc.width=c.width;pc.height=c.height;pc.getContext("2d").drawImage(c,0,0)
}

// ─── CARD BUILDER — Bulletproof, system fonts only ───────────
function buildCard(theme,W,H){
  const canvas=document.createElement("canvas")
  canvas.width=W;canvas.height=H
  const c=canvas.getContext("2d"),sc=W/1080

  const themes={
    default:{p:"#7C5CFF",s:"#00E5FF",bg1:"#02040f",bg2:"#0a0828",nb1:"rgba(100,40,220,0.3)",nb2:"rgba(0,180,255,0.2)"},
    solar:  {p:"#FF4500",s:"#FFA500",bg1:"#100200",bg2:"#1a0800",nb1:"rgba(220,60,0,0.3)",  nb2:"rgba(255,140,0,0.2)"},
    nebula: {p:"#00FF88",s:"#00FFCC",bg1:"#001008",bg2:"#001a10",nb1:"rgba(0,200,100,0.28)",nb2:"rgba(0,220,160,0.2)"},
    pink:   {p:"#FF4ECD",s:"#DD00FF",bg1:"#100010",bg2:"#1a0020",nb1:"rgba(220,40,180,0.3)",nb2:"rgba(180,0,240,0.2)"},
    ocean:  {p:"#00CED1",s:"#7FFFD4",bg1:"#000a14",bg2:"#001020",nb1:"rgba(0,160,180,0.3)", nb2:"rgba(100,220,200,0.2)"}
  }
  const tc=themes[theme]||themes.default

  // BG
  c.fillStyle=tc.bg1;c.fillRect(0,0,W,H)
  const bgGrad=c.createLinearGradient(0,0,W,H)
  bgGrad.addColorStop(0,tc.bg1);bgGrad.addColorStop(0.5,tc.bg2);bgGrad.addColorStop(1,tc.bg1)
  c.fillStyle=bgGrad;c.fillRect(0,0,W,H)

  // Nebula blobs
  cBlob(c,W*0.1, H*0.1, 350*sc,tc.nb1)
  cBlob(c,W*0.88,H*0.78,280*sc,tc.nb2)
  cBlob(c,W*0.5, H*0.5, 200*sc,tc.nb1.replace("0.3","0.08"))

  // Stars — deterministic so they look the same every time
  for(let i=0;i<250;i++){
    const x=((i*317+i*7)%997)/997*W
    const y=((i*197+i*13)%991)/991*H
    const r=(((i*7)%3)+0.3)*sc*0.8
    const a=0.2+((i*31)%10)/10*0.8
    c.beginPath();c.arc(x,y,r,0,Math.PI*2)
    c.fillStyle=`rgba(255,255,255,${a})`;c.fill()
  }

  // Star borders (use simple text, no emoji issues)
  c.fillStyle=tc.s+"99";c.font=`${20*sc}px Arial,sans-serif`;c.textAlign="center"
  c.fillText("* . . . . . . . . . . . . . . . . . . . . . *",W/2,55*sc)
  c.fillText("* . . . . . . . . . . . . . . . . . . . . . *",W/2,H-28*sc)

  // COSMOCHAOS title
  c.save()
  const tg=c.createLinearGradient(W*0.15,0,W*0.85,0)
  tg.addColorStop(0,"#ffffff");tg.addColorStop(0.4,tc.s);tg.addColorStop(1,tc.p)
  c.fillStyle=tg;c.font=`bold ${90*sc}px Arial,sans-serif`;c.textAlign="center"
  c.shadowColor=tc.s;c.shadowBlur=40*sc
  c.fillText("COSMOCHAOS",W/2,172*sc)
  c.restore()

  cDivider(c,W,200*sc,tc.s,sc)

  // Name badge
  const rawBadge=userBadge.innerText||"COSMIC TRAVELER'S GALAXY BRIEF"
  const bText=rawBadge.replace(/[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,"").trim()
  c.save()
  const bW=820*sc,bH=58*sc,bX=(W-bW)/2,bY=218*sc
  cRoundRect(c,bX,bY,bW,bH,29*sc)
  c.fillStyle="rgba(255,255,255,0.07)";c.fill()
  c.strokeStyle=tc.p;c.lineWidth=2*sc;c.shadowColor=tc.p;c.shadowBlur=18*sc;c.stroke()
  c.fillStyle=tc.s;c.shadowColor=tc.s;c.shadowBlur=12*sc
  c.font=`bold ${23*sc}px Arial,sans-serif`;c.textAlign="center"
  c.fillText(bText,W/2,bY+38*sc)
  c.restore()

  // Stat cards side by side
  const gap=20*sc,sX=60*sc,sY=300*sc,sW=(W-sX*2-gap)/2,sH=108*sc
  // Left stat
  cRoundRect(c,sX,sY,sW,sH,16*sc)
  c.fillStyle="rgba(255,255,255,0.07)";c.fill()
  c.strokeStyle=tc.p;c.lineWidth=1.5*sc;c.shadowColor=tc.p;c.shadowBlur=20*sc;c.stroke()
  c.fillStyle="#fff";c.shadowColor=tc.s;c.shadowBlur=10*sc
  c.font=`bold ${38*sc}px Arial,sans-serif`;c.textAlign="center"
  c.fillText((ageYears.innerText||"0")+" TRIPS",sX+sW/2,sY+50*sc)
  c.fillStyle=tc.s+"bb";c.shadowBlur=0;c.font=`${13*sc}px Arial,sans-serif`
  c.fillText("AROUND THE SUN",sX+sW/2,sY+78*sc)
  // Right stat
  const s2X=sX+sW+gap
  cRoundRect(c,s2X,sY,sW,sH,16*sc)
  c.fillStyle="rgba(255,255,255,0.07)";c.fill()
  c.strokeStyle=tc.p;c.lineWidth=1.5*sc;c.shadowColor=tc.p;c.shadowBlur=20*sc;c.stroke()
  c.fillStyle="#fff";c.shadowColor=tc.s;c.shadowBlur=10*sc
  c.font=`bold ${38*sc}px Arial,sans-serif`;c.textAlign="center"
  c.fillText((ageDays.innerText||"0")+" DAYS",s2X+sW/2,sY+50*sc)
  c.fillStyle=tc.s+"bb";c.shadowBlur=0;c.font=`${13*sc}px Arial,sans-serif`
  c.fillText("ORBITING EARTH",s2X+sW/2,sY+78*sc)

  cDivider(c,W,438*sc,tc.p,sc)

  // Message — strip emojis for canvas safety
  const rawMsg=globalData.msgText||"Built different. No updates needed."
  const cleanMsg=rawMsg.replace(/[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FEFF}]/gu,"").trim()||"Built different. No updates needed."
  c.save()
  c.fillStyle="rgba(255,255,255,0.95)";c.font=`bold ${32*sc}px Arial,sans-serif`
  c.textAlign="center";c.shadowBlur=0
  const mLines=wrapText(cleanMsg,42)
  mLines.slice(0,2).forEach((line,i)=>c.fillText(line.trim(),W/2,(490+i*44)*sc))
  c.restore()

  cDivider(c,W,600*sc,tc.s,sc)

  // Zodiac + Personality
  c.save()
  const zodEl=document.getElementById("zodiacTitle"),perEl=document.getElementById("personalityLabel")
  if(zodEl&&perEl){
    const zt=zodEl.innerText.replace(/[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,"").trim()
    const pt=perEl.innerText.replace(/[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,"").trim()
    c.fillStyle=tc.s+"cc";c.font=`${20*sc}px Arial,sans-serif`;c.textAlign="center"
    c.fillText(zt+"   |   "+pt,W/2,648*sc)
  }
  c.restore()

  // Birth year fact
  c.save()
  const factEl=document.querySelector(".fact-line")
  if(factEl&&globalData.birthYear){
    c.fillStyle=tc.s;c.font=`bold ${16*sc}px Arial,sans-serif`;c.textAlign="center"
    c.shadowColor=tc.s;c.shadowBlur=8*sc
    c.fillText("BORN IN "+globalData.birthYear,W/2,690*sc)
    c.fillStyle="rgba(255,255,255,0.72)";c.shadowBlur=0
    c.font=`${18*sc}px Arial,sans-serif`
    const ft=factEl.innerText.replace(/[\u{1F300}-\u{1FFFF}]/gu,"").substring(0,60)
    c.fillText(ft,W/2,718*sc)
  }
  c.restore()

  cDivider(c,W,744*sc,tc.p,sc)

  // Watermark
  c.save()
  c.fillStyle="rgba(255,255,255,0.3)";c.font=`bold ${20*sc}px Arial,sans-serif`;c.textAlign="center"
  c.fillText("cosmochaos.app",W/2,786*sc)
  c.fillStyle=tc.s+"55";c.font=`${13*sc}px Arial,sans-serif`
  c.fillText(window.location.href.substring(0,55),W/2,810*sc)
  c.restore()

  return canvas
}

function cBlob(c,x,y,r,color){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,"transparent");c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2)}
function cDivider(c,W,y,color,sc){const g=c.createLinearGradient(80*sc,0,W-80*sc,0);g.addColorStop(0,"transparent");g.addColorStop(0.5,color+"88");g.addColorStop(1,"transparent");c.strokeStyle=g;c.lineWidth=1.5*(sc||1);c.beginPath();c.moveTo(80*sc,y);c.lineTo(W-80*sc,y);c.stroke()}
function cRoundRect(c,x,y,w,h,r){
  r=Math.min(r,w/2,h/2)
  c.beginPath()
  c.moveTo(x+r,y)
  c.lineTo(x+w-r,y)
  c.arcTo(x+w,y,x+w,y+r,r)
  c.lineTo(x+w,y+h-r)
  c.arcTo(x+w,y+h,x+w-r,y+h,r)
  c.lineTo(x+r,y+h)
  c.arcTo(x,y+h,x,y+h-r,r)
  c.lineTo(x,y+r)
  c.arcTo(x,y,x+r,y,r)
  c.closePath()
}
function wrapText(text,max){const words=text.split(" ");const lines=[];let cur="";words.forEach(w=>{if((cur+" "+w).trim().length>max){lines.push(cur.trim());cur=w}else cur+=" "+w});if(cur.trim())lines.push(cur.trim());return lines}

// ─── STAR FIELD ──────────────────────────────────────────────
const bgCanvas=document.getElementById("space"),ctx=bgCanvas.getContext("2d")
function resizeBg(){bgCanvas.width=window.innerWidth;bgCanvas.height=window.innerHeight}
resizeBg()
const stars2=[],shooting=[]
for(let i=0;i<420;i++)stars2.push({x:Math.random()*bgCanvas.width,y:Math.random()*bgCanvas.height,size:Math.random()*2+0.2,speed:Math.random()*0.35+0.05,tw:Math.random()*Math.PI*2,tws:0.015+Math.random()*0.04})
function drawBg(){
  ctx.fillStyle="rgba(2,4,15,0.42)";ctx.fillRect(0,0,bgCanvas.width,bgCanvas.height)
  stars2.forEach(s=>{s.tw+=s.tws;ctx.beginPath();ctx.arc(s.x,s.y,s.size,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${0.4+Math.sin(s.tw)*0.6})`;ctx.fill();s.y+=s.speed;if(s.y>bgCanvas.height){s.y=0;s.x=Math.random()*bgCanvas.width}})
  if(Math.random()<0.012)shooting.push({x:Math.random()*bgCanvas.width,y:Math.random()*bgCanvas.height*0.5,vx:5+Math.random()*6,vy:3+Math.random()*4,life:80+Math.random()*50,maxLife:130,hue:[200,300,180,260,120][Math.floor(Math.random()*5)]})
  shooting.forEach((s,i)=>{const a=s.life/s.maxLife,g=ctx.createLinearGradient(s.x,s.y,s.x-90,s.y-45);g.addColorStop(0,`hsla(${s.hue},100%,90%,${a})`);g.addColorStop(1,"transparent");ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-90,s.y-45);ctx.strokeStyle=g;ctx.lineWidth=2.5;ctx.stroke();s.x+=s.vx;s.y+=s.vy;s.life--;if(s.life<=0)shooting.splice(i,1)})
  requestAnimationFrame(drawBg)
}
drawBg()
window.addEventListener("resize",()=>{resizeBg();resizeWC();burstCanvas.width=window.innerWidth;burstCanvas.height=window.innerHeight})