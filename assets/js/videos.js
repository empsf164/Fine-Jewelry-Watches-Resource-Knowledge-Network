/**
 * AURELIS — Video Tutorials & Horology Masterclasses
 * Interactive player, chapter navigation, transcript toggle, and video gallery filtering.
 */

const AurelisVideos = (() => {
  const VIDEOS_DATA = [
    {
      id: 'vid-movement-works',
      title: 'How an Automatic Watch Movement Works: Complete Mechanical Teardown',
      category: 'Movements',
      duration: '14:28',
      difficulty: 'Intermediate',
      topic: 'Watches',
      views: '48.2K',
      description: 'Step-by-step 4K macro exploration of a mechanical caliber. Follow the path of energy from the oscillating rotor to the mainspring, gear train, Swiss lever escapement, and balance wheel.',
      chapters: [
        { time: '00:00', title: 'Introduction & Kinetic Principles', timestamp: 0 },
        { time: '02:15', title: 'The Rotor & Reverser Wheels', timestamp: 135 },
        { time: '05:40', title: 'Mainspring Barrel & Energy Transfer', timestamp: 340 },
        { time: '08:50', title: 'The Swiss Lever Escapement & Jewels', timestamp: 530 },
        { time: '11:30', title: 'Balance Wheel & Hairspring Isochronism', timestamp: 690 },
        { time: '13:45', title: 'Common Lubrication & Wear Points', timestamp: 825 }
      ],
      link: 'video-details.html?id=movement-works'
    },
    {
      id: 'vid-diamond-4cs',
      title: 'Diamond 4Cs Masterclass: Color, Clarity, Cut & Carat under 40x Loupe',
      category: 'Gemstones',
      duration: '18:50',
      difficulty: 'Beginner',
      topic: 'Gemstones',
      views: '62.4K',
      description: 'Learn how master gemologists grade diamonds. We examine feather inclusions, pinpoint crystals, table percentage, crown angles, and color tint across D through M grades.',
      chapters: [
        { time: '00:00', title: 'The GIA 4Cs Framework', timestamp: 0 },
        { time: '03:20', title: 'Understanding Diamond Cut & Light Return', timestamp: 200 },
        { time: '07:45', title: 'Clarity Grading: Flawless to SI2', timestamp: 465 },
        { time: '12:10', title: 'Color Master Stones & Fluorescence', timestamp: 730 },
        { time: '16:00', title: 'Carat Weight vs Visual Spread', timestamp: 960 }
      ],
      link: 'video-details.html?id=diamond-4cs'
    },
    {
      id: 'vid-jewelry-settings',
      title: 'Anatomy of Jewelry Settings: Prong, Bezel, Pavé & Tension Engineered',
      category: 'Craftsmanship',
      duration: '11:15',
      difficulty: 'Intermediate',
      topic: 'Fine Jewelry',
      views: '31.8K',
      description: 'Compare security, stone exposure, and fabrication methods for five major setting styles in 18K gold and 950 platinum.',
      chapters: [
        { time: '00:00', title: 'Introduction to Stone Security', timestamp: 0 },
        { time: '02:00', title: 'Classic 4 vs 6-Prong Architecture', timestamp: 120 },
        { time: '04:45', title: 'Bezel & Semi-Bezel Setting Strength', timestamp: 285 },
        { time: '07:15', title: 'Micro-Pavé Beadwork & Loupe Inspection', timestamp: 435 },
        { time: '09:30', title: 'Tension & Channel Settings', timestamp: 570 }
      ],
      link: 'video-details.html?id=jewelry-settings'
    },
    {
      id: 'vid-jewelry-cleaning',
      title: 'Professional Ultrasonic & Steam Cleaning Protocols for Fine Jewelry',
      category: 'Care & Maintenance',
      duration: '09:40',
      difficulty: 'Beginner',
      topic: 'Care & Maintenance',
      views: '27.5K',
      description: 'Which gemstones can safely survive ultrasonic cavitation, and which stones risk catastrophic fracture or oil stripping? Essential collector guidelines.',
      chapters: [
        { time: '00:00', title: 'How Ultrasonic Waves Clean Jewelry', timestamp: 0 },
        { time: '02:10', title: 'Safe Stones: Diamonds, Rubies, Sapphires', timestamp: 130 },
        { time: '04:30', title: 'Never Ultrasonic: Emeralds, Opals, Pearls', timestamp: 270 },
        { time: '06:50', title: 'Safe At-Home Cleaning Solutions', timestamp: 410 },
        { time: '08:20', title: 'Drying & Microfiber Polishing', timestamp: 500 }
      ],
      link: 'video-details.html?id=jewelry-cleaning'
    },
    {
      id: 'vid-tourbillon-assembly',
      title: 'The Tourbillon Cage: Micro-Engineering 0.3g of Kinetic Precision',
      category: 'Movements',
      duration: '22:10',
      difficulty: 'Advanced',
      topic: 'Watch Movements',
      views: '54.1K',
      description: 'Watch a master horologist assemble a titanium tourbillon carriage containing over 70 individual components operating at 21,600 vibrations per hour.',
      chapters: [
        { time: '00:00', title: 'Breguet 1801 Patent & Modern Utility', timestamp: 0 },
        { time: '04:10', title: 'Poising the Tourbillon Cage in 3D', timestamp: 250 },
        { time: '09:30', title: 'Escapement Wheel & Pallet Jewels Alignment', timestamp: 570 },
        { time: '15:20', title: 'Overcoil Hairspring Centering', timestamp: 920 },
        { time: '19:40', title: 'Rate Verification & 6-Position Timing', timestamp: 1180 }
      ],
      link: 'video-details.html?id=tourbillon-assembly'
    },
    {
      id: 'vid-watch-water-resistance',
      title: 'Watch Water Resistance Explained: ATM, Bars, Gaskets & Pressure Tests',
      category: 'Watch Basics',
      duration: '08:45',
      difficulty: 'Beginner',
      topic: 'Watches',
      views: '19.9K',
      description: 'Why 30 meters does NOT mean you can dive 30 meters deep. ISO 22810 vs ISO 6425 standards, screw-down crowns, and helium release valves.',
      chapters: [
        { time: '00:00', title: 'Demystifying Depth Ratings (30m to 300m)', timestamp: 0 },
        { time: '02:15', title: 'Static Pressure vs Dynamic Pressure', timestamp: 135 },
        { time: '04:40', title: 'Gasket Degradation & Thermal Shock', timestamp: 280 },
        { time: '06:50', title: 'Dry & Wet Pressure Testing Methods', timestamp: 410 }
      ],
      link: 'video-details.html?id=watch-water-resistance'
    }
  ];

  let isPlaying = false;
  let currentTime = 145; // 2m 25s
  let totalDuration = 868; // 14m 28s

  const initPlayer = () => {
    const playBtn = document.getElementById('videoPlayToggleBtn');
    const playBadgeCenter = document.getElementById('videoCenterPlayBtn');
    const scrubber = document.getElementById('videoProgressBar');
    const timeDisplay = document.getElementById('videoTimeDisplay');
    const chapterLinks = document.querySelectorAll('.video-chapter-item');

    if (!playBtn) return;

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const updateUI = () => {
      if (scrubber) {
        const pct = (currentTime / totalDuration) * 100;
        scrubber.style.width = `${pct}%`;
      }
      if (timeDisplay) {
        timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(totalDuration)}`;
      }
      if (playBtn) {
        playBtn.innerHTML = isPlaying ? '<i class="bi bi-pause-fill"></i>' : '<i class="bi bi-play-fill"></i>';
      }
      if (playBadgeCenter) {
        playBadgeCenter.style.opacity = isPlaying ? '0' : '1';
        playBadgeCenter.style.pointerEvents = isPlaying ? 'none' : 'auto';
      }
    };

    const togglePlayback = () => {
      isPlaying = !isPlaying;
      updateUI();
      if (window.AurelisNotifications) {
        window.AurelisNotifications.show(isPlaying ? 'Playback resumed' : 'Playback paused', 'info', 1500);
      }
    };

    playBtn.addEventListener('click', togglePlayback);
    if (playBadgeCenter) playBadgeCenter.addEventListener('click', togglePlayback);

    // Chapter jumping
    chapterLinks.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const timestamp = parseInt(item.getAttribute('data-timestamp') || '0', 10);
        currentTime = timestamp;
        isPlaying = true;
        
        chapterLinks.forEach(c => c.classList.remove('active', 'border-bronze'));
        item.classList.add('active', 'border-bronze');
        
        updateUI();
        if (window.AurelisNotifications) {
          window.AurelisNotifications.show(`Jumped to: ${item.querySelector('.chapter-title')?.textContent || 'Chapter'}`, 'info', 2000);
        }
      });
    });

    updateUI();
  };

  const init = () => {
    initPlayer();
    if (document.getElementById('videosFilterSidebar')) {
      if (window.AurelisFilters) {
        window.AurelisFilters.init({
          filterContainerId: 'videosFilterSidebar',
          itemsSelector: '.video-card-item',
          resultsContainerId: 'videosGrid',
          counterId: 'videosCount'
        });
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    init();
  });

  return {
    data: VIDEOS_DATA
  };
})();

window.AurelisVideos = AurelisVideos;
