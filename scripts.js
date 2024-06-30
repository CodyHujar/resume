document.addEventListener('DOMContentLoaded', () => {
    const coverLetterTab = document.getElementById('coverLetterTab');
    const resumeTab = document.getElementById('resumeTab');
    const coverLetterSection = document.getElementById('coverLetter');
    const resumeSection = document.getElementById('resume');

    coverLetterTab.addEventListener('click', () => {
        coverLetterTab.setAttribute('aria-selected', 'true');
        resumeTab.setAttribute('aria-selected', 'false');
        coverLetterSection.hidden = false;
        resumeSection.hidden = true;
    });

    resumeTab.addEventListener('click', () => {
        resumeTab.setAttribute('aria-selected', 'true');
        coverLetterTab.setAttribute('aria-selected', 'false');
        resumeSection.hidden = false;
        coverLetterSection.hidden = true;
    });
});
