
const supabase = require('@supabase/postgrest-js')
let clientmeta = new supabase.PostgrestClient('http://localhost:3000',{schema : 'meta'})
let client = new supabase.PostgrestClient('http://localhost:3000',{schema : 'schema_proof'})



const http = require('http');

const hostname = '127.0.0.1';
const port = 3005;


async function createTable() {

	let { status } = await clientmeta
	.from('table')
    .insert([{ 
    	schema_name: 'schema_proof',
    	name : 'usuario'
    }])

  console.log(status)   
}

async function createColumn() {

	let { status } = await clientmeta
	.from('column')
    .insert([{ 
    	schema_name: 'schema_proof',
    	relation_name : 'usuario',
    	name : 'age',
    	type_name : 'integer'
    }])

  console.log(status)   
}

async function start() {
 
 let { body: usuario } = await client
    .from('usuario')
    .select('*')

  console.log(usuario)   
}






const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo\n');
  start();

});



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

