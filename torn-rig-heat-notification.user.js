// ==UserScript==
// @name         TC Rig Heat Notification
// @namespace    TC-Rig-Heat-Notify
// @version      0.1
// @description  Make a noise when the cracking rig is at a specified heat.
// @author       Reborn121 [1864577]
// @match        https://www.torn.com/loader.php?sid=crimes
// @icon         https://www.google.com/s2/favicons?sz=64&domain=torn.com
// @downloadURL  https://github.com/R23MJ/torn-rig-heat-notification/blob/main/torn-rig-heat-notification.user.js
// @updateURL    https://github.com/R23MJ/torn-rig-heat-notification/blob/main/torn-rig-heat-notification.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const CHECK_INTERVAL = 30000; // Check every 30 seconds
    const HEAT_THRESHOLD = 70; // Specify the heat threshold

    // Sound settings
    const ALERT_SOUND_URL = 'https://audio.jukehost.co.uk/gxd2HB9RibSHhr13OiW6ROCaaRbD8103';

    // Function to check all heat levels
    function checkHeatLevels() {
        // Get the container that holds all the child elements we need to iterate over
        const parentElement = document.querySelector('#react-root > div > div.crime-root.cracking-root > div > div.currentCrime___MN0T1 > div.rig___aY5rF');
        
        if (parentElement) {
            // Flag to track if all heat levels are below the threshold
            let allBelowThreshold = true;

            // Iterate over each child of the parent element
            const childElements = parentElement.children;
            for (let i = 0; i < childElements.length; i++) {
                // Iterate over the children of each child element
                const grandChildElements = childElements[i].children;
                for (let j = 0; j < grandChildElements.length; j++) {
                    // Select the heat element within each grandchild
                    const heatElement = grandChildElements[j].querySelector('div.heat___OQao1');
                    if (heatElement) {
                        // Get the numeric heat level
                        const heatLevel = parseInt(heatElement.textContent.trim(), 10);

                        // Check if the heat level exceeds the threshold
                        if (heatLevel <= HEAT_THRESHOLD) {
                            allBelowThreshold = false;
                        }
                    }
                }
            }

            // Play alert sound if all heat levels are below the threshold
            if (allBelowThreshold) {
                playAlertSound();
            }
        }
    }

    // Function to play the alert sound
    function playAlertSound() {
        const audio = new Audio(ALERT_SOUND_URL);
        audio.play().catch(function(error) {
            console.error("Audio playback failed:", error);
        });
    }

    // Periodically check all heat levels
    setInterval(checkHeatLevels, CHECK_INTERVAL);
})();
