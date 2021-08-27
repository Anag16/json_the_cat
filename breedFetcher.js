/*Our first line of code in breedFetcher.js should be to require the request library, and make sure that it loads fine (no errors).

Require request and make sure that one line of code works.

Create a simple .gitignore file in order to ignore our node_modules directory.

It should contain a single line:

node_modules/

More details about it can be found here: https://stackoverflow.com/a/29820869/1305625.
Finding & Testing "Breed Search"

Scan through TheCatAPI's documentation and find the API docs for the API URL/endpoint which will return cat breed results.*/
 //https://docs.thecatapi.com/api-reference/breeds/breeds-search
 //Example
 //https://api.thecatapi.com/v1/breeds/search?q=sib
 //https://api.thecatapi.com/v1/breeds/search?q=bombay


 var fs = require('fs');
const request = require('request');


//Get the arguments from the command line
//Arguments sent from the terminal get saved to the process.argv array
// The first two elements on that array are added by Node. The third element (index #2) is the first parameter sent by the user from the terminal.
// Example
// node breedFetcher.js bombay cheese
// Bombay would be process.argv[2] and cheese would be process.argv[3]
// After slicing the first two elements, bombay is stored at process.argv[0] and cheese at process.argv[1]
let args = process.argv.slice(2);



let fetchCat = function(){  
   let baseURL = "https://api.thecatapi.com/v1/breeds/search?q=";
   let breedURL = `${baseURL}${args[0]}`;

       
    request(breedURL, (error, response, body) => { // error, response and body (are parameters of the callback :v)
    if (error){
    console.log('Error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML.
    } else {
      const data = JSON.parse(body); // parse ; converts a string in an object
      if(data.length === 0){
        console.log ("We are sorry, that breed does not exist 😿");
      } else {
          console.log(data[0].description);

          
          if(data[0].reference_image_id){
            fetchCatImage(data[0].reference_image_id); 
          }
      };   
    }
  });
}

let  fetchCatImage = function(imageId){
  // https://docs.thecatapi.com/api-reference/images/images-get
  // https://api.thecatapi.com/v1/images/5iYq9NmT1
  let baseURL = "https://api.thecatapi.com/v1/images/";
  let imageURL = `${baseURL}${imageId}`;

  request(imageURL, (error, response, body) => { // error, response and body (are parameters of the callback :v)
    if (error){
    console.log('Error:', error); // Print the error if one occurred
    } else {
      const data = JSON.parse(body); // parse ; converts a string in an object
      if(data.length === 0){
        console.log ("We are sorry, that breed does not exist 😿");
      } else {
          console.log("Image URL:\n" + data.url);
      };   
    }
  });

} 

fetchCat();
module.exports = {
  fetchCat
};


        /// para correr el programa necesito usar el node "nombre del archivo :v".js      parametros   ejmp. node breedFetcher.js   bombay