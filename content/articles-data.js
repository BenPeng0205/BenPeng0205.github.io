// MQTT 文章目录由 scripts/import_article_package.py 从 Obsidian 发布稿批量生成。
window.CONTROLROOKIE_ARTICLES = [
  {
    "id": "mqtt-client-open-source-codesys-layer",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第1篇_官方 MQTT 库要花钱？我为什么自己开源了一套 CODESYS MQTT 客户端",
      "en": "第1篇_官方 MQTT 库要花钱？我为什么自己开源了一套 CODESYS MQTT 客户端"
    },
    "copy": {
      "zh": "这一篇先不讲报文细节，只解决 3 个基础问题：为什么要做这套开源客户端、MQTT 到底处于哪一层、以及当前项目为什么是 NBS 上的 TCP 再往上跑 MQTT。适合刚准备从 PLC 进入 MQTT 的自动化工程师先。",
      "en": "这一篇先不讲报文细节，只解决 3 个基础问题：为什么要做这套开源客户端、MQTT 到底处于哪一层、以及当前项目为什么是 NBS 上的 TCP 再往上跑 MQTT。适合刚准备从 PLC 进入 MQTT 的自动化工程师先。"
    },
    "href": "articles/mqtt-client-open-source-codesys-layer/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第1篇/共16篇",
      "en": "Part 1 / 16"
    },
    "status": {
      "zh": "官网全文 / 第1篇",
      "en": "This Site / Part 1"
    },
    "cardMeta": {
      "zh": "01 · 客户端",
      "en": "01 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 17 分钟阅读",
      "en": "17 min read"
    },
    "tags": [
      "MQTT",
      "CODESYS",
      "PLC",
      "开源",
      "CSDN",
      "系列教程",
      "ControlRookie"
    ],
    "keywords": "MQTT CODESYS 客户端 主线 第1篇_官方 MQTT 库要花钱？我为什么自己开源了一套 CODESYS MQTT 客户端 MQTT CODESYS PLC 开源 CSDN 系列教程 ControlRookie",
    "order": 1,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\第1篇_官方MQTT库要花钱_那我就自己开源一套CODESYS MQTT客户端_以及MQTT到底跑在哪一层.md"
  },
  {
    "id": "mqtt-client-part-02-2-connect-connack-st-d994be",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第2篇_CONNECT 和 CONNACK 怎么读？我带你把十六进制和 ST 代码对上",
      "en": "第2篇_CONNECT 和 CONNACK 怎么读？我带你把十六进制和 ST 代码对上"
    },
    "copy": {
      "zh": "这一篇正式进入 MQTT 握手核心，重点讲清 CONNECT 和 CONNACK 的报文结构、十六进制拆解、状态机推进关系，以及它们在 MqttClient_V1_0 里的真实 ST 落点。",
      "en": "这一篇正式进入 MQTT 握手核心，重点讲清 CONNECT 和 CONNACK 的报文结构、十六进制拆解、状态机推进关系，以及它们在 MqttClient_V1_0 里的真实 ST 落点。"
    },
    "href": "articles/mqtt-client-part-02-2-connect-connack-st-d994be/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第2篇/共16篇",
      "en": "Part 2 / 16"
    },
    "status": {
      "zh": "官网全文 / 第2篇",
      "en": "This Site / Part 2"
    },
    "cardMeta": {
      "zh": "02 · 客户端",
      "en": "02 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 39 分钟阅读",
      "en": "39 min read"
    },
    "tags": [
      "MQTT",
      "CODESYS",
      "PLC",
      "CONNECT",
      "CONNACK",
      "ST",
      "CSDN",
      "ControlRookie"
    ],
    "keywords": "MQTT CODESYS 客户端 主线 第2篇_CONNECT 和 CONNACK 怎么读？我带你把十六进制和 ST 代码对上 MQTT CODESYS PLC CONNECT CONNACK ST CSDN ControlRookie",
    "order": 2,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\第2篇_CONNECT和CONNACK怎么读_我带你把十六进制和ST代码对上.md"
  },
  {
    "id": "mqtt-client-part-03-3-publish-qos0-qos1-qos2-120122",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第3篇_PUBLISH 报文怎么写？QoS0、QoS1、QoS2 到底差在哪",
      "en": "第3篇_PUBLISH 报文怎么写？QoS0、QoS1、QoS2 到底差在哪"
    },
    "copy": {
      "zh": "这一篇把 MQTT 最核心的 PUBLISH 报文拆开讲，重点不是概念，而是首字节怎么编码、Topic 和 Packet ID 怎么排、QoS0 / QoS1 / QoS2 在协议和代码层到底差在哪。",
      "en": "这一篇把 MQTT 最核心的 PUBLISH 报文拆开讲，重点不是概念，而是首字节怎么编码、Topic 和 Packet ID 怎么排、QoS0 / QoS1 / QoS2 在协议和代码层到底差在哪。"
    },
    "href": "articles/mqtt-client-part-03-3-publish-qos0-qos1-qos2-120122/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第3篇/共16篇",
      "en": "Part 3 / 16"
    },
    "status": {
      "zh": "官网全文 / 第3篇",
      "en": "This Site / Part 3"
    },
    "cardMeta": {
      "zh": "03 · 客户端",
      "en": "03 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 26 分钟阅读",
      "en": "26 min read"
    },
    "tags": [
      "MQTT",
      "PUBLISH",
      "QoS",
      "ST",
      "PLC",
      "CSDN",
      "CODESYS",
      "ControlRookie"
    ],
    "keywords": "MQTT CODESYS 客户端 主线 第3篇_PUBLISH 报文怎么写？QoS0、QoS1、QoS2 到底差在哪 MQTT PUBLISH QoS ST PLC CSDN CODESYS ControlRookie",
    "order": 3,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\第3篇_PUBLISH报文怎么写_QoS0_QoS1_QoS2到底差在哪.md"
  },
  {
    "id": "mqtt-client-part-04-4-qos1-qos2-ack-9527b7",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第4篇_为什么 QoS1 / QoS2 最容易掉线超时？把 ACK、重发和状态机讲透",
      "en": "第4篇_为什么 QoS1 / QoS2 最容易掉线超时？把 ACK、重发和状态机讲透"
    },
    "copy": {
      "zh": "这一篇专门讲高可靠链路为什么最容易出问题，核心内容包括 ACK 链、inflight、超时重发、DUP 位以及高频场景下为什么状态机会最先暴露短板。",
      "en": "这一篇专门讲高可靠链路为什么最容易出问题，核心内容包括 ACK 链、inflight、超时重发、DUP 位以及高频场景下为什么状态机会最先暴露短板。"
    },
    "href": "articles/mqtt-client-part-04-4-qos1-qos2-ack-9527b7/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第4篇/共16篇",
      "en": "Part 4 / 16"
    },
    "status": {
      "zh": "官网全文 / 第4篇",
      "en": "This Site / Part 4"
    },
    "cardMeta": {
      "zh": "04 · 客户端",
      "en": "04 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 42 分钟阅读",
      "en": "42 min read"
    },
    "tags": [
      "MQTT",
      "QoS1",
      "QoS2",
      "ACK",
      "状态机",
      "ST",
      "CSDN",
      "CODESYS"
    ],
    "keywords": "MQTT CODESYS 客户端 主线 第4篇_为什么 QoS1 / QoS2 最容易掉线超时？把 ACK、重发和状态机讲透 MQTT QoS1 QoS2 ACK 状态机 ST CSDN CODESYS",
    "order": 4,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\第4篇_为什么QoS1和QoS2最容易掉线超时_把ACK重发和状态机讲透.md"
  },
  {
    "id": "mqtt-client-part-05-5-subscribe-unsubscribe-869229",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第5篇_SUBSCRIBE / UNSUBSCRIBE 怎么实现？主题过滤器到底该怎么校验",
      "en": "第5篇_SUBSCRIBE / UNSUBSCRIBE 怎么实现？主题过滤器到底该怎么校验"
    },
    "copy": {
      "zh": "这一篇把订阅和退订链完整拆开，重点讲 Topic Filter 和发布 Topic 的区别、 + $ 的校验规则、MQTT 5.0 能力边界，以及为什么退订也不是发个字符串这么简单。",
      "en": "这一篇把订阅和退订链完整拆开，重点讲 Topic Filter 和发布 Topic 的区别、 + $ 的校验规则、MQTT 5.0 能力边界，以及为什么退订也不是发个字符串这么简单。"
    },
    "href": "articles/mqtt-client-part-05-5-subscribe-unsubscribe-869229/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第5篇/共16篇",
      "en": "Part 5 / 16"
    },
    "status": {
      "zh": "官网全文 / 第5篇",
      "en": "This Site / Part 5"
    },
    "cardMeta": {
      "zh": "05 · 客户端",
      "en": "05 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 29 分钟阅读",
      "en": "29 min read"
    },
    "tags": [
      "MQTT",
      "SUBSCRIBE",
      "UNSUBSCRIBE",
      "Topic Filter",
      "ST",
      "PLC",
      "CSDN",
      "CODESYS"
    ],
    "keywords": "MQTT CODESYS 客户端 主线 第5篇_SUBSCRIBE / UNSUBSCRIBE 怎么实现？主题过滤器到底该怎么校验 MQTT SUBSCRIBE UNSUBSCRIBE Topic Filter ST PLC CSDN CODESYS",
    "order": 5,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\第5篇_SUBSCRIBE和UNSUBSCRIBE怎么实现_主题过滤器到底该怎么校验.md"
  },
  {
    "id": "mqtt-client-part-06-6-plc-mqtt-b91df7",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第6篇_PLC 里写 MQTT，最难的不是报文，而是状态机",
      "en": "第6篇_PLC 里写 MQTT，最难的不是报文，而是状态机"
    },
    "copy": {
      "zh": "这一篇站在架构层看 FB_MqttClient，重点讲主状态机为什么才是系统骨架、iConnected 为什么是调度中心、接收链和发送链为什么必须拆开，以及异常为什么统一收口到 iTcpDisconnect。",
      "en": "这一篇站在架构层看 FB_MqttClient，重点讲主状态机为什么才是系统骨架、iConnected 为什么是调度中心、接收链和发送链为什么必须拆开，以及异常为什么统一收口到 iTcpDisconnect。"
    },
    "href": "articles/mqtt-client-part-06-6-plc-mqtt-b91df7/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第6篇/共16篇",
      "en": "Part 6 / 16"
    },
    "status": {
      "zh": "官网全文 / 第6篇",
      "en": "This Site / Part 6"
    },
    "cardMeta": {
      "zh": "06 · 客户端",
      "en": "06 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 49 分钟阅读",
      "en": "49 min read"
    },
    "tags": [
      "MQTT",
      "状态机",
      "PLC",
      "CODESYS",
      "ST",
      "CSDN",
      "ControlRookie"
    ],
    "keywords": "MQTT CODESYS 客户端 主线 第6篇_PLC 里写 MQTT，最难的不是报文，而是状态机 MQTT 状态机 PLC CODESYS ST CSDN ControlRookie",
    "order": 6,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\第6篇_PLC里写MQTT最难的不是报文_而是状态机.md"
  },
  {
    "id": "mqtt-client-part-07-7-mqtt-77aa5d",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第7篇_MQTT 现场排障：为什么会超时、掉线、重连、订阅丢失",
      "en": "第7篇_MQTT 现场排障：为什么会超时、掉线、重连、订阅丢失"
    },
    "copy": {
      "zh": "这一篇完全从工程排障视角切入，把最常见的 MQTT 现场故障按连接层、ACK 链、状态机和会话恢复几条主线拆开，帮助你快速定位到底是网络、Broker 还是客户端时序出了问题。",
      "en": "这一篇完全从工程排障视角切入，把最常见的 MQTT 现场故障按连接层、ACK 链、状态机和会话恢复几条主线拆开，帮助你快速定位到底是网络、Broker 还是客户端时序出了问题。"
    },
    "href": "articles/mqtt-client-part-07-7-mqtt-77aa5d/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第7篇/共16篇",
      "en": "Part 7 / 16"
    },
    "status": {
      "zh": "官网全文 / 第7篇",
      "en": "This Site / Part 7"
    },
    "cardMeta": {
      "zh": "07 · 客户端",
      "en": "07 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 16 分钟阅读",
      "en": "16 min read"
    },
    "tags": [
      "MQTT",
      "排障",
      "PLC",
      "CODESYS",
      "超时",
      "CSDN",
      "ControlRookie"
    ],
    "keywords": "MQTT CODESYS 客户端 主线 第7篇_MQTT 现场排障：为什么会超时、掉线、重连、订阅丢失 MQTT 排障 PLC CODESYS 超时 CSDN ControlRookie",
    "order": 7,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\第7篇_MQTT现场排障_为什么会超时掉线重连订阅丢失.md"
  },
  {
    "id": "mqtt-client-part-08-8-mqtt-d475ac",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第8篇_怎么把这套开源 MQTT 客户端真正用起来",
      "en": "第8篇_怎么把这套开源 MQTT 客户端真正用起来"
    },
    "copy": {
      "zh": "这一篇不再偏协议，而是直接回到工程落地，重点讲接入顺序、关键参数、Broker 选择、推荐测试组合、联调观察点，以及什么标准下才算这套客户端真的能用。",
      "en": "这一篇不再偏协议，而是直接回到工程落地，重点讲接入顺序、关键参数、Broker 选择、推荐测试组合、联调观察点，以及什么标准下才算这套客户端真的能用。"
    },
    "href": "articles/mqtt-client-part-08-8-mqtt-d475ac/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第8篇/共16篇",
      "en": "Part 8 / 16"
    },
    "status": {
      "zh": "官网全文 / 第8篇",
      "en": "This Site / Part 8"
    },
    "cardMeta": {
      "zh": "08 · 客户端",
      "en": "08 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 15 分钟阅读",
      "en": "15 min read"
    },
    "tags": [
      "MQTT",
      "CODESYS",
      "PLC",
      "EMQX",
      "Mosquitto",
      "实战",
      "CSDN",
      "ControlRookie"
    ],
    "keywords": "MQTT CODESYS 客户端 主线 第8篇_怎么把这套开源 MQTT 客户端真正用起来 MQTT CODESYS PLC EMQX Mosquitto 实战 CSDN ControlRookie",
    "order": 8,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\第8篇_怎么把这套开源MQTT客户端真正用起来.md"
  },
  {
    "id": "mqtt-client-extra-01-1-mqtt5-0-f8b677",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "加更1_MQTT 5.0 到底值不值得上？工业现场别急着无脑升级",
      "en": "加更1_MQTT 5.0 到底值不值得上？工业现场别急着无脑升级"
    },
    "copy": {
      "zh": "这一篇专门回答一个非常现实的问题：MQTT 5.0 到底是不是该直接上。重点会从能力协商、Reason Code、边界控制、Broker 支持度和实现成熟度几个维度，把支持 5.0 和跑稳 5.0 的差别说透。",
      "en": "这一篇专门回答一个非常现实的问题：MQTT 5.0 到底是不是该直接上。重点会从能力协商、Reason Code、边界控制、Broker 支持度和实现成熟度几个维度，把支持 5.0 和跑稳 5.0 的差别说透。"
    },
    "href": "articles/mqtt-client-extra-01-1-mqtt5-0-f8b677/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "加更",
      "en": "Extra"
    },
    "progress": {
      "zh": "第9篇/共16篇",
      "en": "Part 9 / 16"
    },
    "status": {
      "zh": "官网全文 / 第9篇",
      "en": "This Site / Part 9"
    },
    "cardMeta": {
      "zh": "09 · 客户端",
      "en": "09 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 40 分钟阅读",
      "en": "40 min read"
    },
    "tags": [
      "MQTT",
      "MQTT5.0",
      "工业通信",
      "PLC",
      "CSDN",
      "CODESYS",
      "ControlRookie"
    ],
    "keywords": "MQTT CODESYS 客户端 加更 加更1_MQTT 5.0 到底值不值得上？工业现场别急着无脑升级 MQTT MQTT5.0 工业通信 PLC CSDN CODESYS ControlRookie",
    "order": 9,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\加更1_MQTT5_0到底值不值得上_工业现场别急着无脑升级.md"
  },
  {
    "id": "mqtt-client-extra-02-2-mqtt-4a0f19",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "加更2_这套开源 MQTT 客户端，我是怎么一步一步做出来的",
      "en": "加更2_这套开源 MQTT 客户端，我是怎么一步一步做出来的"
    },
    "copy": {
      "zh": "这一篇是项目复盘视角，重点讲这套开源客户端为什么开始做、为什么后来必须重构接收链和状态机、QoS1 / QoS2 为什么是成熟度分水岭，以及这个项目真正的长期价值到底在哪里。",
      "en": "这一篇是项目复盘视角，重点讲这套开源客户端为什么开始做、为什么后来必须重构接收链和状态机、QoS1 / QoS2 为什么是成熟度分水岭，以及这个项目真正的长期价值到底在哪里。"
    },
    "href": "articles/mqtt-client-extra-02-2-mqtt-4a0f19/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "加更",
      "en": "Extra"
    },
    "progress": {
      "zh": "第10篇/共16篇",
      "en": "Part 10 / 16"
    },
    "status": {
      "zh": "官网全文 / 第10篇",
      "en": "This Site / Part 10"
    },
    "cardMeta": {
      "zh": "10 · 客户端",
      "en": "10 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 53 分钟阅读",
      "en": "53 min read"
    },
    "tags": [
      "MQTT",
      "开源",
      "CODESYS",
      "PLC",
      "项目复盘",
      "CSDN",
      "ControlRookie"
    ],
    "keywords": "MQTT CODESYS 客户端 加更 加更2_这套开源 MQTT 客户端，我是怎么一步一步做出来的 MQTT 开源 CODESYS PLC 项目复盘 CSDN ControlRookie",
    "order": 10,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\加更2_这套开源MQTT客户端_我是怎么一步一步做出来的.md"
  },
  {
    "id": "mqtt-client-source-01-01-mqttclient-8a4a28",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "源码加更01_拿到 MqttClient 源码后，先看工程入口和数据模型",
      "en": "源码加更01_拿到 MqttClient 源码后，先看工程入口和数据模型"
    },
    "copy": {
      "zh": "这一篇把 MqttClient V1.0 的工程入口、全局常量和数据结构一次性摆清楚。读者先知道这套开源客户端由哪些对象组成，再进入后面状态机和报文细节。",
      "en": "这一篇把 MqttClient V1.0 的工程入口、全局常量和数据结构一次性摆清楚。读者先知道这套开源客户端由哪些对象组成，再进入后面状态机和报文细节。"
    },
    "href": "articles/mqtt-client-source-01-01-mqttclient-8a4a28/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "源码加更",
      "en": "Source"
    },
    "progress": {
      "zh": "第11篇/共16篇",
      "en": "Part 11 / 16"
    },
    "status": {
      "zh": "官网全文 / 第11篇",
      "en": "This Site / Part 11"
    },
    "cardMeta": {
      "zh": "11 · 客户端",
      "en": "11 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 52 分钟阅读",
      "en": "52 min read"
    },
    "tags": [
      "MQTT",
      "CodeSys",
      "PLC通信",
      "ControlRookie",
      "CODESYS",
      "PLC"
    ],
    "keywords": "MQTT CODESYS 客户端 源码加更 源码加更01_拿到 MqttClient 源码后，先看工程入口和数据模型 MQTT CodeSys PLC通信 ControlRookie CODESYS PLC",
    "order": 11,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\源码加更01_拿到MqttClient源码后先看工程入口和数据模型.md"
  },
  {
    "id": "mqtt-client-source-02-02-fb-mqttclient-1c1523",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "源码加更02_FB_MqttClient 主功能块和状态机怎么跑",
      "en": "源码加更02_FB_MqttClient 主功能块和状态机怎么跑"
    },
    "copy": {
      "zh": "这一篇完整公开 FB_MqttClient 主功能块和与状态、错误、即时发送相关的方法。它是整套客户端源码的运行中枢。",
      "en": "这一篇完整公开 FB_MqttClient 主功能块和与状态、错误、即时发送相关的方法。它是整套客户端源码的运行中枢。"
    },
    "href": "articles/mqtt-client-source-02-02-fb-mqttclient-1c1523/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "源码加更",
      "en": "Source"
    },
    "progress": {
      "zh": "第12篇/共16篇",
      "en": "Part 12 / 16"
    },
    "status": {
      "zh": "官网全文 / 第12篇",
      "en": "This Site / Part 12"
    },
    "cardMeta": {
      "zh": "12 · 客户端",
      "en": "12 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 61 分钟阅读",
      "en": "61 min read"
    },
    "tags": [
      "MQTT",
      "CodeSys",
      "PLC通信",
      "ControlRookie",
      "CODESYS",
      "PLC"
    ],
    "keywords": "MQTT CODESYS 客户端 源码加更 源码加更02_FB_MqttClient 主功能块和状态机怎么跑 MQTT CodeSys PLC通信 ControlRookie CODESYS PLC",
    "order": 12,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\源码加更02_FB_MqttClient主功能块和状态机怎么跑.md"
  },
  {
    "id": "mqtt-client-source-03-03-tcp-48475e",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "源码加更03_TCP 封装和基础编解码为什么决定稳定性",
      "en": "源码加更03_TCP 封装和基础编解码为什么决定稳定性"
    },
    "copy": {
      "zh": "这一篇完整公开 TCP 读写封装、Remaining Length 编解码、字符串和载荷拼接。它是 MQTT 报文能否稳定落到 PLC 缓冲区的基础。",
      "en": "这一篇完整公开 TCP 读写封装、Remaining Length 编解码、字符串和载荷拼接。它是 MQTT 报文能否稳定落到 PLC 缓冲区的基础。"
    },
    "href": "articles/mqtt-client-source-03-03-tcp-48475e/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "源码加更",
      "en": "Source"
    },
    "progress": {
      "zh": "第13篇/共16篇",
      "en": "Part 13 / 16"
    },
    "status": {
      "zh": "官网全文 / 第13篇",
      "en": "This Site / Part 13"
    },
    "cardMeta": {
      "zh": "13 · 客户端",
      "en": "13 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 32 分钟阅读",
      "en": "32 min read"
    },
    "tags": [
      "MQTT",
      "CodeSys",
      "PLC通信",
      "ControlRookie",
      "CODESYS",
      "PLC"
    ],
    "keywords": "MQTT CODESYS 客户端 源码加更 源码加更03_TCP 封装和基础编解码为什么决定稳定性 MQTT CodeSys PLC通信 ControlRookie CODESYS PLC",
    "order": 13,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\源码加更03_TCP封装和基础编解码为什么决定稳定性.md"
  },
  {
    "id": "mqtt-client-source-04-04-connect-ping-disconnect-4a50aa",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "源码加更04_CONNECT、PING、DISCONNECT 会话生命周期",
      "en": "源码加更04_CONNECT、PING、DISCONNECT 会话生命周期"
    },
    "copy": {
      "zh": "这一篇完整公开 MQTT 会话建立、CONNACK 处理、心跳和断开的代码。它对应工业现场最常见的连不上、心跳超时和断线重连问题。",
      "en": "这一篇完整公开 MQTT 会话建立、CONNACK 处理、心跳和断开的代码。它对应工业现场最常见的连不上、心跳超时和断线重连问题。"
    },
    "href": "articles/mqtt-client-source-04-04-connect-ping-disconnect-4a50aa/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "源码加更",
      "en": "Source"
    },
    "progress": {
      "zh": "第14篇/共16篇",
      "en": "Part 14 / 16"
    },
    "status": {
      "zh": "官网全文 / 第14篇",
      "en": "This Site / Part 14"
    },
    "cardMeta": {
      "zh": "14 · 客户端",
      "en": "14 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 37 分钟阅读",
      "en": "37 min read"
    },
    "tags": [
      "MQTT",
      "CodeSys",
      "PLC通信",
      "ControlRookie",
      "CODESYS",
      "PLC"
    ],
    "keywords": "MQTT CODESYS 客户端 源码加更 源码加更04_CONNECT、PING、DISCONNECT 会话生命周期 MQTT CodeSys PLC通信 ControlRookie CODESYS PLC",
    "order": 14,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\源码加更04_CONNECT_PING_DISCONNECT会话生命周期.md"
  },
  {
    "id": "mqtt-client-source-05-05-publish-subscribe-unsubscribe-b2559f",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "源码加更05_PUBLISH、SUBSCRIBE、UNSUBSCRIBE 业务报文实现",
      "en": "源码加更05_PUBLISH、SUBSCRIBE、UNSUBSCRIBE 业务报文实现"
    },
    "copy": {
      "zh": "这一篇完整公开发布、订阅、取消订阅的报文构建和业务响应处理。这是 MQTT Client 从“能连上”走到“能干活”的关键层。",
      "en": "这一篇完整公开发布、订阅、取消订阅的报文构建和业务响应处理。这是 MQTT Client 从“能连上”走到“能干活”的关键层。"
    },
    "href": "articles/mqtt-client-source-05-05-publish-subscribe-unsubscribe-b2559f/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "源码加更",
      "en": "Source"
    },
    "progress": {
      "zh": "第15篇/共16篇",
      "en": "Part 15 / 16"
    },
    "status": {
      "zh": "官网全文 / 第15篇",
      "en": "This Site / Part 15"
    },
    "cardMeta": {
      "zh": "15 · 客户端",
      "en": "15 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 44 分钟阅读",
      "en": "44 min read"
    },
    "tags": [
      "MQTT",
      "CodeSys",
      "PLC通信",
      "ControlRookie",
      "CODESYS",
      "PLC"
    ],
    "keywords": "MQTT CODESYS 客户端 源码加更 源码加更05_PUBLISH、SUBSCRIBE、UNSUBSCRIBE 业务报文实现 MQTT CodeSys PLC通信 ControlRookie CODESYS PLC",
    "order": 15,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\源码加更05_PUBLISH_SUBSCRIBE_UNSUBSCRIBE业务报文实现.md"
  },
  {
    "id": "mqtt-client-source-06-06-qos-2b6c15",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "源码加更06_接收分发、QoS 事务和诊断闭环",
      "en": "源码加更06_接收分发、QoS 事务和诊断闭环"
    },
    "copy": {
      "zh": "这一篇完整公开接收分发、QoS ACK、Inflight 事务、QoS2 入站表、Topic Alias 和消息记录方法。这是 MQTT Client 现场稳定性的收口层。",
      "en": "这一篇完整公开接收分发、QoS ACK、Inflight 事务、QoS2 入站表、Topic Alias 和消息记录方法。这是 MQTT Client 现场稳定性的收口层。"
    },
    "href": "articles/mqtt-client-source-06-06-qos-2b6c15/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "seriesKey": "mqtt-client",
    "seriesTitle": {
      "zh": "MqttClient 系列教程",
      "en": "MQTT Client Series"
    },
    "folder": {
      "zh": "客户端",
      "en": "Client"
    },
    "kind": {
      "zh": "源码加更",
      "en": "Source"
    },
    "progress": {
      "zh": "第16篇/共16篇",
      "en": "Part 16 / 16"
    },
    "status": {
      "zh": "官网全文 / 第16篇",
      "en": "This Site / Part 16"
    },
    "cardMeta": {
      "zh": "16 · 客户端",
      "en": "16 · Client"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 80 分钟阅读",
      "en": "80 min read"
    },
    "tags": [
      "MQTT",
      "CodeSys",
      "PLC通信",
      "ControlRookie",
      "CODESYS",
      "PLC"
    ],
    "keywords": "MQTT CODESYS 客户端 源码加更 源码加更06_接收分发、QoS 事务和诊断闭环 MQTT CodeSys PLC通信 ControlRookie CODESYS PLC",
    "order": 16,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttClient系列教程\\源码加更06_接收分发_QoS事务和诊断闭环.md"
  },
  {
    "id": "mqtt-broker-part-01-1-plc-mqttbroker-e74237",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第1篇_客户端写完了，为什么我还要在 PLC 里写一个 MQTT Broker？",
      "en": "第1篇_客户端写完了，为什么我还要在 PLC 里写一个 MQTT Broker？"
    },
    "copy": {
      "zh": "这一篇是 Broker 系列的开场。前一个系列我们把 PLC 作为 MQTT Client 怎么连接、发布、订阅、ACK、重发讲完了；这一篇开始反过来问：如果现场只有几台 HMI、上位机、调试工具和 PLC，真的每次。",
      "en": "这一篇是 Broker 系列的开场。前一个系列我们把 PLC 作为 MQTT Client 怎么连接、发布、订阅、ACK、重发讲完了；这一篇开始反过来问：如果现场只有几台 HMI、上位机、调试工具和 PLC，真的每次。"
    },
    "href": "articles/mqtt-broker-part-01-1-plc-mqttbroker-e74237/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第1篇/共16篇",
      "en": "Part 1 / 16"
    },
    "status": {
      "zh": "官网全文 / 第1篇",
      "en": "This Site / Part 1"
    },
    "cardMeta": {
      "zh": "01 · Broker",
      "en": "01 · Broker"
    },
    "date": "2026-05-08",
    "readingTime": {
      "zh": "约 12 分钟阅读",
      "en": "12 min read"
    },
    "tags": [
      "MQTT",
      "Broker",
      "CODESYS",
      "PLC",
      "ST",
      "CSDN",
      "ControlRookie"
    ],
    "keywords": "MQTT CODESYS Broker 主线 第1篇_客户端写完了，为什么我还要在 PLC 里写一个 MQTT Broker？ MQTT Broker CODESYS PLC ST CSDN ControlRookie",
    "order": 1,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\第1篇_客户端写完了_为什么我还要在PLC里写一个MQTTBroker.md"
  },
  {
    "id": "mqtt-broker-part-02-2-mqttbroker-publish-f18f7a",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第2篇_写 MQTT Broker，第一关不是 PUBLISH，而是怎么让多个客户端稳稳连上同一个端口",
      "en": "第2篇_写 MQTT Broker，第一关不是 PUBLISH，而是怎么让多个客户端稳稳连上同一个端口"
    },
    "copy": {
      "zh": "这一篇只讲 Broker 的第一道硬门槛：多个客户端为什么都应该连接同一个 1883 端口，以及 PLC 里应该怎样用监听句柄、接入句柄、客户端槽位把这件事做稳定。",
      "en": "这一篇只讲 Broker 的第一道硬门槛：多个客户端为什么都应该连接同一个 1883 端口，以及 PLC 里应该怎样用监听句柄、接入句柄、客户端槽位把这件事做稳定。"
    },
    "href": "articles/mqtt-broker-part-02-2-mqttbroker-publish-f18f7a/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第2篇/共16篇",
      "en": "Part 2 / 16"
    },
    "status": {
      "zh": "官网全文 / 第2篇",
      "en": "This Site / Part 2"
    },
    "cardMeta": {
      "zh": "02 · Broker",
      "en": "02 · Broker"
    },
    "date": "2026-05-08",
    "readingTime": {
      "zh": "约 13 分钟阅读",
      "en": "13 min read"
    },
    "tags": [
      "MQTT",
      "Broker",
      "TCP",
      "CODESYS",
      "PLC",
      "ST",
      "CSDN",
      "ControlRookie"
    ],
    "keywords": "MQTT CODESYS Broker 主线 第2篇_写 MQTT Broker，第一关不是 PUBLISH，而是怎么让多个客户端稳稳连上同一个端口 MQTT Broker TCP CODESYS PLC ST CSDN ControlRookie",
    "order": 2,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\第2篇_写MQTTBroker第一关不是PUBLISH_而是怎么让多个客户端稳稳连上同一个端口.md"
  },
  {
    "id": "mqtt-broker-part-03-3-connect-mqtt3-1-3-1-1-5-0-broker-b6ffd1",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第3篇_CONNECT 解析别写死：MQTT 3.1、3.1.1、5.0 为什么会让 Broker 反复断开",
      "en": "第3篇_CONNECT 解析别写死：MQTT 3.1、3.1.1、5.0 为什么会让 Broker 反复断开"
    },
    "copy": {
      "zh": "这一篇讲 Broker 侧 CONNECT 解析。重点不是重复 MQTT 标准字段，而是解释为什么 MQTT + level 4、MQTT + level 5、MQIsdp + level 3 必须分开处理，以及 M。",
      "en": "这一篇讲 Broker 侧 CONNECT 解析。重点不是重复 MQTT 标准字段，而是解释为什么 MQTT + level 4、MQTT + level 5、MQIsdp + level 3 必须分开处理，以及 M。"
    },
    "href": "articles/mqtt-broker-part-03-3-connect-mqtt3-1-3-1-1-5-0-broker-b6ffd1/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第3篇/共16篇",
      "en": "Part 3 / 16"
    },
    "status": {
      "zh": "官网全文 / 第3篇",
      "en": "This Site / Part 3"
    },
    "cardMeta": {
      "zh": "03 · Broker",
      "en": "03 · Broker"
    },
    "date": "2026-05-08",
    "readingTime": {
      "zh": "约 11 分钟阅读",
      "en": "11 min read"
    },
    "tags": [
      "MQTT",
      "CONNECT",
      "Broker",
      "MQTT5",
      "CODESYS",
      "ST",
      "CSDN",
      "PLC"
    ],
    "keywords": "MQTT CODESYS Broker 主线 第3篇_CONNECT 解析别写死：MQTT 3.1、3.1.1、5.0 为什么会让 Broker 反复断开 MQTT CONNECT Broker MQTT5 CODESYS ST CSDN PLC",
    "order": 3,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\第3篇_CONNECT解析别写死_MQTT3_1_3_1_1_5_0为什么会让Broker反复断开.md"
  },
  {
    "id": "mqtt-broker-part-04-4-subscribe-broker-13f91f",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第4篇_SUBSCRIBE 不是存个字符串：Broker 怎么维护订阅表、通配符和多客户端路由",
      "en": "第4篇_SUBSCRIBE 不是存个字符串：Broker 怎么维护订阅表、通配符和多客户端路由"
    },
    "copy": {
      "zh": "这一篇讲 Broker 侧订阅系统。SUBSCRIBE 不是把主题字符串存起来就完事，Broker 必须区分 Topic Name 和 Topic Filter，校验 +、，维护多客户端订阅表，并在 PUBLISH。",
      "en": "这一篇讲 Broker 侧订阅系统。SUBSCRIBE 不是把主题字符串存起来就完事，Broker 必须区分 Topic Name 和 Topic Filter，校验 +、，维护多客户端订阅表，并在 PUBLISH。"
    },
    "href": "articles/mqtt-broker-part-04-4-subscribe-broker-13f91f/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第4篇/共16篇",
      "en": "Part 4 / 16"
    },
    "status": {
      "zh": "官网全文 / 第4篇",
      "en": "This Site / Part 4"
    },
    "cardMeta": {
      "zh": "04 · Broker",
      "en": "04 · Broker"
    },
    "date": "2026-05-08",
    "readingTime": {
      "zh": "约 11 分钟阅读",
      "en": "11 min read"
    },
    "tags": [
      "MQTT",
      "SUBSCRIBE",
      "Broker",
      "Topic",
      "CODESYS",
      "ST",
      "CSDN",
      "PLC"
    ],
    "keywords": "MQTT CODESYS Broker 主线 第4篇_SUBSCRIBE 不是存个字符串：Broker 怎么维护订阅表、通配符和多客户端路由 MQTT SUBSCRIBE Broker Topic CODESYS ST CSDN PLC",
    "order": 4,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\第4篇_SUBSCRIBE不是存个字符串_Broker怎么维护订阅表通配符和多客户端路由.md"
  },
  {
    "id": "mqtt-broker-part-05-5-publish-broker-qos-packetid-fanout-dddc43",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第5篇_PUBLISH 不是收到就转发：Broker 怎么处理 QoS、PacketId 和多客户端 fanout",
      "en": "第5篇_PUBLISH 不是收到就转发：Broker 怎么处理 QoS、PacketId 和多客户端 fanout"
    },
    "copy": {
      "zh": "这一篇讲 Broker 侧 PUBLISH 主链路。重点是：发布者发来的 PacketId 和 Broker 转发给订阅者的 PacketId 不是同一个作用域；QoS0、QoS1、QoS2 在 Broker 侧要分。",
      "en": "这一篇讲 Broker 侧 PUBLISH 主链路。重点是：发布者发来的 PacketId 和 Broker 转发给订阅者的 PacketId 不是同一个作用域；QoS0、QoS1、QoS2 在 Broker 侧要分。"
    },
    "href": "articles/mqtt-broker-part-05-5-publish-broker-qos-packetid-fanout-dddc43/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第5篇/共16篇",
      "en": "Part 5 / 16"
    },
    "status": {
      "zh": "官网全文 / 第5篇",
      "en": "This Site / Part 5"
    },
    "cardMeta": {
      "zh": "05 · Broker",
      "en": "05 · Broker"
    },
    "date": "2026-05-08",
    "readingTime": {
      "zh": "约 11 分钟阅读",
      "en": "11 min read"
    },
    "tags": [
      "MQTT",
      "PUBLISH",
      "QoS",
      "Broker",
      "PacketId",
      "ST",
      "CSDN",
      "CODESYS"
    ],
    "keywords": "MQTT CODESYS Broker 主线 第5篇_PUBLISH 不是收到就转发：Broker 怎么处理 QoS、PacketId 和多客户端 fanout MQTT PUBLISH QoS Broker PacketId ST CSDN CODESYS",
    "order": 5,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\第5篇_PUBLISH不是收到就转发_Broker怎么处理QoS_PacketId和多客户端fanout.md"
  },
  {
    "id": "mqtt-broker-part-06-6-retain-will-keepalive--publish-95a52b",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第6篇_Retain、Will、KeepAlive：工业现场为什么不能只会转发 PUBLISH",
      "en": "第6篇_Retain、Will、KeepAlive：工业现场为什么不能只会转发 PUBLISH"
    },
    "copy": {
      "zh": "这一篇讲 Broker 的三个现场能力：Retain 保存主题最后值，Will 处理异常离线通知，KeepAlive 清理死连接。它们不是锦上添花，而是让 MQTT 在工业现场真正可用的基础能力。",
      "en": "这一篇讲 Broker 的三个现场能力：Retain 保存主题最后值，Will 处理异常离线通知，KeepAlive 清理死连接。它们不是锦上添花，而是让 MQTT 在工业现场真正可用的基础能力。"
    },
    "href": "articles/mqtt-broker-part-06-6-retain-will-keepalive--publish-95a52b/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第6篇/共16篇",
      "en": "Part 6 / 16"
    },
    "status": {
      "zh": "官网全文 / 第6篇",
      "en": "This Site / Part 6"
    },
    "cardMeta": {
      "zh": "06 · Broker",
      "en": "06 · Broker"
    },
    "date": "2026-05-08",
    "readingTime": {
      "zh": "约 12 分钟阅读",
      "en": "12 min read"
    },
    "tags": [
      "MQTT",
      "Retain",
      "Will",
      "KeepAlive",
      "Broker",
      "PLC",
      "CSDN",
      "CODESYS"
    ],
    "keywords": "MQTT CODESYS Broker 主线 第6篇_Retain、Will、KeepAlive：工业现场为什么不能只会转发 PUBLISH MQTT Retain Will KeepAlive Broker PLC CSDN CODESYS",
    "order": 6,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\第6篇_Retain_Will_KeepAlive_工业现场为什么不能只会转发PUBLISH.md"
  },
  {
    "id": "mqtt-broker-part-07-7-plcbroker-tcp-write-894a6a",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第7篇_为什么 PLC Broker 会有延迟？从 TCP_Write 一帧一写到批量粘包写出",
      "en": "第7篇_为什么 PLC Broker 会有延迟？从 TCP_Write 一帧一写到批量粘包写出"
    },
    "copy": {
      "zh": "这一篇讲真实性能优化。早期 PLC Broker 在高频小消息场景下出现 1~3 秒尾部延迟，根因不是 QoS2、Retain 或订阅匹配，而是一次 TCP_Write 只写一帧。优化方向是批量编码多个 MQTT 帧。",
      "en": "这一篇讲真实性能优化。早期 PLC Broker 在高频小消息场景下出现 1~3 秒尾部延迟，根因不是 QoS2、Retain 或订阅匹配，而是一次 TCP_Write 只写一帧。优化方向是批量编码多个 MQTT 帧。"
    },
    "href": "articles/mqtt-broker-part-07-7-plcbroker-tcp-write-894a6a/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第7篇/共16篇",
      "en": "Part 7 / 16"
    },
    "status": {
      "zh": "官网全文 / 第7篇",
      "en": "This Site / Part 7"
    },
    "cardMeta": {
      "zh": "07 · Broker",
      "en": "07 · Broker"
    },
    "date": "2026-05-08",
    "readingTime": {
      "zh": "约 12 分钟阅读",
      "en": "12 min read"
    },
    "tags": [
      "MQTT",
      "Broker",
      "性能优化",
      "TCP",
      "CODESYS",
      "ST",
      "CSDN",
      "PLC"
    ],
    "keywords": "MQTT CODESYS Broker 主线 第7篇_为什么 PLC Broker 会有延迟？从 TCP_Write 一帧一写到批量粘包写出 MQTT Broker 性能优化 TCP CODESYS ST CSDN PLC",
    "order": 7,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\第7篇_为什么PLCBroker会有延迟_从TCP_Write一帧一写到批量粘包写出.md"
  },
  {
    "id": "mqtt-broker-part-08-8-plc-mqttbroker-retain-bd65fd",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "第8篇_PLC 侧 MQTT Broker 现场排障：连不上、订阅失败、发布延迟、Retain 收不到该怎么查",
      "en": "第8篇_PLC 侧 MQTT Broker 现场排障：连不上、订阅失败、发布延迟、Retain 收不到该怎么查"
    },
    "copy": {
      "zh": "这一篇是主线收口，专门整理 PLC 侧 MQTT Broker 的现场排障路线。连不上先看监听和槽位，订阅失败先看 SUBACK 和订阅表，发布延迟先看队列和批量写出，Retain 收不到先看 Retain 表和订阅补发。",
      "en": "这一篇是主线收口，专门整理 PLC 侧 MQTT Broker 的现场排障路线。连不上先看监听和槽位，订阅失败先看 SUBACK 和订阅表，发布延迟先看队列和批量写出，Retain 收不到先看 Retain 表和订阅补发。"
    },
    "href": "articles/mqtt-broker-part-08-8-plc-mqttbroker-retain-bd65fd/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "主线",
      "en": "Main"
    },
    "progress": {
      "zh": "第8篇/共16篇",
      "en": "Part 8 / 16"
    },
    "status": {
      "zh": "官网全文 / 第8篇",
      "en": "This Site / Part 8"
    },
    "cardMeta": {
      "zh": "08 · Broker",
      "en": "08 · Broker"
    },
    "date": "2026-05-08",
    "readingTime": {
      "zh": "约 14 分钟阅读",
      "en": "14 min read"
    },
    "tags": [
      "MQTT",
      "Broker",
      "现场排障",
      "PLC",
      "CODESYS",
      "ST",
      "CSDN",
      "ControlRookie"
    ],
    "keywords": "MQTT CODESYS Broker 主线 第8篇_PLC 侧 MQTT Broker 现场排障：连不上、订阅失败、发布延迟、Retain 收不到该怎么查 MQTT Broker 现场排障 PLC CODESYS ST CSDN ControlRookie",
    "order": 8,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\第8篇_PLC侧MQTTBroker现场排障_连不上订阅失败发布延迟Retain收不到该怎么查.md"
  },
  {
    "id": "mqtt-broker-extra-01-1-plcbroker-mqtt5-0-518d8d",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "加更1_PLC Broker 要不要完整支持 MQTT 5.0？工业现场别被“新版本”带偏",
      "en": "加更1_PLC Broker 要不要完整支持 MQTT 5.0？工业现场别被“新版本”带偏"
    },
    "copy": {
      "zh": "这一篇是 MQTT 5.0 加更。结论很直接：PLC 侧轻量 Broker 应该支持 MQTT 5.0 基础兼容接入，但当前阶段不应该盲目追完整 MQTT 5.0 属性系统。工业现场更需要稳定、可诊断、易维护。",
      "en": "这一篇是 MQTT 5.0 加更。结论很直接：PLC 侧轻量 Broker 应该支持 MQTT 5.0 基础兼容接入，但当前阶段不应该盲目追完整 MQTT 5.0 属性系统。工业现场更需要稳定、可诊断、易维护。"
    },
    "href": "articles/mqtt-broker-extra-01-1-plcbroker-mqtt5-0-518d8d/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "加更",
      "en": "Extra"
    },
    "progress": {
      "zh": "第9篇/共16篇",
      "en": "Part 9 / 16"
    },
    "status": {
      "zh": "官网全文 / 第9篇",
      "en": "This Site / Part 9"
    },
    "cardMeta": {
      "zh": "09 · Broker",
      "en": "09 · Broker"
    },
    "date": "2026-05-08",
    "readingTime": {
      "zh": "约 10 分钟阅读",
      "en": "10 min read"
    },
    "tags": [
      "MQTT",
      "MQTT5",
      "Broker",
      "PLC",
      "CODESYS",
      "CSDN",
      "ControlRookie"
    ],
    "keywords": "MQTT CODESYS Broker 加更 加更1_PLC Broker 要不要完整支持 MQTT 5.0？工业现场别被“新版本”带偏 MQTT MQTT5 Broker PLC CODESYS CSDN ControlRookie",
    "order": 9,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\加更1_PLCBroker要不要完整支持MQTT5_0_工业现场别被新版本带偏.md"
  },
  {
    "id": "mqtt-broker-extra-02-2-plc-mqttbroker-cc9b12",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "加更2_这套 PLC 侧 MQTT Broker，我是怎么从连不上、掉线、延迟一路修到稳定的",
      "en": "加更2_这套 PLC 侧 MQTT Broker，我是怎么从连不上、掉线、延迟一路修到稳定的"
    },
    "copy": {
      "zh": "这一篇是项目复盘。它不再按标准条文讲，而是把这套 PLC 侧 MQTT Broker 从规划、编译错误、连接闪烁、订阅失败、发布掉线、Retain 漏实现、性能延迟、MQTT 3.1/5.0 兼容一路修到稳定的过程完。",
      "en": "这一篇是项目复盘。它不再按标准条文讲，而是把这套 PLC 侧 MQTT Broker 从规划、编译错误、连接闪烁、订阅失败、发布掉线、Retain 漏实现、性能延迟、MQTT 3.1/5.0 兼容一路修到稳定的过程完。"
    },
    "href": "articles/mqtt-broker-extra-02-2-plc-mqttbroker-cc9b12/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "加更",
      "en": "Extra"
    },
    "progress": {
      "zh": "第10篇/共16篇",
      "en": "Part 10 / 16"
    },
    "status": {
      "zh": "官网全文 / 第10篇",
      "en": "This Site / Part 10"
    },
    "cardMeta": {
      "zh": "10 · Broker",
      "en": "10 · Broker"
    },
    "date": "2026-05-08",
    "readingTime": {
      "zh": "约 11 分钟阅读",
      "en": "11 min read"
    },
    "tags": [
      "MQTT",
      "Broker",
      "PLC",
      "项目复盘",
      "CODESYS",
      "CSDN",
      "ControlRookie"
    ],
    "keywords": "MQTT CODESYS Broker 加更 加更2_这套 PLC 侧 MQTT Broker，我是怎么从连不上、掉线、延迟一路修到稳定的 MQTT Broker PLC 项目复盘 CODESYS CSDN ControlRookie",
    "order": 10,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\加更2_这套PLC侧MQTTBroker_我是怎么从连不上掉线延迟一路修到稳定的.md"
  },
  {
    "id": "mqtt-broker-source-01-01-broker-b5ee74",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "源码加更01_Broker 工程入口、容量边界和数据模型",
      "en": "源码加更01_Broker 工程入口、容量边界和数据模型"
    },
    "copy": {
      "zh": "这一组源码加更只有一个目标：把 MqttBroker 的真实 ST 源码按工程阅读顺序讲完整。不是再补几段“看起来像源码”的片段，而是让读者能沿着源码对象理解这个 Broker 怎么组织、怎么运行、怎么排障。",
      "en": "这一组源码加更只有一个目标：把 MqttBroker 的真实 ST 源码按工程阅读顺序讲完整。不是再补几段“看起来像源码”的片段，而是让读者能沿着源码对象理解这个 Broker 怎么组织、怎么运行、怎么排障。"
    },
    "href": "articles/mqtt-broker-source-01-01-broker-b5ee74/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "源码加更",
      "en": "Source"
    },
    "progress": {
      "zh": "第11篇/共16篇",
      "en": "Part 11 / 16"
    },
    "status": {
      "zh": "官网全文 / 第11篇",
      "en": "This Site / Part 11"
    },
    "cardMeta": {
      "zh": "11 · Broker",
      "en": "11 · Broker"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 47 分钟阅读",
      "en": "47 min read"
    },
    "tags": [
      "MQTT",
      "Broker",
      "CodeSys",
      "PLC通信",
      "ST源码",
      "ControlRookie",
      "CODESYS",
      "PLC"
    ],
    "keywords": "MQTT CODESYS Broker 源码加更 源码加更01_Broker 工程入口、容量边界和数据模型 MQTT Broker CodeSys PLC通信 ST源码 ControlRookie CODESYS PLC",
    "order": 11,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\源码加更01_Broker工程入口容量边界和数据模型.md"
  },
  {
    "id": "mqtt-broker-source-02-02-fb-mqttbroker-bb2649",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "源码加更02_FB_MqttBroker 顶层调度、连接池和权限边界",
      "en": "源码加更02_FB_MqttBroker 顶层调度、连接池和权限边界"
    },
    "copy": {
      "zh": "这一组源码加更只有一个目标：把 MqttBroker 的真实 ST 源码按工程阅读顺序讲完整。不是再补几段“看起来像源码”的片段，而是让读者能沿着源码对象理解这个 Broker 怎么组织、怎么运行、怎么排障。",
      "en": "这一组源码加更只有一个目标：把 MqttBroker 的真实 ST 源码按工程阅读顺序讲完整。不是再补几段“看起来像源码”的片段，而是让读者能沿着源码对象理解这个 Broker 怎么组织、怎么运行、怎么排障。"
    },
    "href": "articles/mqtt-broker-source-02-02-fb-mqttbroker-bb2649/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "源码加更",
      "en": "Source"
    },
    "progress": {
      "zh": "第12篇/共16篇",
      "en": "Part 12 / 16"
    },
    "status": {
      "zh": "官网全文 / 第12篇",
      "en": "This Site / Part 12"
    },
    "cardMeta": {
      "zh": "12 · Broker",
      "en": "12 · Broker"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 62 分钟阅读",
      "en": "62 min read"
    },
    "tags": [
      "MQTT",
      "Broker",
      "CodeSys",
      "PLC通信",
      "ST源码",
      "ControlRookie",
      "CODESYS",
      "PLC"
    ],
    "keywords": "MQTT CODESYS Broker 源码加更 源码加更02_FB_MqttBroker 顶层调度、连接池和权限边界 MQTT Broker CodeSys PLC通信 ST源码 ControlRookie CODESYS PLC",
    "order": 12,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\源码加更02_FB_MqttBroker顶层调度连接池和权限边界.md"
  },
  {
    "id": "mqtt-broker-source-03-03-tcp-729028",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "源码加更03_单连接槽位、TCP 字节流和发送队列",
      "en": "源码加更03_单连接槽位、TCP 字节流和发送队列"
    },
    "copy": {
      "zh": "这一组源码加更只有一个目标：把 MqttBroker 的真实 ST 源码按工程阅读顺序讲完整。不是再补几段“看起来像源码”的片段，而是让读者能沿着源码对象理解这个 Broker 怎么组织、怎么运行、怎么排障。",
      "en": "这一组源码加更只有一个目标：把 MqttBroker 的真实 ST 源码按工程阅读顺序讲完整。不是再补几段“看起来像源码”的片段，而是让读者能沿着源码对象理解这个 Broker 怎么组织、怎么运行、怎么排障。"
    },
    "href": "articles/mqtt-broker-source-03-03-tcp-729028/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "源码加更",
      "en": "Source"
    },
    "progress": {
      "zh": "第13篇/共16篇",
      "en": "Part 13 / 16"
    },
    "status": {
      "zh": "官网全文 / 第13篇",
      "en": "This Site / Part 13"
    },
    "cardMeta": {
      "zh": "13 · Broker",
      "en": "13 · Broker"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 71 分钟阅读",
      "en": "71 min read"
    },
    "tags": [
      "MQTT",
      "Broker",
      "CodeSys",
      "PLC通信",
      "ST源码",
      "ControlRookie",
      "CODESYS",
      "PLC"
    ],
    "keywords": "MQTT CODESYS Broker 源码加更 源码加更03_单连接槽位、TCP 字节流和发送队列 MQTT Broker CodeSys PLC通信 ST源码 ControlRookie CODESYS PLC",
    "order": 13,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\源码加更03_单连接槽位TCP字节流和发送队列.md"
  },
  {
    "id": "mqtt-broker-source-04-04-mqtt-21a105",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "源码加更04_MQTT 编解码器和字节工具函数",
      "en": "源码加更04_MQTT 编解码器和字节工具函数"
    },
    "copy": {
      "zh": "这一组源码加更只有一个目标：把 MqttBroker 的真实 ST 源码按工程阅读顺序讲完整。不是再补几段“看起来像源码”的片段，而是让读者能沿着源码对象理解这个 Broker 怎么组织、怎么运行、怎么排障。",
      "en": "这一组源码加更只有一个目标：把 MqttBroker 的真实 ST 源码按工程阅读顺序讲完整。不是再补几段“看起来像源码”的片段，而是让读者能沿着源码对象理解这个 Broker 怎么组织、怎么运行、怎么排障。"
    },
    "href": "articles/mqtt-broker-source-04-04-mqtt-21a105/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "源码加更",
      "en": "Source"
    },
    "progress": {
      "zh": "第14篇/共16篇",
      "en": "Part 14 / 16"
    },
    "status": {
      "zh": "官网全文 / 第14篇",
      "en": "This Site / Part 14"
    },
    "cardMeta": {
      "zh": "14 · Broker",
      "en": "14 · Broker"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 75 分钟阅读",
      "en": "75 min read"
    },
    "tags": [
      "MQTT",
      "Broker",
      "CodeSys",
      "PLC通信",
      "ST源码",
      "ControlRookie",
      "CODESYS",
      "PLC"
    ],
    "keywords": "MQTT CODESYS Broker 源码加更 源码加更04_MQTT 编解码器和字节工具函数 MQTT Broker CodeSys PLC通信 ST源码 ControlRookie CODESYS PLC",
    "order": 14,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\源码加更04_MQTT编解码器和字节工具函数.md"
  },
  {
    "id": "mqtt-broker-source-05-05-retainpublish-e9038e",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "源码加更05_订阅表、Retain、PUBLISH 路由和业务事件",
      "en": "源码加更05_订阅表、Retain、PUBLISH 路由和业务事件"
    },
    "copy": {
      "zh": "这一组源码加更只有一个目标：把 MqttBroker 的真实 ST 源码按工程阅读顺序讲完整。不是再补几段“看起来像源码”的片段，而是让读者能沿着源码对象理解这个 Broker 怎么组织、怎么运行、怎么排障。",
      "en": "这一组源码加更只有一个目标：把 MqttBroker 的真实 ST 源码按工程阅读顺序讲完整。不是再补几段“看起来像源码”的片段，而是让读者能沿着源码对象理解这个 Broker 怎么组织、怎么运行、怎么排障。"
    },
    "href": "articles/mqtt-broker-source-05-05-retainpublish-e9038e/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "源码加更",
      "en": "Source"
    },
    "progress": {
      "zh": "第15篇/共16篇",
      "en": "Part 15 / 16"
    },
    "status": {
      "zh": "官网全文 / 第15篇",
      "en": "This Site / Part 15"
    },
    "cardMeta": {
      "zh": "15 · Broker",
      "en": "15 · Broker"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 45 分钟阅读",
      "en": "45 min read"
    },
    "tags": [
      "MQTT",
      "Broker",
      "CodeSys",
      "PLC通信",
      "ST源码",
      "ControlRookie",
      "CODESYS",
      "PLC"
    ],
    "keywords": "MQTT CODESYS Broker 源码加更 源码加更05_订阅表、Retain、PUBLISH 路由和业务事件 MQTT Broker CodeSys PLC通信 ST源码 ControlRookie CODESYS PLC",
    "order": 15,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\源码加更05_订阅表RetainPublish路由和业务事件.md"
  },
  {
    "id": "mqtt-broker-source-06-06-qos-fecb8d",
    "type": {
      "zh": "文章",
      "en": "Article"
    },
    "title": {
      "zh": "源码加更06_QoS 事务调度、重试和生产级闭环",
      "en": "源码加更06_QoS 事务调度、重试和生产级闭环"
    },
    "copy": {
      "zh": "这一组源码加更只有一个目标：把 MqttBroker 的真实 ST 源码按工程阅读顺序讲完整。不是再补几段“看起来像源码”的片段，而是让读者能沿着源码对象理解这个 Broker 怎么组织、怎么运行、怎么排障。",
      "en": "这一组源码加更只有一个目标：把 MqttBroker 的真实 ST 源码按工程阅读顺序讲完整。不是再补几段“看起来像源码”的片段，而是让读者能沿着源码对象理解这个 Broker 怎么组织、怎么运行、怎么排障。"
    },
    "href": "articles/mqtt-broker-source-06-06-qos-fecb8d/index.html",
    "category": {
      "zh": "通信 / CODESYS",
      "en": "Communication / CODESYS"
    },
    "series": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "seriesKey": "mqtt-broker",
    "seriesTitle": {
      "zh": "MqttBroker 系列教程",
      "en": "MQTT Broker Series"
    },
    "folder": {
      "zh": "Broker",
      "en": "Broker"
    },
    "kind": {
      "zh": "源码加更",
      "en": "Source"
    },
    "progress": {
      "zh": "第16篇/共16篇",
      "en": "Part 16 / 16"
    },
    "status": {
      "zh": "官网全文 / 第16篇",
      "en": "This Site / Part 16"
    },
    "cardMeta": {
      "zh": "16 · Broker",
      "en": "16 · Broker"
    },
    "date": "2026-05-06",
    "readingTime": {
      "zh": "约 41 分钟阅读",
      "en": "41 min read"
    },
    "tags": [
      "MQTT",
      "Broker",
      "CodeSys",
      "PLC通信",
      "ST源码",
      "ControlRookie",
      "CODESYS",
      "PLC"
    ],
    "keywords": "MQTT CODESYS Broker 源码加更 源码加更06_QoS 事务调度、重试和生产级闭环 MQTT Broker CodeSys PLC通信 ST源码 ControlRookie CODESYS PLC",
    "order": 16,
    "source": "E:\\Obsidian\\Work\\03_资源\\通信\\MQTT\\MqttBroker系列教程\\源码加更06_QoS事务调度重试和生产级闭环.md"
  }
];
