document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector(".carousel-container");
    const carousel = document.querySelector(".carousel");

    // Variables for scroll behavior
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse events for dragging functionality
    carouselContainer.addEventListener("mousedown", (e) => {
        isDown = true;
        carouselContainer.classList.add("active");
        startX = e.pageX - carouselContainer.offsetLeft;
        scrollLeft = carouselContainer.scrollLeft;
    });

    carouselContainer.addEventListener("mouseleave", () => {
        isDown = false;
        carouselContainer.classList.remove("active");
    });

    carouselContainer.addEventListener("mouseup", () => {
        isDown = false;
        carouselContainer.classList.remove("active");
    });

    carouselContainer.addEventListener("mousemove", (e) => {
        if (!isDown) return; // stop the function from running
        e.preventDefault();
        const x = e.pageX - carouselContainer.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        carouselContainer.scrollLeft = scrollLeft - walk;
    });

    // Auto-scroll functionality
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            carouselContainer.scrollLeft += 1; // Adjust scroll speed as needed
        }, 20); // Adjust interval for smooth scrolling
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Start auto-scrolling on load
    startAutoScroll();

    // Stop auto-scrolling on mouse enter and resume on mouse leave
    carouselContainer.addEventListener("mouseenter", stopAutoScroll);
    carouselContainer.addEventListener("mouseleave", startAutoScroll);

    // Exercise Timer Functionality
    const exercises = [
        { name: "Squats", duration: 60, gif: "gifs/gif-test.gif" },
        { name: "Lunges", duration: 60, gif: "lunges.gif" },
        { name: "Glute Bridges", duration: 60, gif: "glute_bridges.gif" }
    ];
    let currentExercise = 0;
    let timer;
    let breakTime = 30;
    let inBreak = false;

    function startExercise(index) {
        if (index >= exercises.length) {
            alert("Workout Complete!");
            return;
        }

        const exercise = exercises[index];
        document.getElementById("exerciseName").textContent = exercise.name;
        document.getElementById("exerciseGif").src = exercise.gif;

        let duration = exercise.duration;
        document.getElementById("exerciseTimer").textContent = formatTime(duration);
        inBreak = false;

        clearInterval(timer);
        timer = setInterval(() => {
            duration--;
            document.getElementById("exerciseTimer").textContent = formatTime(duration);

            if (duration <= 0) {
                clearInterval(timer);
                startBreak(index + 1);
            }
        }, 1000);
    }

    function startBreak(nextIndex) {
        let duration = breakTime;
        document.getElementById("exerciseName").textContent = "Break";
        document.getElementById("exerciseGif").src = "";
        document.getElementById("exerciseTimer").textContent = formatTime(duration);
        inBreak = true;

        clearInterval(timer);
        timer = setInterval(() => {
            duration--;
            document.getElementById("exerciseTimer").textContent = formatTime(duration);

            if (duration <= 0) {
                clearInterval(timer);
                startExercise(nextIndex);
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    document.getElementById("startWorkout").addEventListener("click", () => startExercise(currentExercise));
    document.getElementById("stopWorkout").addEventListener("click", () => {
        clearInterval(timer);
        document.getElementById("exerciseName").textContent = "Workout Stopped";
        document.getElementById("exerciseTimer").textContent = "00:00";
        document.getElementById("exerciseGif").src = "";
        inBreak = false;
    });
    document.getElementById("addBreakTime").addEventListener("click", () => {
        breakTime += 20;
        alert(`Break time increased to ${breakTime} seconds`);

        if (inBreak) {
            clearInterval(timer);
            startBreak(currentExercise + 1);
        }
    });
});







