# This file should be kept intact along with the folder src/iosdk to keep the project upgradeable
$template=hugo

yarn add @newstackdev/iosdk
rsync ./node_modules/@newstackdev/iosdk/templates/$template/iosdk ./src/iosdk
rsync ./node_modules/@newstackdev/iosdk/templates/$template/scripts/update.sh ./scripts/update.sh
