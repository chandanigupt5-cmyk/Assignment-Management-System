
        // DOM Elements
        const navbar = id('navbar');
        const hamburger = id('hamburger');
        const navLinks = id('navLinks');
        const backToTop = id('backToTop');
        const authModal = id('authModal');
        const videoModal = id('videoModal');
        const openLogin = id('openLogin');
        const openRegister = id('openRegister');
        const openVideo = id('openVideo');
        const closeAuthModal = id('closeAuthModal');
        const closeVideoModal = id('closeVideoModal');
        const videoIframe = id('videoIframe');

        function id(e) { return document.getElementById(e); }

        // Mobile Menu Toggle
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });

        // Close Mobile Menu on Click Nav Link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (hamburger.querySelector('i')) {
                    hamburger.querySelector('i').className = 'fa-solid fa-bars';
                }
            });
        });

        // Sticky Navbar & Scroll Events
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
                backToTop.classList.add('visible');
            } else {
                navbar.classList.remove('scrolled');
                backToTop.classList.remove('visible');
            }

            // Scrollspy logic
            const sections = document.querySelectorAll('section');
            const scrollPos = window.scrollY + 100;

            sections.forEach(sec => {
                if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
                    const currentId = sec.getAttribute('id');
                    document.querySelectorAll('.nav-link').forEach(a => {
                        a.classList.remove('active');
                        if (a.getAttribute('href') === `#${currentId}`) {
                            a.classList.add('active');
                        }
                    });
                }
            });
        });

        // Counter Animation Trigger
        let animated = false;
        window.addEventListener('scroll', () => {
            const statSection = document.querySelector('.about-right-content');
            if (statSection) {
                const pos = statSection.getBoundingClientRect().top;
                const winHeight = window.innerHeight;
                if (pos < winHeight - 50 && !animated) {
                    animated = true;
                    runCounters();
                }
            }
        });

        function runCounters() {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const speed = target / 30;
                const update = () => {
                    count += speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count) + '+';
                        setTimeout(update, 40);
                    } else {
                        counter.innerText = target + (target === 1 ? '' : '+');
                    }
                };
                update();
            });
        }

        // Modal Controls
        openLogin.addEventListener('click', () => openAuthModal('login'));
        openRegister.addEventListener('click', () => openAuthModal('register'));
        closeAuthModal.addEventListener('click', closeAllModals);

        openVideo.addEventListener('click', () => {
            videoIframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
            videoModal.classList.add('active');
        });

        closeVideoModal.addEventListener('click', () => {
            videoIframe.src = "";
            closeAllModals();
        });

        function openAuthModal(mode) {
            authModal.classList.add('active');
            switchTab(mode);
        }

        function switchTab(mode) {
            const tabLogin = id('tabLogin');
            const tabRegister = id('tabRegister');
            const roleGroup = id('roleGroup');
            const authSubmitBtn = id('authSubmitBtn');

            if (mode === 'login') {
                tabLogin.classList.add('active');
                tabRegister.classList.remove('active');
                roleGroup.style.display = 'none';
                authSubmitBtn.innerText = 'Login';
            } else {
                tabRegister.classList.add('active');
                tabLogin.classList.remove('active');
                roleGroup.style.display = 'block';
                authSubmitBtn.innerText = 'Register Account';
            }
        }

        function closeAllModals() {
            authModal.classList.remove('active');
            videoModal.classList.remove('active');
            videoIframe.src = "";
        }

        // Close Modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === authModal || e.target === videoModal) {
                closeAllModals();
            }
        });
