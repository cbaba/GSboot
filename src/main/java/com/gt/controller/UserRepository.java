package com.gt.controller;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by gongtao on 2017/5/13.
 */

/**
 * 这里拓展了 spring-data-jpa 的 JpaRepository 接口，此时即直接继承了18 个执行常用持久化操作的方法 。 JpaRepository
 * 是一个泛型接口有两个参数 一个是 仓库操作的领域对象模型，另外一个是 id 属性的类型。
 *
 *
 * 因为 Classpath 里有 Spring Data JPA, 所以他会自动配置为根据仓库的接口创建仓库实现。
 */


public interface UserRepository extends JpaRepository<User,String> {

    //根据用户姓名获取用户信息
    List<User> findByusername(String name);

}
