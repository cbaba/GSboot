package com.gt.spel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;

/**
 * Created by gongtao on 2017/5/28 12:01.
 */

@Configuration
@ComponentScan("com.gt.spel")
@PropertySource("classpath:com/gt/spel/testspel.properties")
public class ELConfig {

    @Value("${user.name}")
    private String name;

    @Value("${user.age}")
    private Integer age;

    @Value("classpath:com/gt/spel/testFile.txt")
    private Resource testFile;

    @Autowired
    private Environment environment;


    @Bean
    public static PropertySourcesPlaceholderConfigurer propertyConfigure(){
        return new PropertySourcesPlaceholderConfigurer();
    }

}
