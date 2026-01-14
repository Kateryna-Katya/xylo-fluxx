document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Mobile Menu Logic
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');

  const toggleMenu = () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  };

  burger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (nav.classList.contains('active')) {
              toggleMenu();
          }
      });
  });

  // Sticky Header Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.style.padding = '10px 0';
          header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
      } else {
          header.style.padding = '0';
          header.style.boxShadow = 'none';
      }
  });
  // Аналог GSAP ScrollTrigger на чистом JS
const observeElements = () => {
  const observerOptions = {
      threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
          }
      });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
  });
};

// Запуск после загрузки
window.addEventListener('load', () => {
  observeElements();

  // Дополнительный микро-интерактив: движение за мышью
  const hero = document.querySelector('.hero');
  if (hero) {
      hero.addEventListener('mousemove', (e) => {
          const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
          const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
          document.querySelector('.hero__circle--1').style.transform = `translate(${moveX}px, ${moveY}px)`;
          document.querySelector('.hero__circle--2').style.transform = `translate(${-moveX}px, ${-moveY}px)`;
      });
  }
});
// --- FORM LOGIC ---
const mainForm = document.getElementById('mainForm');
const formSuccess = document.getElementById('formSuccess');
const phoneInput = document.getElementById('phone');
const captchaQuestion = document.getElementById('captcha-question');
const captchaAnswerInput = document.getElementById('captcha-answer');

let correctCaptchaAnswer;

// 1. Генерация капчи
const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    correctCaptchaAnswer = num1 + num2;
    captchaQuestion.textContent = `${num1} + ${num2}`;
};

// 2. Валидация телефона (только цифры)
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, '');
});

// 3. Обработка отправки
mainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Проверка капчи
    if (parseInt(captchaAnswerInput.value) !== correctCaptchaAnswer) {
        alert('Неверный ответ на проверочный вопрос. Попробуйте снова.');
        generateCaptcha();
        captchaAnswerInput.value = '';
        return;
    }

    // Имитация отправки
    mainForm.classList.add('loading');

    setTimeout(() => {
        mainForm.classList.remove('loading');
        mainForm.style.display = 'none';
        formSuccess.classList.add('active');
        lucide.createIcons(); // Обновляем иконку галочки в сообщении
    }, 1500);
});

// 4. Сброс формы
window.resetForm = () => {
    mainForm.reset();
    mainForm.style.display = 'flex';
    formSuccess.classList.remove('active');
    generateCaptcha();
};

// Инициализация капчи при загрузке
generateCaptcha();
// --- COOKIE POPUP LOGIC ---
const cookiePopup = document.getElementById('cookiePopup');
const acceptCookiesBtn = document.getElementById('acceptCookies');

const initCookies = () => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 2000);
    }
};

acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookiePopup.classList.remove('active');
});

// --- КОРРЕКТИРОВКА ОБРАБОТКИ ФОРМЫ (обновите существующий слушатель submit) ---
mainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (parseInt(captchaAnswerInput.value) !== correctCaptchaAnswer) {
        alert('Неверный ответ на проверочный вопрос.');
        generateCaptcha();
        return;
    }

    mainForm.classList.add('loading');

    setTimeout(() => {
        mainForm.classList.remove('loading');
        mainForm.style.display = 'none'; // Скрываем форму
        formSuccess.classList.add('active'); // Показываем успех (теперь он в потоке)

        // Скроллим к началу блока успеха, если мобилка
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        lucide.createIcons();
    }, 1500);
});

// Вызов инициализации куки
window.addEventListener('load', initCookies);
});