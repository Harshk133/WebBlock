

javascript.javascriptGenerator.forBlock['connect_database'] = function (block) {
    var dbType = block.getFieldValue('DB_TYPE');
    var host = block.getFieldValue('HOST');
    var user = block.getFieldValue('USER');
    var password = block.getFieldValue('PASSWORD');
    var database = block.getFieldValue('DATABASE');

    // Construct the JavaScript code for database connection
    var code = `const ${dbType} = require('${dbType}');\n`; // Import the database driver
    code += `const connection = new ${dbType}.Client({\n`;
    code += `  host: '${host}',\n`;
    code += `  user: '${user}',\n`;
    code += `  password: '${password}',\n`;
    code += `  database: '${database}'\n`;
    code += `});\n`; 
    code += `connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to the ${dbType} database.');
    });\n`; // Connect to the database

    return code;
  };


  javascript.javascriptGenerator.forBlock['execute_query'] = function (block) {
    var query = block.getFieldValue('QUERY');
    var code = `connection.query('${query}', (err, result) => {
      if (err) throw err;
      console.log(result);
    });\n`;
    return code;
};

javascript.javascriptGenerator.forBlock['insert_data'] = function (block) {
    var table = block.getFieldValue('TABLE');
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `connection.query('INSERT INTO ${table} SET ?', [${data}], (err, result) => {
      if (err) throw err;
      console.log(result);
    });\n`;
    return code;
};

javascript.javascriptGenerator.forBlock['update_data'] = function (block) {
    var table = block.getFieldValue('TABLE');
    var where = Blockly.JavaScript.valueToCode(block, 'WHERE', Blockly.JavaScript.ORDER_ATOMIC);
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `connection.query('UPDATE ${table} SET ? WHERE ?', [[${data}], [${where}]], (err, result) => {
      if (err) throw err;
      console.log(result);
    });\n`;
    return code;
};

javascript.javascriptGenerator.forBlock['delete_data'] = function (block) {
    var table = block.getFieldValue('TABLE');
    var where = Blockly.JavaScript.valueToCode(block, 'WHERE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `connection.query('DELETE FROM ${table} WHERE ?', [${where}], (err, result) => {
      if (err) throw err;
      console.log(result);
    });\n`;
    return code;
};

javascript.javascriptGenerator.forBlock['handle_request'] = function (block) {
    var method = block.getFieldValue('METHOD');
    var url = block.getFieldValue('URL');
  
    // Construct the JavaScript code for Express.js
    var code = `const express = require('express');\n`;
    code += `const app = express();\n`;
    code += `app.${method.toLowerCase()}('${url}', (req, res) => {\n`;
    code += `  // Handle the request\n`;
    code += `  res.send('Hello from Node.js!');
    });\n`;
    code += `app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });\n`;
  
    return code;
  };

javascript.javascriptGenerator.forBlock['process_data'] = function (block) {
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `// Process the data\n`;
    code += `console.log([${data}]);\n`;
    return code;
};

javascript.javascriptGenerator.forBlock['send_response'] = function (block) {
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `res.send([${data}]);\n`;
    return code;
};

javascript.javascriptGenerator.forBlock['start_session'] = function (block) {
    var code = `// Start the server session\n`;
    return code;
};

javascript.javascriptGenerator.forBlock['make_api_call'] = function (block) {
    var method = block.getFieldValue('METHOD');
    var url = block.getFieldValue('URL');
    var code = `const axios = require('axios');\n`;
    code += `axios.${method.toLowerCase()}('${url}')
    .then(response => {
      response_data = response.data;
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });\n`;
    return code;
};

javascript.javascriptGenerator.forBlock['handle_response'] = function (block) {
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `// Handle the response\n`;
    code += `console.log([${data}])\n`;
    return code;
};

javascript.javascriptGenerator.forBlock['parse_json'] = function (block) {
    var json = Blockly.JavaScript.valueToCode(block, 'JSON', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `JSON.parse([${json}])`; // Return a tuple with the parsed JSON data
    return [code, Blockly.JavaScript.ORDER_ATOMIC]; 
};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "connect_database",
        "message0": "Connect to database %1 with host %2 user %3 password %4 database %5",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DB_TYPE",
                "options": [
                    ["MySQL", "mysql"],
                    ["PostgreSQL", "postgres"],
                    ["MongoDB", "mongodb"]
                ]
            },
            {
                "type": "field_input",
                "name": "HOST",
                "text": "localhost"
            },
            {
                "type": "field_input",
                "name": "USER",
                "text": "your_user"
            },
            {
                "type": "field_input",
                "name": "PASSWORD",
                "text": "your_password"
            },
            {
                "type": "field_input",
                "name": "DATABASE",
                "text": "your_database_name"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230
    },
    {
        "type": "execute_query",
        "message0": "Execute query %1",
        "args0": [
            {
                "type": "field_input",
                "name": "QUERY",
                "text": "SELECT * FROM users"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230
    },
    {
        "type": "insert_data",
        "message0": "Insert data %1 into table %2",
        "args0": [
            {
                "type": "input_value",
                "name": "DATA",
                "check": "String"
            },
            {
                "type": "field_input",
                "name": "TABLE",
                "text": "users"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230
    },
    {
        "type": "update_data",
        "message0": "Update data in table %1 where %2 with data %3",
        "args0": [
            {
                "type": "field_input",
                "name": "TABLE",
                "text": "users"
            },
            {
                "type": "input_value",
                "name": "WHERE",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "DATA",
                "check": "String"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230
    },
    {
        "type": "delete_data",
        "message0": "Delete data from table %1 where %2",
        "args0": [
            {
                "type": "field_input",
                "name": "TABLE",
                "text": "users"
            },
            {
                "type": "input_value",
                "name": "WHERE",
                "check": "String"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230
    },

    {
        "type": "handle_request",
        "message0": "Handle request %1 to URL %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "METHOD",
                "options": [
                    ["GET", "GET"],
                    ["POST", "POST"],
                    ["PUT", "PUT"],
                    ["DELETE", "DELETE"]
                ]
            },
            {
                "type": "field_input",
                "name": "URL",
                "text": "/users"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210
    },
    {
        "type": "process_data",
        "message0": "Process data %1",
        "args0": [
            {
                "type": "input_value",
                "name": "DATA",
                "check": "String"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210
    },
    {
        "type": "send_response",
        "message0": "Send response with data %1",
        "args0": [
            {
                "type": "input_value",
                "name": "DATA",
                "check": "String"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210
    },
    {
        "type": "start_session",
        "message0": "Start session",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210
    },

    // API Blocks
    {
        "type": "make_api_call",
        "message0": "Make API call %1 to URL %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "METHOD",
                "options": [
                    ["GET", "GET"],
                    ["POST", "POST"],
                    ["PUT", "PUT"],
                    ["DELETE", "DELETE"]
                ]
            },
            {
                "type": "field_input",
                "name": "URL",
                "text": "https://api.example.com/users"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 165
    },
    {
        "type": "handle_response",
        "message0": "Handle response with data %1",
        "args0": [
            {
                "type": "input_value",
                "name": "DATA",
                "check": "String"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 165
    },

    // Parse JSON
    {
        "type": "parse_json",
        "message0": "Parse JSON data %1",
        "args0": [
            {
                "type": "input_value",
                "name": "JSON",
                "check": "String"
            }
        ],
        "output": "String",
        "colour": 165
    }
]);

