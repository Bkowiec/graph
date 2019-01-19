var Graph = (function () {

    var G = null;

    function addNode(node) {
        G.addNode(node, {
            color: '#0064C7'
        });
        update();
    }

    function removeNode(node) {
        G.removeNode(node);
        update();
    }

    function addCycle(arry) {
        var tab = arry.split(',')
        G.addCycle(tab);
        update();
    }

    function addEdge(from, to) {
        G.addEdge(from,to);
        update();
    }

    function removeEdge(from, to) {
        G.removeEdge(from,to);
        update();
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

    function update() {
        jsnx.draw(G, {} [true]);
    }

    function init() {
        G = new jsnx.DiGraph();
        drawGraph();
    }

    return {
        init: init,
        addNode: addNode,
        removeNode: removeNode,
        addCycle: addCycle,
        addEdge: addEdge,
        removeEdge:removeEdge
    }
})()
setTimeout(() => {
    Graph.init();



    document.querySelector('.addNode').addEventListener('click', function () {
        Graph.addNode(document.querySelector('.addNodeInput').value);
        document.querySelector('.addNodeInput').value = '';
        document.querySelector('.addNodeInput').focus() 
    })

    document.querySelector('.removeNode').addEventListener('click', function () {
        Graph.removeNode(document.querySelector('.removeNodeInput').value);
        document.querySelector('.removeNodeInput').value = '';
    })

    document.querySelector('.addEdge').addEventListener('click', function () {
        Graph.addEdge(document.querySelector('.addEdgeInputFrom').value,document.querySelector('.addEdgeInputTo').value);
        document.querySelector('.addEdgeInputFrom').value = '';
        document.querySelector('.addEdgeInputTo').value = '';
    })

    document.querySelector('.removeEdge').addEventListener('click', function () {
        Graph.removeEdge(document.querySelector('.removeEdgeInputFrom').value,document.querySelector('.removeEdgeInputTo').value);
        document.querySelector('.removeEdgeInputFrom').value = '';
        document.querySelector('.removeEdgeInputTo').value = '';
    })

    document.querySelector('.addCycle').addEventListener('click', function () {
        Graph.addCycle(document.querySelector('.addCycleInput').value);
        document.querySelector('.addCycleInput').value = '';
    })



}, 500);