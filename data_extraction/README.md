# Get the available courses data in json format

Here is a script that can help you to extract all the courses info you need, this format is based on my college course info page if you need to modify you can change it but you need to have the same format as format_design.json

If you are a student at ITESO you can get all the info by running this small script in your browser console

```js
for(let i = 0; i < 1003; i++){
    button = document.getElementById("detail" + i);
    button.click();
}
```

After selecting the period, it will get all the info you need on the html page, after that save the web page you can keep only the main html file, remove scrips and add reference to the data extraction at the end of the file

```html
<script src="./data_extraction.js"></script>
```
