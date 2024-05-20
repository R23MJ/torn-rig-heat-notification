// ==UserScript==
// @name         TC Rig Heat Notification
// @namespace    TC-Rig-Heat-Notify
// @version      0.1
// @description  Make a noise when the cracking rig is at a specified heat.
// @author       Reborn121 [1864577]
// @match        https://www.torn.com/loader.php?sid=crimes
// @icon         https://www.google.com/s2/favicons?sz=64&domain=torn.com
// @downloadURL  https://github.com/R23MJ/torn-rig-heat-notification.user.js
// @updateURL    https://github.com/R23MJ/torn-rig-heat-notification.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const CHECK_INTERVAL = 30000; // Check every 60 seconds
    const HEAT_THRESHOLD = 70; // Specify the heat threshold

    // Sound settings
    const ALERT_SOUND_URL = 'https://audio.jukehost.co.uk/gxd2HB9RibSHhr13OiW6ROCaaRbD8103'; // URL of the alert sound    //playAlertSound();


    // Function to check all heat levels
    function checkHeatLevels() {
        // Get the parent element that contains all the children we need to iterate over
        const parentElement = document.querySelector('#react-root > div > div.crime-root.cracking-root > div > div.currentCrime___MN0T1 > div.rig___aY5rF > div:nth-child(2)');

        if (parentElement) {
            // Iterate over each child of the parent element
            const childElements = parentElement.children;
            for (let i = 0; i < childElements.length; i++) {
                // Select the heat element within each child
                const heatElement = childElements[i].querySelector('div.heat___OQao1');
                if (heatElement) {
                    // Get the numeric heat level
                    const heatLevel = parseInt(heatElement.textContent.trim(), 10);

                    // Check if the heat level exceeds the threshold
                    if (heatLevel <= HEAT_THRESHOLD) {
                        playAlertSound();
                    }
                }
            }
        }
    }

    // Function to play the alert sound
    function playAlertSound() {
        const audio = new Audio(ALERT_SOUND_URL);
        audio.play();
    }

    // Periodically check the heat level
    setInterval(checkHeatLevel, CHECK_INTERVAL);
})();
