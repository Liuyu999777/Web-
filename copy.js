function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        const toast = document.getElementById('copy-toast');
        toast.classList.add('show');
        setTimeout(function () {
            toast.classList.remove('show');
        }, 2000);
    }).catch(function (err) {
        console.error('复制失败:', err);
    });
}
