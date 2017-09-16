export default function() {
  // This code is only valid for Mac
  if (!navigator.userAgent.match(/Macintosh/)) {
    return;
  }

  if (window.addEventListener) {
    window.addEventListener("mousewheel", MouseWheelHandler, false); // IE9, Chrome, Safari, Opera
    window.addEventListener("DOMMouseScroll", MouseWheelHandler, false); // Firefox
    document.addEventListener("mousewheel", MouseWheelHandler, false); // IE9, Chrome, Safari, Opera
    document.addEventListener("DOMMouseScroll", MouseWheelHandler, false); // Firefox
  }
  else {
    window.attachEvent("onmousewheel", MouseWheelHandler); // IE 6/7/8
    document.attachEvent("onmousewheel", MouseWheelHandler); // IE 6/7/8
  }

  function MouseWheelHandler(e) {
    var e = window.event || e; // old IE support

    // Prevent futile scroll, which would trigger the Back/Next page event
    if (e.deltaX < 0 || e.deltaY > 0) {
      e.preventDefault();
      console.log('e.preventDefault');
      return false;
    }
  };
}