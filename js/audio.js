document.addEventListener('DOMContentLoaded', function () {
    const tracks = [
        { src: '../songs/cancion 3.mp3', title: 'Seoul City – Jennie' },
        { src: '../songs/cancion 2.mp3', title: 'Be alright – IVE' },
        { src: '../songs/cancion.mp3', title: 'Fighter – Royal Deluxe' }
    ];

    const images = [
        { src: '../pictures/IVE.jpg', alt: 'Imagen de IVE', caption: 'Imagen de IVE' },
        { src: '../pictures/imagen.jpg', alt: 'Galería visual', caption: 'Galería visual' },
        { src: '../pictures/Korea.jpg', alt: 'Paisaje de Corea', caption: 'Paisaje de Corea' },
        { src: '../pictures/Seoul.jpg', alt: 'Panorámica de Seúl', caption: 'Panorámica de Seúl' }
    ];

    const videos = [
        { src: '../videos/1080ccdf71c98acdc32296aac5b1b809.mp4', caption: 'Video 1: recorrido cultural' },
        { src: '../videos/4ca042eaa62cb2a94bf6bec866eafc6d.mp4', caption: 'Video 2: escena musical' }
    ];

    let imageIndex = 0;
    let videoIndex = 0;

    const audioPlayer = document.getElementById('audioPlayer');
    const selectTrack = document.getElementById('selectTrack');
    let audioElement;
    let audioSource;

    if (audioPlayer && selectTrack) {
        audioElement = document.createElement('audio');
        audioSource = document.createElement('source');
        audioElement.setAttribute('id', 'reproductor');
        audioElement.setAttribute('controls', 'controls');
        audioElement.appendChild(audioSource);
        audioPlayer.appendChild(audioElement);

        tracks.forEach(function (track, index) {
            const option = document.createElement('option');
            option.value = track.src;
            option.textContent = track.title;
            if (index === 0) {
                option.selected = true;
            }
            selectTrack.appendChild(option);
        });

        function loadTrack(src) {
            audioSource.src = src;
            audioElement.load();
            audioElement.play().catch(function () {
                // El navegador puede bloquear reproducción automática hasta que el usuario interactúe.
            });
        }

        selectTrack.addEventListener('change', function () {
            loadTrack(this.value);
        });

        loadTrack(tracks[0].src);
    }

    function updateImageCarousel() {
        const imageEl = document.getElementById('carouselImage');
        const captionEl = document.getElementById('imageCaption');
        if (!imageEl || !captionEl) return;
        imageEl.src = images[imageIndex].src;
        imageEl.alt = images[imageIndex].alt;
        captionEl.textContent = images[imageIndex].caption;
    }

    function updateVideoCarousel() {
        const sourceEl = document.getElementById('carouselVideoSource');
        const videoEl = document.getElementById('carouselVideo');
        const captionEl = document.getElementById('videoCaption');
        if (!sourceEl || !videoEl || !captionEl) return;
        sourceEl.src = videos[videoIndex].src;
        videoEl.load();
        captionEl.textContent = videos[videoIndex].caption;
    }

    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    const prevVideo = document.getElementById('prevVideo');
    const nextVideo = document.getElementById('nextVideo');

    if (prevImage && nextImage) {
        prevImage.addEventListener('click', function () {
            imageIndex = (imageIndex - 1 + images.length) % images.length;
            updateImageCarousel();
        });

        nextImage.addEventListener('click', function () {
            imageIndex = (imageIndex + 1) % images.length;
            updateImageCarousel();
        });

        updateImageCarousel();
    }

    if (prevVideo && nextVideo) {
        prevVideo.addEventListener('click', function () {
            videoIndex = (videoIndex - 1 + videos.length) % videos.length;
            updateVideoCarousel();
        });

        nextVideo.addEventListener('click', function () {
            videoIndex = (videoIndex + 1) % videos.length;
            updateVideoCarousel();
        });

        updateVideoCarousel();
    }
});
