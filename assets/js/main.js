/* ================================================================
   ECO-VASS Common JS v2026
   — Copyright protection (5 steps)
   — Scroll reveal animations
   — Navigation interactions
   ================================================================ */

(function() {
  'use strict';

  // ============== 저작권 보호 5단계 ==============
  // 정정 지시서 PART Ⅸ-1 — 무단 카피 방지

  // 1. 우클릭·드래그 차단
  document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      return false;
    }
  });

  document.addEventListener('selectstart', function(e) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.classList.contains('selectable')) {
      e.preventDefault();
      return false;
    }
  });

  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });

  // 2. 키보드 단축키 차단
  document.addEventListener('keydown', function(e) {
    // Ctrl+C, Ctrl+S, Ctrl+U, Ctrl+P
    if ((e.ctrlKey || e.metaKey) && ['c', 's', 'u', 'p', 'a'].includes(e.key.toLowerCase())) {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        return false;
      }
    }
    // F12 차단
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I (개발자 도구)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) {
      e.preventDefault();
      return false;
    }
  });

  // 3. 개발자 도구 감지 (간단한 버전)
  let devToolsOpen = false;
  const threshold = 160;
  setInterval(function() {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    if (widthDiff > threshold || heightDiff > threshold) {
      if (!devToolsOpen) {
        devToolsOpen = true;
        console.log('%c⚠️ ECO-VASS', 'font-size: 32px; color: #C9962E; font-family: serif;');
        console.log('%c본 사이트의 모든 콘텐츠는 저작권 보호를 받습니다.\nAll content is protected by copyright.\n© Aquaponics Korea Co., Ltd.', 'font-size: 14px; color: #4A5552;');
      }
    } else {
      devToolsOpen = false;
    }
  }, 1000);

  // 4. 이미지 보호 (long-press 방지 + 워터마크 클래스 부여)
  document.querySelectorAll('img').forEach(function(img) {
    img.addEventListener('touchstart', function(e) {
      e.preventDefault();
    }, { passive: false });
    img.style.webkitTouchCallout = 'none';
    img.style.userSelect = 'none';
  });

  // 5. 본문 텍스트 selection 색상 (시각적 보호 의지 표현)
  // CSS에서 ::selection 처리

  // ============== Navigation ==============
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Scroll header style
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    });
  }

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  // ============== Scroll Reveal Animation ==============
  if ('IntersectionObserver' in window) {
    const revealItems = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });
    revealItems.forEach(function(el) { observer.observe(el); });
  } else {
    // Fallback for older browsers
    document.querySelectorAll('[data-reveal]').forEach(function(el) {
      el.classList.add('in-view');
    });
  }

  // ============== Smooth Anchor Scroll ==============
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset - 24;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ============== Console branding ==============
  console.log('%cECO-VASS', 'font-family: serif; font-size: 28px; color: #0E3B3A; padding: 8px 0;');
  console.log('%c자연의 순환, 가정에서 공동체로\n%cAquaponics Korea Co., Ltd. · ecovass.com', 'color: #2C6E6B; font-style: italic; font-size: 14px;', 'color: #8A938F; font-size: 12px;');

})();
