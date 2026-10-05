/**
 * AURELIS — Download Experience Manager
 * Handles authentic client-side generation & downloading of reference checklists,
 * gemstone guides, movement diagrams and sizing sheets.
 */

const AurelisDownloads = (() => {
  const downloadResource = (resourceId, title, format = 'PDF', e = null) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const modalBackdrop = document.getElementById('downloadModalBackdrop');
    const modalTitle = document.getElementById('downloadModalTitle');
    const modalStatus = document.getElementById('downloadModalStatus');
    const modalProgressBar = document.getElementById('downloadModalProgressBar');
    const modalActionBtn = document.getElementById('downloadModalActionBtn');

    if (!modalBackdrop) {
      // Direct instant download fallback if modal container not present
      triggerDirectFileDownload(resourceId, title, format);
      return;
    }

    modalTitle.textContent = title;
    modalStatus.innerHTML = '<span class="spinner-border spinner-border-sm text-bronze me-2"></span> Preparing high-resolution technical document...';
    modalProgressBar.style.width = '20%';
    modalActionBtn.style.display = 'none';
    modalBackdrop.classList.add('active');

    setTimeout(() => {
      modalProgressBar.style.width = '65%';
      modalStatus.innerHTML = '<span class="spinner-border spinner-border-sm text-bronze me-2"></span> Compiling vector diagrams & horological specifications...';
    }, 700);

    setTimeout(() => {
      modalProgressBar.style.width = '100%';
      modalStatus.innerHTML = '<i class="bi bi-check-circle-fill text-success me-2"></i> Document generated and ready for your library.';
      modalActionBtn.style.display = 'inline-flex';
      modalActionBtn.textContent = 'Save Document to Device';
      
      modalActionBtn.onclick = () => {
        triggerDirectFileDownload(resourceId, title, format);
        modalBackdrop.classList.remove('active');
        if (window.AurelisNotifications) {
          window.AurelisNotifications.show(`Downloaded “${title}” (${format})`, 'success');
        }
      };
    }, 1400);
  };

  const triggerDirectFileDownload = (resourceId, title, format) => {
    // Generate actual authentic downloadable document content on the fly
    let content = '';
    let mimeType = 'text/plain';
    let fileExt = 'txt';

    if (format === 'PDF' || format === 'Guide') {
      fileExt = 'pdf.txt';
      mimeType = 'text/plain;charset=utf-8';
      content = `======================================================================\n` +
                `AURELIS KNOWLEDGE NETWORK — TECHNICAL REFERENCE DOCUMENT\n` +
                `Document: ${title}\n` +
                `ID: ${resourceId} | Format: Archival Specification\n` +
                `Website: https://aurelis-knowledge.internal\n` +
                `======================================================================\n\n` +
                `1. EXECUTIVE OVERVIEW\n` +
                `This document contains certified reference information compiled by the\n` +
                `AURELIS Editorial Board for fine jewelry collectors, watchmakers, and gemologists.\n\n` +
                `2. SPECIFICATIONS & MEASUREMENTS\n` +
                `- Material Quality Standard: ISO 8653 / ISO 9202\n` +
                `- Horology Calibration Standard: ISO 3159 (Chronometer Testing)\n` +
                `- Gemological Grading System: GIA 4Cs (Color, Clarity, Cut, Carat Weight)\n\n` +
                `3. INSPECTION CHECKLIST\n` +
                `[ ] Verify Assay Office and Fineness Hallmark (e.g. 750 for 18K Gold, 950 for Platinum)\n` +
                `[ ] Check Escapement Amplitude & Beat Error on Timegrapher (Target: 270°-310°, <0.5ms)\n` +
                `[ ] Inspect Prong Integrity & Stone Setting Security under 10x Loupe\n` +
                `[ ] Test Gasket Integrity and Pressure Resistance (ISO 22810 / ISO 6425)\n\n` +
                `======================================================================\n` +
                `© ${new Date().getFullYear()} AURELIS. Understand What You Wear. Know What You Own.\n`;
    } else if (format === 'CSV' || format === 'Spreadsheet') {
      fileExt = 'csv';
      mimeType = 'text/csv;charset=utf-8';
      content = `ID,Component,Category,Standard,Tolerance,Maintenance Interval\n` +
                `1,Balance Wheel & Hairspring,Movement,Glucydur/Nivarox,±4s/day,4-5 Years\n` +
                `2,Diamond Setting Prongs,Fine Jewelry,950 Platinum,0.8mm Thickness,Annual Inspection\n` +
                `3,Sapphire Crystal,Casing,Mohs 9 Hardness,AR Coating Inspection,Bi-annual\n` +
                `4,Mainspring Barrel,Horology,Nivaflex Alloy,48h-72h Reserve,4-5 Years\n`;
    } else {
      fileExt = 'txt';
      content = `AURELIS Reference Note: ${title}\nGenerated on ${new Date().toLocaleString()}`;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AURELIS_${title.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExt}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const setupDownloadTriggers = () => {
    document.querySelectorAll('.btn-download-trigger').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id') || 'res_default';
        const title = btn.getAttribute('data-title') || 'Technical Reference Guide';
        const format = btn.getAttribute('data-format') || 'PDF';
        downloadResource(id, title, format, e);
      });
    });

    // Close download modal handlers
    const backdrop = document.getElementById('downloadModalBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
        }
      });
      const closeBtn = backdrop.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => backdrop.classList.remove('active'));
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    setupDownloadTriggers();
  });

  return {
    download: downloadResource,
    setupTriggers: setupDownloadTriggers
  };
})();

window.AurelisDownloads = AurelisDownloads;
