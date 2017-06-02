package com.gt.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by gongtao on 2017/5/13 22:36.
 */

@Configuration
@EnableJpaRepositories("com.gt.dao")
@EnableTransactionManagement
public class JpaConfig {

//    @Autowired
//    private DataSource dataSource;


    @Bean
    public EntityManagerFactory entityManagerFactory(){
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();

        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setJpaVendorAdapter(vendorAdapter);
        //这里的 com.gt.entities 为java bean 所在的目录
        factory.setPackagesToScan("com.gt.entities");
//        factory.setDataSource(dataSource);


//         Map<String,Object> jpaProperties = new HashMap<String,Object>();
//         jpaProperties.put("hibernate.ejb.naming_strategy","org.hibernate.cfg.ImprovedNamingStrategy");
//         jpaProperties.put("hibernate.jdbc.batch_size",50);
//
//         factory.setJpaPropertyMap(jpaProperties
//
// 0);
         factory.afterPropertiesSet();
         return factory.getObject();


    }

    @Bean
    public PlatformTransactionManager transactionManager(){

        JpaTransactionManager txManager = new JpaTransactionManager();
        txManager.setEntityManagerFactory(entityManagerFactory());
        return txManager;
    }



}
