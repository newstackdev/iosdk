echo Installing IOSDK, this will take a while... You may want to grab a drink of your liking in the meanwhile.

# npx create-react-app $1 --template typescript
# canonicalFile=$(cd -P -- "$(dirname -- "$0")" && printf '%s\n' "$(pwd -P)/$(basename -- "$0")")
# canonicalFile=$(cd -P -- "$(dirname -- "$0")" && printf "%s\n" "$(pwd -P)/$(basename -- "$0")")
# canonicalDir=$(dirname "$canonicalFile")
canonicalDir=`pwd`
echo Running in $canonicalDir
target=$canonicalDir/$1
echo Creating $target
mkdir $target
echo Entering $target
cd $target


npm init -y


echo Installing...


yarn add @newstackdev/iosdk @types/react@17.0.44

template=${2-hugo}

rsync -av ./node_modules/@newstackdev/iosdk/templates/$template/ .

# Removes type discrepancies - a temporary measure
rm -rf ./node_modules/@newstackdev/iosdk/node_modules

X=$(cat <<NODE
    const package = require("./package.json");
    
    package.name = "$1";
    package.version = "0.5.0";
    package.scripts = package.scripts || {};
    package.scripts.start = "concurrently  \"overmind-devtools\" \"craco start --verbose\"";
    package.scripts.build = "craco build";
    package.scripts.test = "craco test";
    package.scripts.eject = "craco eject";

    console.log(JSON.stringify(package, null, "\t"));
NODE
);

touch .env

echo "$X" | node > ./package.json.new;
mv ./package.json.new ./package.json;

echo Done.
echo 
echo What\'s next?
echo ------------- 
echo 1. Make sure you\'ve created your application at https://console-dev.newstack.dev
echo 2. Remember to configure .env variables, please see https://console-dev.newstack.dev/instructions for instructions.
echo 3. Run:
echo 
echo cd "$1"
echo yarn start
echo 
echo ...and start hacking!
