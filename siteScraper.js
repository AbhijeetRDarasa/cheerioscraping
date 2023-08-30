const cheerio = require("cheerio");
const fs = require("fs");

const Humanoid = require("humanoid-js");

const humanoid = new Humanoid();

const scrapeData = async () => {
  let output = "problem is here";
  try {
    let data = "";

    data = await humanoid.get(
      "https://xoso.com.vn/xo-so-mien-bac/xsmb-p1.html"
    );

    data = JSON.stringify(data.body); // Print the result

    const $ = cheerio.load(data);

    const mainheadingtext = $(".section-header h1").text();
    let mainheading = "Xổ số Miền Bắc  ngày";
    const sitelink1 = $(".site-link");
    let name = "";
    let date = "";
    name = $(sitelink1[1]).find("a")[1];
    date = $(sitelink1[1]).find("a")[2];
    name = $(name).text().replace("XSMB", "");
    date = $(date).text().replace("XSMB", "");

    mainheading = mainheading + date.substring(0, 4) + "(" + name + ")";
    output = mainheading + "\n";

    const sitelinkchild2 = $(sitelink1[1]).text();

    const sitelinkchild1 = sitelinkchild2.substring(
      sitelinkchild2.indexOf("(") + 1,
      sitelinkchild2.indexOf(")")
    );

    const listItems = $(".table-result tr");
    const xsmbs = [];
    $(".code-DB6").remove();

    $(".number-prize").remove();

    output = output + "Đài" + ":" + sitelinkchild1 + "\n";
    for (let i = 0; i < listItems.length; i++) {
      if (i < 9) {
        const span = $(listItems[i]).find("span");
        const td = $(listItems[i]).find("td")[0];
        const tddata = $(listItems[i]).find("td")[1];
        const xsmb = { name: "", value: "" };
        xsmb.name = $(td).text();
        xsmb.value = $(tddata).text();

        if (xsmb.name !== "")
          output = output + $(td).text() + " : " + $(tddata).text() + "\n";
      }
    }
  } catch (err) {
    console.error(err);
  }
  return output;
};

const scrapeData2 = async () => {
  try {
    const urltemp = "https://xoso.com.vn/xo-so-mien-nam/xsmn-p1.html";

    let data = "";
    data = await humanoid.get(urltemp);

    data = JSON.stringify(data.body); // Print the result
    const $ = cheerio.load(data);
    let mainheading = "Xổ số Miền Nam ngày";
    const sitelink1 = $(".site-link");
    let name = "";
    let date = "";

    name = $(sitelink1[0]).find("a")[1];
    date = $(sitelink1[0]).find("a")[2];
    name = $(name).text().replace("XSMN", "").trim();
    date = $(date).text().replace("XSMN", "");
    console.log(name, date);
    mainheading = mainheading + date.substring(0, 6) + "(" + name + ")" + "\n";
    const namePrize = $(".section-content table thead tr th");

    let head1 = $(namePrize[1]).find("a");
    let head2 = $(namePrize[2]).find("a");
    let head3 = $(namePrize[3]).find("a");

    head1 = $(head1).text();
    head2 = $(head2).text();
    head3 = $(head3).text();

    const listItems = $(".section-content table thead tr");
    const xsmbs = [];

    for (let i = 0; i < listItems.length; i++) {
      const tableloto = $(listItems[i]).find();
      $(tableloto).remove();

      if (i <= 2) {
        const thead1 = $(listItems[i]).find("a")[0];
        const thead2 = $(listItems[i]).find("a")[1];
        const thead3 = $(listItems[i]).find("a")[2];

        const td1 = $(listItems[i]).find("th")[0];
        const td2 = $(listItems[i]).find("th")[1];
        const td3 = $(listItems[i]).find("th")[2];

        const xsmb = { name: "", value: "" };
        xsmb.name = $(td1).text();
        if ($(td1).text().indexOf("Đầu") === -1) {
          xsmbs.push(xsmb);
        }
      }
    }

    const listItemsdata = $(".section-content table tbody tr");
    let arr = [];
    let columns = 3;

    let x = 0;
    let y = 0;
    const rows = [];

    let index = 0;
    $(listItemsdata).each(function (i, e) {
      const row = [];
      rows.push(row);
      $(this)
        .find("td")
        .each(function (i, e) {
          row.push($(this).text().trim());
        });
      index++;
      if (index == 9) {
        return false;
      }
    });

    let string1 = head1 + "\n";
    let string2 = head2 + "\n";
    let string3 = head3 + "\n";

    for (let i = 0; i < 9; i++) {
      if (rows[i][0]) {
        string1 = string1 + rows[i][0] + "\n";
      }
      if (rows[i][1]) {
        string2 = string2 + rows[i][1] + "\n";
      }
      if (rows[i][2]) {
        string3 = string3 + rows[i][2] + "\n";
      }
    }
    mainheading = mainheading + string1 + "\n";
    mainheading = mainheading + string2 + "\n";
    mainheading = mainheading + string3 + "\n";
    return mainheading.toString();
  } catch (err) {
    console.error(err);
  }
};

