(() => {
  'use strict';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.initPortfolioMotion=()=>{
    const gsap=window.gsap,ST=window.ScrollTrigger,Lenis=window.Lenis;
    if(!gsap||!ST)return;
    gsap.registerPlugin(ST);
    if(!reduce&&Lenis){
      const lenis=new Lenis({lerp:.09,smoothWheel:true});window.lenis=lenis;
      lenis.on('scroll',ST.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
      document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href');if(href?.length>1&&document.querySelector(href)){e.preventDefault();lenis.scrollTo(href,{offset:-90});}}));
    }
    if(reduce){
      gsap.set('[data-reveal],[data-stagger]',{y:0,opacity:1,clearProps:'transform'});
      return;
    }
    gsap.utils.toArray('[data-reveal]').forEach(el=>gsap.fromTo(el,{y:30,opacity:0},{y:0,opacity:1,duration:.7,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 84%',once:true}}));
    ST.batch('[data-stagger]',{start:'top 84%',once:true,onEnter:batch=>gsap.to(batch,{y:0,opacity:1,stagger:.08,duration:.7,ease:'power2.out',overwrite:true})});
    if(!reduce){
      gsap.timeline({defaults:{ease:'power3.out'}}).fromTo('.hero-chip,.hero-line > span,.hero-summary,.hero-cta > *',{y:28,opacity:0},{y:0,opacity:1,stagger:.12,duration:.9}).fromTo('.float-tile',{scale:.7,opacity:0},{scale:1,opacity:1,stagger:.08,duration:.8,ease:'power2.out'},'-.7');
      if(!matchMedia('(pointer: coarse)').matches){const tiles=[...document.querySelectorAll('.float-tile')];addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;tiles.forEach(el=>{const d=Number(el.dataset.depth)||1;gsap.to(el,{x:-x*d*28,y:-y*d*28,duration:.9,ease:'power3.out',overwrite:'auto'});});},{passive:true});}
      gsap.to('.hero-glow',{yPercent:25,ease:'none',scrollTrigger:{trigger:'#home',start:'top top',end:'bottom top',scrub:true}});
      const tl=document.querySelector('.tl');if(tl){gsap.to('.tl-progress',{scaleY:1,ease:'none',scrollTrigger:{trigger:tl,start:'top 65%',end:'bottom 75%',scrub:true}});tl.querySelectorAll('.tl-item').forEach(item=>ST.create({trigger:item,start:'top 65%',end:'bottom 65%',toggleClass:{targets:item,className:'is-active'}}));}
    }
    ST.refresh();
  };
})();
