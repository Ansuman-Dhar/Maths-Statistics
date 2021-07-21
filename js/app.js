let dataSetDOMEle = document.getElementById('dataSET');
let histogramCanvas = document.getElementById('chart').getContext('2d')
let histogramCanvasInstance = drawHistoGram(histogramCanvas, [1, 1.5, 2], ["Init One", "Init One.Five", "Init Two"]);

dataSetDOMEle.addEventListener('keyup', () => main())

function main() {
    let rawdata, arrangedData;

    rawdata = processingRawData(dataSetDOMEle);
    arrangedData = insertionSort(rawdata);

    document.getElementById('mean').innerText = `Mean: ${meanOf(arrangedData)}`;
    document.getElementById('median').innerText = `Median: ${medianOf(arrangedData)}`;
    document.getElementById('mode').innerText = `Mode: ${modeOf(arrangedData)}`;
    histogramCanvasInstance.destroy();
    histogramCanvasInstance = drawHistoGram(histogramCanvas, arrangedData);
}

function processingRawData(ele) {
    let values = ele.value.toString().replace(/ /g, '').split(',');
    let result = [];
    values.forEach((value) => {
        if (value != '' && !isNaN(parseFloat(value)))
            result.push(parseFloat(value));
    });
    return result;
}

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i-1;
        while ((j > -1) && (current < arr[j])) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = current;
    }
    return arr;
}

function drawHistoGram(canvas, set, labels) {
    labels = labels ?? set;
    if (!set || set == [] || set.length != labels.length) {
        alert("Chart can't be drawn");
        return false;
    }

    return new Chart(canvas, {
        data: {
            labels,
            datasets: [{
                type: 'bar',
                label: 'HISTOGRAM',
                data: set,
                backgroundColor: [
                    'rgba(0, 0, 0, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function meanOf(set) {
    let sum = set.reduce((accum, val) => {
        return accum + val;
    }, 0);
    return (sum/set.length)
}

function medianOf(set) {
    return (set.length % 2 == 0) ? meanOf([set[((set.length)/2)-1] ,set[((set.length)/2)]]) : set[((set.length+1)/2)-1] ;
}

function modeOf(set) {
    if(set.length == 0)
        return NaN;
    var modeMap = {};
    var maxEl = "No Mode", maxCount = 1;
    for(var i = 0; i < set.length; i++)
    {
        var el = set[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

function drawOjive(set) {
    
}