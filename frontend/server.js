const express = require('express');
const app = express();
const port = 8080;

app.use('/funcionarios', express.static("./src/funcionarios"));
app.use('/calculadora', express.static("./src/calculadora"));
app.use('/games', express.static("./src/gamesmagazine"));
app.use('/section', express.static("./src/section"));
app.use('/section-control', express.static("./src/section-control"));

app.listen(port, () => console.log(`Frontend app listening at http://localhost:${port}`));