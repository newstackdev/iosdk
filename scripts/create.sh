echo Installing IOSDK, this will take a while...

# npx create-react-app $1 --template typescript
cd $1
yarn add @newcoin-foundation/iosdk
rsync -av node_modules/@newcoin-foundation/iosdk/templates/default/ .

X=$(cat <<NODE
    const package = require("./package.json");
    
    package.scripts.start = "concurrently  \"overmind-devtools\" \"craco start --verbose\"";
    package.scripts.build = "craco build";
    package.scripts.test = "craco test";
    package.scripts.eject = "craco eject";

    console.log(JSON.stringify(package, null, "\t"));
NODE
);

echo "$X" | node > ./package.json.new;
mv ./package.json.new ./package.json;

echo Done. Run "yarn start" and start hacking.
