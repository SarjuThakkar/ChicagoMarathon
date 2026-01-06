// Using global MARATHON_DATA from constants.js

document.addEventListener('DOMContentLoaded', () => {
    initProgressBars();
    updateCountdown();
    setInterval(updateCountdown, 1000); // Update every second

    // Set donate link
    const donateLink = document.getElementById('donate-link');
    if (donateLink) {
        donateLink.href = window.MARATHON_DATA.fundraisingUrl;
    }
});

function initProgressBars() {
    const fundraisingBar = document.getElementById('fundraising-bar');
    const fundraisingStats = document.getElementById('fundraising-stats');
    const mileageBar = document.getElementById('mileage-bar');
    const mileageStats = document.getElementById('mileage-stats');

    const data = window.MARATHON_DATA;
    // Calculate percentages
    const fundPercent = Math.min((data.fundraisingRaised / data.fundraisingGoal) * 100, 100);
    const mileagePercent = Math.min((data.mileageRan / data.mileageGoal) * 100, 100);

    // Update stats text
    fundraisingStats.innerText = `$${data.fundraisingRaised.toLocaleString()} / $${data.fundraisingGoal.toLocaleString()}`;
    mileageStats.innerText = `${data.mileageRan.toLocaleString()} / ${data.mileageGoal.toLocaleString()} miles`;

    // Trigger animation after a short delay
    setTimeout(() => {
        fundraisingBar.style.width = `${fundPercent}%`;
        mileageBar.style.width = `${mileagePercent}%`;
    }, 500);
}

function updateCountdown() {
    const data = window.MARATHON_DATA;
    const raceDate = new Date(data.raceDate).getTime();
    const now = new Date().getTime();
    const distance = raceDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = "RACE DAY IS HERE!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}
