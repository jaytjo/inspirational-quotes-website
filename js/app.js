(() => {
  const q = [
    {t:"The only way to do great work is to love what you do.",a:"Steve Jobs"},
    {t:"Innovation distinguishes between a leader and a follower.",a:"Steve Jobs"},
    {t:"Stay hungry, stay foolish.",a:"Steve Jobs"},
    {t:"Life is what happens when you're busy making other plans.",a:"John Lennon"},
    {t:"The future belongs to those who believe in the beauty of their dreams.",a:"Eleanor Roosevelt"},
    {t:"It is during our darkest moments that we must focus to see the light.",a:"Aristotle"},
    {t:"The only impossible journey is the one you never begin.",a:"Tony Robbins"},
    {t:"Success is not final, failure is not fatal.",a:"Winston Churchill"},
    {t:"Believe you can and you're halfway there.",a:"Theodore Roosevelt"},
    {t:"The best time to plant a tree was 20 years ago. The second best time is now.",a:"Chinese Proverb"},
    {t:"Your time is limited, don't waste it living someone else's life.",a:"Steve Jobs"},
    {t:"In the middle of difficulty lies opportunity.",a:"Albert Einstein"},
    {t:"Be the change that you wish to see in the world.",a:"Mahatma Gandhi"},
    {t:"The mind is everything. What you think you become.",a:"Buddha"},
    {t:"Strive not to be a success, but rather to be of value.",a:"Albert Einstein"},
    {t:"The best way to predict the future is to create it.",a:"Peter Drucker"},
    {t:"Do what you can, with what you have, where you are.",a:"Theodore Roosevelt"},
    {t:"Everything you've ever wanted is on the other side of fear.",a:"George Addair"},
    {t:"Dream big and dare to fail.",a:"Norman Vaughan"},
    {t:"What lies behind us and what lies before us are tiny matters compared to what lies within us.",a:"Ralph Waldo Emerson"},
    {t:"Success usually comes to those who are too busy to be looking for it.",a:"Henry David Thoreau"},
    {t:"Don't be afraid to give up the good to go for the great.",a:"John D. Rockefeller"},
    {t:"I find that the harder I work, the more luck I seem to have.",a:"Thomas Jefferson"},
    {t:"The way to get started is to quit talking and begin doing.",a:"Walt Disney"},
    {t:"The only way to predict the future is to have power to shape the future.",a:"Eric Hoffer"},
    {t:"Happiness is not something ready made. It comes from your own actions.",a:"Dalai Lama"},
    {t:"You miss 100% of the shots you don't take.",a:"Wayne Gretzky"},
    {t:"Act as if what you do makes a difference. It does.",a:"William James"},
    {t:"What you get by achieving your goals is not as important as what you become.",a:"Zig Ziglar"},
    {t:"The only person you are destined to become is the person you decide to be.",a:"Ralph Waldo Emerson"},
    {t:"The purpose of our lives is to be happy.",a:"Dalai Lama"},
    {t:"Get busy living or get busy dying.",a:"Stephen King"},
    {t:"You only live once, but if you do it right, once is enough.",a:"Mae West"},
    {t:"Many of life's failures are people who did not realize how close they were to success when they gave up.",a:"Thomas A. Edison"},
    {t:"If you want to live a happy life, tie it to a goal, not to people or things.",a:"Albert Einstein"},
    {t:"Never let the fear of striking out keep you from playing the game.",a:"Babe Ruth"}
  ];

  let i = (new Date().getDate()) % q.length;
  let isTransitioning = false;

  function getImageQuery(entry){
    if(!entry || !entry.t) return 'inspiration';
    const stop = new Set(['the','a','an','and','or','to','of','in','is','that','you','your','we','be','are','it','for','on','with','as','by','from','this','do','not','but','at','our','have','has','i','me']);
    const words = entry.t.toLowerCase().replace(/[^a-z\s]/g,'').split(/\s+/).filter(w=>w && !stop.has(w));
    if(entry.a) words.unshift(entry.a.split(' ')[0].toLowerCase());
    const uniq = [...new Set(words)];
    return uniq.slice(0,3).join(',') || 'inspiration';
  }

  function setImageForEntry(entry, index){
    const img = document.getElementById('qImg');
    if(!img) return;
    const query = getImageQuery(entry);
    const src = `https://source.unsplash.com/800x450/?${encodeURIComponent(query)}&sig=${index}`;
    img.classList.remove('fade-in');
    img.alt = entry && entry.a ? `Image for quote by ${entry.a}` : 'Inspirational image';
    img.src = src;
    img.onload = ()=>{ img.classList.add('fade-in'); };
  }

  function showQuote(animate=true){
    if(isTransitioning) return;
    isTransitioning = true;

    const quoteEl = document.getElementById('q');
    const authorEl = document.getElementById('a');
    const entry = q && q.length ? q[i] : {t:'No quotes available.', a:''};

    if(animate){
      quoteEl.classList.remove('fade-in');
      authorEl.classList.remove('fade-in');

      setTimeout(()=>{
        quoteEl.textContent = entry.t;
        authorEl.textContent = entry.a ? '— ' + entry.a : '';
        quoteEl.classList.add('fade-in');
        authorEl.classList.add('fade-in');
        setImageForEntry(entry, i);
        isTransitioning = false;
      },250);
    }else{
      quoteEl.textContent = entry.t;
      authorEl.textContent = entry.a ? '— ' + entry.a : '';
      quoteEl.classList.add('fade-in');
      authorEl.classList.add('fade-in');
      setImageForEntry(entry, i);
      isTransitioning = false;
    }
  }

  function nextQuote(){ i = (i + 1) % q.length; showQuote(); }
  function prevQuote(){ i = (i - 1 + q.length) % q.length; showQuote(); }

  function randomQuote(){
    if(!q.length) return;
    let newIndex;
    do{ newIndex = Math.floor(Math.random() * q.length); }
    while(newIndex === i && q.length > 1);
    i = newIndex; showQuote();
  }

  async function copyQuote(){
    const entry = q && q.length ? q[i] : {t:'', a:''};
    const text = `"${entry.t}" ${entry.a ? '— '+entry.a : ''}`.trim();

    if(navigator.clipboard && navigator.clipboard.writeText){
      try{ await navigator.clipboard.writeText(text); showToast('Quote copied to clipboard!'); return; }
      catch(e){}
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly','');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try{ document.execCommand('copy'); }catch(e){}
    document.body.removeChild(textarea);
    showToast('Quote copied to clipboard!');
  }

  function showToast(message){
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(()=>{ toast.classList.remove('show'); },2000);
  }

  document.addEventListener('keydown',(e)=>{
    const tgt = e.target;
    if(tgt && (tgt.matches('input, textarea') || tgt.isContentEditable)) return;
    if(e.key === 'ArrowRight'){ e.preventDefault(); nextQuote(); return; }
    if(e.key === 'ArrowLeft'){ e.preventDefault(); prevQuote(); return; }
    if(e.key === ' ' || e.code === 'Space'){ e.preventDefault(); nextQuote(); return; }
    if((e.key === 'r' || e.key === 'R') && !e.ctrlKey && !e.metaKey){ e.preventDefault(); randomQuote(); return; }
  });

  // attach controls
  document.getElementById('nextBtn').addEventListener('click', nextQuote);
  document.getElementById('randomBtn').addEventListener('click', randomQuote);
  document.getElementById('copyBtn').addEventListener('click', copyQuote);

  // initial render and date
  showQuote(false);
  document.getElementById('d').textContent = new Date().toLocaleDateString('en-US',{
    weekday:'long', year:'numeric', month:'long', day:'numeric'
  });

})();
