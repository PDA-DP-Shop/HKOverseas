/* ==============================================
   AGGRESSIVE CONTENT PROTECTION V2
   Uses Capture Phase to intercept events before anything else
   ============================================== */

(function () {
    'use strict';

    // 1. Disable Right Click (Context Menu) - Capture Phase
    window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true); // 'true' enables capture phase

    // 2. Disable Selection - Capture Phase
    window.addEventListener('selectstart', function (e) {
        // Allow selection in input fields specifically
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return true;
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);

    // 3. Disable Dragging - Capture Phase
    window.addEventListener('dragstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);

    // 4. Disable Copy/Cut/Paste - Capture Phase
    ['copy', 'cut', 'paste'].forEach(event => {
        window.addEventListener(event, function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
    });

    // 5. Disable Keyboard Shortcuts (DevTools, Save, Print)
    window.addEventListener('keydown', function (e) {
        // Shortcuts to block
        if (
            e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
            (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
            (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
            (e.ctrlKey && e.keyCode === 83) || // Ctrl+S
            (e.ctrlKey && e.keyCode === 80) || // Ctrl+P
            (e.metaKey && e.altKey && e.keyCode === 73) || // Cmd+Opt+I (Mac)
            (e.metaKey && e.shiftKey && e.keyCode === 67) // Cmd+Shift+C (Mac)
        ) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        // Disable Screenshot keys (Print Screen, Cmd+Shift+3/4)
        if (
            e.keyCode === 44 || // Print Screen
            (e.metaKey && e.shiftKey && e.keyCode === 51) || // Cmd+Shift+3
            (e.metaKey && e.shiftKey && e.keyCode === 52)    // Cmd+Shift+4
        ) {
            e.preventDefault();
            e.stopPropagation();
            // Trigger BLACK SCREEN immediately
            triggerBlackout();
            return false;
        }
    }, true);

    // 6. Window Blur Blackout (Anti-Snipping Tool)
    // When user clicks away (like opening Snipping Tool), screen goes black
    window.addEventListener('blur', function () {
        triggerBlackout();
    });

    // Restore when back in focus
    window.addEventListener('focus', function () {
        removeBlackout();
    });

    // 7. Debugger Loop to freeze DevTools
    // This creates a breakpoint loop if DevTools involves open
    setInterval(function () {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
            // DevTools likely open
            // Intentionally intrusive to discourage inspection
            // debugger; 
        }
    }, 1000);

    // 8. Image Protection Overlay
    // Dynamically add transparent overlays to all images
    function protectImages() {
        const images = document.querySelectorAll('img:not(.protected)');
        images.forEach(img => {
            img.classList.add('protected');
            // Disable native drag
            img.setAttribute('draggable', 'false');
            // Disable context menu specifically
            img.oncontextmenu = function () { return false; };
        });
    }

    // Run repeatedly to catch lazy-loaded images
    setInterval(protectImages, 2000);
    window.addEventListener('load', protectImages);


    // --- UI HELPER FUNCTIONS ---

    function triggerBlackout() {
        if (document.getElementById('blackout-overlay')) return;

        const blackout = document.createElement('div');
        blackout.id = 'blackout-overlay';
        blackout.style.position = 'fixed';
        blackout.style.top = '0';
        blackout.style.left = '0';
        blackout.style.width = '100vw';
        blackout.style.height = '100vh';
        blackout.style.backgroundColor = '#000000';
        blackout.style.zIndex = '2147483647';
        blackout.style.display = 'block';
        document.body.appendChild(blackout);
    }

    function removeBlackout() {
        const blackout = document.getElementById('blackout-overlay');
        if (blackout) blackout.remove();
    }

    function showProtectionAlert(msg) {
        // Silenced as per user preference
    }

    function addTemporaryWatermark() {
        // Replaced by blackout
    }

})();