const scrapeData3 = async () => {
  try {
    const urltemp = "https://xoso.com.vn/xo-so-mien-trung/xsmt-p1.html";
    let data = "";
    data = await humanoid.get(urltemp);

    data = JSON.stringify(data.body); // Print the result
    const $ = cheerio.load(data);

    let mainheading = "Xổ số Miền Trung ngày";
    const sitelink1 = $(".site-link");
    let name = "";
    let date = "";
    name = $(sitelink1[0]).find("a")[1];
    date = $(sitelink1[0]).find("a")[2];
    name = $(name).text().replace("XSMT", "");
    date = $(date).text().replace("XSMT", "");
    mainheading = mainheading + date.substring(0, 6) + "(" + name + ")" + "\n";
    const namePrize = $(".section-content table thead tr th");
    let head1 = $(namePrize[1]).find("a");
    let head2 = $(namePrize[2]).find("a");
    let head3 = $(namePrize[3]).find("a");
    head1 = $(head1).text();
    head2 = $(head2).text();
    head3 = $(head3).text();
    const listItems = $(".section-content table thead tr");
    const xsmbs = [];
    console.log(listItems.length);

    for (let i = 0; i < listItems.length; i++) {
      const tableloto = $(listItems[i]).find();
      $(tableloto).remove();
      if (i <= 2) {
        const thead1 = $(listItems[i]).find("a")[0];
        const thead2 = $(listItems[i]).find("a")[1];
        const thead3 = $(listItems[i]).find("a")[2];

        const td1 = $(listItems[i]).find("th")[0];
        const td2 = $(listItems[i]).find("th")[1];
        const td3 = $(listItems[i]).find("th")[2];

        const xsmb = { name: "", value: "" };
        xsmb.name = $(td1).text();
        if ($(td1).text().indexOf("Đầu") === -1) {
          xsmbs.push(xsmb);
        }
      }
    }
    const listItemsdata = $(".section-content table tbody tr");
    let arr = [];
    let columns = 3;

    let x = 0;
    let y = 0;
    const rows = [];

    let index = 0;
    $(listItemsdata).each(function (i, e) {
      const row = [];
      rows.push(row);
      $(this)
        .find("td")
        .each(function (i, e) {
          row.push($(this).text().trim());
        });
      index++;
      if (index == 9) {
        return false;
      }
    });

    let string1 = head1 + "\n";
    let string2 = head2 + "\n";
    let string3 = head3 + "\n";

    for (let i = 0; i < 9; i++) {
      if (rows[i][0]) {
        string1 = string1 + rows[i][0] + "\n";
      } else {
        string1 = "";
      }
      if (rows[i][1]) {
        string2 = string2 + rows[i][1] + "\n";
      } else {
        string2 = "";
      }
      if (rows[i][2]) {
        string3 = string3 + rows[i][2] + "\n";
      } else {
        string3 = "";
      }
    }

    if (string1) mainheading = mainheading + string1 + "\n";

    if (string2) mainheading = mainheading + string2 + "\n";

    if (string3) mainheading = mainheading + string3 + "\n";
    return mainheading.toString();
  } catch (err) {
    console.error(err);
  }
};

module.exports = { scrapeData, scrapeData2, scrapeData3 };
