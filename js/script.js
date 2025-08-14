
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("div"); // you can change selector
  
  elements.forEach((el, i) => {
    el.classList.add("fade-in-top");
    setTimeout(() => {
      el.classList.add("show");
    }, i * 150); // 150ms stagger per div
  });
});


const tooltip = document.getElementById('tooltip-container');
const tooltipImg = document.getElementById('tooltip-image');

function positionTooltipFor(link) {
  const rect = link.getBoundingClientRect();
  const pad = 10;

  const tw = tooltip.offsetWidth;
  const th = tooltip.offsetHeight;

  // Always place BELOW the link
  let top = rect.bottom + pad;

  // Align left edge of tooltip with left edge of link
  let left = rect.left;

  // Clamp to viewport edges if needed
  const vw = document.documentElement.clientWidth;
  const gutter = 8;
  if (left < gutter) left = gutter;
  if (left + tw > vw - gutter) left = vw - tw - gutter;

  tooltip.style.top = `${Math.round(top)}px`;
  tooltip.style.left = `${Math.round(left)}px`;
}

function showTooltip(link) {
  const src = link.dataset.tooltip;

  // Prepare for accurate measurement
  tooltip.classList.remove('show');
  tooltip.style.visibility = 'hidden';
  tooltip.style.opacity = '0';

  const doPosition = () => {
    // Make it measurable first (no fade yet)
    tooltip.style.visibility = 'visible';
    // Next frame to ensure layout is updated
    requestAnimationFrame(() => {
      positionTooltipFor(link);
      // Now animate in
      tooltip.classList.add('show');
      tooltip.style.opacity = '1';
    });
  };

  // Set the image; handle cached & non-cached reliably
  if (tooltipImg.src !== src) {
    tooltipImg.src = src;
  }

  if (tooltipImg.complete && tooltipImg.naturalWidth > 0) {
    doPosition();
  } else {
    tooltipImg.addEventListener('load', doPosition, { once: true });
    tooltipImg.addEventListener('error', () => {
      // fallback sizing if image fails
      doPosition();
    }, { once: true });
  }
}

function hideTooltip() {
  tooltip.classList.remove('show');
  // Keep visibility toggle so future measurements don’t flicker
  tooltip.style.visibility = 'hidden';
}

document.querySelectorAll('.image-tooltip').forEach(link => {
  link.addEventListener('mouseenter', () => showTooltip(link));
  link.addEventListener('mouseleave', hideTooltip);
});






document.getElementById("copyEmail").addEventListener("click", function(e) {
    e.preventDefault();

    const email = "jeyasuriyaa140@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const status = document.getElementById("statusMsg");
        status.classList.add("show");
        setTimeout(() => status.classList.remove("show"), 600);
    }).catch(err => {
        console.error("Could not copy email: ", err);
    });
});


