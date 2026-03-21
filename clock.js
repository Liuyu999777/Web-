function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const hElem = document.getElementById('hour');
    const mElem = document.getElementById('minute');
    const sElem = document.getElementById('second');

    if (hElem && mElem) {
        hElem.textContent = hours;
        mElem.textContent = minutes;
        sElem.textContent = seconds;

    }
}

setInterval(updateClock, 1000);
updateClock();