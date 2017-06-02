package com.gt.testspring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by gongtao on 2017/5/28 10:03.
 *
 *  注解 @Scope 描述的是  Spring 容器如何创建  Bean 实例的 Spring 的scope共有以下几种：
 *  ① Singleton: 一个Spring容器中只有一个 Bean 的实例，此为 Spring 的默认配置，全容器共享一个实例
 *  ② Prototype：每次调用新建一个 Bean 实例
 *  ③ Request: Web 项目中，给每个 http request 新建一个 Bean 实例
 *  ④ Session: Web 项目中，给每个 http session 新建一个 Bean 实例
 *  ⑤ GlobalSession: 这个只在  Portal 应用中有用，给每一个 global http session 新建一个 Bean
 *  另外 在 Spring Batch 中还有一个 Scope 是使用 @StepScope.
 */

@Scope   //默认为 Singleton 相当于 @Scope("singleton")
@Service
public class UseUserService {


    //使用 @Autowired 将 UserService 类的实力注入到 UseUserService 中，让 UseUserService 具备 UserService 的功能
    //此处使用 @Inject 和 @Resource 注解是等效的。
    //@Autowired
    //@Injectx
    @Resource
    private UserService service;

    public void useSayHello(){
        service.sayHello();
    }

}
