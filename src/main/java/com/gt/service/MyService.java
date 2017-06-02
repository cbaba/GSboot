package com.gt.service;

import com.gt.condition.JdbcTemplateCondition;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration;
import org.springframework.context.annotation.Conditional;

/**
 * Created by gongtao on 2017/5/14 11:21.
 * 这里的 @Conditional 注解表示只有 JdbcTemplateCondition 类的条件成立时，才会创建 MyService 这个 Bean 否则这个 Bean 的声明就会被忽略掉
 *
 *      Spring Boot 提供的条件化注解有：
 *      @ConditionalOnBean         配置了某个特定 Bean
 *      @ConditionalOnMissingBean  没有配置某个特定的 Bean
 *      @ConditionalOnClass        Classpath 里有指定的类
 *      @ConditionalOnMissingClass Classpath 里没有指定的类
 *      @ConditionalOnExpression   给定的 Spring Expression Language(SpEl) 表达式结果为 true
 *      @ConditionalOnJava         java 的版本匹配特定值或一个范围值
 *      @ConditionalOnJndi         参数中给定的 JNDI 位置必须存在一个，如果没有给参数，则要有 JNDI InitialContext
 *      @ConditionalOnProperty     指定的配置属性要有一个明确的值
 *      @ConditionalOnResource     Classpath 里有指定的资源
 *      @ConditionalOnWebApplication  这是一个 Web 应用程序
 *      @ConditionalOnMotWebApplication  这不是一个 Web 应用程序
 *
 */




@Conditional(JdbcTemplateCondition.class)
public class MyService {

}
