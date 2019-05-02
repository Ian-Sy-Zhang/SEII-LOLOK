#### 4.1.1 moviebl模块

(1) 模块概述
moviebl模块承担的需求参见需求规格说明文档功能需求以及相关非功能需求。
moviebl模块的职责以及接口参见软件系统结构描述文档表10

(2) 整体结构
根据体系结构设计，我们将系统分为展示层、业务逻辑层、数据层。每一层之间为了增加灵活性，添加了一些接口。在展示层和业务逻辑层之间，根据SpringBoot的机制，通过URL的访问的方式实现和业务逻辑模块交互。而在业务逻辑层于数据持久层之间，则通过主要通过MovieMapper和MovieLikeMapper两个接口进行交流。为了隔离业务逻辑职责和逻辑控制职责，我们增加了MovieController，这样MovieController会将对电影相关业务的处理委托给sales对象。根据功能的不同，为了提高内聚性，分了两个接口/实现类来实现MovieController所具备的功能：MovieService和MovieLikeService。为了实现其中的个别相关功能，额外分别调用了两个接口来实现相关功能：ScheduleServiceForBl接口和MovieServiceForBl接口，分别用于：查找影片的相关信息和根据ID查找电影。

moviebl模块的设计如图所示：

![moviebl](https://i.loli.net/2019/05/02/5ccaafcd147fa.jpg)

moviebl模块各个类的职责如下表所示：  

| 模块             | 职责                          |
| ---------------- | ----------------------------- |
| MovieController  | 实现movie相关的功能的控制逻辑 |
| MovieServiceImpl | 实现movie相关功能的业务逻辑   |
| MovieLikeService | 实现movie与统计相关的业务逻辑 |

(3) 模块内部类的接口规范

![](https://i.loli.net/2019/05/02/5ccad6560d210.png)

![](https://i.loli.net/2019/05/02/5ccad65b7d07e.png)

![](https://i.loli.net/2019/05/02/5ccad6617ae8e.png)

![](https://i.loli.net/2019/05/02/5ccad665210cd.png)

![](https://i.loli.net/2019/05/02/5ccad6681b40f.png)

![](https://i.loli.net/2019/05/02/5ccad66bcd180.png)

![](https://i.loli.net/2019/05/02/5ccad66fe3eee.png)

![](https://i.loli.net/2019/05/02/5ccad6744e52a.png)

![](https://i.loli.net/2019/05/02/5ccad6774ee4c.png)



(4) 业务逻辑层的动态模型

...

(5) 业务逻辑层的设计原理
利用委托式控制风格，每一个界面需要访问的业务逻辑由各自的控制器委托给不同的对象