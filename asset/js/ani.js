$(function () {

  /*
   $('.nav_btn').click(function(){
      $('nav ul').css('display','block')
   })
  */

  gsap.registerPlugin(ScrollTrigger);
  //반응형으로 적용처리용
  ScrollTrigger.matchMedia({
    // 공통 모션
    "all": () => {
      $('body').mousemove(function (e) {
        xVal = e.clientX;
        yVal = e.clientY;
        gsap.to('.cursor', {
          x: xVal,
          y: yVal,
          duration: .3,
        })
      })

      $('.title, a, h3, .view_more, .loader_logo, p, .marquee_box, nav').mouseover(function () {
        $('.cursor').css({ 'mix-blend-mode': 'difference' })
        gsap.to('.cursor', { backgroundColor: '#f831ff', duration: .3 })
        gsap.to('.cursor', { scale: 0.3 })
        $('.cursor span').css('visibility', 'hidden')
      })

      $('#work img').mouseover(function () {
        $('.cursor span').text('view')
      })

      $('.title, a, h3, .view_more, .loader_logo, p, .marquee_box, nav, #work img').mouseleave(function () {
        gsap.to('.cursor', { backgroundColor: '#8500ff', duration: .3 })
        gsap.to('.cursor', { scale: 1 })
        $('.cursor span').css('visibility', 'visible')
        $('.cursor span').text('scroll')
      })
    },//close all


    "(min-width:900px)": () => {
      gsap.to('progress', {
        value: 100,
        ease: 'none',
        scrollTrigger: { scrub: 0.3 }
      });

      titleEni = gsap.timeline({
        scrollTrigger: {
          trigger: '.main_visual',
          start: 'left 5%', //[트리거기준,윈도우기준]
          //markers:true,
        }
      })
      titleEni.addLabel('MoHd');
      titleEni.to('.title span:not(.ft_st)', { x: 0, duration: 1, delay: 4.5 }, 'MoHd')
      titleEni.to('.title span.ft_st', { x: 0, duration: 1, delay: 4.5 }, 'MoHd')


      lineMotion = gsap.timeline({
        scrollTrigger: {
          trigger: '.main_visual .title',
          start: '0% 0%',
        }
      })

      lineMotion.from('.main_visual .line', { opacity: 0, height: 0, duration: 1 })
      lineMotion.from('.main_visual .sub_title', { y: 0, opacity: 0, duration: 1 })



      workMotion = gsap.timeline({
        scrollTrigger: {
          trigger: '#work',
          start: '-2% -2%',
          //markers:true,
        }
      })

      workMotion.from('.work_list_1 li:nth-child(1)', { opacity: 0, y: 20 })
      workMotion.from('.work_list_1 li:nth-child(2)', { opacity: 0, y: 20 })
      workMotion.from('.work_list_2 li:nth-child(2)', { opacity: 0, y: 20 })
      workMotion.from('.work_list_2 li:nth-child(1)', { opacity: 0, y: 20 })
      workMotion.from('.work_list_2 li:nth-child(3)', { opacity: 0, y: 20 })



      //my strengths section animation
      planetMove = document.querySelectorAll('[data-y]');
      planetMove.forEach(element => {
        y = (element.dataset.y) ? element.dataset.y : 0;
        x = (element.dataset.x) ? element.dataset.x : 0;
        r = (element.dataset.r) ? element.dataset.r : 0;

        gsap.to(element, {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            scrub: 1,
          },
          yPercent: y,
          xPercent: x,
          rotation: r
        })
      });

      myStrengths = gsap.timeline({
        scrollTrigger: {
          trigger: '.my_strengths',
          start: 'top top', //[트리거기준,윈도우기준]
          end: '+=100%',
          scrub: 1,
          pin: true,
        }
      })
      myStrengths.addLabel('strength');
      myStrengths.from('.earth', { transform: 'translate(-50%,-50%) scale(0.5) rotate(50deg)' }, 'strength')
      myStrengths.to('.my_strengths .title', { y: 0, opacity: 1 }, 'strength')
      myStrengths.from('.moon, .neptune, .mars', { transform: 'scale(1)' }, 'strength')
      myStrengths.to('.moon, .neptune, .mars', { transform: 'scale(0.6)' }, 'strength')



      //skill section animation
      skillMotion = gsap.timeline({
        scrollTrigger: {
          trigger: '.my_skill',
          start: '50% 50%',
          // markers: true,
        }
      })

      skillMotion.addLabel('word_ani');
      skillMotion.from('.my_skill h3', { x: -50, opacity: 0, duration: 1.5 }, 'word_ani')
      skillMotion.from('.my_skill .line', { width: 0, duration: 1.5 }, 'word_ani')
      skillMotion.from('.my_skill p', { x: -50, opacity: 0, duration: 1.5 }, 'word_ani')
      skillMotion.from('.my_skill .slide_left', { x: "-200%", duration: 2 }, 'word_ani')
      skillMotion.from('.my_skill .slide_right', { x: "200%", duration: 2 }, 'word_ani')
      skillMotion.from('.my_skill .slide_up', { y: "-200%", duration: 2 }, 'word_ani')
      skillMotion.from('.my_skill .slide_down', { y: "200%", duration: 2 }, 'word_ani')
    }

  })

  // loader image
  $('html,body').css('overflow', 'hidden')
  var text = "Hello! Good to see you :)";
  var index = 0;
  var chars = text.length - 1;
  var speed = 80;
  var div = "typing";

  function typing() {
    document.getElementById(div).innerHTML += text[index];
    if (index < chars) {
      setTimeout(function () {
        index++;
        typing();
      }, speed);
    }
    setTimeout(function () {
      $('#loader').fadeOut("slow");
      $('html,body').css('overflow-y', 'Scroll')
    }, 3000);
  }
  $(window).load(function () {
    setTimeout(function () {
      typing();
    }, 1000);
  });


});


