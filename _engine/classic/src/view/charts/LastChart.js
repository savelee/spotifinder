Ext.define("Engine.view.charts.LastChart",{
    extend: "Ext.panel.Panel",
    xtype: 'lastcharts',

    /*requires: [
        'Ext.d3.svg.Svg'
    ],

    layout: 'fit',
    scrollable: true,
    items: [{
        xtype: 'd3',
        cls: 'chart',
        listeners: {
            scenesetup: function (component, scene) {

                console.log(component, scene);

                var store = Ext.getStore('Artists');
                var max = store.getCount();
                var i = 0, data = [], artists = [];

                //we need two arrays, one with artist names, and one with playcounts
                for(i; i<max; i++){
                    artists.push(store.getAt(i).get('name'));
                    data.push(store.getAt(i).get('playcount'));
                }

                //set the scales
                var x = d3.scale.linear()
                    .domain([0, d3.max(data)])
                    .range([0, component.getHeight()]);

                //set the component size to the max size of the SVG
                //to enable scrolling
                component.setHeight((i * 30)+10);

                //set the scene
                scene.append('g')
                    .attr('transform', 'translate(10,10)') //start position
                    .selectAll("rect") //we will create reactangles
                    .data(data) //based on this data
                    .enter() //enter the scene to start drawing
                    .append("rect") //rectangles on this position:
                    .attr({'x':0,'y':function(data,i){ return i * 30 }})
                    .attr('height',25) //with a set height
                    .attr('width',function(data){ return data; }) //and a dynamic width
                    .style('fill', '#639000'); //in this color

               //a rectangle can't contain text
               //we will create a new layer
               scene.append('g')
                .attr('transform', 'translate(10,10)') //start position
                .selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .attr({'x':function(data, i) {
                  return 10 //position text on x
                },'y':function(data,i){
                  return (i*30) + 18 } //position the same as the bars, but text vertical aligned
                })
                .text(function(data, i){
                    //contains the artist and the count
                    return artists[i] + ": " + data;
                }).style({'fill':'#ffffff','font-size':'14px'});

            }
        }
    }]*/
});
