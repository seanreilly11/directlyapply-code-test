$(document).ready(function () {
    // get string from textarea and pass to function to handle it
    $("#submitTextForm").submit(function (e) {
        e.preventDefault();
        const string = $("#text").val();
        convertToHTML(string);
    });
});

// take in string and manipulate it
const convertToHTML = (string) => {
    const sentences = string.split(". ");
    convertToMarkdown(sentences);
};

// convert string into markdown to then pass to markdown to html converter
const convertToMarkdown = (sentences) => {
    // init markdown string
    let md = "";
    // loop through sentences to print them out with correct markdown
    for (let i = 0; i < sentences.length; i++) {
        const lists = sentences[i].split("* "); // lists are defined by *
        const links = sentences[i].split("http"); // links start with http
        // each of these arrays have an initial element before it finds the string to split at
        // so if length is 1 its not found the string
        if (lists.length > 1) {
            for (let j = 0; j < lists.length; j++) {
                // add heading tags to list item presuming that it has a title before the lists begin
                if (j === 0) md += "\n### " + lists[j];
                else md += "\n- " + lists[j];
            }
        } else if (links.length > 1) {
            for (let j = 1; j < links.length; j++) {
                const lastSlash = links[j].lastIndexOf("/"); // find last slash in the link for when theres no space between the link and next sentence
                const link = links[j].substr(0, lastSlash); // display link up to the final slash
                const restOfLinkText = links[j].substr(lastSlash);
                md += " [http" + link + "](http" + link + ")"; // print link markdown
                if (restOfLinkText === "/" && j === links.length - 1) md += " ";
                else md += " " + restOfLinkText.substr(1); // add next sentence after link if there is any
            }
        } else md += "\n\n" + sentences[i] + "."; // generic sentence markdown
    }
    // pass markdown to markdown converter to html
    const converter = new showdown.Converter();
    const html = converter.makeHtml(md);
    // print output on webpage
    $("#output").html(html);
};
