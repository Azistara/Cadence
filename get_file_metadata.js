const mm = require('music-metadata');
const util = require('util');

let getMetadata = async (audioFile) => { //takes file path and returns file's metadata as js object with primary subobjects: format, native, common 
  if(audioFile.length <= 4){
    console.log("got passed a bad file path... returning empty object.");
    return {};
  }
    try {
    const metadata = await mm.parseFile(audioFile);
    console.log("example metadata of an audio file: " + util.inspect(metadata, { showHidden: true, depth: null }));
    return metadata;
  } catch (error) {
    console.error(error.message);
  }
};


module.exports = {getMetadata};