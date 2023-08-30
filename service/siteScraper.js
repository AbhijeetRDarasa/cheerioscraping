const cheerio = require("cheerio");
const fs = require("fs");

const Humanoid = require("humanoid-js");

const humanoid = new Humanoid();

const scrapeData = async () => {
  let output = "";
  let output2 = "";
  try {
    let data = "";

    data = await humanoid.get(
      "https://xoso.com.vn/xo-so-mien-bac/xsmb-p1.html"
    );

    data = JSON.stringify(data.body); // Print the result

    const $ = cheerio.load(data);

    //const mainheadingtext = $(".section-header h1").text();
    let mainheading = "Xổ số Miền Bắc  ngày";
    let mainheading2 = "Xổ số Miền Bắc  ngày";

    const sitelink1 = $(".site-link");
    let name = "";
    let date = "";
    let name2 = "";
    let date2 = "";

    name = $(sitelink1[1]).find("a")[1];
    date = $(sitelink1[1]).find("a")[2];

    name2 = $(sitelink1[2]).find("a")[0];
    date2 = $(sitelink1[2]).find("a")[1];

    name = $(name).text().replace("XSMB", "");
    date = $(date).text().replace("XSMB", "");

    name2 = $(name2).text().replace("XSMB", "");
    date2 = $(date2).text().replace("XSMB", "");

    console.log("name2", name2, "Date2", date2);

    output = mainheading + date.substring(0, 6) + "(" + name + ") \n";

    output2 = mainheading2 + date2.substring(0, 6) + "(" + name2 + ") \n";

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

    output2 = output2 + "Đài" + ":" + sitelinkchild1 + "\n";

    for (let i = 0; i < listItems.length; i++) {
      if (i < 18) {
        const span = $(listItems[i]).find("span");
        const td = $(listItems[i]).find("td")[0];
        const tddata = $(listItems[i]).find("td")[1];
        const xsmb = { name: "", value: "" };
        xsmb.name = $(td).text();
        xsmb.value = $(tddata).text();

        if (xsmb.name !== "") {
          if (i < 9) {
            output = output + $(td).text() + " : " + $(tddata).text() + "\n";
          } else {
            output2 = output2 + $(td).text() + " : " + $(tddata).text() + "\n";
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  console.log("output2", output2);

  console.log("output", output);

  const isbefore = calulateTime();
  output = isbefore ? output2 : output;

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

    const tableloto = $(".table-loto");
    $(tableloto).remove();

    let name = "";
    let date = "";
    let date2 = "";
    let name2 = "";
    name = $(sitelink1[1]).find("a")[1];
    date = $(sitelink1[1]).find("a")[2];
    name2 = $(sitelink1[2]).find("a")[0];
    date2 = $(sitelink1[2]).find("a")[1];
    name = $(name).text().replace("XSMN", "").trim();
    date = $(date).text().replace("XSMN", "");
    name2 = $(name2).text().replace("XSMN", "").trim();
    date2 = $(date2).text().replace("XSMN", "");
    console.log("name2", name2, "date2", date2);

    //console.log(name, date);
    const namePrize = $(".section-content table thead tr th");

    let head1 = $(namePrize[1]).find("a");
    let head2 = $(namePrize[2]).find("a");
    let head3 = $(namePrize[3]).find("a");

    let head7 = $(namePrize[4]).find("a");
    let head8 = $(namePrize[5]).find("a");
    let head9 = $(namePrize[6]).find("a");

    head1 = $(head1).text();
    head2 = $(head2).text();
    head3 = $(head3).text();

    head7 = $(head7).text();
    head8 = $(head8).text();
    head9 = $(head9).text();

    console.log(head7, head8, head9);

    const listItems = $(".section-content table thead tr");

    const listItemsdata = $(".section-content table tbody tr");
    let arr = [];
    let columns = 3;

    let x = 0;
    let y = 0;
    const rows = [];
    let thText = [];
    let index = 0;
    $(listItemsdata).each(function (i, e) {
      const row = [];
      rows.push(row);
      $(this)
        .find("th")
        .each(function (i, e) {
          thText.push($(this).text().trim());
        });
      $(this)
        .find("td")
        .each(function (i, e) {
          row.push($(this).text().trim());
        });
      index++;
      if (index == 18) {
        return false;
      }
    });

    console.log("rows ", rows);

    let string1 = head1 + "\n";
    let string2 = head2 + "\n";
    let string3 = head3 + "\n";

    let string7 = head7 + "\n";
    let string8 = head8 + "\n";
    let string9 = head9 + "\n";

    for (let i = 0; i < 9; i++) {
      if (rows[i][0]) {
        string1 = string1 + thText[i] + ": " + rows[i][0] + "\n";
      }
      if (rows[i][1]) {
        string2 = string2 + thText[i] + ": " + rows[i][1] + "\n";
      }
      if (rows[i][2]) {
        string3 = string3 + thText[i] + ": " + rows[i][2] + "\n";
      }
    }

    for (let i = 9; i < 18; i++) {
      if (rows[i][0]) {
        string7 = string7 + thText[i] + ": " + rows[i][0] + "\n";
      }
      if (rows[i][1]) {
        string8 = string8 + thText[i] + ": " + rows[i][1] + "\n";
      }
      if (rows[i][2]) {
        string9 = string9 + thText[i] + ": " + rows[i][2] + "\n";
      }
    }

    const isbefore = calulateTime();

    if (isbefore) {
      mainheading =
        mainheading + date2.substring(0, 6) + "(" + name2 + ")" + "\n";
      mainheading = mainheading + string7 + "\n";
      mainheading = mainheading + string8 + "\n";
      mainheading = mainheading + string9 + "\n";
    } else {
      mainheading =
        mainheading + date.substring(0, 6) + "(" + name + ")" + "\n";
      mainheading = mainheading + string1 + "\n";
      mainheading = mainheading + string2 + "\n";
      mainheading = mainheading + string3 + "\n";
    }

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
    let name2 = "";
    let date2 = "";
    name = $(sitelink1[1]).find("a")[1];
    date = $(sitelink1[1]).find("a")[2];
    name2 = $(sitelink1[2]).find("a")[0];
    date2 = $(sitelink1[2]).find("a")[1];
    name = $(name).text().replace("XSMT", "");
    date = $(date).text().replace("XSMT", "");
    name2 = $(name2).text().replace("XSMT", "");
    date2 = $(date2).text().replace("XSMT", "");
    const namePrize = $(".section-content table thead tr th");
    let head1 = $(namePrize[1]).find("a");
    let head2 = $(namePrize[2]).find("a");
    let head3 = $(namePrize[3]).find("a");
    head1 = $(head1).text();
    head2 = $(head2).text();
    head3 = $(head3).text();

    let head7 = $(namePrize[7]).find("a");
    let head8 = $(namePrize[8]).find("a");
    let head9 = $(namePrize[9]).find("a");

    head7 = $(head7).text();
    head8 = $(head8).text();
    head9 = $(head9).text();

    const tableloto = $(".table-loto");
    $(tableloto).remove();

    const listItems = $(".section-content table thead tr");
    const xsmbs = [];
    console.log(listItems.length);

    const listItemsdata = $(".section-content table tbody tr");

    const rows = [];
    const thText = [];

    let index = 0;
    $(listItemsdata).each(function (i, e) {
      const row = [];
      rows.push(row);
      $(this)
        .find("th")
        .each(function (i, e) {
          thText.push($(this).text().trim());
        });
      $(this)
        .find("td")
        .each(function (i, e) {
          row.push($(this).text().trim());
        });
      index++;
      if (index == 18) {
        return false;
      }
    });

    console.log("rows ", rows);
    let string1 = head1 + "\n";
    let string2 = head2 + "\n";
    let string3 = head3 + "\n";

    let string7 = head7 + "\n";
    let string8 = head8 + "\n";
    let string9 = head9 + "\n";

    for (let i = 0; i < 9; i++) {
      if (rows[i][0]) {
        string1 = string1 + thText[i] + ": " + rows[i][0] + "\n";
      } else {
        string1 = "";
      }
      if (rows[i][1]) {
        string2 = string2 + thText[i] + ": " + rows[i][1] + "\n";
      } else {
        string2 = "";
      }
      if (rows[i][2]) {
        string3 = string3 + thText[i] + ": " + rows[i][2] + "\n";
      } else {
        string3 = "";
      }
    }

    for (let i = 9; i < 18; i++) {
      if (rows[i][0]) {
        string7 = string7 + thText[i] + ": " + rows[i][0] + "\n";
      }
      if (rows[i][1]) {
        string8 = string8 + thText[i] + ": " + rows[i][1] + "\n";
      }
      if (rows[i][2]) {
        string9 = string9 + thText[i] + ": " + rows[i][2] + "\n";
      }
    }
    const isbefore = calulateTime();

    console.log("date  ", date, "name", name, "date2", date2, "name2 ", date2);
    if (isbefore) {
      mainheading =
        mainheading + date2.substring(0, 6) + "(" + name2 + ")" + "\n";
      mainheading = mainheading + string7 + "\n";
      mainheading = mainheading + string8 + "\n";
      mainheading = mainheading + string9 + "\n";
    } else {
      mainheading =
        mainheading + date.substring(0, 6) + "(" + name + ")" + "\n";
      if (string1) mainheading = mainheading + string1 + "\n";

      if (string2) mainheading = mainheading + string2 + "\n";

      if (string3) mainheading = mainheading + string3 + "\n";
    }
    return mainheading.toString();
  } catch (err) {
    console.error(err);
  }
};

const calulateTime = () => {
  let totime = new Date();
  totime = totime.setHours(17);

  if (totime > Date.now()) {
    return true;
  } else {
    return false;
  }
};

module.exports = { scrapeData, scrapeData2, scrapeData3 };
