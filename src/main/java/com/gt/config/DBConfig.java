//package com.gt.config;
//
//import com.mchange.v2.c3p0.ComboPooledDataSource;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.env.Environment;
//
//import java.beans.PropertyVetoException;
//
///**



























// * Created by gongtao on 2017/5/13.
// * 配置数据源
// *
// */
//
//@Configuration
//public class DBConfig {
//
//    @Autowired
//    private Environment evn;
//
//    @Bean(name="dataSource")
//    private ComboPooledDataSource dataSource() throws PropertyVetoException {
//
//        ComboPooledDataSource dataSource = new ComboPooledDataSource();
//        dataSource.setUser(evn.getProperty("c3p0.db.username"));
//        dataSource.setPassword(evn.getProperty("c3p0.db.password"));
//        dataSource.setDriverClass(evn.getProperty("c3p0.db.driverClassName"));
//        dataSource.setJdbcUrl(evn.getProperty("c3p0.db.url"));
//        dataSource.setMaxPoolSize(20);
//        dataSource.setMinPoolSize(5);
//        dataSource.setInitialPoolSize(10);
//        dataSource.setMaxIdleTime(300);
//        dataSource.setAcquireIncrement(5);
//        dataSource.setIdleConnectionTestPeriod(60);
//
//
//        return dataSource;
//    }
//
//
//
//}
