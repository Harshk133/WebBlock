
(function () {

    const toolbox = {
        kind: "categoryToolbox",
        contents: [
            {
                "kind": "category",
                "name": "Database",
                "contents": [
                    {
                        kind: 'block',
                        type: 'connect_database',
                    },
                    {
                        kind: 'block',
                        type: 'execute_query',
                    },
                    {
                        kind: 'block',
                        type: 'insert_data',
                    },
                    {
                        kind: 'block',
                        type: 'update_data',
                    },
                    {
                        kind: 'block',
                        type: 'delete_data',
                    }
                ]
            },
            {
                "kind": "category",
                "name": "Logic",
                "contents": [
                    {
                        kind: 'block',
                        type: 'handle_request',
                    },
                    {
                        kind: 'block',
                        type: 'process_data',
                    },
                    {
                        kind: 'block',
                        type: 'send_response',
                    },
                    {
                        kind: 'block',
                        type: 'start_session',
                    }
                ]
            },
            {
                "kind": "category",
                "name": "API",
                "contents": [
                    {
                        kind: 'block',
                        type: 'make_api_call',
                    },
                    {
                        kind: 'block',
                        type: 'handle_response',
                    }
                ]
            },
            {
                "kind": "category",
                "name": "JSON",
                "contents": [
                    {
                        kind: 'block',
                        type: 'parse_json',
                    }
                ]
            }
        ]
    }

    var workspace = Blockly.inject('blocklyDiv', {
        renderer: 'Zelos',
        toolbox: toolbox,
        scrollbars: false,
        horizontalLayout: false,
        toolboxPosition: "start",
    });


    //     // Function to generate and display Node.js code
    //   function generateAndDisplayCode() {
    //     // Get the generated JavaScript code from Blockly
    //     var code = Blockly.JavaScript.workspaceToCode(workspace);

    //     // Replace "connection.connect" with "const connection = new ..."
    //     code = code.replace(/connection\.connect\((.*)\)/, 'const connection = new $1;');

    //     // Display the generated code in the "code-output" div
    //     document.getElementById('editor').innerHTML = 'Generated Code:<br><pre>' + code + '</pre>';
    //     // document.getElementById('code-output').innerHTML = 'Generated Code:<br><pre>' + code + '</pre>';
    //   }

    //   // Run button event listener
    //   document.getElementById('run-button').addEventListener('click', generateAndDisplayCode);

    //   // Save button event listener (You can implement saving the code to a file, etc.)
    //   document.getElementById('save-button').addEventListener('click', function() {
    //     // ... Your code to save the generated code
    //     console.log('Save button clicked!');
    //   });

    // Create an Ace editor instance (assuming you have the Ace.js script in your index.html)
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");

    // Function to generate and display Node.js code
    function generateAndDisplayCode() {
        // Get the generated JavaScript code from Blockly
        var code = Blockly.JavaScript.workspaceToCode(workspace);

        // Replace "connection.connect" with "const connection = new ..."
        code = code.replace(/connection\.connect\((.*)\)/, 'const connection = new $1;');

        // Set the generated code in the Ace editor
        editor.setValue(code, -1); // -1 sets the cursor to the end of the code
    }

    // Run button event listener
    document.getElementById('run-button').addEventListener('click', generateAndDisplayCode);

    // Save button event listener (You can implement saving the code to a file, etc.)
    document.getElementById('save-button').addEventListener('click', function () {
        // ... Your code to save the generated code
        console.log('Save button clicked!');
    });


})();
