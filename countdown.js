function updateCountdown() {
    const startDate = new Date('2024-03-08T00:00:00');
    const now = new Date();
    const monthsSinceStart = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24 * 30));
    const nextAnniversary = new Date(startDate);
    nextAnniversary.setMonth(startDate.getMonth() + monthsSinceStart);

    const timeDifference = nextAnniversary - now;
    
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById('anniversary-title').innerText = `${monthsSinceStart} month anniversary!! :))`;
    document.getElementById('countdown').innerHTML = `in only... ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

    if (timeDifference < 0) {
        document.getElementById('countdown').innerHTML = 'Happy Anniversary!';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();
