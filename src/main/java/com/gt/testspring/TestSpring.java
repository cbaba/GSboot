package com.gt.testspring;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * Created by gongtao on 2017/5/28 9:51.
 */
public class TestSpring {

    public static void main(String[] args){
        //使用 AnnotationConfigApplicationContext 创建Spring容器，接受输入一个配置类作为参数
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(DIConfig.class);
        UseUserService service = context.getBean(UseUserService.class);
        service.useSayHello();

        context.close();

    }

}
