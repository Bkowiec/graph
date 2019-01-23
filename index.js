var Graph = (function () {

    var G = null;

    function addEdge(from, to) {
        G.addEdge(from, to);
        update();
    }

    function addOneNode(data) {
        console.log(JSON.parse(data))
        var one = JSON.parse(data)
        G.addNodesFrom(one);
    }

    function update() {
        jsnx.draw(G, {} [true]);
    }

    function addNode(from, to) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/graph/addNode/" + from + "/" + to + "",
            success: function (result) {
                init()
                console.log(result)
                var arry = result.match(/\[(\(\d{1,},\d\{1,}),\s)*\(\d{1,},\d{1,}\)\]/)[0];
                var arrys = arry.match(/\(\d{1,},\d{1,}\)/g)
                arrys.forEach(function (par) {
                    addEdge(Number(par.match(/\d{1,}/g)[0]), Number(par.match(/\d{1,}/g)[1]))
                })
            },
            error: function (e) {
                alert('Something went wrong!')
            }
        });
    }

    function replaceSubs(from, to) {
        console.log(from, to)
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/graph/replaceSubs/" + from + "/" + to + "",
            success: function (result) {
                init()
                console.log(result)
                var arry = result.match(/\[(\(\d{1,},\d{1,}\),\s)*\(\d{1,},\d{1,}\)\]/)[0];
                var arrys = arry.match(/\(\d{1,},\d{1,}\)/g)
                arrys.forEach(function (par) {
                    addEdge(Number(par.match(/\d{1,}/g)[0]), Number(par.match(/\d{1,}/g)[1]))
                })
            },
            error: function (e) {
                alert('Something went wrong!')
            }
        });
    }

    function removeEdge(from, to) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/graph/removeEdge/" + from + "/" + to + "",
            success: function (result) {
                init()
                console.log(result)
                var arry = result.match(/\[(\(\d{1,},\d{1,}\),\s)*\(\d{1,},\d{1,}\)\]/)[0];
                var arrys = arry.match(/\(\d{1,},\d{1,}\)/g)
                arrys.forEach(function (par) {
                    addEdge(Number(par.match(/\d{1,}/g)[0]), Number(par.match(/\d{1,}/g)[1]))
                })
            },
            error: function (e) {
                alert('Something went wrong!')
            }
        });
    }

    function addEdge2(from, to) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/graph/addEdge/" + from + "/" + to + "",
            success: function (result) {
                init()
                console.log(result)
                var arry = result.match(/\[(\(\d{1,},\d{1,}\),\s)*\(\d{1,},\d{1,}\)\]/)[0];
                var arrys = arry.match(/\(\d{1,},\d{1,}\)/g)
                arrys.forEach(function (par) {
                    addEdge(Number(par.match(/\d{1,}/g)[0]), Number(par.match(/\d{1,}/g)[1]))
                })
            },
            error: function (e) {
                alert('Something went wrong!')
            }
        });
    }

    function removeNode(node) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/graph/removeNode/" + node + "",
            success: function (result) {
                init()
                console.log(result)
                var arry = result.match(/\[(\(\d{1,},\d{1,}\),\s)*\(\d{1,},\d{1,}\)\]/)[0];
                var arrys = arry.match(/\(\d{1,},\d{1,}\)/g)
                arrys.forEach(function (par) {
                    addEdge(Number(par.match(/\d{1,}/g)[0]), Number(par.match(/\d{1,}/g)[1]))
                })
            },
            error: function (e) {
                alert('Something went wrong!')
            }
        });
    }

    function drawGraph() {
        jsnx.draw(G, {
            element: '#canvas',
            withLabels: true,
            nodeStyle: {
                fill: function (d) {
                    return d.data.color;
                }
            },
            labelStyle: {
                fill: 'white'
            },
            stickyDrag: true
        });
    }

    function init() {
        G = new jsnx.DiGraph();
        drawGraph();
    }

    function buildFromTextarea(txt) {
        init()
        var obj = {
            file: txt
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/graph/",
            data: JSON.stringify(obj),
            dataType: 'json',
            success: function (result) {
                alert('Bad file format !')
            },
            error: function (e) {
                if (e.responseText) {

                    console.log(e.responseText);
                    addOneNode(e.responseText.match(/\[(\d{1,},\s)*\d{1,}\]/)[0]);

                    console.log(e.responseText)
                    var arry = e.responseText.match(/\[(\(\d{1,},\d{1,}\),\s)*\(\d{1,},\d{1,}\)\]/)[0];
                    console.log(arry)
                    var arrys = arry.match(/\(\d{1,},\d{1,}\)/g)
                    console.log(arrys)
                    arrys.forEach(function (par) {
                        console.log(par)
                        addEdge(Number(par.match(/\d{1,}/g)[0]), Number(par.match(/\d{1,}/g)[1]))
                    })
                } else {
                    alert('Bad file format !')
                }
            }
        });
    }

    return {
        init: init,
        addNode: addNode,
        removeNode: removeNode,
        removeEdge: removeEdge,
        addEdge2: addEdge2,
        replaceSubs: replaceSubs,
        buildFromTextarea: buildFromTextarea
    }
})()
setTimeout(() => {
    Graph.init();
    document.querySelector('#drawGraph').value = `10
0 2 1 3
1 1 2
2 1 8
3 4 4 5 6 7
4 1 9
5 0
6 0 
7 0 
8 0 
9 0 `
    document.querySelector('#drawButton').addEventListener('click', function () {
        Graph.buildFromTextarea(document.querySelector('#drawGraph').value);
    })

    document.querySelector('.addEdge').addEventListener('click', function () {
        Graph.addNode(document.querySelector('.addNodeInputFrom').value, document.querySelector('.addNodeInputTo').value);
        document.querySelector('.addNodeInputFrom').value = '';
        document.querySelector('.addNodeInputTo').value = '';
    })

    document.querySelector('.addEdge2').addEventListener('click', function () {
        Graph.addEdge2(document.querySelector('.addEdgeInputFrom').value, document.querySelector('.addEdgeInputTo').value);
        document.querySelector('.addEdgeInputFrom').value = '';
        document.querySelector('.addEdgeInputTo').value = '';
    })

    document.querySelector('.removeEdge').addEventListener('click', function () {
        Graph.removeEdge(document.querySelector('.removeEdgeInputFrom').value, document.querySelector('.removeEdgeInputTo').value);
        document.querySelector('.removeEdgeInputFrom').value = '';
        document.querySelector('.removeEdgeInputTo').value = '';
    })

    document.querySelector('.removeNode').addEventListener('click', function () {
        Graph.removeNode(document.querySelector('.removeNodeInput').value);
        document.querySelector('.removeNodeInput').value = '';
    })

    document.querySelector('.replaceSubs').addEventListener('click', function () {
        Graph.replaceSubs(document.querySelector('.replaceSubsInputFrom').value, document.querySelector('.replaceSubsInputTo').value);
        document.querySelector('.replaceSubsInputFrom').value = '';
        document.querySelector('.replaceSubsInputTo').value = '';
    })





}, 500);