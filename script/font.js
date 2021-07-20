#!/usr/bin/env node
var fs = require('fs');
const path = require ('path');
const IconFontBuildr = require ('icon-font-buildr');

const icons = [
    {
        icon: 'add-user',
        codepoints: ['\uE109']
    },
    {
        icon: 'thumb-tack',
        codepoints: ['\uE044']
    }
];

async function build() {
    const builder = new IconFontBuildr ({
        sources: [
        path.join(process.cwd(), 'svg', '[icon].svg'),
        ],
        icons: icons,
        output: {
            codepoints: true,
            ligatures: false,
            fonts: path.join(process.cwd(), 'fonts'),
            fontName: 'slack-icons-test',
            formats: [
                'ttf',
            ]
        }
    });

    await builder.build();


    const html_file = path.join(process.cwd(), 'test.html');
    fs.readFile(html_file, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }

        let icon_html = "";
        let icon_data = builder.getIconsCodepoints();
        Object.keys(icon_data).forEach((icon_name) => {
            icon_html += (
                `<div>
                    <i class="c-icon c-icon--${icon_name}" aria-hidden="true"></i>
                    <i class="c-icon c-icon--new c-icon--${icon_name}" aria-hidden="true"></i>
                </div>`
            );
        });

        var result = data.replace(/<main>(.|\n)*?<\/main>/, "<main>" + icon_html + "</main>");

        fs.writeFile(html_file, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}

build();
