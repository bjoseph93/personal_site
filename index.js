// Temporarily disable interactivity on mobile
if (window.innerWidth > 800) {
  window.addEventListener("DOMContentLoaded", handleDOMLoad);
  window.addEventListener("mousemove", trackMouse);
  window.addEventListener("touchmove", trackFinger);
  window.addEventListener("touchend", handleTouchEnd);
  document.addEventListener("click", handleClick);

  let links;
  let state = { dark: true, mouseOnLink: false };
  let clippedElement;
  let transparentElement;
  let initialTextElement;

  function handleClick(e) {
    if (state.dark) {
      initialTextElement.style.visibility = "hidden";
      clippedElement.style.visibility = "visible";
      clippedElement.style.clipPath = null;
      transparentElement.style.visibility = "hidden";
      state.dark = !state.dark;
    } else if (!state.mouseOnLink) {
      if (window.innerWidth < 600) {
        setCircleVisibility("hidden");
      } else {
        clippedElement.style.clipPath = desktopClipPath(e);

        transparentElement.style.clipPath = desktopClipPath(e);
        setCircleVisibility("visible");
      }

      state.dark = !state.dark;
    }
  }

  function handleTouchEnd() {
    if (state.dark) {
      setCircleVisibility("hidden");
    }
  }

  function handleDOMLoad() {
    clippedElement = document.getElementById("clipped");
    transparentElement = document.getElementById("transparent-layer");
    initialTextElement = document.getElementById("initial-text");

    if (window.innerWidth < 600) {
      initialTextElement.textContent = "Drag your finger!";
    } else {
      initialTextElement.textContent = "Look around!";
    }

    links = document.getElementsByTagName("a");
    links[0].addEventListener("mouseenter", function () {
      state.mouseOnLink = true;
    });

    links[1].addEventListener("mouseenter", function () {
      state.mouseOnLink = true;
    });

    links[0].addEventListener("mouseleave", function () {
      state.mouseOnLink = false;
    });

    links[1].addEventListener("mouseleave", function () {
      state.mouseOnLink = false;
    });

    setCircleVisibility("hidden");
  }

  function trackMouse(e) {
    if (state.dark) {
      initialTextElement.style.display = "none";
      setCircleVisibility("visible");
      clippedElement.style.clipPath = desktopClipPath(e);
      transparentElement.style.clipPath = desktopClipPath(e);
    }
  }

  function trackFinger(e) {
    if (state.dark) {
      initialTextElement.style.display = "none";
      setCircleVisibility("visible");
      clippedElement.style.clipPath = mobileClipPath(e);
      transparentElement.style.clipPath = mobileClipPath(e);
    }
  }

  function setCircleVisibility(visibility) {
    clippedElement.style.visibility = visibility;
    transparentElement.style.visibility = visibility;
  }

  function desktopClipPath(e) {
    return `circle(5% at ${(e.clientX / window.innerWidth) * 100}% ${
      (e.clientY / window.innerHeight) * 100
    }%)`;
  }

  function mobileClipPath(e) {
    const touch = e.targetTouches[0];

    return `circle(10% at ${(touch.pageX / window.innerWidth) * 100}% ${
      (touch.pageY / window.innerHeight) * 100
    }%)`;
  }
}
