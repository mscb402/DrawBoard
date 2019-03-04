## 文件详细

- DrewStyle.js 
    - 样式类，描述画板多各项参数。默认参数为空，可以调用InitUsingCanvas方法自动补齐参数。
- GraphDrawer.js
    - 画图父类，用于绘画基本图形，直接操作ctx。实例化以后，会自动实例化一个DrewStyle对象，并执行InitUsingCanvas函数。
- GraphLayer.js
    - 图形层接口，可以被实现（继承），该接口是一个自定义图形的抽象。 一个layer极为一个自定义图形。
    - 该GraphLayer接口需要实现方实现，所有的内部方法。
    - currentStatus
        - 该参数保存当前layer的状态，分别为：Normal,Active,Focus
        - Normal 为普通状态，只是被绘制出来。
        - Active 为激活状态，当前layer被用户点击。
        - Focus 为焦点状态，当前layer被用户鼠标划过。
    - UpdateStatus() 
        - currentStatus状态一旦被更新，该方法会被自动调用。
        - 可以根据当前的状态，自定义对激活的事件进行额外处理。
        - 该方法需要返回一个返回值，如果返回null则表示当前状态处理完毕。如果返回一个GraphLayerOption的实例化对象，系统会根据GraphLayerOption内容进行一些展示和处理。
    - IsPointAtLayer(p)
        - 该方法用于layer自定义框定激活/焦点范围。
        - p为输入值，包含当前鼠标坐标，由Interactive实例类自动调用。
        - 需要有返回值，返回boolean值，默认返回false，表示鼠标未在该layer范围内。返回true则表示该layer被激活，会被Interactive实例进行状态改变操作。
    - NomalDraw()
        - 该方法是绘制正常状态下的layer，返回boolean，成功返回true
    - ActiveDraw()
        - 该方法是绘制激活状态下的layer，返回boolean，成功返回true
    - FocusDraw()
        - 该方法是绘制焦点状态下的layer，返回boolean，成功返回true