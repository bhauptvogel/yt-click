# YT Click - No playback for recoomended content

**YT Click** prevents accidental video watching by turning the YouTube home page and subscriptions feed into a simple link picker.
Instead of playing a video when you click it, the extension copies its clean URL (without timecodes) directly to your clipboard.

This lets you collect videos without falling into the recommendation trap.

## Features

* On **YouTube Home** and **Subscriptions**, clicking any video:
  * does **not** open it
  * copies its URL to your clipboard
* Automatically strips timecodes like `&t=123`
* Videos still play normally when:
  * opened from an external link
  * pasted into the address bar
  * clicked on a search results page
  * you’re already on a `/watch` page
* No data collection, no permissions beyond YouTube page access

## Installation (Developer Mode)

1. Clone or download this repository
2. Open `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the project folder

## Why?

The YouTube homepage and subscriptions page are optimized for engagement, not discipline.
By removing autoplay from those surfaces, you gain control over when you choose to watch.