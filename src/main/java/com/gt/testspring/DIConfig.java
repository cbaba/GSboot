package com.gt.testspring;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Created by gongtao on 2017/5/28 9:55.
 *
 *
 *
 * 使用 @Configuration 注解声明类是一个配置类，
 * 使用 @ComponentScan 注解自动扫描包名下的所有 @Component @Service @Repository @Controller 类，并注册为 Bean
 */




@Configuration
@ComponentScan("com.gt.testspring")
public class DIConfig {

}
