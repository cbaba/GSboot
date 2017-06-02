package com.gt.annotation;

import java.lang.annotation.Documented;

/**
 * Created by gongtao on 2017/5/28 10:24.
 *
 * 注解本身是没有功能的，就和 XML 一样，注解和 XML 一样都是元数据，元数据即解释数据的数据，这就是所谓的配置
 * 注解的功能来自用这个注解的地方
 */

@Documented
public @interface Action {

    String name();

}
