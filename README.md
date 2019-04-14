
*程序维护中*

## 演示

最终效果

![DEMO](demo.gif)

## 编译
执行 `webpack`

在/dist下可以看到bundle.js。

## 文件功能详细介绍

- DrewStyle.js 
    - 样式类，描述画板多各项参数。默认参数为空，可以调用InitUsingCanvas方法自动补齐参数。
- GraphDrawer.js
    - 画图父类，用于绘画基本图形，直接操作ctx。实例化以后，会自动实例化一个DrewStyle对象，并执行InitUsingCanvas函数进行初始化。
    - barrier
        - 该参数表示左边界的坐标位置。所有绘制的图形都是以该边界作为相对位置。
    - SetStyle()
        - 可以调用该方法覆盖当前使用样式
    - InitStyle()
        - 恢复当前样式为初始化样式
    - Draw*()
        - 绘画相关图形
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
- GraphLayerOption.js
    - 图形层选项父类，可以被继承。该实例类主要面向系统，由UpdateStatus()返回，系统获取到这个实例类以后，会调用GetOptionList()方法。GetOptionList方法会返回map，系统会处理这个map并作为“配置”显示出来。
    - 如果用户修改“配置”，并点击保存，会自动激活SetOptionList(map)方法，传入当前新到map数据。
    - 默认GetOptionList和SetOptionList方法已经被实现，只需要继承并对Option属性赋值即可，另外也可以根据需求重写这2该方法。
- Point.js
    - 坐标类，包含x和y属性。
    - 包含get/set方法。
- Render.js
    - 渲染父类。有2个作用，1.保存当前layer列表。2.根据各个layer的状态，执行layer中不同的渲染函数，比如读取到layer的状态是normal则调用NomalDraw()方法。
    - AddLayer(gl)
        - 添加一个层实例到渲染队列中，gl为layer实例对象
- Interactive.js
    - 交互父类。用于监听当前用户鼠标在ctx上的位置，并根据鼠标状态，设置layer实例的状态为：normal，active，focus。并自动调用layer内的UpdateStatus()方法。最后，再根据UpdateStatus返回值显示当前layer的属性。

## 状态表说明

状态信息，在 /core/CONST.js 文件内。
有以下几种状态：

```
NORMAL_STATUS ：普通状态
ACTIVE_STATUS ：激活状态（鼠标点击）
FOCUS_STATUS  ：焦点状态（鼠标悬停）
```

另外还有一些中间的状态

```
MOUSE_OVER ：鼠标悬停状态
MOUSE_DOWN ：鼠标压下状态
MOUSE_UP   ：鼠标释放状态
MOUSE_NONE ：无
```

## 状态转换信息

- 默认情况：NORMAL_STATUS

- 鼠标随意在画板上移动，移动时的状态
  - MOUSE_DOWN：
    - 鼠标未松开，表示移动画布，不做状态跟改
  - MOUSE_UP：
    - 鼠标释放，表示移动结束：NORMAL_STATUS
    - 注意，这里没break，可以继续向下执行
  - FOCUS_STATUS：
    - 当前是悬停状态，刷新状态为：NORMAL_STATUS
    - 注意，这里没break，可以继续向下执行
  - 默认（NORMAL_STATUS）：
    - 如果悬停在控件上，改变为：FOCUS_STATUS
    - 否则：NORMAL_STATUS

- 鼠标下压，下压时候的状态
  - NORMAL_STATUS：
    - 普通状态下，鼠标下压，表示要移动画布了，设置状态：MOUSE_DOWN
  - FOCUS_STATUS：
    - 悬停状态，表示当前鼠标在控件上方，改变为激活状态：ACTIVE_STATUS
  - ACTIVE_STATUS：
    - 控件激活状态，表示当前已经选中了某个控件，再次点击则表示取消选择。
    - 所以恢复状态为：NORMAL_STATUS
- 鼠标释放
  - 如果之前的状态是：ACTIVE_STATUS，则表示这个状态是刚刚鼠标下压的时候转换，不做任何处理
  - 否则，改变为 MOUSE_UP

