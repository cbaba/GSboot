package com.gt.controller;
import com.gt.hibernate.BaseDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.SQLException;

/**
 * 1. 因为Classpath里有H2，所以会创建一个嵌入式的H2数据库Bean，它的类型是
 * javax.sql.DataSource ，JPA实现（Hibernate）需要它来访问数据库。
 *
 * 2. 因为Classpath里有Hibernate（Spring Data JPA传递引入的）的实体管理器，所以自动配置
 * 会配置与 Hibernate相关的 Bean，包括 Spring的 LocalContainerEntityManager-
 * FactoryBean 和 JpaVendorAdapter 。
 *
 * 3. 因为 Classpath 里有 Spring MVC(归功于 Web 起步依赖)。所以会配置Spring的 DispatchServlet 并启用 Spring MVC
 *
 * 4. 因为这是一个 Spring MVC Web 应用程序，所以会注册一个资源管理器，把相对于 Classpath 根目录下的 /static 目录里的
 * 静态内容提供出来(这个资源处理器还能处理 /public,/resources,和 /META-INF/resources 的静态内容)
 *
 * 5. 因为Classpath里有 Tomcat (通过 Web 起步依赖传递引用) ，所以会启动一个嵌入式的 Tomcat 容器，监听 8080 端口
 *
 *
 * 大多数情况下 Spring Boot 自动配置的 Bean 刚好能满足我们的需求，不需要去覆盖他们，但某些情况下， Spring Boot 在自动配置时还不能很好的进行推断
 *
 *   通过compile("org.springframework.boot:spring-boot-starter-security") 添加对 spring-secutiry 依赖
 *   Security 起步依赖在应用程序的 Classpath 添加了 Spring Security 。Classpath  有 Spring Security 后，自动配置就能介入其中创建一个基本的 Spring Security 配置
 *
 * 覆盖自动配置很简单，就当自动配置不存在，直接显式地写一段配置。这段显示配置的形式不限， Spring 支持的 XML 和 Groovy 形式配置都可以
 *
 * 想要覆盖 Spring Boot 的自动配置，要做的仅仅是编写一个显式的配置，Spring Boot 会发现你的配置，随后降低自动配置的优先级，以你的配置为准
 * 
 *
 *
 */


//使用 @Controller 注解这样组件扫描会自动将其注册为Spring应用程序上下文里的一个 Bean 还是用了 @RequestMapping 注解 其中 / 表示所有的处理器方法都映射到了 / 这个 url 路径上
@Controller
@RequestMapping("/")
public class HelloController {
    @Value("${gongtao.name}")
    private String name;

//    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DataSource dataSource;



    @Autowired
    public HelloController(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @RequestMapping("/home")
    //@ResponseBody
    public String home(Model model) {
	    model.addAttribute("name",name);
	    User user = new User();
	    user.setAge(23);
	    user.setId(1);
	    user.setUsername(name);
	    userRepository.save(user);
	    model.addAttribute("userList",userRepository.findAll());
	    System.out.print(userRepository.findAll().get(0).getAge());
	    //因为 Classpath 里有 Thymeleaf 所以 Thymeleaf 会配置为 Spring MVC 的视图，包括一个Thymeleaf的模板解析器，模板引擎及属兔解析器。试图解析器会解析相对于 Classpath 根目录的 /templates 目录里的模板。
        return "index";
    }

    @RequestMapping(value="login.html",method=RequestMethod.GET)
    public String login(){
        return "login";
    }

    @RequestMapping(value="exit",method=RequestMethod.GET)
    public String logout() throws SQLException {
        return "3d/index";

    }

    @RequestMapping(value="index",method=RequestMethod.GET)
    public String index() throws SQLException {
        return "index";

    }


    @RequestMapping(value="login",method=RequestMethod.GET)
    public String loginForm() throws SQLException {
        User user = new User();
        user.setUsername("龚涛");
        System.out.print(dataSource.getConnection().toString());
        return "index";
    }
}