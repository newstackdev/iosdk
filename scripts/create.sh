echo Installing IOSDK, this will take a while...

# npx create-react-app $1 --template typescript
mkdir $1
cd $1
yarn add @newcoin-foundation/iosdk @types/react@17.0.44
rsync -av node_modules/@newcoin-foundation/iosdk/templates/default/ .

# Removes type discrepancies - a temporary measure
rm -rf ./node_modules/@newcoin-foundation/iosdk/node_modules

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

echo "$X" | node > ./package.json.new;
mv ./package.json.new ./package.json;

echo Done. Run:
echo 
echo cd "$1"
echo yarn start
echo 
echo ...and start hacking!
