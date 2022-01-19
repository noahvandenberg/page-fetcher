const net = require('net');
const fs = require('fs')
const arguments = process.argv






const conn = net.createConnection({ 
  host: 'example.edu',
  port: 80
});

conn.setEncoding('UTF8');

conn.on('connect', () => {
  console.log(`Connected to server!`);
  conn.write(`GET / HTTP/1.1\r\n`);
  conn.write(`Host: ${arguments[2]}\r\n`);
  conn.write(`\r\n`);
});

conn.on('data', (data) => {
  //console.log(data)
  fs.writeFile(arguments[3], data, err => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`Downloaded and saved ${data.length} bytes to ./${arguments[3]}`)
    //file written successfully
  })
  //console.log(data);
  conn.end();
});

