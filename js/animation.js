document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(
    MotionPathPlugin,
    ScrollTrigger,
    ScrollToPlugin,
    TextPlugin
  );

  const tl = gsap.timeline();
  tl.from("header", {
    delay: 1,
    duration: 1,
    backgroundColor: "rgb(0,0,0)",
    width: "100vw",
    height: "100vh",
    ease: "power1.out",
  }).from(".headerContainer", {
    duration: 1,
    opacity: 0,
    ease: "power1.inout",
  });

  // // 아래 파도 버튼 애니메이션-------------------------------------------------------
  const wave = document.querySelector(".wave");

  if (wave) {
    gsap.set(wave, { scaleY: 0 });
    gsap.to(wave, {
      duration: 2,
      ease: "power1.inOut",
      scaleY: 1,
      repeat: -1,
      yoyo: true,
    });

    wave.addEventListener("click", function () {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: "#introSection", offsetY: 200 },
      });
    });

    //위 파도 라인 애니메이션-------------------------------------------------------
    const wave1 = document.querySelector("#wave1");
    const wave2 = document.querySelector("#wave2");
    const width = document.documentElement.clientWidth + 50;
    const segments = 100;
    const interval = width / segments;
    const amplitude = 40; // 물결의 진폭
    const wavelengthFactor = 0.05; // 파장 길이 조정 계수
    const animationSpeed = 1; // 애니메이션 속도 조정 (초 단위)

    let points1 = [],
      points2 = [];
    for (let i = 0; i <= segments; i++) {
      points1.push({ x: i * interval, y: -30 });
      points2.push({ x: i * interval, y: -30 }); // 두 번째 선의 포인트도 동일하게 설정
    }

    function updatePolyline() {
      wave1.setAttribute(
        "points",
        points1.map((p) => `${p.x},${p.y}`).join(" ")
      );
      wave2.setAttribute(
        "points",
        points2.map((p) => `${p.x},${p.y}`).join(" ")
      );
    }

    function animateWave(points, delayMultiplier, direction) {
      points.forEach((point, i) => {
        gsap.to(point, {
          duration: animationSpeed,
          y: `${direction}=${amplitude}`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * wavelengthFactor * delayMultiplier,
          onUpdate: updatePolyline,
        });
      });
    }

    updatePolyline();
    animateWave(points1, 1, "+"); // 첫 번째 선
    animateWave(points2, 1.5, "-"); // 두 번째 선 (지연 시간과 방향을 달리함)

    // PORT-FOLIO 글자 글리치 효과-------------------------------------------------------
    const glitch = document.querySelector(".container p");
    let repeatCount = 0;

    // 글리치 효과를 위한 랜덤한 값 생성 함수(좌우 위치, 크기, 색깔)
    function randomGlitchParams() {
      return {
        x: Math.random() * 1000 - 500, // 좌우로 랜덤하게 이동
        scale: Math.random() * 0.1 + 0.9, // 랜덤한 크기 변화
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`, // 랜덤한 색상
        delay: 2,
        duration: 0.05, // 짧은 지속 시간
        repeat: 3,
        yoyo: true, // 원래 상태로 돌아감
        ease: "none",
        onComplete: repeatCount === 4 ? resetElement : null,
      };
    }

    function resetElement() {
      tl.to(glitch, {
        x: 0,
        y: 0,
        scale: 1,
        color: "white",
        duration: 0.1,
        opacity: 1,
      });
    }

    gsap.from(glitch, 1, {
      opacity: 0,
    });

    function runGlitchAnimation() {
      if (repeatCount < 3) {
        gsap.to(glitch, randomGlitchParams());
        repeatCount++;
        setTimeout(runGlitchAnimation, 500); // 다음 애니메이션 예약
      }
    }

    runGlitchAnimation(); // 애니메이션 시작

    // // 스크롤 다운 애니메이션-------------------------------------------------------
    let cards = gsap.utils.toArray(".panel");
    cards.forEach((card) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        pin: true,
        pinSpacing: false,
        snap: {
          snapTo: 1 / (2 - 1),
          duration: { min: 0.1, max: 0.3 },
          delay: 0.2,
          ease: "power1.inout",
        },
      });
    });

    // INTROSECTION 스크롤 다운 애니메이션----------------------------------------------------
    // 클래스를 추가하는 함수
    function addClass(element, className) {
      element.classList.add(className);
    }

    // 클래스를 제거하는 함수
    function removeClass(element, className) {
      element.classList.remove(className);
    }

    const moreBtn = document.querySelectorAll(".moreBtn");
    const moreBtnTl = gsap.timeline();
    let num = 0;

    moreBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (num === 0) {
          num = num + 1;
        } else {
          num = num - 1;
        }
        moreBtnTl
          .to(".show", 1, {
            x: 500,
            opacity: 0,
            ease: "power1.inout",
            onComplete: () =>
              removeClass(document.querySelector(".show"), "show"),
          })
          .to(".next", 1, {
            width: "100%",
            opacity: 1,
            ease: "power1.out",
            onComplete: () => {
              addClass(document.querySelector(".next"), "show");
              removeClass(document.querySelector(".show"), "next");
              if (document.querySelector(".show").nextElementSibling) {
                addClass(
                  document.querySelector(".show").nextElementSibling,
                  "next"
                );
              }
            },
          });
      });
    });

    const texts = ["어떤 개발자가 되고 싶나요?", "어떤 경험이 있나요?"];
    const text = texts[num];
    const typingSpeed = 0.1; // seconds per character
    const typingDelay = 0.5; // seconds before typing starts again

    function animateText() {
      // const texts = ["어떤 개발자가 되고 싶나요?","어떤 경험이 있나요?"];
      const text = texts[num];
      gsap.to("#typed-text", {
        text: text,
        duration: text.length * typingSpeed,
        ease: "none",
        onComplete: () => setTimeout(eraseText, 2000),
      });
    }

    function eraseText() {
      gsap.to("#typed-text", {
        delay: 2,
        text: "",
        duration: text.length * typingSpeed,
        ease: "none",
        onComplete: () => setTimeout(animateText, typingDelay * 1000),
      });
    }
    animateText();

    // projectSection------------------------------------------------------------------------------------
    const projectList = document.querySelector(".projectList");
    const nextButton = projectList.querySelector(".nextBtn");
    const prevButton = projectList.querySelector(".prevBtn");
    const pageInfos = projectList.querySelectorAll(".pageinfo");
    const projectContainer = document.querySelectorAll(".projectContainer");

    let scrollAmount = 0; // 스크롤 이동량 초기화
    const scrollStep = pageInfos[0].clientWidth; // 스크롤 이동 거리 설정 (첫 번째 .pageinfo 너비)

    nextButton.addEventListener("click", () => {
      // 현재 스크롤 위치에서 한 페이지 너비만큼 추가
      scrollAmount += scrollStep;
      // 최대 스크롤 가능 값으로 제한
      scrollAmount = Math.min(
        scrollAmount,
        projectList.scrollWidth - projectList.clientWidth
      );

      // 스크롤 애니메이션 실행
      projectList.scrollTo({
        left: scrollAmount,
        behavior: "smooth", // 부드러운 스크롤 효과
      });
    });

    prevButton.addEventListener("click", () => {
      // 현재 스크롤 위치에서 한 페이지 너비만큼 빼기
      scrollAmount -= scrollStep;
      // 최소 스크롤 가능 값 0으로 제한
      scrollAmount = Math.max(scrollAmount, 0);

      // 스크롤 애니메이션 실행
      projectList.scrollTo({
        left: scrollAmount,
        behavior: "smooth", // 부드러운 스크롤 효과
      });
    });

    // 마우스 오버 애니메이션
    projectContainer.forEach((container) => {
      container.addEventListener("mouseenter", () => {
        const overCard = container.querySelector(".overCard");

        gsap.to(overCard, {
          y: "-50%",
          opacity: 1,
          duration: 0.5,
        });

        gsap.from(
          [
            overCard.querySelector("p"),
            overCard.querySelector("a"),
            overCard.querySelector(".stacks"),
          ],
          {
            y: "-1000px",
            opacity: 0,
            duration: 0.6,
          }
        );

        gsap.from(overCard.querySelector("h2"), {
          delay: 0.6,
          width: "10%",
          opacity: 0,
          duration: 0.6,
          ease: "power1.inout",
        });
      });
      container.addEventListener("mouseleave", () => {
        gsap.to(container.querySelector(".overCard"), {
          y: "0%",
          opacity: 0,
          duration: 0.5,
        });
      });
    });
  }

  // page.php
  const moveBtnTl = gsap.timeline();
  const moveBtn = document.querySelector("#moodBtn");
  const btnCase = document.querySelector(".btnCase");
  const moodBoard = document.querySelector("#moodBoard");
  let isClick = false;

  if (moveBtn) {
    // 무드 버튼 회전
    moveBtn.addEventListener("mouseenter", () => {
      moveBtnTl.clear();
      if (!isClick) {
        moveBtnTl.to(moveBtn, {
          duration: 1,
          rotate: 765,
          ease: "power1.inout",
        });
      }
    });
    moveBtn.addEventListener("mouseleave", () => {
      if (!isClick) {
        moveBtnTl.to(moveBtn, {
          duration: 0.5,
          rotate: 45,
          ease: "power1.inout",
        });
      }
    });

    // 무드 버튼 클릭시 모달 창
    moveBtn.addEventListener("click", () => {
      isClick = !isClick;

      if (isClick) {
        moveBtnTl
          .to(moveBtn, {
            duration: 0.1,
            rotate: 0,
            onStart: () => {
              moveBtn.style.transform = "rotate(0deg)";
            },
          })
          .to(moveBtn, {
            duration: 0.3,
            height: "90vh",
          })
          .to(btnCase, {
            duration: 0.3,
            rotate: 0,
            y: 150,
            onComplete: () => {
              btnCase.style.zIndex = 999;
            },
          })
          .to(moveBtn, {
            duration: 0.3,
            width: "90vw",
          })
          .to("#moodBoard>div figure figcaption p", {
            duration: 0.1,
            display: "block",
          })
          .to(moodBoard, {
            duration: 0.3,
            opacity: 1,
            width: "90%",
            height: "90%",
            onComplete: () => {
              moodBoard.style.zIndex = 3;
            },
          });
      } else {
        moveBtnTl
          .to(btnCase, {
            duration: 0.3,
            y: 0,
            rotate: -45,
          })
          .to(moodBoard, {
            duration: 0.3,
            opacity: 0,
            height: "80%",
            width: "100%",
            onComplete: () => {
              moodBoard.style.zIndex = 0;
            },
          })
          .to(moveBtn, {
            duration: 0.3,
            height: "200px",
          })
          .to("#moodBoard>div figure figcaption p", {
            duration: 0.1,
            display: "none",
          })
          .to(moveBtn, {
            duration: 0.3,
            width: "200px",
          })
          .to(moveBtn, {
            duration: 0.1,
            rotate: 45,
          });
      }
    });
  }

  // home btn 애니메이션
  const homeBtn = document.querySelector(".homeBack");
  if (homeBtn) {
    gsap.to(homeBtn, {
      scale: 1.5,
      repeat: 5,
      yoyo: true,
      duration: 0.3,
      paused: true,
    });

    // 요소에 마우스 호버 이벤트 리스너 추가
    homeBtn.addEventListener("mouseenter", function () {
      gsap.to(homeBtn, { scale: 1.5, repeat: 5, yoyo: true, duration: 0.3 });
    });
  }

  // page 스크롤 애니메이션
  const contentArea = document.querySelector(".contentArea");
  const contentsHeight = document.querySelector(
    ".pageContentsContainer"
  ).scrollHeight;
  const imagesHeight = document.querySelector(".allSiteImages").scrollHeight;
  const totalHeight = contentsHeight + imagesHeight;
  if (contentArea) {
    const ani = gsap.timeline();
    ani
      .to(".pageContentsContainer", {
        scrollTo: { y: contentsHeight, autoKill: false },
      })
      .to(".allSiteImages", {
        scrollTo: { y: imagesHeight, autoKill: false },
      });

    ScrollTrigger.create({
      animation: ani,
      trigger: contentArea,
      start: "top top",
      end: "+=" + totalHeight,
      pin: true,
      pinSpacing: false,
      scrub: true,
      markers: true,
    });

    // page - nav
    // intro 상단
    const serviceIntroHeight =
      document.querySelector("#serviceIntro").clientHeight;
    const serviceFeatHeight =
      document.querySelector("#serviceFeat").clientHeight;
    const serviceContainerHeight = document.querySelector(
      ".pageContentsContainer"
    ).offsetHeight;

    document
      .getElementById("goToServiceIntro")
      .addEventListener("click", function () {
        gsap.to(window, {
          duration: 0.5,
          scrollTo: 0,
          ease: "power1.out",
        });
      });
    document
      .getElementById("goToServiceFeat")
      .addEventListener("click", function () {
        gsap.to(window, {
          duration: 0.5,
          scrollTo: serviceIntroHeight + 100,
          ease: "power1.out",
        });
      });
    document
      .getElementById("goToGitBtn")
      .addEventListener("click", function () {
        gsap.to(window, {
          duration: 0.5,
          scrollTo: serviceIntroHeight + serviceFeatHeight + 100,
          ease: "power1.out",
        });
      });
  }
});
