         function generate(css) {
             var correctWords = document.getElementById("correct").value.split("\n").map(w => w.trim()).filter(w => w.length > 0);
             var name = document.getElementById("name").value;
             var gameHtml = "<!DOCTYPE html>\n\
                 <html>\n\
                 <head>\n\
                     <title>find words("+name+")</title>\n";
                     if(css){gameHtml += "<style>\n\
                         button {\n\
                             padding: 10px 15px;\n\
                             background-color: #4CAF50;\n\
                             color: white;\n\
                             border: none;\n\
                             border-radius: 3px;\n\
                             cursor: pointer;\n\
                             font-size: 16px;\n\
                             margin-right: 10px;\n\
                         }\n\
                         button:hover {\n\
                             background-color: #3e8e41;\n\
                         }\n\
                         button:focus {\n\
                             outline: none;\n\
                         }\n\
                         button:active {\n\
                             background-color: #fa0b0c;\n\
                         }\n\
                     </style>\n";}
                 gameHtml += "</head>\n\
                 <body>\n\
                     Use the letters to spell out different words:\n\
                     <br>\n\
                     <h1>"+name+"</h1>\n\
                     <form id='form'>\n\
                     </form>\n\
                     <button onclick='checkAnswers();'>check</button>\n\
                     <p id='checked'></p>\n\
                     <script>\n\
                         var correctWords = [\"" + correctWords.join("\",\"") + "\"];\n\
                         function generateInputs() {\n\
                             const form = document.getElementById('form');\n\
                             for (let i = 0; i < correctWords.length; i++) {\n\
                                 const input = document.createElement('input');\n\
                                 input.type = 'text';\n\
                                 form.appendChild(input);\n\
                             }\n\
                         }\n\
                         function checkAnswers() {\n\
                             const inputs = document.getElementById('form').elements;\n\
                             const guesses = [];\n\
                             for (let i = 0; i < inputs.length; i++) {\n\
                                 const input = inputs[i];\n\
                                 if (input.value.trim() !== '') {\n\
                                     guesses.push(input.value);\n\
                                 }\n\
                             }\n\
                             const right = [];\n\
                             for (let i = 0; i < guesses.length; i++) {\n\
                                 const guess = guesses[i];\n\
                                 if (correctWords.includes(guess)) {\n\
                                     right[i] = guess + ' is correct';\n\
                                 } else {\n\
                                     right[i] = guess + ' is wrong';\n\
                                 }\n\
                             }\n\
                             const t = document.getElementById('checked');\n\
                             t.innerText = right.join('\\n');\n\
                         }\n\
                         generateInputs();\n\
                     <\/script>\n\
                 </body>\n\
                 </html>";
         return gameHtml;
         }
         
         
         // Function to open game in new tab
         function openGame() {
             let gameHtml = generate(true);
             let newTab = window.open("about:blank", "_blank"); // Open new tab
             newTab.document.write(gameHtml); // Write HTML code to new tab
         }
         
         function shareGame() {
           let gameHtml = generate(false);
         
           // Remove unnecessary spaces from HTML string
           gameHtml = gameHtml.replace(/\s{2,}/g, ' ').trim();
         
           let encodedHtml = encodeURIComponent(gameHtml); // Encode HTML code
           let dataUri = "data:text/html;charset=UTF-8," + encodedHtml; // Create data URI
           window.prompt("Copy the game link below:", dataUri);
         }
         
         function downloadGame() {
             let gameHtml = generate(true);
             let encodedHtml = encodeURIComponent(gameHtml); // Encode HTML code
             let dataUri = "data:text/html;charset=UTF-8," + encodedHtml; // Create data URI
             let link = document.createElement("a");
             link.download = "findwords.html";
             link.href = dataUri; // Set data URI as href
             link.click(); // Simulate click on download link
         }