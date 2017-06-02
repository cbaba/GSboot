package com.gt.hibernate;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * Created by gongtao on 2017/5/31 20:34.
 */

@Repository
public class BaseDao {

    @Autowired
    private SessionFactory factory;

    public Session getSession(){
        return factory.getCurrentSession();
    }

}
