# quicksurePCWebsiteServer
quicksure PC官网web

该PC项目重点是用了dubbo分布式，provider层提供服务层如何注册服务到zookeeper上，并且在Linux上启动provider层的工程jar包是一个全新的挑战
1.使用了maven build Provider项目，具体在pom.xml里面怎么配置请看provider工程的pom.xml 命令：clean package 
2.Provider jar工程启动依赖的第三方jar包，要与项目jar放在同一目录下的lib文件夹下
3.Linux下部署Provider，命令:nohup java -jar ****.jar >输出文件 &
