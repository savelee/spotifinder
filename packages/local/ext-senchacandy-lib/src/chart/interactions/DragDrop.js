/*Ext.define('Ext.chart.interactions.DragDrop', {
    extend: 'Ext.chart.interactions.ItemHighlight',

    type: 'dragdrop',
    alias: 'interaction.dragdrop',

    config: {
        style: {

        },
        gestures: {
            dragstart: 'onDragStart',
            drag: 'onDrag',
            dragend: 'onDragEnd'
        }
    },

    onDragStart: function (e) {
    },

    onDrag: function (e) {
        var me = this,
            chart = me.getChart(),
            isRtl = chart.getInherited().rtl,
            flipXY = chart.isCartesian && chart.getFlipXY(),
            item = chart.getHighlightItem(),
            marker, instance, surface, surfaceRect,
            matrix, xy, positionX, positionY,
            style;

        if (item) {
            switch (item.sprite.type) {
                case 'barSeries':
                    marker = item.sprite.getBoundMarker('items')[0];
                    instance = marker.get(item.index);
                    surface = item.sprite.getSurface();
                    surfaceRect = surface.getRect();
                    xy = surface.getEventXY(e);
                    if (flipXY) {
                        positionY = isRtl ? surfaceRect[2] - xy[0] : xy[0];
                    } else {
                        positionY = surfaceRect[3] - xy[1];
                    }
                    style = {
                        x: instance.x,
                        y: positionY,
                        width: instance.width,
                        height: instance.height + (instance.y - positionY),
                        radius: instance.radius,
                        fillStyle: 'none',
                        lineDash: [4, 4],
                        zIndex: 100
                    };
                    Ext.apply(style, me.getStyle());
                    item.sprite.putMarker('items', style, 'dragdrop');
                    matrix = item.sprite.attr.matrix;
                    if (Ext.isArray(item.series.getYField())) { // stacked bars
                        positionY = positionY - instance.y - instance.height;
                    }
                    me.target = {
                        index: item.index,
                        yField: item.field,
                        yValue: (positionY - matrix.getDY()) / matrix.getYY()
                    };
                    surface.renderFrame();
                    break;
                case 'scatterSeries':
                    marker = item.sprite.getBoundMarker('items')[0];
                    instance = marker.get(item.index);
                    surface = item.sprite.getSurface();
                    surfaceRect = surface.getRect();
                    xy = surface.getEventXY(e);
                    if (flipXY) {
                        positionY = isRtl ? surfaceRect[2] - xy[0] : xy[0];
                    } else {
                        positionY = surfaceRect[3] - xy[1];
                    }
                    if (flipXY) {
                        positionX = surfaceRect[3] - xy[1];
                    } else {
                        positionX = xy[0];
                    }
                    style = {
                        translationX: positionX,
                        translationY: positionY,
                        scalingX: instance.scalingX,
                        scalingY: instance.scalingY,
                        r: instance.r,
                        fillStyle: 'none',
                        lineDash: [4, 4],
                        zIndex: 100
                    };
                    Ext.apply(style, me.getStyle());
                    item.sprite.putMarker('items', style, 'dragdrop');
                    matrix = item.sprite.attr.matrix;
                    me.target = {
                        index: item.index,
                        xField: item.series.getXField(),
                        xValue: (positionX - matrix.getDX()) / matrix.getXX(),
                        yField: item.field,
                        yValue: (positionY - matrix.getDY()) / matrix.getYY()
                    };
                    surface.renderFrame();
                    break;
            }
        }
    },

    onDragEnd: function (e) {
        var me = this,
            target = me.target,
            chart = me.getChart(),
            store = chart.getStore(),
            record;

        if (target) {
            record = store.getAt(target.index);
            if (target.yField) {
                record.set(target.yField, target.yValue, {
                    convert: false
                });
            }
            if (target.xField) {
                record.set(target.xField, target.xValue, {
                    convert: false
                });
            }
            me.getChart().onDataChanged();
            me.target = null;
        }
    }
});*/