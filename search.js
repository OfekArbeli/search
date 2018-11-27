const args = process.argv;

if (args.length <= 2) {
    console.log("USAGE: node search [EXT] [TEXT]");
    process.exit(-1);
}

var fs = require('fs');
var Directory = __dirname;
var Extension = args[2];
var fileName = args[3];
var results  = [];

function searchInDirectory (DirectoryPath)
{
    var filesInDirectory = fs.readdirSync(DirectoryPath);
    var name = [];
    var ext = [];
    for (var i = 0; i < filesInDirectory.length; i++) {
        name.push(filesInDirectory[i].split(".")[0]);
        ext.push(filesInDirectory[i].split(".")[1]);
        var currentFileDirection = DirectoryPath + "\\" + filesInDirectory[i];
        if (fs.lstatSync(DirectoryPath + "\\" + filesInDirectory[i]).isDirectory())
        {
            //console.log(filesInDirectory[i]+" its a folder");
            var subDirectory = currentFileDirection;
            searchInDirectory(subDirectory);
        }
        else if ((ext[i]===Extension) && (fileName.indexOf(name[i]) >= 0))
        {
            results.push(currentFileDirection);
        }
        else
        {
            var contents = fs.readFileSync(currentFileDirection, 'utf8');
            if(contents.indexOf(fileName) >= 0){
                results.push(currentFileDirection);
            }
        }
    }
}
searchInDirectory(Directory);
if (results.length < 1)
    console.log("No file was found");
else
    console.log(results);
//console.log(allExtensions);

