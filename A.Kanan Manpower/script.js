// Hero background slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const pageCounter = document.querySelector('.page-counter');
    const nextHeadline = document.querySelector('.next-headline');
    const arrows = document.querySelectorAll('.arrow');

    // Array of background images and corresponding headlines
    const backgrounds = [
        {
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=2070',
            headline: 'Great new hiring & mobility support options'
        },
        {
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2070',
            headline: 'Professional development & career advancement'
        },
        {
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070',
            headline: 'Global opportunities in healthcare & nursing'
        },
        {
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2070',
            headline: 'Engineering & technical expertise worldwide'
        }
    ];

    let currentIndex = 0;

    // Function to update hero background and content
    function updateHero(index) {
        hero.classList.remove('fade-transition');
        setTimeout(() => {
            hero.style.backgroundImage = `url('${backgrounds[index].image}')`;
            pageCounter.textContent = `${index + 1} / ${backgrounds.length}`;
            nextHeadline.textContent = backgrounds[(index + 1) % backgrounds.length].headline;
            hero.classList.add('fade-transition');
        }, 10);
    }

    // Add click event listeners to arrow buttons
    arrows.forEach((arrow, index) => {
        arrow.addEventListener('click', function() {
            arrow.style.pointerEvents = 'none';
            setTimeout(() => {
                arrow.style.pointerEvents = 'auto';
            }, 600);
            
            if (index === 0) { // Left arrow
                currentIndex = currentIndex > 0 ? currentIndex - 1 : backgrounds.length - 1;
            } else { // Right arrow
                currentIndex = currentIndex < backgrounds.length - 1 ? currentIndex + 1 : 0;
            }
            updateHero(currentIndex);
        });
    });

    // Initialize with first background
    updateHero(currentIndex);
});

// Pie Chart for About Page
document.addEventListener('DOMContentLoaded', function() {
    const pieContainer = document.getElementById('pie-container');
    if (!pieContainer) return;

    const sections = [
        { id: 'content-history', label: 'Our History', color: '#003d82' },
        { id: 'content-mission', label: 'Mission & Vision', color: '#e74c3c' },
        { id: 'content-values', label: 'Core Values', color: '#f39c12' },
        { id: 'content-awards', label: 'Awards', color: '#27ae60' },
        { id: 'content-stories', label: 'Success Stories', color: '#9b59b6' },
        { id: 'content-why', label: 'Why Choose Us', color: '#1abc9c' }
    ];

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '500');
    svg.setAttribute('height', '500');
    svg.setAttribute('viewBox', '0 0 500 500');
    pieContainer.appendChild(svg);

    const centerX = 250;
    const centerY = 250;
    const radius = 200;

    let hoveredIndex = -1;
    const normalAngle = 360 / sections.length;
    const expandedAngle = 120;
    const compressedAngle = (360 - expandedAngle) / (sections.length - 1);

    function createPath(startAngle, endAngle, color) {
        const startAngleRad = (startAngle * Math.PI) / 180;
        const endAngleRad = (endAngle * Math.PI) / 180;
        const x1 = centerX + radius * Math.cos(startAngleRad);
        const y1 = centerY + radius * Math.sin(startAngleRad);
        const x2 = centerX + radius * Math.cos(endAngleRad);
        const y2 = centerY + radius * Math.sin(endAngleRad);
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
        const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
        return pathData;
    }

    function updatePie() {
        svg.innerHTML = '';
        let currentAngle = 0;
        sections.forEach((section, index) => {
            const angle = hoveredIndex === index ? expandedAngle : (hoveredIndex === -1 ? normalAngle : compressedAngle);
            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('d', createPath(currentAngle, currentAngle + angle, section.color));
            path.setAttribute('fill', section.color);
            path.setAttribute('stroke', 'white');
            path.setAttribute('stroke-width', '2');
            path.style.cursor = 'pointer';
            path.addEventListener('mouseenter', () => {
                hoveredIndex = index;
                updatePie();
            });
            path.addEventListener('mouseleave', () => {
                hoveredIndex = -1;
                updatePie();
            });
            path.addEventListener('click', () => {
                console.log('pie slice clicked', section.id);
                const allSections = document.querySelectorAll('.hidden-content');
                allSections.forEach(el => {
                    el.classList.remove('active');
                });

                const sectionEl = document.getElementById(section.id);
                if (sectionEl) {
                    sectionEl.classList.add('active');
                    const top = sectionEl.offsetTop - 100;
                    window.scrollTo({ top: top >= 0 ? top : 0, behavior: 'smooth' });
                } else {
                    console.error('Missing section element:', section.id);
                }
            });
            svg.appendChild(path);

            // Add text
            const textAngle = currentAngle + angle / 2;
            const textAngleRad = (textAngle * Math.PI) / 180;
            const textX = centerX + (radius * 0.7) * Math.cos(textAngleRad);
            const textY = centerY + (radius * 0.7) * Math.sin(textAngleRad);
            const text = document.createElementNS(svgNS, 'text');
            text.setAttribute('x', textX);
            text.setAttribute('y', textY);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('fill', 'white');
            text.setAttribute('font-size', '14px');
            text.setAttribute('font-weight', 'bold');
            text.setAttribute('pointer-events', 'none');
            text.textContent = section.label;
            svg.appendChild(text);

            currentAngle += angle;
        });
    }

    updatePie();

    // show first slice content by default
    const allSections = document.querySelectorAll('.hidden-content');
    allSections.forEach(el => el.classList.remove('active'));
    const firstSection = document.getElementById(sections[0].id);
    if (firstSection) {
        firstSection.classList.add('active');
    }
});

// Mobile menu toggle functionality
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', (e) => {
    navMenu.classList.toggle('active');
    e.stopPropagation();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});
