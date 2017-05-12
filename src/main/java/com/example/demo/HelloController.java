package com.example.demo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

@Controller
public class HelloController {
    @Value("${gongtao.name}")
    private String name;

    @RequestMapping("/")
    //@ResponseBody
    String home(Model model) {
	model.addAttribute("name",name);
        return "index";
    }
}