var mysql = require('mysql2');

var con = mysql.createConnection({
   host: 'localhost',
   user: 'node',
   password: 'sup3rl1m',
   database: 'mono_1'
});

var undef = 0;
var body_error = [];
var blockList = [];

con.query(
   'SELECT `id`, `body` FROM `campaign`',
   function(err, results, fields) {
      
      for(r in results){
         try {
            if(results[r].body == "" || results[r].body == undefined){
               undef++;
               continue;
            }
         
            const json = JSON.parse(results[r].body);
      
            const { blocks } = json.mainBlocks;
      
            blocks.map( function(block){

               const result = blockList.find(( {name} ) => name === block.type)
               if(result){
                  result.quantity++; 
               }else{
                  blockList.push({ 'name' : block.type, 'quantity' : 0 });
               }
            });

         }catch{
            body_error.push(r);
         };

      }
      console.log('Sin formato editor: '+body_error.length);
      // console.log(body_error);
      console.log('Undefined: '+undef);
      console.log(blockList);

   }
   
);
con.end()





