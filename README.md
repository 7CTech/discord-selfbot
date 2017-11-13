# CTech's (Codd) Discord Selfbot

## Requirements
- A recent Linux distro
- QtDBus (and QtCore) > 5
- NodeJS > 8

## Setup
1. Download the repo
2. Edit `binding.gyp` to include the correct locations of QtCore and QtDBus
2. Run `npm install`
3. Run `tsc`
3. Copy `secrets.default.json` to `secrets.json` and fill in the fields
4. Run `node src/bot.js`