// --- COMMON JAVASCRIPT (NAVIGATION AND SECTION SWITCHING) ---

// Define toggleMenu globally so it can be called by onclick attribute in HTML
function toggleMenu() {
    const menu = document.querySelector('.menu'); // Select the new menu class
    const menuToggle = document.querySelector('.menu-toggle'); // Select the new menu toggle button

    if (menu && menuToggle) {
        menu.classList.toggle('active');
        // Update the icon based on menu state
        // Ganti &#9776; dengan Font Awesome bars/times
        menuToggle.innerHTML = menu.classList.contains('active')
            ? '<i class="fas fa-times"></i>' // 'X' icon when menu is active
            : '<i class="fas fa-bars"></i>'; // Burger icon when menu is inactive
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Data Definition (Keep these at the top inside DOMContentLoaded) ---
    const partiesData = [
        { name: 'Partai Kebangkitan Bangsa', 
            percentage: 10.70, 
            color: '#00FF00' },
        { name: 'Partai Gerakan Indonesia Raya', 
            percentage: 11.86, 
            color: '#FF6700' },
        { name: 'Partai Demokrasi Indonesia Perjuangan',
             percentage: 25.88,
              color: '#FF0000' },
        { name: 'Partai Golongan Karya',
             percentage: 13.20, 
             color: '#FFFF00' },
        { name: 'Partai NasDem',
             percentage: 5.70,
              color: '#000080' },
        { name: 'Partai Buruh',
             percentage: 0.67,
              color: '#FF4500' },
        { name: 'Partai Gelombang Rakyat Indonesia',
             percentage: 0.55,
              color: '#ADD8E6' },
        { name: 'Partai Keadilan Sejahtera',
             percentage: 11.86,
             color: '#FFA500' },
        { name: 'Partai Kebangkitan Nusantara',
             percentage: 0.16,
             color: '#E9967A' },
        { name: 'Partai Hati Nurani Rakyat',
             percentage: 0.18,
              color: '#FFB347' },
        { name: 'Partai Garda Republik Indonesia',
             percentage: 0.21,
              color: '#87CEFA' },
        { name: 'Partai Amanat Nasional',
             percentage: 8.66,
              color: '#00BFFF' },
        { name: 'Partai Bulan Bintang',
             percentage: 0.14,
              color: '#006400' },
        { name: 'Partai Demokrat',
             percentage: 2.14,
              color: '#1E90FF' },
        { name: 'Partai Solidaritas Indonesia',
             percentage: 3.14,
              color: '#8B0000' },
        { name: 'Partai Perindo',
             percentage: 0.45,
              color: '#00FFFF' },
        { name: 'Partai Persatuan Pembangunan',
             percentage: 2.08,
              color: '#228B22' },
        { name: 'Partai Ummat',
             percentage: 2.42,
              color: '#000000' },
    ];

    const partiesData2019 = [
        { name: 'Partai Kebangkitan Bangsa',
             percentage: 12.12,
              color: '#00FF00' },
        { name: 'Partai Gerakan Indonesia Raya',
             percentage: 8.76,
              color: '#FF6700' },
        { name: 'Partai Demokrasi Indonesia Perjuangan',
             percentage: 29.95, color: '#FF0000' },
        { name: 'Partai Golongan Karya',
             percentage: 7.00,
              color: '#FFFF00' },
        { name: 'Partai NasDem',
             percentage: 7.63,
              color: '#000080' },
        { name: 'Partai Keadilan Sejahtera',
             percentage: 10.52,
              color: '#FFA500' },
        { name: 'Partai Hati Nurani Rakyat',
             percentage: 0.32,
              color: 'FFB347' },
        { name: 'Partai Garda Republik Indonesia',
             percentage: 0.40,
              color: '#87CEFA' },
        { name: 'Partai Amanat Nasional',
             percentage: 10.88,
              color: '#00BFFF' },
        { name: 'Partai Bulan Bintang',
             percentage: 0.43,
              color: '#006400' },
        { name: 'Partai Demokrat',
             percentage: 2.87,
              color: '#1E90FF' },
        { name: 'Partai Solidaritas Indonesia',
             percentage: 2.08,
              color: '#8B0000' },
        { name: 'Partai Perindo',
             percentage: 1.25,
              color: '#00FFFF' },
        { name: 'Partai Persatuan Pembangunan',
             percentage: 2.85,
              color: '#228B22' },
        { name: 'Partai Berkarya',
             percentage: 2.77,
              color: '#FFFACD' },
        { name: 'Partai Keadilan Dan Persatuan Indonesia',
             percentage: 0.17,
              color: '#800000' }
    ];

    // Konsol log untuk debugging (tetap dipertahankan)
    const totalPercentage = partiesData.reduce((sum, party) => sum + party.percentage, 0);
    console.log(`Total Percentage (should be 100%): ${totalPercentage.toFixed(2)}%`);

    // --- DOM Elements Selection (Consolidated) ---
    const navLinks = document.querySelectorAll('.navbar .menu a');
    const heroNavButtons = document.querySelectorAll('.hero a.btn');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navbar .menu');
    const progressContainers = document.querySelectorAll('.party-progress-container');


    let homeChart2024;
    let homeChart2019;

    // Fungsi scrollToElement (tetap dipertahankan untuk navigasi smooth scroll)
    function scrollToElement(elementId) {
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Ini akan muncul jika Anda mengklik link internal yang tidak memiliki ID di HTML Anda
            console.warn(`Element with ID '${elementId}' not found for scrolling.`);
        }
    }

    // --- Event Listeners for Navigation ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Jika href dimulai dengan '#' maka itu adalah link internal
            if (href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.split('#')[1];
                scrollToElement(sectionId); // Menggunakan fungsi scroll yang baru
                // Tutup menu mobile jika aktif
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    toggleMenu(); // Panggil lagi untuk mengubah icon menu
                }
            }
            // Jika tidak dimulai dengan '#', biarkan browser menavigasi ke URL eksternal
        });
    });

    heroNavButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
        });
    });


    // --- Chart.js Helper Function ---
    function createHomeChart(ctx, chartData) {
        if (!ctx) return; // Pastikan konteks ada

        const labels = chartData.map(party => party.name);
        const data = chartData.map(party => party.percentage);
        const colors = chartData.map(party => party.color);

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Perolehan Suara (%)',
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors.map(color => color.replace(')', ', 0.8)')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y', // Membuat bar chart horizontal
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    y: { // Tambahkan skala y agar label nama partai terlihat jelas
                        grid: {
                            display: false // Menghilangkan garis grid di y-axis
                        }
                    }
                },
                plugins: {
                    legend: { display: false }, // Tidak menampilkan legend
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed.x !== null) { label += context.parsed.x.toFixed(2) + '%'; }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    // --- Home Section Functions ---
    function renderProgressBars() {
        progressContainers.forEach(container => {
            container.innerHTML = ''; // Bersihkan konten yang ada
            partiesData.forEach(party => { // Menggunakan partiesData (2024) untuk progress bar
                const percentage = party.percentage;
                const progressBarHtml = `
                    <div class="party-progress">
                        <div class="party-info">
                            <span class="party-name">${party.name}</span>
                            <span class="party-percentage" style="color: ${party.color};">${percentage.toFixed(2)}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%; background-color: ${party.color};"></div>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', progressBarHtml);
            });
        });
    }


    // Initialize home charts
    const ctx2024 = document.getElementById('homeChart2024');
    const ctx2019 = document.getElementById('homeChart2019');
    if (ctx2024) {
        homeChart2024 = createHomeChart(ctx2024, partiesData); // For 2024 data
    }
    if (ctx2019) {
        homeChart2019 = createHomeChart(ctx2019, partiesData2019); // For 2019 data
    }

    renderProgressBars(); // Initial render for progress bars

    // Toggle mobile menu (already defined globally but also checked here)
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            toggleMenu(); // Panggil toggleMenu untuk mengubah ikon
        });
    }

});