/**
 * AURELIS — Resources Library Module
 * Downloadable templates, reference sheets, measurement guides, and collector checklists.
 */

const AurelisResources = (() => {
  const RESOURCES_DATA = [
    {
      id: 'res-watch-checklist',
      title: 'Pre-Owned & Vintage Watch Due Diligence Checklist',
      category: 'Collector Resources',
      format: 'PDF',
      fileSize: '2.4 MB',
      updated: 'October 2026',
      difficulty: 'All Levels',
      topic: 'Watches',
      description: 'An authoritative 18-point verification protocol used by master appraisers to evaluate movement amplitude, case recasting, dial refinishing, and serial integrity.',
      contains: [
        'Case geometry and bevel preservation rubric',
        'Timegrapher rate deviation & beat error tolerance table',
        'Lume reaction and tritium degradation index',
        'Original papers & archival extract verification workflows'
      ],
      link: 'resource-details.html?id=watch-checklist'
    },
    {
      id: 'res-gemstone-compatibility',
      title: 'Gemstone Hardness & Ultrasonic Cleaning Protocol Matrix',
      category: 'Reference Sheets',
      format: 'PDF',
      fileSize: '1.8 MB',
      updated: 'September 2026',
      difficulty: 'Reference',
      topic: 'Gemstones',
      description: 'Complete cross-reference of Mohs hardness ratings, fracture cleavage vulnerabilities, and heat sensitivity rules for 32 precious and semi-precious gemstones.',
      contains: [
        'Ultrasonic and steam safety classifications',
        'Emerald cedarwood oil and resin preservation rules',
        'Pearl and opal hydration and porosity precautions',
        'Chemical exposure warnings (acids, chlorine, perfumes)'
      ],
      link: 'resource-details.html?id=gemstone-compatibility'
    },
    {
      id: 'res-ring-sizing-guide',
      title: 'International Ring & Bangle Sizing Master Calibration Sheet',
      category: 'Measurement Guides',
      format: 'PDF',
      fileSize: '3.1 MB',
      updated: 'August 2026',
      difficulty: 'All Levels',
      topic: 'Jewelry',
      description: 'Calibrated millimeter circumference and internal diameter conversion charts covering US, UK, European, French, and Japanese ring standards.',
      contains: [
        '1:1 Scale printable ring sizer circles with calibration check rule',
        'Wide band vs thin band fit adjustment equations (+0.5 size offset)',
        'Finger swelling diurnal temperature variation compensation rules',
        'Bangle oval vs round wrist circumference sizing chart'
      ],
      link: 'resource-details.html?id=ring-sizing-guide'
    },
    {
      id: 'res-hallmark-reference',
      title: 'European & Swiss Precious Metal Hallmark Identification Chart',
      category: 'Reference Sheets',
      format: 'PDF',
      fileSize: '4.2 MB',
      updated: 'October 2026',
      difficulty: 'Advanced',
      topic: 'Precious Metals',
      description: 'Visual catalog of national assay marks, convention common control marks (CCM), St. Bernard heads, and historic eagle/minerva head hallmarks.',
      contains: [
        'Swiss Helvetia, St. Bernard & sword fineness marks',
        'British assay office marks: London, Birmingham, Sheffield, Edinburgh',
        'French eagles (18K gold), dog heads (platinum), and boars (silver)',
        'Fineness numerals: 999, 950, 916, 750, 585, 375'
      ],
      link: 'resource-details.html?id=hallmark-reference'
    },
    {
      id: 'res-movement-accuracy-log',
      title: 'Mechanical Watch Timing & Isochronism Daily Log Sheet',
      category: 'Templates',
      format: 'Spreadsheet',
      fileSize: '840 KB',
      updated: 'July 2026',
      difficulty: 'Intermediate',
      topic: 'Watch Movements',
      description: 'Structured tracking worksheet for monitoring positional variance (Dial Up, Dial Down, Crown Up, Crown Down) and temperature-induced rate drift.',
      contains: [
        '6-Position ISO 3159 COSC standard delta formula',
        'Power reserve decay rate logging grid',
        'Graph templates for positional rate vs amplitude curves',
        'Service advisory threshold triggers'
      ],
      link: 'resource-details.html?id=movement-accuracy-log'
    },
    {
      id: 'res-jewelry-inventory-template',
      title: 'Fine Jewelry Insurance Valuation & Provenance Register',
      category: 'Checklists',
      format: 'Templates',
      fileSize: '1.2 MB',
      updated: 'September 2026',
      difficulty: 'All Levels',
      topic: 'Care & Maintenance',
      description: 'Comprehensive archival template to record certificate numbers, metal weights, gemstone carat estimates, replacement appraisals, and safe storage details.',
      contains: [
        'Insurance itemization fields required by global underwriters',
        'Macro photographic documentation guidelines',
        'Appraisal renewal schedule reminder system',
        'Secure estate transfer and legacy provenance format'
      ],
      link: 'resource-details.html?id=jewelry-inventory-template'
    }
  ];

  const init = () => {
    // Check if we are on resources page with filters
    if (document.getElementById('resourcesFilterSidebar')) {
      if (window.AurelisFilters) {
        window.AurelisFilters.init({
          filterContainerId: 'resourcesFilterSidebar',
          itemsSelector: '.resource-card-item',
          resultsContainerId: 'resourcesGrid',
          counterId: 'resourcesCount'
        });
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    init();
  });

  return {
    data: RESOURCES_DATA
  };
})();

window.AurelisResources = AurelisResources;
