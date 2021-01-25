const fs = require("fs");

var phases_src = require("./phases_src.json");
var phases = [];

function fixDate(dateString) {
    var date = new Date(dateString);
    date = date.getTime() + 11 * 1000 * 60 * 60;
    return new Date(date);
}

function genItem(diff, phase) {
    var item = {};
    item.phase = phase;
    item.date = fixDate(diff).toUTCString();

    return item;
}

phases_src.forEach(function(p, i) {
    if (i == 0) {
        var item = {};
        item.phase = p.phase;
        item.date = fixDate(p.date + " " + p.time).toUTCString();
        phases.push(item);
    }
    else {
        var datePhasePrev = new Date(phases_src[i-1].date + " " + phases_src[i-1].time);
        var datePhaseNext = new Date(p.date + " " + p.time);
        var step = (datePhaseNext.getTime() - datePhasePrev.getTime()) / 4;

        phases.push(genItem(datePhasePrev.getTime() + step,     "Last Quarter"));   
        phases.push(genItem(datePhasePrev.getTime() + step * 2, "New Moon"));
        phases.push(genItem(datePhasePrev.getTime() + step * 3, "First Quarter"));

        var item = {};
        item.phase = p.phase;
        item.date = fixDate(p.date + " " + p.time).toUTCString();
        phases.push(item);
    }
});

fs.writeFileSync("./phases.json", JSON.stringify(phases), "utf-8");