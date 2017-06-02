package com.gt.condition;

import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

/**
 * Created by gongtao on 2017/5/14 11:12.
 *  使用 Spring 的条件化配置，这是 Spring 4.0 引入的新特性，条件化配置允许配置存在于应用程序中，
 * 但是在满足某些特定条件之前都忽略这个配置，
 *  要实现条件化配置只需要实现 Condition 接口覆盖他的 matches() 方法，
 */


public class JdbcTemplateCondition implements Condition {


    // 重写 matches 方法
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        try{
            //只有在 ClassPath 下存在 JdbcTemplate 是才会生效
            context.getClassLoader().loadClass("org.springframework.jdbc.core.JdbcTemplate");
            return true;
        }catch(Exception ex){
            return false;
        }
    }
}
